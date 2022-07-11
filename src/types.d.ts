export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy'
export type Visibility = 'great' | 'poor' | 'good' | 'ok'

export interface DiaryEntry {
  id: string
  date: string
  weather: Weather
  visibility: Visibility
  comments: string
}
