const { Vonage } = require('@vonage/server-sdk')

exports.sendMessage = async  (message,toPhone) =>{
    const vonage = new Vonage({
      apiKey: "32a1136c", 
      apiSecret: "og18HLXoMsQqAsvh"
    })

    const from = "Vonage APIs";
    const to = toPhone;
    const text = message;
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully') })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
 
}