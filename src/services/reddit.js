import { get } from 'utilities/lodash2015'
import axios from 'axios'

const REDDIT_ENDPOINT = 'https://www.reddit.com'

async function getDefaultSubreddits() {
  const response = await axios.get(`${REDDIT_ENDPOINT}/subreddits/default.json`)
  console.log('getDefaultSubreddits', response)

  const children = get(response, 'data.data.children')

  if (!response) {
    throw new Error('RedditService getPostsFromSubreddit failed, children not returned')
  }

  const sortedBySubscribers = children.sort((subredditA, subredditB) =>
    get(subredditB, 'data.subscribers', 0) - get(subredditA, 'data.subscribers', 0)
  )

  return sortedBySubscribers.map(({ data }) => ({
    title: data.display_name,
    description: data.public_description,
    url: data.url,
  }))
}

async function getPostsFromSubreddit(subredditUrl) {
  const response = await axios.get(`${REDDIT_ENDPOINT}${subredditUrl}hot.json`)
  console.log('getPostsFromSubreddit', response)

  const children = get(response, 'data.data.children')

  if (!response) {
    throw new Error('RedditService getPostsFromSubreddit failed, children not returned')
  }

  return children.map(({ data }) => ({
    id: data.id,
    title: data.title,
    topicUrl: subredditUrl,
    body: data.selftext,
    thumbnail: data.thumbnail && data.thumbnail.startsWith('http') ? data.thumbnail : null,
    url: data.url,
  }))
}

export default {
  getDefaultSubreddits,
  getPostsFromSubreddit,
}
