(function () {
  'use strict'

  if (!window.addEventListener) return // Check for IE9+

  var options = INSTALL_OPTIONS
  var element

  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  function updateElement () {
    element = INSTALL.createElement(options.location, element)

    // Set the app attribute to your app's dash-delimited alias.
    element.setAttribute('app', 'slack-thank-you')
    const button = document.createElement('button')
    element.appendChild(button)
    console.log(options)
    button.addEventListener('click', (e) => {
      fetch('https://us-central1-slack-cf.cloudfunctions.net/slackPostWebhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          endpoint: options.endpoint,
          hostname: window.location.hostname
        })
      })
      .then(() => {
        element.removeChild(button)
        element.innerHTML = '<h4>Thank you! The team has been alerted of your thanks :)</h4>'
      })
      .catch(() => {
        element.removeChild(button)
        element.innerHTML = '<h4>There was a problem thanking the team. Please try again later</h4>'
      })
    })
  }

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptions: function setOptions (nextOptions) {
      options = nextOptions

      updateElement()
    }
  }

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateElement)
  } else {
    updateElement()
  }
}())
