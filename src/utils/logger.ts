const info = (...params: any): undefined => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
  return undefined
}

const error = (...params: any): undefined => {
  console.error(...params)
  return undefined
}

export default {
  info,
  error
}
