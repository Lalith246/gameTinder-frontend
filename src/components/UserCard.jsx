import React from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'

const UserCard = ({ user }) => {
  const {
    _id,
    firstName,
    lastName,
    gender,
    about,
    DOB,
    photoUrl,
    isPreview = false,
  } = user

  const loggedInUserDetails = useSelector((s) => s.user)

  const handleInterestedRequest = async () => {
    if (!loggedInUserDetails) return

    try {
      const requestResponse = await axios.post(
        BASE_URL + `/request/send/interested/${_id.toString()}`,
        {},
        {
          withCredentials: true,
        }
      )
      console.log(requestResponse)
    } catch (error) {}
  }

  const handleIgnoredRequest = async () => {
    if (!loggedInUserDetails) return

    try {
      const requestResponse = await axios.post(
        BASE_URL + `/request/send/ignored/${_id.toString()}`,
        {},
        {
          withCredentials: true,
        }
      )
      console.log(requestResponse)
    } catch (error) {}
  }

  return (
    <div className='card bg-base-300 w-96 shadow-sm m-auto my-20'>
      <figure>
        <img src={photoUrl} alt='Shoes' className='w-50 rounded-full m-10' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{firstName + ' ' + lastName}</h2>
        <p>{gender}</p>
        <p>
          {Math.floor(
            (Date.now() - new Date(DOB)) / (1000 * 60 * 60 * 24 * 365.25)
          )}
        </p>
        <p>{about}</p>
        {!isPreview && (
          <div className='card-actions justify-center my-6'>
            <button
              className='btn btn-success'
              onClick={handleInterestedRequest}
            >
              Send Request
            </button>
            <button className='btn btn-error' onClick={handleIgnoredRequest}>
              Ignore
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserCard
