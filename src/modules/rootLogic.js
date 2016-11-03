import errorHandlingLogic from 'modules/errorHandlingLogic'
import * as topicsLogic from 'modules/topics/logic'
import * as postsLogic from 'modules/posts/logic'

export default [
  errorHandlingLogic,
  ...(Object.values(topicsLogic)),
  ...(Object.values(postsLogic)),
]

