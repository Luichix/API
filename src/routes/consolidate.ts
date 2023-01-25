import express from 'express'
import dataHours from '../data/hours.json'
import { ConsolidateRecord, TimeRecord } from '../interfaces/types'
import { consolidateHours } from './helpers'
import { recordHours } from '../constants'
// import { consolidateHours } from './helpers/consolidateHours'

const routerConsolidate = express.Router()

routerConsolidate.get('/', (_, res) => {
  // Del registro de horas
  // Mostrar el total de tiempo trabajado en el periodo

  const consolidateRecord = (records: TimeRecord[]): any => {
    const consolidateArray: ConsolidateRecord[] = []

    for (let i = 0; i < records.length; i++) {
      const index = consolidateArray.findIndex(
        (employee) => employee.personalID === records[i].personalID
      )

      if (index >= 0) {
        consolidateArray[index].records.push(records[i])
      } else {
        consolidateArray.push({
          personalID: records[i].personalID,
          period: '',
          records: [records[i]]
        })
      }
    }

    return consolidateArray
  }

  const result = consolidateRecord(dataHours).map(
    (record: ConsolidateRecord) => {
      return {
        ...record,
        period: consolidateHours(record.records)
      }
    }
  )
  recordHours.push(...result)
  res.send(result)
})

export default routerConsolidate
