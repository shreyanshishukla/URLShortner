const express=require('express')
const app=express()
const mongoose=require('mongoose')
const shorturl=require('./models/shortURL')
require('dotenv').config()

const uri = "mongodb+srv://shreyanshi_shukla:Omnamahshivay%407@cluster0.jddx8.mongodb.net/urlshortner?retryWrites=true&w=majority";




mongoose.connect(process.env.MONGOOSE_CONNECTION_URI,{useNewUrlParser: true, useUnifiedTopology: true})
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')
app.get('/',async (req,res)=>{
    const datab= await shorturl.find({})

 res.render('index',{shorturls:datab})
})
app.post('/shortURL',async (req,res)=>{
    await shorturl.create({full:req.body.fullURL})
    res.redirect('/')
})
app.get('/:shorturlq',async(req,res)=>{
  const output=  await shorturl.findOne({short:req.params.shorturlq})
  if(output==null) res.sendStatus('404');
  else
 {output.clicks++;
  output.save();
  res.redirect(output.full)}
})
app.listen(process.env.PORT||5000); 