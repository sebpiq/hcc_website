var path = require('path')

var templatesDir = path.resolve(__dirname, '..', '..', 'client', 'templates')

// For all pages under the given route, return the same HTML page,
// so we let the frontend do the routing (single-page web app power).
module.exports = function(app) {
  app.route(/^\/pages(\/|(\/\w+))?$/).get(function(req, res) {
    res.sendFile(path.join(templatesDir, 'index.html'))
  })

  // !!! Temporary home page
  app.route(/^\/home$/).get(function(req, res) {
    res.sendFile(path.join(templatesDir, 'home.html'))
  })

  app.route(/^\/?$/).get(function(req, res) {
    res.sendFile(path.join(templatesDir, 'home.html'))
  })
}