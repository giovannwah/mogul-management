const aws = require('aws-sdk');
const ses = new aws.SES({region: 'us-east-1'});

const sourceEmailAddress = 'noreply@mogulmanagement.net'
// TODO: consider using Email templates: https://docs.aws.amazon.com/ses/latest/APIReference/API_SendTemplatedEmail.html
const renderTemplate = (data, name, phone, email) => {
  let userData = '';
  data.map(info => userData += `<div><span><b>${info.label}:</b> ${info.value}</span></div>`);
  const greeting = `<div><p>Hello ${name},</p></div>`;
  const body = `<div>Thank you for choosing KMM Enterprise for your financial needs! Here is a summary of the information we've received:</div><br /><div>${ userData }</div>`;
  const conclusion = `<div>You will be contacted by someone from our team very soon. We look forward to doing business with you!</div><br /><div><div><b>KMM Enterprise</b></div><div>${phone}</div><div>${email}</div></div>`

  return `<div>${ greeting }<br />${ body }<br />${ conclusion }</div>`
}

exports.handler = (event, context, callback) => {
  console.log("request: " + JSON.stringify(event));
  if (event.data) {
    try {
      const data = JSON.parse(JSON.stringify(event.data));

      // get email data
      const userSubmittedData = data.userSubmittedData;
      const userEmail = data.userEmail;
      const userName = data.userName;
      const userSubject = data.userSubject;
      const businessPhone = data.businessPhone;
      const businessEmail = data.businessEmail;

      // Send email, bcc business email address
      let params = {
        Source: sourceEmailAddress,
        Destination: {
          ToAddresses: [userEmail],
          BccAddresses: [businessEmail, sourceEmailAddress],
        },
        Message: {
          Body: {
            Html: {
              Data: renderTemplate(userSubmittedData, userName, businessPhone, businessEmail)
            }
          },
          Subject: {
            Data: userSubject,
          }
        },
      };

      console.log('Preparing to send email...');

      ses.sendEmail(params, function (err, data) {
        console.log('Reached send email callback...');
        callback(null, {err: err, data: data, status: (err ? 500 : 200)});
        if (err) {
          console.log(err);
          context.fail(err);
        } else {
          console.log(data);
          context.success(event)
        }
      });
    }
    catch (e) {
      const error = `An unexpected error occured: ${e}`
      callback(null, {err: error, status: 500})
      context.fail(error)
    }
  }
  else {
    const error = 'event.data is undefined.'
    callback(null, {err: error, status: 400})
    context.fail(error)
  }
};
