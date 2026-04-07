import { Router } from 'express'
import { getAllVehicles, getVehicleById } from '../controllers/vehiclesController.js'

const router = Router()

router.get('/',    getAllVehicles)
router.get('/:id', getVehicleById)

export default router
