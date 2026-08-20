/**
 * Centralized GROQ queries.
 * Each exported constant is a GROQ string ready to pass to sanityClient.fetch().
 * Field shapes are kept broad here; Astro pages narrow them at usage sites.
 */

/** ============ Site-wide singletons ============ */

export const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings"][0] {
    orgName, tagline, founder, foundingDate,
    addressStreet, addressCity, addressRegion, addressPostal, addressCountry,
    contactEmail, contactPhone,
    defaultOgImage,
    social,
    knowsAbout,
    brandBoilerplate
  }
`

export const navigationQuery = /* groq */ `
  *[_type == "navigation"][0] {
    primaryLinks[] {
      label, href, external, hasDropdown,
      dropdownItems[] {
        label, href,
        "pillarSlug": pillar->slug.current,
        "pillarColor": pillar->primaryColor
      }
    },
    ctaLabel, ctaHref
  }
`

export const footerQuery = /* groq */ `
  *[_type == "footer"][0] {
    columns[] {
      heading,
      links[] { label, href, external }
    },
    newsletterHeading, newsletterDescription, newsletterButtonLabel,
    bottomBarCopy,
    legalLinks[] { label, href }
  }
`

/** ============ Pillars ============ */

export const allPillarsQuery = /* groq */ `
  *[_type == "pillar"] | order(order asc) {
    _id, name,
    "slug": slug.current,
    tagline, homepageCardDescription,
    primaryColor, accentColor, iconSvg, backgroundTexture, ogImage, order
  }
`

export const pillarBySlugQuery = /* groq */ `
  *[_type == "pillar" && slug.current == $slug][0] {
    _id, name,
    "slug": slug.current,
    tagline, homepageCardDescription,
    primaryColor, accentColor, iconSvg, backgroundTexture, ogImage
  }
`

/** ============ Posts / Insights ============ */

export const allPostsQuery = /* groq */ `
  *[_type == "post"] | order(publishDate desc) {
    _id, title,
    "slug": slug.current,
    excerpt, publishDate, tags,
    "pillarSlug": pillar->slug.current,
    "pillarName": pillar->name,
    "pillarColor": pillar->primaryColor,
    heroImage {
      alt, caption, aspectRatio,
      asset->{
        _id, url,
        metadata { dimensions, lqip }
      }
    }
  }
`

export const postBySlugQuery = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    _id, title,
    "slug": slug.current,
    excerpt, publishDate, tags,
    seoTitle, seoDescription,
    "pillarSlug": pillar->slug.current,
    "pillarName": pillar->name,
    "pillarColor": pillar->primaryColor,
    heroImage {
      alt, caption, aspectRatio,
      asset->{
        _id, url,
        metadata { dimensions, lqip }
      }
    },
    body[] {
      ...,
      _type == "richImage" => {
        alt, caption, aspectRatio,
        asset->{
          _id, url,
          metadata { dimensions, lqip }
        }
      }
    },
    relatedPosts[]-> {
      _id, title,
      "slug": slug.current,
      excerpt,
      "pillarSlug": pillar->slug.current
    }
  }
`

export const postSlugsQuery = /* groq */ `
  *[_type == "post" && defined(slug.current)][].slug.current
`

/** ============ Case Studies ============ */

export const allCaseStudiesQuery = /* groq */ `
  *[_type == "caseStudy"] | order(publishDate desc) {
    _id, title,
    "slug": slug.current,
    eyebrow, industry, summary, outcomes, isFeatured,
    "clientName": client->name,
    "clientLogo": client->logo,
    "pillarSlug": pillar->slug.current,
    "pillarColor": pillar->primaryColor,
    heroImage {
      alt,
      asset->{ _id, url, metadata { dimensions, lqip } }
    }
  }
`

