import { Router } from 'express'

import employeeRoutes from './employeeRoutes'
import membersRoutes from './membersRoutes'
import workoutRoutes from './workoutsRoutes'

const routes = Router()

routes.use(employeeRoutes)
routes.use(membersRoutes)
routes.use(workoutRoutes)

export default routes
