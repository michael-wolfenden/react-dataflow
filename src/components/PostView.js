import React, { Component, PropTypes } from 'react'

const { shape, string } = PropTypes

export default class PostView extends Component {
  static propTypes = {
    post: shape({
      url: string,
      body: string,
    }),
  }

  static isImage(url) {
    if (!url) return false
    return (url.endsWith('.jpg') || url.endsWith('.gif') || url.endsWith('.png'))
  }

  static renderEmpty() {
    return (
      <div>
        <h3>Select a post to view</h3>
      </div>
    )
  }

  renderBody() {
    return (
      <div>
        {this.props.post.body}
      </div>
    )
  }
  renderImage() {
    return (
      <img src={this.props.post.url} alt={this.props.post.title} />
    )
  }

  renderUrl() {
    return (
      <div>
        <h3>External Link</h3>
        <a href={this.props.post.url} rel="noopener noreferrer" target="_blank">Open</a>
      </div>
    )
  }

  render() {
    const { post } = this.props

    if (!post) return PostView.renderEmpty()
    if (post.body) return this.renderBody()
    else if (PostView.isImage(post.url)) return this.renderImage()

    return this.renderUrl()
  }
}
