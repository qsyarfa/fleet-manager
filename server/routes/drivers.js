import { Router } from 'express'
import { getAllDrivers, getDriverById } from '../controllers/driversController.js'

const router = Router()

router.get('/',    getAllDrivers)
router.get('/:id', getDriverById)

export default router
