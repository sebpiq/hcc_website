// main.js
var React = require('react')
  , ReactDOM = require('react-dom')
  , $ = require('jquery')
  , page = require('page')
  , groupViews = require('./groups/views')

// Routing
page.base('/pages')

page.redirect('/', '/dashboard')

page('/dashboard', function() {
  console.log('dashboard')
})

page('/groups', function() {
  ReactDOM.render(
    <groupViews.GroupList url="/api/groups" />,
    document.getElementById('content')
  )
})

// Default route (404)
page('*', function() {
  console.log('not found')
})

page.start()