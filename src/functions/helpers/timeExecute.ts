const timeExecute = (fn: any, name: string, ...params: any): string => {
  const start = Date.now()
  const result = fn(...params)
  const end = Date.now()
  console.log(`Time Execute ${name}: ${end - start}ms`)
  return result
}

export default timeExecute
