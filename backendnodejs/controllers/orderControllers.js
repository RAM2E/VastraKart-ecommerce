import orderModel from "../models/orderModels.js"
import userModel from "../models/userModels.js"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const currency = 'usd'
const deliveryCharge = 12;
// order data for admin panel
const allOrder = async(req,res) =>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// order data for frontend

const userOrders = async(req,res) =>{
    try {
        const {userId} = req.body

        const orders = await orderModel.find({userId})

        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// placing order using cashn on delivery
const placeOrder = async(req,res) =>{
    try {
        const {userId,items,amount,address} = req.body
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        } ;
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{
            cartData:{}
        })
        res.json({success:true,message:"Order Placed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}

// placing order using Stripe
const placeOrderStripe = async(req,res) =>{
    
    try {
        const {userId,items,amount,address} = req.body;
        const {origin} = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        } ;

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item)=>({
            price_data: {
                currency:currency,
                product_data :{
                    name:item.name,
                },
                unit_amount : item.price * 100,
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name: 'Delivery Charge'
                },
                unit_amount : deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment'
        });
        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}


// Verify stripe payment

const verifyStripe = async(req,res) =>{
    const {orderId,success,userId} = req.body;
    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await orderModel.findByIdAndUpdate(orderId,{cartData:{}})
            res.json({success:true})

        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    
    }
}
 

// placing order using RazorPay
const placeOrderRazorpay = async(req,res) =>{
    
}

// Handle updating status from admin panel
const updateStatus = async(req,res) =>{
    try {
        const {orderId,status} = req.body;
        await orderModel.findByIdAndUpdate(orderId,{status})

        res.json({success:true,message:'Status Updated'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    

    }
}
export {verifyStripe,allOrder,placeOrder,placeOrderRazorpay,placeOrderStripe,userOrders,updateStatus}