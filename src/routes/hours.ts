import express from 'express'
import dataHours from '../data/hours.json'
import insertDurations from '../functions/insertDurations'
import sumDurations from '../functions/sumDurations'
import { TimeRecord } from '../interfaces/types'

const routerHours = express.Router()

// get all time record
routerHours.get('/', (_, res) => {
  res.send(dataHours)
})

// get only time record by employee
routerHours.get('/:id', (req, res) => {
  const id = req.params.id
  const resultados = dataHours.filter((employee) => employee.personalID === id)

  if (resultados.length === 0) {
    return res.status(404).send(`No se encontro el colaborador #${id}.`)
  }

  return res.json(resultados)
})

// create new employee time record
routerHours.post('/', (req, res) => {
  const timeRecord = req.body

  const hours = insertDurations(timeRecord.hours)
  const totalHours = sumDurations(hours)

  const newTimeRecord: TimeRecord = {
    ...timeRecord,
    hours: hours,
    totalHours: totalHours
  }

  dataHours.push(newTimeRecord)
  res.json(dataHours)
})

// update all employee time record information
routerHours.put('/:id', (req, res) => {
  const updatedEmployeeTimeRecord = req.body
  const id = req.params.id

  const index = dataHours.findIndex((employee) => employee.hoursID === id)

  if (index >= 0) {
    dataHours[index] = updatedEmployeeTimeRecord
  }
  res.json(dataHours)
})

// update employee time record information
routerHours.patch('/:id', (req, res) => {
  const newInfo = req.body
  const id = req.params.id

  const index = dataHours.findIndex((employee) => employee.hoursID === id)

  if (index >= 0) {
    const employeeToUpdate = dataHours[index]
    Object.assign(employeeToUpdate, newInfo)
  }
  res.json(dataHours)
})

// Delete employee time record
routerHours.delete('/:id', (req, res) => {
  const id = req.params.id
  const indice = dataHours.findIndex((employee) => employee.hoursID === id)

  if (indice >= 0) {
    dataHours.splice(indice, 1)
  }
  res.json(dataHours)
})

export default routerHours
