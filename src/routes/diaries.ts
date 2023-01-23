import express from 'express'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send('Fetching all entry daries')
})

router.post('/', (_req, res) => {
  res.send('Creating a new entry diary')
})

export default router
