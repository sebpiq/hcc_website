// main.js
var React = require('react')
  , ReactDOM = require('react-dom')
  , $ = require('jquery')
  , page = require('page')
  , groupsViews = require('./groups/views')
  , usersViews = require('./users/views')


// Routing
page.base('/pages')

page.redirect('/', '/dashboard')

page('/dashboard', function() {
  console.log('dashboard')
})

page('/groups', function() {
  ReactDOM.render(
    <groupsViews.GroupList url="/api/groups" />,
    document.getElementById('content')
  )
})

page('/signUp', function() {
  ReactDOM.render(
    <usersViews.UserRegister />,
    document.getElementById('content')
  )
})

// Default route (404)
page('*', function() {
  console.log('not found')
})

page.start()