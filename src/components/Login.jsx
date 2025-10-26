import React from 'react'
import { useState } from 'react'
import { addUser } from '../utils/userSlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {
  const [emailId, setEmailId] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const loginResponse = await axios.post(
        BASE_URL + '/login',
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      )
      console.log(loginResponse)
      dispatch(addUser(loginResponse.data.data))
      return navigate('/')
    } catch (error) {
      setError(error?.response?.data?.errorString || 'Something went wrong')
    }
  }

  return (
    <>
      <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            alt='Your Company'
            src='https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500'
            className='mx-auto h-10 w-auto'
          />
          <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-white'>
            Sign in to your account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <div className='space-y-6'>
            <div>
              <label
                htmlFor='emailId'
                className='block text-sm/6 font-medium text-gray-100'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='emailId'
                  name='emailId'
                  type='email'
                  value={emailId}
                  required
                  autoComplete='emailId'
                  className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm/6 font-medium text-gray-100'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-indigo-400 hover:text-indigo-300'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={password}
                  required
                  autoComplete='current-password'
                  className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div>
                <p className='text-red-300 flex justify-center'>{error}</p>
              </div>
            )}

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                onClick={handleLogin}
              >
                Sign in
              </button>
            </div>
          </div>

          <p className='mt-10 text-center text-sm/6 text-gray-400'>
            Not a member?{' '}
            <a
              href='#'
              className='font-semibold text-indigo-400 hover:text-indigo-300'
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
