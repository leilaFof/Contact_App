const express=require('express')
const connectBD=require('./config/dbConnection')

const dotenv=require("dotenv").config()
connectBD()
const app=express()
const port =process.env.PORT ||3000
const contactRoute=require('./routes/contactsRoutes')
const userRoute=require('./routes/userRoute')
const errorHandler=require('./middleware/errorHandler')
//
app.use(express.json())
//
app.use('/api/contacts',contactRoute)
app.use('/api/users',userRoute)



// app.get('/api/contacts',(req,res)=>{
//     // res.send("get all contacts")
//     res.status(200).json({
//         status:"SUCCESS",
//         message:"get all contacts"
//     })
// })
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`le server est lancer sur le port ${port}`);
})