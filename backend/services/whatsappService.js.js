


  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);
  
  exports.sendSMS = async (message,ownerPhoneNumber) => {
      let messageOptions = {
          from: process.env.TWILIO_FROM_NUMBER,
          to: '+919370141891',
          body: message
      }
      try {
          const message = await client.messages.create(messageOptions);
          // console.log(message);
      } catch (error) {
          console.log(error);
      }
  }
 
