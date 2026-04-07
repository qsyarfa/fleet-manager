import { Router } from 'express'
import { getAllMaintenance } from '../controllers/maintenanceController.js'

const router = Router()

router.get('/', getAllMaintenance)

export default router
