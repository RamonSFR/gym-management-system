import cors from 'cors'
import express from 'express'
import { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger/swagger'
import 'dotenv/config'

import routes from './routes'

const app: Express = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

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
