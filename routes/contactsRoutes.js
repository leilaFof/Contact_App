const express = require("express");
const router = express.Router();
const contactController=require('../controllers/contactController');
const validateToken = require("../middleware/validationTokenHandler");

router.use(validateToken)
//get all contact
router.get("/",contactController.getContacts)
//create contact
router.post("/",contactController.createContact )
//update contact
router.put("/:id",contactController.updateContact);
//get individual contact
router.get("/:id",contactController.getOneContact);
 //delete  contact
router.delete("/:id", contactController.deleteContact);

module.exports = router;

// router.get("/", (req, res) => {
//   res.status(200).json({
//     status: "SUCCESS",
//     message: "get all contacts",
//   });
// });