export const get = (obj, path, fallback) => {
  if (!obj) return undefined
  if (!path) return undefined

  let currentPathValue = obj

  const fullPath = path
    .split('.')
    .filter(x => !!x)

  const isDefined = subPath =>
    !(subPath && (currentPathValue = currentPathValue[subPath]) === undefined)

  return fullPath.every(isDefined)
    ? currentPathValue
    : fallback
}

export const keyBy = (array, propertyAccessor) => {
  const keyedObj = {}

  const getProperty = typeof propertyAccessor === 'string'
    ? obj => get(obj, propertyAccessor)
    : obj => propertyAccessor(obj)

  for (const arrayItem of array) {
    const key = getProperty(arrayItem)
    keyedObj[key] = arrayItem
  }

  return keyedObj
}

export const keys = (obj) => {
  if (obj === undefined) return []
  return Object.keys(obj)
}

export const pick = (obj, ...props) =>
  Object.assign({}, ...props.map(prop => ({ [prop]: obj[prop] })))

export const flatten = list => list.reduce(
    (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)
