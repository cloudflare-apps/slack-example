const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const simpleFetch = require("simple-fetch")
const cors = require("cors")
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())


app.post('/', (req, res) => {
  const {url} = req.body.authentications.account.token.extra.incoming_webhook

  req.body.install.options.url = url
  res.send({install: req.body.install, proceed: true})
})

app.post('/button', (req, res) => {
  const {url, webpage} = req.body

  simpleFetch.postJson(url, {
    text: `A big thank you from a visitor at ${webpage}`
  })
  .then((thing) => {
    console.log(thing)
    res.status(200).send(true)
  })
  .catch((thing) => {
    console.log(thing)
    res.status(401).send(false)
  })
})

app.listen(PORT, function() {
  console.log("running on port " + PORT)
})


// const install = {};
// // on slash
// axios.get('https://slack.com/api/channels.list', { 
//   headers: {'Authorization': 'Bearer xoxp-284445482019-285388965702-292540149351-27334ef34e23e9bf2198a3f6e25db2d5'}
// })
// .then(res => {
//   const {channels} = res.data;
//   // set up enum selector that shows channel name and value is it's ID
//   install.channels = channels;
//   // send channels for selecting
//   // on channel change. should be own api post method
//   axios.get(`https://slack.com/api/channels.history?channel=${channels[0].id}`, { 
//     headers: {'Authorization': 'Bearer xoxp-284445482019-285388965702-292540149351-27334ef34e23e9bf2198a3f6e25db2d5'}
//   })
//     .then(res => {
//       const {messages} = res.data;
//       install.messages = messages;
//       messages.forEach(message => {
//         axios.get(`https://slack.com/api/users.info?user=${message.user}`, { 
//           headers: {'Authorization': 'Bearer xoxp-284445482019-285388965702-292540149351-27334ef34e23e9bf2198a3f6e25db2d5'}
//         })
//         .then(res => {
//           message.name = res.data.user.name
//           message.icon = res.data.user.profile.image_24
//           console.log(install)
//         })
//       })
//       //send install at some point at end
//     })
// })

// options.channels = {
//   "default": "option-a",
//   "title": "Enum Example",
//   "type": "string",
//   "enum": [
//     "option-a",
//     "option-b"
//   ],
//   "enumNames": {
//     "option-a": "Option A",
//     "option-b": "Option B"
//   }
// }

// app.post('/', function(request, response) {
//   const token = request.body.authentications.account.token.token
//   // const token = 'xoxp-284445482019-285388965702-292540149351-27334ef34e23e9bf2198a3f6e25db2d5'
//   console.log(JSON.stringify(request.body))

//   simpleFetch.getJson("https://slack.com/api/channels.list", {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   })
//   .then(function(channels) {
//       const install = request.body.install
//       const enumNames = {}
//       channels.channels.forEach(channel => {
//         enumNames[channel.id] = channel.name
//       })
//       install.schema.properties.channel = {
//         title: "Channel",
//         order: 2,
//         type: "string",
//         enum: Object.keys(enumNames),
//         enumNames
//       }
//       const promises = []
//       simpleFetch.getJson(`https://slack.com/api/channels.history?channel=${channels.channels[0].id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then(res => {
//         const {messages} = res;
//         messages.forEach(message => {
//           const promise = simpleFetch.getJson(`https://slack.com/api/users.info?user=${message.user}`, { 
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           })
//           .then(resp => {
//             message.name = resp.user.name
//             message.icon = resp.user.profile.image_24
//           })
//         promises.push(promise)
//         })
//         Promise.all(promises)
//           .catch(err => {
//             console.log("Promise error", err)
//           })
//           .then(() => {
//             install.options.messages = messages;
//             response.json({install: request.body.install, proceed: true})
//           })
//       })
//     })
// })

// app.post('/channels', function(request, response) {
//   const token = 'xoxp-284445482019-285388965702-292540149351-27334ef34e23e9bf2198a3f6e25db2d5'
//   const {channel} = request.body.install.options
//   console.log(channel)

//   const promises = []
//   simpleFetch.getJson(`https://slack.com/api/channels.history?channel=${channel}`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   })
//   .then(res => {
//     const {messages} = res;
//     messages.forEach(message => {
//       const promise = simpleFetch.getJson(`https://slack.com/api/users.info?user=${message.user}`, { 
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then(res => {
//         message.name = res.user.name
//         message.icon = res.user.profile.image_24
//       })
//     promises.push(promise)
//     })
//     Promise.all(promises)
//       .catch(err => {
//         console.log("Promise error", err)
//       })
//       .then(() => {
//         install.options.messages = messages;
//         response.json({install: request.body.install, proceed: true})
//       })
//   })
// })

