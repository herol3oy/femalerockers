import { type SchemaTypeDefinition } from 'sanity'

import { bio } from './schemas/bio-schemas'
import { interview } from './schemas/interview-schemas'
import { page } from './schemas/page-schemas'
import { review } from './schemas/review-schemas'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [interview, bio, page, review],
}
