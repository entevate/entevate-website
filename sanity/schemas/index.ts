import type { SchemaTypeDefinition } from 'sanity'

// Documents
import { post } from './documents/post'
import { caseStudy } from './documents/caseStudy'
import { offering } from './documents/offering'
import { pillar } from './documents/pillar'
import { client } from './documents/client'
import { teamMember } from './documents/teamMember'

// Singletons
import { siteSettings } from './singletons/siteSettings'
import { navigation } from './singletons/navigation'
import { footer } from './singletons/footer'

// Objects (embedded types)
import { richImage } from './objects/richImage'
import { personaCard } from './objects/personaCard'
import { ecosystemComponent } from './objects/ecosystemComponent'
import { statBlock } from './objects/statBlock'
import { ctaBand } from './objects/ctaBand'
import { quoteBlock } from './objects/quoteBlock'
import { statsBand } from './objects/statsBand'
import { cardGrid } from './objects/cardGrid'
import { portableTextSection } from './objects/portableTextSection'

// Names of documents that must exist exactly once ("singletons").
export const SINGLETON_TYPES = ['siteSettings', 'navigation', 'footer']

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  post,
  caseStudy,
  offering,
  pillar,
  client,
  teamMember,

  // Singletons
  siteSettings,
  navigation,
  footer,

  // Objects
  richImage,
  personaCard,
  ecosystemComponent,
  statBlock,
  ctaBand,
  quoteBlock,
  statsBand,
  cardGrid,
  portableTextSection,
]
