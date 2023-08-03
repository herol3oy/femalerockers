import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import schemas from './sanity/schemas'

const config = defineConfig({
  projectId: 'ldn05m4o',
  dataset: 'production',
  title: 'FemaleRockers',
  apiVersion: '2023-07-31',
  basePath: '/dashboard',
  plugins: [deskTool()],
  schema: { types: schemas },
})

export default config
