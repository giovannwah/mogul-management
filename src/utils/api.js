const confirmationEndpoint = 'https://p7t9ebdddb.execute-api.us-east-1.amazonaws.com/test/confirmation-email';
const testEndpoint = 'https://p7t9ebdddb.execute-api.us-east-1.amazonaws.com/test/confirmation-email';

export const sendConfirmations = function(email_address, data, callback) {
  console.log('Send emal Confirmation...')
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ customer_data: data, email: email_address } )
  }

  fetch(confirmationEndpoint, options)
    .then(res => res.json())
    .then(res => callback(res))
}

export const test = function(data, callback) {
  console.log('Test amazon function...')
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ test_data: data } )
  }

  fetch(confirmationEndpoint, options)
    .then(res => res.json())
    .then(res => callback(res))
}
