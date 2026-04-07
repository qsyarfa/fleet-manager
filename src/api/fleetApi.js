import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const fetchVehicles    = ()  => api.get('/vehicles').then(r => r.data)
export const fetchVehicleById = id  => api.get(`/vehicles/${id}`).then(r => r.data)
export const fetchDrivers     = ()  => api.get('/drivers').then(r => r.data)
export const fetchDriverById  = id  => api.get(`/drivers/${id}`).then(r => r.data)
export const fetchTrips       = ()  => api.get('/trips').then(r => r.data)
export const fetchTripById    = id  => api.get(`/trips/${id}`).then(r => r.data)
export const fetchMaintenance = ()  => api.get('/maintenance').then(r => r.data)
export const fetchAlerts      = ()  => api.get('/alerts').then(r => r.data)
export const fetchStats       = ()  => api.get('/stats').then(r => r.data)
