const createAction = (type, payloadCreator) => {
  const finalPayloadCreator = typeof payloadCreator === 'function'
    ? payloadCreator
    : x => x

  const actionCreator = (...args) => {
    const hasError = args[0] instanceof Error

    const action = {
      type,
    }

    const payload = hasError ? args[0] : finalPayloadCreator(...args)
    if (!(payload === null || payload === undefined)) {
      action.payload = payload
    }

    if (hasError || payload instanceof Error) {
      // Handle FSA errors where the payload is an Error object. Set error.
      action.error = true
    }

    return action
  }

  actionCreator.toString = () => type.toString()

  return actionCreator
}

export default createAction
