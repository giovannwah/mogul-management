const confirmationEndpoint = 'https://p7t9ebdddb.execute-api.us-east-1.amazonaws.com/test/confirmation-email';
const testEndpoint = 'https://p7t9ebdddb.execute-api.us-east-1.amazonaws.com/test/confirmation-email';

export const submitUserData = (data, callback) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  };

  fetch(confirmationEndpoint, options)
    .then(res => res.json())
    .then(res => {
      if (callback) callback(res);
    });
};

export const test = (data, callback) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  };

  fetch(testEndpoint, options)
    .then(res => res.json())
    .then(res => {
      if (callback) callback(res);
    });
};
