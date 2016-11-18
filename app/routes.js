
let isLoggedIn = require('./middlewares/isLoggedIn')


module.exports = (app) => {

  let passport = app.passport

  app.get('/', (req, res) => res.render('index.ejs'))

  /*
  app.post('/', (req, res) => {
    let username = req.body.username
    req.session.username = username
    res.redirect('/chat')
  })
  */

  app.post('/', passport.authenticate('local-auto-signup', {
    successRedirect: '/chat',
    failureRedirect: '/' }
  ))


  app.get('/chat', (req, res) => {
    console.log(req.session)
    let username = req.session.username
    let state = JSON.stringify({username})
    res.render('chat.ejs', {username, state})
  })

}

