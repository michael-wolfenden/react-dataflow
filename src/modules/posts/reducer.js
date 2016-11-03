import { keys, get } from 'utilities/lodash2015'
import createAction from 'utilities/createAction'

export const key = 'posts'

// actions
export const POSTS_FETCH = `${key}/POSTS_FETCH`
export const POSTS_FETCH_FULFILLED = `${key}/POSTS_FETCH_FULFILLED`
export const POSTS_FETCH_REJECTED = `${key}/POSTS_FETCH_REJECTED`
export const FILTER_CHANGED = `${key}/FILTER_CHANGED`
export const POST_SELECTED = `${key}/POST_SELECTED`

// action creators
export const postsFetch = createAction(POSTS_FETCH)
export const changeFilter = createAction(FILTER_CHANGED)
export const selectPost = createAction(POST_SELECTED)

// reducer
const initialState = {
  postsById: undefined,
  currentFilter: 'all',
  currentPostId: undefined,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_FETCH_FULFILLED:
      return {
        ...state,
        postsById: action.payload,
      }
    case FILTER_CHANGED:
      return {
        ...state,
        currentFilter: action.payload,
      }
    case POST_SELECTED:
      return {
        ...state,
        currentPostId: action.payload,
      }
    default:
      return state
  }
}

export default reducer

// selectors
export const getPosts = (state) => {
  const postsState = state[key]

  const currentFilter = postsState.currentFilter
  const postsById = postsState.postsById

  const postsIdArray = currentFilter === 'all' ?
    keys(postsById) :
    keys(postsById).filter(postId => postsById[postId].topicUrl === currentFilter)

  return [postsById, postsIdArray]
}

export const getCurrentFilter = state =>
  state[key].currentFilter

export const getCurrentPost = (state) => {
  const postsState = state[key]
  return get(postsState.postsById, postsState.currentPostId)
}
