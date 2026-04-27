# Prompt for ENTEVATE Growth Engine Claude Session

Copy the block between the `---` markers below into a new Claude session working on the ENTEVATE Growth Engine project (separate repo with dashboard, content calendar, framework/content builder).

---

# ENTEVATE Terminology Update: Content Readiness → Operational Intelligence Assessment

You are working on the ENTEVATE Growth Engine, a separate internal tool with a
dashboard, content calendar, and framework/content builder. The main ENTEVATE
marketing website has just renamed and broadened one of its core offerings, and
the Growth Engine needs to be updated to reflect the new terminology and
expanded scope.

## The Change

The offering formerly known as "Content Readiness™" or "Content Readiness
Assessment" has been renamed to the "Operational Intelligence Assessment"
(short form: "OI Assessment"). It is no longer trademarked. The new name is
used exactly as shown, with no ™ mark.

The URL on the main site has moved:
- OLD: https://www.entevate.com/operational-intelligence/content-readiness
- NEW: https://www.entevate.com/operational-intelligence/assessment

Legacy URLs 301 redirect to the new path; keep this in mind when updating
links, but prefer the new URL in all new copy.

## The Expanded Scope

This is not just a rename. The assessment now measures much more than content.
"Operational Intelligence" covers the full operational readiness of an
organization across three pillars (People, Platform, Process), and
specifically evaluates:

1. AI systems readiness and governance (model selection, infrastructure,
   human-in-the-loop, policy)
2. Automation maturity (which workflows are automated, automation coverage,
   orchestration, exception handling)
3. Process optimization and intelligence (documented workflows, measurement,
   feedback loops, continuous improvement)
4. Content pipelines and systems (DAM, CMS, LMS, tagging, governance). Still
   part of scope but one component among many, not the whole story.
5. Visual and asset production at scale (CAD-to-CGI, 3D, XR, photoreal
   pipelines)
6. Digital transformation strategy and execution (change management,
   learning and development, tool adoption, governance)
7. Cross-functional alignment and data-driven decision making (roles,
   decision rights, shared definitions, leadership alignment)

The three pillars (People, Platform, Process) stay the same, but what each
pillar measures is now broader than content:

- **People**: Skills, alignment, decision rights, AI fluency
- **Platform**: AI, data, content, and automation infrastructure
- **Process**: Automation, governance, measurement, feedback loops

The four stages of the scored output have new names:
- Stage 1: Not Operationally Ready
- Stage 2: Emerging
- Stage 3: Developing
- Stage 4: OI Leader

## What the Growth Engine Needs to Update

### 1. Dashboard

- Any widget, label, KPI, or chart that references "Content Readiness",
  "Content Readiness Score", or "Content Readiness Stage" should be renamed
  to "Operational Intelligence", "OI Score", "OI Stage", or "OI Assessment"
  as appropriate.
- If a score-tracking widget pulls from HubSpot, note that two NEW HubSpot
  contact properties are the source of truth:
    - `oi_assessment_score` (string like "72%")
    - `oi_assessment_stage` (string like "Stage 2: Emerging")
  The legacy properties `content_readiness_score` and
  `content_readiness_stage` still exist in HubSpot for historical contacts
  but will not receive new writes.
- Supporting per-pillar properties `people_score`, `platform_score`,
  `process_score` are unchanged.
- If your dashboard shows a distribution of leads by stage, update the stage
  labels to the new names (Not Operationally Ready, Emerging, Developing,
  OI Leader).

### 2. Content Calendar

- Rename any "Content Readiness" campaigns, posts, or tags to
  "Operational Intelligence Assessment" or "OI Assessment".
- Any posts in the pipeline that describe the offering as a purely
  content-focused diagnostic should be rewritten to reflect the broader
  scope (AI, automation, process, content, visual production,
  transformation, cross-functional alignment).
- Add "OI Assessment" as a new campaign category or tag if you have a tagging
  system.

### 3. Framework and Content Builder

- Where the builder has preset templates, outlines, or content blocks
  referencing Content Readiness:
    - Rename "Content Readiness" to "Operational Intelligence Assessment"
    - Drop the ™ symbol (this name is not trademarked)
    - Expand any scope descriptions beyond content to include AI systems,
      automation, process optimization, content, visual production, and
      cross-functional alignment
- The three pillars (People, Platform, Process) remain, but their
  descriptions should be broadened per the list above.
- If any template has sample assessment questions, the full new question
  set on the live site is a good reference. Ask the user to share the
  final copy if needed.

### 4. Any internal documentation, tooltips, help text, or in-app copy

- Global find/replace "Content Readiness™" to "Operational Intelligence
  Assessment"
- Global find/replace "Content Readiness" to "Operational Intelligence
  Assessment" (verify each hit; some may want "OI Assessment" short form)
- Update any URL references from
  `/operational-intelligence/content-readiness` to
  `/operational-intelligence/assessment`

## Style Constraints for New Copy

- Do not use em dashes. Use commas, colons, or periods instead.
- Do not use emojis.
- The founder is Jake Hamann (not Mike Binko). Update any stale references.
  Mike Binko is Managing Director of the Innovation | Ventures | Ecosystem
  pillar only, not the whole company.
- Do not trademark "Operational Intelligence" or "Operational Intelligence
  Assessment". Keep ™ only on the existing trademarked assets (AI Foundry™,
  Momentify™, ROX™, Innovation Roadmapping™, 7 Core Elements™, AIQUI™,
  Innovation Sandbox™, Angel Academy™, Raise Your Game™).

## Legacy Handling

Where the Growth Engine surfaces historical data tagged with the old name
(e.g. a contact from 2024 with a `content_readiness_score` value), keep the
historical value visible. Only new writes and forward-looking copy need to
use the new terminology.

## Deliverables

Work through the codebase systematically. Please:

1. Inventory every reference to "Content Readiness" (case-insensitive),
   `content_readiness`, `content-readiness`.
2. Propose a change list with file paths and old-string/new-string pairs.
3. Confirm the list with me before executing.
4. Apply the changes, then verify by running the build and visually
   checking the dashboard, calendar, and builder flows.

Do not proceed with implementation until the inventory and change list are
confirmed.

---
