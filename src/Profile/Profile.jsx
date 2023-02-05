import React from 'react'
import './Profile.css'
import Header from '../Header/Header'
import Loading from '../Loading/Loading'
import { useContext } from 'react'
import ThemeContext from '../Context/Context'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Firebase//Firebase'
import { getAuth, deleteUser } from 'firebase/auth'
import Moment from 'react-moment'

const Profile = () => {
  const { Theme } = useContext(ThemeContext)
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user && !loading) {
      navigate('/')
    }
  })
  // the page that will appear when the server loading
  if (loading) {
    return <Loading />
  }

  if (user) {
    return (
      <>
        <HelmetProvider>
          <Helmet>
            <title>Profile</title>
          </Helmet>
        </HelmetProvider>
        <Header />

        <div className={`profile ${Theme}`}>
          <div>
            <div className="img-p">
              <div className="user-image">
                <span className="person1-img"></span>
                <span className="person2-img"></span>
              </div>
              <h2>{user.displayName}</h2>
            </div>
            <div className="info">
              <h2>Email : {user.email} </h2>
              {/* to show the last time that we sign in */}
              <h3>
                Last Sign-in :{' '}
                <Moment fromNow date={user.metadata.lastSignInTime} />{' '}
              </h3>
              <h3>
                Account Created :{' '}
                <Moment fromNow date={user.metadata.creationTime} />
              </h3>
              <button
                onClick={() => {
                  deleteUser(user)
                    .then(() => {
                      console.log('user deleted')
                    })
                    .catch((error) => {
                      console.log(error.message)
                    })
                }}
                className="delete-btn"
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Profile
