import { Router } from 'express'
import { getAllAlerts } from '../controllers/alertsController.js'

const router = Router()

router.get('/', getAllAlerts)

export default router
