const confirmationEndpoint = 'https://p7t9ebdddb.execute-api.us-east-1.amazonaws.com/test/confirmation-email';
const testEndpoint = 'https://p7t9ebdddb.execute-api.us-east-1.amazonaws.com/test/confirmation-email';

export const sendConfirmations = function(data, callback) {
  console.log('Send emal Confirmation...')
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: data})
  }

  fetch(confirmationEndpoint, options)
    .then(res => res.json())
    .then(res => callback(res))
}

export const test = function(data, callback) {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data: data})
  }

  fetch(confirmationEndpoint, options)
    .then(res => res.json())
    .then(res => callback(res))
}
