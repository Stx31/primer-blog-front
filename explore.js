const { Twilio } = require("twilio");

cosnt acountsid= process.env.TWILIO_ACCOUNT_SID;
const authToken =  process.env.TWILIO_AUTH_SID;
const client = require(Twilio)(acountsid,authToken);

client.messages.list({limit: 20})
                        .them(messages => messages.array.forEach(element => {
                            
                        });)