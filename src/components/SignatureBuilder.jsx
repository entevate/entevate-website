/**
 * SignatureBuilder — multi-user email signature editor for the
 * ENTEVATE Brand Portal.
 *
 * Flow:
 *   1. If not signed in → magic-link email form (Supabase auth).
 *   2. Once signed in → list of saved signatures + form-driven editor with
 *      live preview matching the brand reference.
 *   3. Per-client export buttons (Apple Mail, Outlook desktop, Gmail web,
 *      Outlook 365 web, raw HTML, plain text).
 *
 * Storage: public.brand_signatures (RLS-gated by auth.uid).
 * Render:  ../lib/signature-render.js → table-based HTML that survives
 *          Outlook's Word renderer + Gmail/Outlook/Apple Mail.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase, SUPABASE_CONFIGURED } from '../lib/supabase.js';
import {
  buildSignatureHtml,
  buildSignatureText,
  wrapAsDocument,
  copyRichHtmlToClipboard,
  copyPlainTextToClipboard,
  downloadFile,
  EXPORT_PRESETS,
} from '../lib/signature-render.js';

// Defaults seeded into a fresh signature so the editor isn't empty.
// Match Jake's reference. Users overwrite when creating their own.
const DEFAULT_SIG = {
  label: 'Default',
  is_default: true,
  full_name: '',
  title: '',
  company: 'ENTEVATE, INC.',
  email: '',
  phone: '',
  mobile: '',
  address_line1: '5 Cowboys Way, Suite 300',
  address_line2: 'Frisco, TX 75034',
  website: 'https://entevate.com',
  photo_url: '',
  logo_url: '',
  socials: { linkedin: '', instagram: '', x: '', facebook: '', youtube: '' },
  show_disclaimer: true,
  disclaimer_text:
    "The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future.",
  accent_color: '#000000',
  text_color: '#181818',
  muted_color: '#6b6b6b',
  divider_color: '#dddddd',
};

export default function SignatureBuilder() {
  const [session, setSession] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Subscribe to auth state so the UI flips between sign-in and editor
  // automatically (also covers the redirect-back from a magic link).
  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setSession(data.session ?? null);
      setAuthChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, s) => {
      if (cancelled) return;
      setSession(s);
      setAuthChecked(true);
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (!SUPABASE_CONFIGURED) {
    return (
      <div className="bp-sig-empty">
        <p>
          Signature Builder needs Supabase credentials. Set{' '}
          <code>PUBLIC_SUPABASE_URL</code> and <code>PUBLIC_SUPABASE_ANON_KEY</code>{' '}
          in the project's environment, then redeploy.
        </p>
      </div>
    );
  }

  if (!authChecked) return <div className="bp-sig-empty">Loading…</div>;
  if (!session) return <SignInPanel />;

  return <Editor session={session} />;
}

// ── Sign-in (magic link) ──────────────────────────────────────────────

function SignInPanel() {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: typeof window !== 'undefined'
            ? `${window.location.origin}/brand`
            : undefined,
        },
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      setError(err?.message || 'Sign-in failed.');
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="bp-sig-signin">
        <h3>Check your inbox</h3>
        <p>
          We sent a magic link to <strong>{email}</strong>. Open it on this
          device and you'll land back here, signed in.
        </p>
        <button
          type="button"
          className="bp-sig-link-btn"
          onClick={() => { setSent(false); setEmail(''); }}
        >
          Send to a different address
        </button>
      </div>
    );
  }

  return (
    <div className="bp-sig-signin">
      <h3>Sign in to manage your signature</h3>
      <p>Each ENTEVATE team member has their own saved signatures. We'll email a one-tap magic link — no password.</p>
      <form onSubmit={submit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@entevate.com"
          autoFocus
          required
        />
        <button type="submit" disabled={busy} className="bp-sig-primary-btn">
          {busy ? 'Sending…' : 'Email me a sign-in link'}
        </button>
      </form>
      {error && <div className="bp-sig-error">{error}</div>}
    </div>
  );
}

// ── Editor ────────────────────────────────────────────────────────────

function Editor({ session }) {
  const [list, setList] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [draft, setDraft] = useState(null); // working copy of active signature
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  const userId = session.user.id;
  const userEmail = session.user.email || '';

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    const { data, error } = await supabase
      .from('brand_signatures')
      .select('*')
      .order('is_default', { ascending: false })
      .order('updated_at', { ascending: false });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setList(data || []);
    setLoading(false);
    if (!activeId && data && data.length > 0) {
      setActiveId(data[0].id);
      setDraft(data[0]);
    }
    if (data && data.length === 0) {
      // First-time user: seed a starter draft (not yet persisted)
      setDraft({
        ...DEFAULT_SIG,
        email: userEmail,
        user_id: userId,
      });
      setActiveId(null);
    }
  }, [activeId, userEmail, userId]);

  useEffect(() => { refresh(); }, [refresh]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  function setField(name, value) {
    setDraft((d) => ({ ...d, [name]: value }));
  }
  function setSocial(key, value) {
    setDraft((d) => ({ ...d, socials: { ...(d.socials || {}), [key]: value } }));
  }

  async function newSignature() {
    setActiveId(null);
    setDraft({
      ...DEFAULT_SIG,
      label: `Signature ${(list?.length || 0) + 1}`,
      is_default: list.length === 0,
      email: userEmail,
      user_id: userId,
    });
  }

  async function save() {
    if (!draft) return;
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...draft,
        user_id: userId,
        socials: draft.socials || {},
      };
      // Drop generated fields that the DB owns
      delete payload.created_at;
      delete payload.updated_at;
      let saved;
      if (activeId) {
        const { data, error } = await supabase
          .from('brand_signatures')
          .update(payload)
          .eq('id', activeId)
          .select()
          .single();
        if (error) throw error;
        saved = data;
      } else {
        const { data, error } = await supabase
          .from('brand_signatures')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        saved = data;
        setActiveId(saved.id);
      }
      setDraft(saved);
      setToast('Saved');
      await refresh();
    } catch (err) {
      setError(err?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function destroy() {
    if (!activeId) return;
    if (!confirm('Delete this signature?')) return;
    const { error } = await supabase.from('brand_signatures').delete().eq('id', activeId);
    if (error) {
      setError(error.message);
      return;
    }
    setActiveId(null);
    setDraft(null);
    await refresh();
    setToast('Deleted');
  }

  async function setDefault() {
    if (!activeId) return;
    const { error } = await supabase
      .from('brand_signatures')
      .update({ is_default: true })
      .eq('id', activeId);
    if (error) {
      setError(error.message);
      return;
    }
    setToast('Set as default');
    await refresh();
  }

  function selectFromList(id) {
    const found = list.find((s) => s.id === id);
    if (found) {
      setActiveId(id);
      setDraft(found);
    }
  }

  // Live HTML preview
  const html = useMemo(() => (draft ? buildSignatureHtml(draft) : ''), [draft]);

  async function runExport(presetId) {
    if (!draft) return;
    const preset = EXPORT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    try {
      if (preset.action === 'download-htm') {
        const filename = `entevate-signature-${slug(draft.label || 'default')}.htm`;
        downloadFile(wrapAsDocument(html, draft.label || 'ENTEVATE Email Signature'), filename, 'text/html');
        setToast(`Downloaded ${filename}`);
      } else if (preset.action === 'copy-rich') {
        await copyRichHtmlToClipboard(html);
        setToast(`Copied — paste into ${preset.label}`);
      } else if (preset.action === 'copy-source') {
        await copyPlainTextToClipboard(html);
        setToast('HTML source copied');
      } else if (preset.action === 'copy-text') {
        await copyPlainTextToClipboard(buildSignatureText(draft));
        setToast('Plain text copied');
      }
    } catch (err) {
      setError(err?.message || 'Export failed');
    }
  }

  return (
    <div className="bp-sig-shell">
      {/* Header: who, sign out */}
      <div className="bp-sig-header">
        <div className="bp-sig-who">
          Signed in as <strong>{userEmail}</strong>
        </div>
        <button
          type="button"
          className="bp-sig-link-btn"
          onClick={async () => { await supabase.auth.signOut(); }}
        >
          Sign out
        </button>
      </div>

      {/* Saved-list selector + actions */}
      <div className="bp-sig-toolbar">
        <select
          className="bp-sig-select"
          value={activeId ?? ''}
          onChange={(e) => selectFromList(e.target.value)}
          disabled={loading || list.length === 0}
        >
          {list.length === 0 && <option value="">— no signatures yet —</option>}
          {list.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}{s.is_default ? ' (default)' : ''}
            </option>
          ))}
        </select>
        <button type="button" onClick={newSignature} className="bp-sig-btn">+ New</button>
        {activeId && !draft?.is_default && (
          <button type="button" onClick={setDefault} className="bp-sig-btn">Set as default</button>
        )}
        {activeId && (
          <button type="button" onClick={destroy} className="bp-sig-btn bp-sig-btn-danger">Delete</button>
        )}
        <div className="bp-sig-spacer" />
        <button
          type="button"
          onClick={save}
          className="bp-sig-primary-btn"
          disabled={saving || !draft}
        >
          {saving ? 'Saving…' : (activeId ? 'Save changes' : 'Save signature')}
        </button>
      </div>

      {error && <div className="bp-sig-error">{error}</div>}
      {toast && <div className="bp-sig-toast">{toast}</div>}

      {/* Editor + preview side-by-side */}
      <div className="bp-sig-grid">
        <div className="bp-sig-form">
          <FormSection title="Label">
            <Input value={draft?.label || ''} onChange={(v) => setField('label', v)} placeholder="Default" />
          </FormSection>

          <FormSection title="Identity">
            <Input label="Full name" value={draft?.full_name || ''} onChange={(v) => setField('full_name', v)} />
            <Input label="Title" value={draft?.title || ''} onChange={(v) => setField('title', v)} />
            <Input label="Company" value={draft?.company || ''} onChange={(v) => setField('company', v)} />
          </FormSection>

          <FormSection title="Contact">
            <Input label="Email" value={draft?.email || ''} onChange={(v) => setField('email', v)} type="email" />
            <Input label="Phone" value={draft?.phone || ''} onChange={(v) => setField('phone', v)} />
            <Input label="Mobile" value={draft?.mobile || ''} onChange={(v) => setField('mobile', v)} />
            <Input label="Address line 1" value={draft?.address_line1 || ''} onChange={(v) => setField('address_line1', v)} />
            <Input label="Address line 2" value={draft?.address_line2 || ''} onChange={(v) => setField('address_line2', v)} />
            <Input label="Website URL" value={draft?.website || ''} onChange={(v) => setField('website', v)} />
          </FormSection>

          <FormSection title="Media">
            <Input label="Photo URL" value={draft?.photo_url || ''} onChange={(v) => setField('photo_url', v)} placeholder="https://…/your-photo.jpg" />
            <Input label="Logo URL" value={draft?.logo_url || ''} onChange={(v) => setField('logo_url', v)} placeholder="https://entevate.com/images/logo-mark.png" />
            <p className="bp-sig-hint">
              Use absolute https URLs so images load in any inbox. Square photos at ~240×240 work best (we render at 120×120, retina-safe).
            </p>
          </FormSection>

          <FormSection title="Social">
            <Input label="LinkedIn URL" value={draft?.socials?.linkedin || ''} onChange={(v) => setSocial('linkedin', v)} />
            <Input label="Instagram URL" value={draft?.socials?.instagram || ''} onChange={(v) => setSocial('instagram', v)} />
            <Input label="X (Twitter) URL" value={draft?.socials?.x || ''} onChange={(v) => setSocial('x', v)} />
            <Input label="Facebook URL" value={draft?.socials?.facebook || ''} onChange={(v) => setSocial('facebook', v)} />
            <Input label="YouTube URL" value={draft?.socials?.youtube || ''} onChange={(v) => setSocial('youtube', v)} />
          </FormSection>

          <FormSection title="Disclaimer">
            <label className="bp-sig-check">
              <input
                type="checkbox"
                checked={!!draft?.show_disclaimer}
                onChange={(e) => setField('show_disclaimer', e.target.checked)}
              />
              Include confidentiality disclaimer
            </label>
            {draft?.show_disclaimer && (
              <textarea
                value={draft?.disclaimer_text || ''}
                onChange={(e) => setField('disclaimer_text', e.target.value)}
                rows={5}
              />
            )}
          </FormSection>

          <FormSection title="Style">
            <div className="bp-sig-color-row">
              <ColorInput label="Text" value={draft?.text_color} onChange={(v) => setField('text_color', v)} />
              <ColorInput label="Muted" value={draft?.muted_color} onChange={(v) => setField('muted_color', v)} />
              <ColorInput label="Divider" value={draft?.divider_color} onChange={(v) => setField('divider_color', v)} />
            </div>
          </FormSection>
        </div>

        <div className="bp-sig-preview-col">
          <div className="bp-sig-preview-label">Live preview</div>
          <div className="bp-sig-preview" dangerouslySetInnerHTML={{ __html: html }} />

          <div className="bp-sig-preview-label" style={{ marginTop: 28 }}>Export</div>
          <div className="bp-sig-export-grid">
            {EXPORT_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                className="bp-sig-export-btn"
                onClick={() => runExport(p.id)}
                disabled={!draft}
                title={p.hint}
              >
                <span className="bp-sig-export-name">{p.label}</span>
                <span className="bp-sig-export-hint">{p.hint}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── tiny form primitives ──────────────────────────────────────────────

function FormSection({ title, children }) {
  return (
    <div className="bp-sig-section">
      <div className="bp-sig-section-title">{title}</div>
      <div className="bp-sig-section-body">{children}</div>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <label className="bp-sig-field">
      {label && <span className="bp-sig-field-label">{label}</span>}
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function ColorInput({ label, value, onChange }) {
  return (
    <label className="bp-sig-color">
      <span className="bp-sig-field-label">{label}</span>
      <span className="bp-sig-color-row-inner">
        <input
          type="color"
          value={value || '#000000'}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="bp-sig-color-hex"
        />
      </span>
    </label>
  );
}

function slug(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'signature';
}
