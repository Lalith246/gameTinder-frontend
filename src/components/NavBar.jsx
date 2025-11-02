import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((store) => store.user)

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + '/logout',
        {},
        {
          withCredentials: true,
        }
      )
      dispatch(removeUser())
      return navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='navbar bg-base-300 shadow-sm'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>🎮 Game Tinder</a>
      </div>
      <div className='flex gap-2'>
        {user && (
          <div className='dropdown dropdown-end mx-5'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full'>
                <img alt='Tailwind CSS Navbar component' src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex='-1'
              className='menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow'
            >
              <li>
                <Link to='/profile' className='justify-between'>
                  Profile
                  <span className='badge'>New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default NavBar
