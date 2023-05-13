const express=require('express')
const ticketControllers = require('../controllers/ticketControllers')
const router=express.Router();

router.post('/',ticketControllers.createTicket)
router.get('/:id',ticketControllers.getTicket)

module.exports=router

