import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'
import { addFeed } from '../utils/feedSlice'

const Feed = () => {
  const dispatch = useDispatch()

  const [usersList, setUsersList] = useState([])
  const [error, setError] = useState()

  const loggedInUser = useSelector((s) => s.user)
  const feed = useSelector((s) => s.feed)

  const fetchUsersList = async () => {
    if (feed) return
    try {
      const usersListResponse = await axios.get(BASE_URL + '/user/feed', {
        withCredentials: true,
      })
      dispatch(addFeed(usersListResponse.data.availableUsers))
      setUsersList(usersListResponse.data.availableUsers)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUsersList()
  }, [])

  return <>{usersList.length > 0 && <UserCard user={usersList[0]} />}</>
}

export default Feed
