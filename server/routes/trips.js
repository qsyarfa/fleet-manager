import { Router } from 'express'
import { getAllTrips, getTripById } from '../controllers/tripsController.js'

const router = Router()

router.get('/',    getAllTrips)
router.get('/:id', getTripById)

export default router
