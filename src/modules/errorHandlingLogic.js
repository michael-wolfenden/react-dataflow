import { createLogic } from 'redux-logic'

const errorHandlingLogic = createLogic({
  type: '*',
  process({ action }) {
    if (action.error) {
      console.error('An unhandled error has occured', action.payload)
    }
  },
})

export default errorHandlingLogic
