import React, { PropTypes } from 'react'

const { func, string, any } = PropTypes

const TopicFilter = ({ className, topics, selected, onChanged }) => {
  const onFilterClick = (id) => {
    if (id === selected) return
    onChanged(id)
  }

  const renderFilter = (id, label) => {
    const selectedClassName = selected === id ? 'selected' : undefined

    return (
      // eslint-disable-next-line jsx-a11y/href-no-hash
      <a
        key={id}
        href="#"
        className={selectedClassName}
        onClick={() => onFilterClick(id)}
      >
        {label}
      </a>
    )
  }

  return (
    <div className={className}>
      {renderFilter('all', 'All')}
      {Object.keys(topics).map(topicId => renderFilter(topicId, topics[topicId].title))}
    </div>
  )
}

TopicFilter.propTypes = {
  className: string,
  topics: any, // eslint-disable-line react/forbid-prop-types
  selected: string,
  onChanged: func,
}

export default TopicFilter

