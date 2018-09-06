const request = require('request')

/**
 * Create the slack message configuration
 *
 * @param {Object} options
 */
function createPayload ({channel, username, messageToSend, emoji}) {
  if (!channel || typeof channel !== 'string') {
    console.error('Cannot request without channel')
  }
  return `{"channel": ${JSON.stringify(channel)}, "username": ${JSON.stringify((username) ? username : 'slack-bird')}, "text": ${JSON.stringify(messageToSend)}, "icon_emoji": ${JSON.stringify((emoji) ? emoji : ':bird:')}}`
}

/**
 *
 * @param {*} url
 * @param {*} payload
 * @param {*} headers
 */
function createRequestOptions (url, payload, headers) {
  return {
    url,
    form: payload,
    headers: { 'Content-type': 'application/json' }
  }
}

/**
 * @param {Object} requestOptions
 */
function slackRequest (requestOptions) {
  return new Promise((resolve, reject) => {
    request.post(requestOptions, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res.body)
    })
  })
}

/**
 * @param {Object} optionsToSend
 * @param {String} url
 */
async function slackPostMessage (optionsToSend, url) {
  const payloadGenerated = createPayload(optionsToSend)
  const options = createRequestOptions(url, payloadGenerated)
  const res = await slackRequest(options)
  return res
}

module.exports = slackPostMessage
