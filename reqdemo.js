var request = require("request");

var options = { method: 'POST',
  url: 'http://open.home.komect.com/api/v1/sms/send',
  headers: 
   { 'postman-token': 'ea22aa03-0168-05f1-8e80-f3f299297c10',
     'cache-control': 'no-cache',
     authorization: 'eyJhcGlLZXkiOiAiZWNkZThjZTEwYzAxNDhlNzkyMGRlYTY5MjM0NmZjMmEiLCJ0aW1lIjogIjE1MDE5OTg0ODc2NzYiLCJzaWduIjoiNmYwN2VkMmFhZTdiODdlMTdjYTBkZmM5YTAzNTEwMjYifQ==',
     'content-type': 'application/json' },
  body: 
   { messageSign: '治电科技',
     mobile: '15755022403',
     needReceipt: 0,
     receiptNotificationURL: '',
     templateId: 1344,
     templateParameter: { param1: 'klren', param2: '\''+25+'\'', param3: '33', param4: '不在' } },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
