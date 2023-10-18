const express = require('express')
const mongoose = require('mongoose')
const app = express()
const post=  require('./modules/postmodules')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})
app.get('/blog', (req, res) => {
    res.send('Hello blog')
})


app.get('/post', async(req, res) => {
    try {
        const products = await post.find({});
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/post/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// update a post
app.put('/post/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const post = await post.findByIdAndUpdate(id, req.body);
       
        if(!post){
            return res.status(404).json({message: `no se encontro ningun post con esa id ${id}`})
        }
        const updatedpost = await Post.findById(id);
        res.status(200).json(updatedpost);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.delete('/post/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const post = await post.findByIdAndDelete(id);
        if(!post){
            return res.status(404).json({message: `no se encontro ningun post con esa id ${id}`})
        }
        res.status(200).json(post);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://kh1327303:<password>@cluster0.kyzpqkc.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{ 
     
    console.log('conect to mongodb')
    app.listen(3000,()=>{
        console.log('node api se esta ejecuntando en port 3000')
    })
    
    console.log('conect to mongodb')
}).catch((error)=>{
console.log(error)
})