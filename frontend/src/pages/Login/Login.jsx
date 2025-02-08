import React,{useContext, useEffect, useState} from 'react'
import { ShopContext } from '../../context/ShopContext'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import axiosInstance from '../../utils/axios'

import './Login.css'

const Login = () => {

  const navigate = useNavigate();

  const [currentState,setCurrentState] = useState('Login')

  const {token,setToken} = useContext(ShopContext)
  const [name,setName] =useState('')
  const [email,setEmail] =useState('')

  const [password,setPassword] =useState('')


  // const onSubmitHandler = async(event)=>{
  //   event.preventDefault();
  //   try {
  //     if(currentState === 'Sign Up'){
  //       const response = await axiosInstance.post(
  //         '/api/user/register',
  //         {name,email,password}
  //       )
  //       if(response.data.success){
  //         setToken(response.data.token)
  //         toast.success(response.data.message)
  //         localStorage.setItem('token',response.data.token)
  //       }
  //       else{
  //         toast.error(response.data.message)
  //       }
  //     }
  //     else{
  //       const response = await axiosInstance.post('/api/user/login',{email,password})
  //       if(response.data.success){
  //         setToken(response.data.token)
  //         toast.success(response.data.message)
  //         localStorage.setItem('token',response.data.token)

  //       }
  //       else{
  //         toast.error(response.data.message)
  //       }
  //     }
  //   } catch (error) {

  //     console.log(error)
  //     toast.error(error.message)
      
  //   }
  // }

  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    try {
      if(currentState === 'Sign Up'){
        const response = await axiosInstance.post(
          '/api/user/register',
          {name,email,password}
        )
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('userId', response.data.userId)
          toast.success(response.data.message)
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response = await axiosInstance.post('/api/user/login',{email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('userId', response.data.userId)
          toast.success(response.data.message)
        }
        else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
      toast.error(error.response?.data?.message || 'Authentication failed')
    }
}

  useEffect(()=>{
    if(token){
      navigate('/')
    }

  },[token])

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='auth-form'>
        <div className='form-header'>
          <p className='form-title'>{currentState}</p>
        </div>
        {
          currentState === 'Login'? null :(
            <input onChange={(e)=> setName(e.target.value)} value={name} type='text' className='form-input' placeholder='Name' required/>

          )
        }
        <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" className='form-input' placeholder='Email' required />
        <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" className='form-input' placeholder='Password' required />
        <div className="form-footer">
          <p className="forgot-pswd">Forgot password</p>
          {
            currentState === 'Login'?(
              <p className='toggle-auth-state' onClick={()=>setCurrentState('Sign Up')}>Create account</p>
            ):(
              <p className='toggle-auth-state' onClick={()=>setCurrentState('Login')}>Login Here</p>
            )
          }
        </div>
        <button type='submit' className='form-button'>
          {currentState === 'Login'?'Sign In':'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login