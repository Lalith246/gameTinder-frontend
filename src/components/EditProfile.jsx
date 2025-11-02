import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import UserCard from './UserCard'

const EditProfile = ({ user }) => {
  const [gender, setGender] = useState(user?.gender ?? 'Male')
  const [dob, setDob] = useState(user?.DOB ?? '')
  const [about, setAbout] = useState(user?.about ?? '')
  const [photoURL, setPhotoURL] = useState(user?.photoUrl ?? '')
  const [games, setGames] = useState(user?.games ?? [])
  const [otherGames, setOtherGames] = useState(user?.otherGames ?? [])
  const [addOtherGame, setAddOtherGame] = useState('')
  const [error, setError] = useState()

  const dispatch = useDispatch()

  const handleUpdateProfile = async () => {
    try {
      const updatedProfile = await axios.patch(
        BASE_URL + '/profile/edit',
        {
          gender: gender,
          about: about,
          DOB: dob,
          otherGames: otherGames,
        },
        {
          withCredentials: true,
        }
      )
      dispatch(addUser(updatedProfile.data.data))
    } catch (error) {}
  }

  const handleAddOtherGame = () => {
    if (addOtherGame.length === 0) return

    setOtherGames([...otherGames, addOtherGame])
    setAddOtherGame('')
  }

  return (
    user && (
      <div className='flex justify-center'>
        <div className='flex min-h-full max-w-min flex-col justify-center px-6 py-12 lg:px-8 bg-base-300 mx-10'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <h2 className='text-center text-2xl/9 font-bold tracking-tight text-white'>
              Your Profile
            </h2>
          </div>

          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <div className='space-y-6'>
              <div>
                <label
                  htmlFor='gender'
                  className='block text-sm/6 font-medium text-gray-100'
                >
                  Gender
                </label>
                <input
                  type='radio'
                  name='radio-4'
                  value='Male'
                  className='radio radio-primary mx-5 my-1'
                  checked={gender === 'Male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
                <br />
                <input
                  type='radio'
                  name='radio-4'
                  value='Female'
                  className='radio radio-primary mx-5 my-1'
                  checked={gender === 'Female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </div>

              <div>
                <label
                  htmlFor='dob'
                  className='block text-sm/6 font-medium text-gray-100'
                >
                  DOB
                </label>
                <input
                  type='date'
                  className='input'
                  defaultValue={dob.toString().substring(0, 10)}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor='about'
                  className='block text-sm/6 font-medium text-gray-100'
                >
                  About
                </label>
                <div className='mt-2'>
                  <input
                    id='about'
                    name='about'
                    type='text'
                    value={about}
                    required
                    autoComplete='about'
                    defaultValue={about}
                    className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='photoURL'
                  className='block text-sm/6 font-medium text-gray-100'
                >
                  Photo URL
                </label>
                <div className='mt-2'>
                  <input
                    id='photoURL'
                    name='photoURL'
                    type='text'
                    value={photoURL}
                    required
                    autoComplete='photoURL'
                    defaultValue={photoURL}
                    className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='games'
                  className='block text-sm/6 font-medium text-gray-100'
                >
                  Games
                </label>
                <div className='overflow-x-auto'>
                  <table className='table'>
                    <tbody>
                      {games.map((element, index) => {
                        if (index % 2 !== 0) return null
                        return (
                          <tr key={index}>
                            <td>
                              <div className='flex items-center gap-3'>
                                <div className='avatar'>
                                  <div className='mask mask-squircle h-12 w-12'>
                                    <img
                                      src='https://i.pinimg.com/474x/f5/dd/24/f5dd24b3418701f617275cfa6a265ac8.jpg'
                                      alt='Avatar Tailwind CSS Component'
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className='font-bold'>
                                    {element.toString().toUpperCase()}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* second column (if exists) */}
                            {games[index + 1] ? (
                              <td>
                                <div className='flex items-center gap-3'>
                                  <div className='avatar'>
                                    <div className='mask mask-squircle h-12 w-12'>
                                      <img
                                        src='https://i.pinimg.com/474x/f5/dd/24/f5dd24b3418701f617275cfa6a265ac8.jpg'
                                        alt='Avatar Tailwind CSS Component'
                                      />
                                    </div>
                                  </div>
                                  <div className='font-bold'>
                                    {games[index + 1].toString().toUpperCase()}
                                  </div>
                                </div>
                              </td>
                            ) : (
                              <td /> // empty cell if odd number of items
                            )}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <label
                  htmlFor='otherGames'
                  className='block text-sm/6 font-medium text-gray-100'
                >
                  Other Games
                </label>
                <div className='overflow-x-auto'>
                  <table className='table'>
                    <tbody>
                      {otherGames.map((element, index) => {
                        if (index % 2 !== 0) return null
                        return (
                          <tr key={index}>
                            <td>
                              <div className='flex items-center gap-3'>
                                <div className='avatar'>
                                  <div className='mask mask-squircle h-12 w-12'>
                                    <img
                                      src='https://i.pinimg.com/474x/f5/dd/24/f5dd24b3418701f617275cfa6a265ac8.jpg'
                                      alt='Avatar Tailwind CSS Component'
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className='font-bold'>
                                    {element.toString().toUpperCase()}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* second column (if exists) */}
                            {otherGames[index + 1] ? (
                              <td>
                                <div className='flex items-center gap-3'>
                                  <div className='avatar'>
                                    <div className='mask mask-squircle h-12 w-12'>
                                      <img
                                        src='https://i.pinimg.com/474x/f5/dd/24/f5dd24b3418701f617275cfa6a265ac8.jpg'
                                        alt='Avatar Tailwind CSS Component'
                                      />
                                    </div>
                                  </div>
                                  <div className='font-bold'>
                                    {otherGames[index + 1]
                                      .toString()
                                      .toUpperCase()}
                                  </div>
                                </div>
                              </td>
                            ) : (
                              <td /> // empty cell if odd number of items
                            )}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <div className='flex justify-center'>
                    <input
                      id='addOtherGame'
                      name='addOtherGame'
                      type='text'
                      value={addOtherGame}
                      autoComplete='addOtherGame'
                      className='block w-max-min rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 m-2'
                      onChange={(e) => setAddOtherGame(e.target.value)}
                    />
                    <button
                      className='btn btn-primary h-8 mt-2'
                      onClick={handleAddOtherGame}
                    >
                      Add
                    </button>
                  </div>
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
                  onClick={handleUpdateProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <UserCard
            user={{
              firstName: user.firstName,
              lastName: user.lastName,
              gender: gender,
              about: about,
              DOB: dob,
              photoUrl: photoURL,
              isPreview: true,
            }}
          />
        </div>
      </div>
    )
  )
}

export default EditProfile
