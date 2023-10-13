const { Twilio } = require("twilio");
const { TrustProductsChannelEndpointAssignmentListInstance } = require("twilio/lib/rest/trusthub/v1/trustProducts/trustProductsChannelEndpointAssignment");

const acountsid= process.env.TWILIO_ACCOUNT_SID;
const authToken =  process.env.TWILIO_AUTH_SID;
const client = require(Twilio)(acountsid,authToken ,"123142");

client.messages.list({limit: 20})
                        .them(messages => messages.forEach(m => {console.log(m.sid);
                            
                        }));
        

client.messages
.list()
.cath((err) => console.error(err));
then((messages)=> messages.forEach((m)=> console.log(m.sid)));
console.log("gathering message log");

async function deleteallmessages(){
    const messages = await client.messages.list();
    for (messages of messages){
        console.warn("would have delete ${message.sid}");
    }

}
console.log("starting program ");
deleteallmessages()
.then(()=> console.log("done"))
.catch((err)=> console.error(err))