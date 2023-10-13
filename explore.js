const { Twilio } = require("twilio");

const acountsid= process.env.TWILIO_ACCOUNT_SID;
const authToken =  process.env.TWILIO_AUTH_SID;
const client = require(Twilio)(acountsid,authToken ,"123142");

client.messages.list({limit: 20})
                        .them(messages => messages.forEach(m => {console.log(m.sid);
                            
                        }));
        
console.log("starting program ");
client.messages
.list()
.then((messages)=> messages.forEach((m)=> console.log(m.sid)));
console.log("gathering message log")