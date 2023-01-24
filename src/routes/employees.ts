import express from 'express'
import dataEmployees from '../data/employees.json'

const routerEmployees = express.Router()

// get all employees information
routerEmployees.get('/', (_, res) => {
  res.json(dataEmployees)
})

// create new employee
routerEmployees.post('/', (req, res) => {
  const newEmployee = req.body
  dataEmployees.push(newEmployee)
  res.json(dataEmployees)
})

// update all employee information
routerEmployees.put('/:id', (req, res) => {
  const updatedEmployee = req.body
  const id = req.params.id

  const index = dataEmployees.findIndex(
    (employee) => employee.personalID === id
  )

  if (index >= 0) {
    dataEmployees[index] = updatedEmployee
  }
  res.json(dataEmployees)
})

// update employee information
routerEmployees.patch('/:id', (req, res) => {
  const newInfo = req.body
  const id = req.params.id

  const index = dataEmployees.findIndex(
    (employee) => employee.personalID === id
  )

  if (index >= 0) {
    const employeeToUpdate = dataEmployees[index]
    Object.assign(employeeToUpdate, newInfo)
  }
  res.json(dataEmployees)
})

// delete employee
routerEmployees.delete('/:id', (req, res) => {
  const id = req.params.id
  const indice = dataEmployees.findIndex(
    (employee) => employee.personalID === id
  )

  if (indice >= 0) {
    dataEmployees.splice(indice, 1)
  }
  res.json(dataEmployees)
})

export default routerEmployees
