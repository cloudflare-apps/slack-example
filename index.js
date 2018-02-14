const simpleFetch = require('simple-fetch')

function handlePost (req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
  const {endpoint, hostname} = req.body

  simpleFetch.postJson(endpoint, {
    text: `A big thank you from a visitor at ${hostname}`
  })
 .then(() => {
   res.status(200).send(true)
 })
 .catch(() => {
   res.status(401).send(false)
 })
}

function handleOptions (req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
  res.send(200)
}

exports.slackExtractWebhook = (req, res) => {
  const {install} = req.body
  const {url} = req.body.authentications.account.token.extra.incoming_webhook

  install.options.endpoint = url
  res.send({install, proceed: true})
}

exports.slackPostWebhook = (req, res) => {
  switch (req.method) {
    case 'OPTIONS':
      handleOptions(req, res)
      break
    case 'POST':
      handlePost(req, res)
      break
    default:
      res.send('Please use a POST request')
      break
  }
}
