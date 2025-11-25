import express from 'express'
import 'dotenv/config'
import { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger/swagger'

import routes from './routes'

const app: Express = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Gym API Documentation'
  })
)

app.use('', routes)

app.listen(PORT, () => {
  console.log(`API running at: http://localhost:${PORT}`)
  console.log(
    `Swagger documentation available at: http://localhost:${PORT}/api-docs`
  )
})
