import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'

const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Make the API call only if the user data is not present in redux
  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    if (userData) return

    try {
      const user = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true,
      })
      dispatch(addUser(user.data.data))
    } catch (error) {
      console.error(error)
      return navigate('/login')
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Body
