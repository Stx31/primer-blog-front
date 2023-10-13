curl  --version 
curl -x post "https:/api.twilio.com/2010-04-01/accounts/$TWILIO_ACCOUNT_SID/messages.josn"\
--data-urlencode "from=16928947"\
--data-urlencode "body=hi there"\
--data-urlencode "to+16928947"\

-u 
npm install twilio
mkdir scratch

start .\index.html
scratch open index.hmtl