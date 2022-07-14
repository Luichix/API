export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy'
export type Visibility = 'great' | 'poor' | 'good' | 'ok'

export interface DiaryEntry {
  id: string
  date: string
  weather: Weather
  visibility: Visibility
  comments: string
}

export interface HourData {
  id: number
  date: Date
  idPerson: number
  FirstTime: Date
  LastTime: Date
  FirstDuration: Date
  SecondDuration: Date
}

export interface DataTimePlus {
  duration: string
}

/**
    "ID_HOUR": 1,
    "DateDay": "2022-04-01T06:00:00.000Z",
    "FK_PERSONAL": 1,
    "FirstTime": "2022-04-01T21:00:00",
    "LastTime": "2022-04-02T05:00:00",
    "FirstDuration": "21:00:00",
    "SecondDuration": "29:00:00"
 */
