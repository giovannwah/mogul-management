// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

var aws = require('aws-sdk');
var ses = new aws.SES({region: 'us-east-1'});

var sourceEmailAddress = 'noreply@mogulmanagement.net'
var toAddress = 'user@domain.com'
exports.handler = (event, context, callback) => {

  var params = {
    Destination: {
      ToAddresses: [toAddress]
    },
    Message: {
      Body: {
        Text: { Data: "Test"

        }

      },

      Subject: { Data: "Test Email"

      }
    },
    Source: sourceEmailAddress
  };


  ses.sendEmail(params, function (err, data) {
    callback(null, {err: err, data: data});
    if (err) {
      console.log(err);
      context.fail(err);
    } else {

      console.log(data);
      context.succeed(event);
    }
  });
};