export const featuredCaseStudiesQuery = /* groq */ `
  *[_type == "caseStudy" && isFeatured == true] | order(publishDate desc) {
    _id, title,
    "slug": slug.current,
    summary, outcomes,
    "clientName": client->name,
    "pillarSlug": pillar->slug.current,
    heroImage {
      alt,
      asset->{ _id, url }
    }
  }
`

export const caseStudyBySlugQuery = /* groq */ `
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id, title,
    "slug": slug.current,
    eyebrow, industry, summary, outcomes,
    "clientName": client->name,
    "clientLogo": client->logo,
    "pillarSlug": pillar->slug.current,
    "pillarName": pillar->name,
    "pillarColor": pillar->primaryColor,
    heroImage {
      alt, caption, aspectRatio,
      asset->{ _id, url, metadata { dimensions, lqip } }
    },
    challenge, approach, pullQuote,
    "relatedOffering": relatedOffering-> {
      title,
      "slug": slug.current,
      "pillarSlug": pillar->slug.current
    },
    publishDate
  }
`

/** ============ Offerings ============ */

export const allOfferingsQuery = /* groq */ `
  *[_type == "offering"] | order(order asc) {
    _id, title, trademarkSuffix, shortName,
    "slug": slug.current,
    "pillarSlug": pillar->slug.current,
    "pillarName": pillar->name,
    "pillarColor": pillar->primaryColor,
    cardSubtitle, cardDescription, cardCtaLabel,
    iconSvg, colorVariant, order,
    "onePagerUrl": onePagerPdf.asset->url
  }
`

export const offeringsByPillarQuery = /* groq */ `
  *[_type == "offering" && pillar->slug.current == $pillarSlug] | order(order asc) {
    _id, title, trademarkSuffix, shortName,
    "slug": slug.current,
    cardSubtitle, cardDescription, cardCtaLabel,
    iconSvg, colorVariant, order
  }
`

export const offeringBySlugQuery = /* groq */ `
  *[_type == "offering" && slug.current == $slug && pillar->slug.current == $pillarSlug][0] {
    _id, title, trademarkSuffix, shortName,
    "slug": slug.current,
    "pillarSlug": pillar->slug.current,
    "pillarName": pillar->name,
    "pillarColor": pillar->primaryColor,
    "pillarAccent": pillar->accentColor,
    "pillarBackground": pillar->backgroundTexture,
    seoTitle, seoDescription,
    heroEyebrow, heroHeadline, heroAccentText, heroSubhead,
    heroPrimaryCta, heroSecondaryCta,
    sections[] {
      ...,
      _type == "cardGrid" => {
        eyebrow, headline, subhead, columns,
        cards[] { ... }
      },
      _type == "statsBand" => {
        eyebrow, headline, subhead,
        stats[] { ... }
      }
    },
    "onePagerUrl": onePagerPdf.asset->url
  }
`

export const offeringSlugsQuery = /* groq */ `
  *[_type == "offering" && defined(slug.current)] {
    "slug": slug.current,
    "pillarSlug": pillar->slug.current
  }
`

/** ============ Clients ============ */

export const featuredClientsQuery = /* groq */ `
  *[_type == "client" && isFeatured == true] | order(order asc) {
    _id, name,
    "slug": slug.current,
    logo,
    logoAltText, url, industry
  }
`

export const allClientsQuery = /* groq */ `
  *[_type == "client"] | order(order asc) {
    _id, name,
    "slug": slug.current,
    logo,
    logoAltText, url, industry, isFeatured, order
  }
`

/** ============ Team ============ */

export const allTeamMembersQuery = /* groq */ `
  *[_type == "teamMember"] | order(order asc) {
    _id, name,
    "slug": slug.current,
    role, headshot, shortBio, linkedIn, email, isLeadership, order,
    "pillarSlug": pillar->slug.current,
    "pillarColor": pillar->primaryColor
  }
`

export const leadershipQuery = /* groq */ `
  *[_type == "teamMember" && isLeadership == true] | order(order asc) {
    _id, name,
    "slug": slug.current,
    role, headshot, shortBio, linkedIn, email
  }
`
