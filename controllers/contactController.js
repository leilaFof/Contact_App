const asyncHandler = require('express-async-handler');
const Contact=require("../models/contactModel")


//@description get all contacts
//@route GET /api/contacts

const { error } = require("console");

const getContacts= asyncHandler(async (req, res)=>{
     const contacts=await Contact.find({user_id:req.user.id})
     
     res.status(200).json(contacts);
})
//@create  contacts
//@route POST /api/contacts
const createContact= asyncHandler(async (req, res)=>{
    console.log("le contenuer est : ",req.body);
    const{name, email,phone}=req.body
    if(!name || !email || !phone){
      res.status(400)
      throw new Error("all fields are mandatory !")

    }
     const contact=await Contact.create({
        name,email,phone
     })
     res.status(200).json(contact)
})
//@des GET ONE  contacts
//@route GET /api/contacts/:id

const getOneContact= asyncHandler(async (req, res)=>{
    const contact=await Contact.findById(
        req.params.id

    )
    if (!contact){
   
        res.status(400)
            throw new Error("Contact not found!")
     

    }
    res.status(200).json(contact)
})
//@des UPDATE ONE  contacts
//@route PUT /api/contacts/:id
const updateContact=asyncHandler( async (req, res)=>{
    const contact =await Contact.findById(req.params.id)
    if (!contact){
        return res.status(404).send("Contact not found");

    }
    const updateContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,{new:true}
    )
    res.status(200).json({
        status: "SUCCESS",
        message: "update contact",
        data:{
            updateContact

        }
      });
})
//@des delete ONE  contacts
//@route DELETE /api/contacts/:id
const deleteContact=asyncHandler( async (req, res)=>{
    const contact= await Contact.findById(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("contact not found")
    }
    await Contact.deleteOne()
  
    res.status(200).json({
        status: "SUCCESS",
        message: "contact delete",
        data:{contact}});
})
 module.exports={
    getContacts,
    createContact,
    updateContact,
    getOneContact,
    deleteContact
 }