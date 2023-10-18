const express = require('express')
const mongoose = require('mongoose')
const app = express()

//Routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})
app.get('/blog', (req, res) => {
    res.send('Hello blog')
})

mongoose.connect('mongodb+srv://kh1327303:<password>@cluster0.kyzpqkc.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{ 
    app.listen(3000,()=>{
        console.log('node api se esta ejecuntando en port 3000')
    })
    
    console.log('conect to mongodb')
}).catch((error)=>{
console.log(error)
})