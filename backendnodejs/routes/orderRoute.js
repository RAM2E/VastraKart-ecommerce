import express from 'express'
import {verifyStripe,allOrder,placeOrder,placeOrderRazorpay,placeOrderStripe, userOrders,updateStatus } from '../controllers/orderControllers.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter =express.Router()


//Admin Feature
orderRouter.post('/list',adminAuth,allOrder)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)
// Verify stripe payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)

//User features
orderRouter.post('/userorders',authUser,userOrders)





export default orderRouter;