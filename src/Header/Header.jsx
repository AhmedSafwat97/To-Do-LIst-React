import React from 'react'
import './Header.css'
import { NavLink, Link } from 'react-router-dom'
import { FiMoon } from '@react-icons/all-files/fi/FiMoon'
import { BiSun } from '@react-icons/all-files/bi/BiSun'
import { useContext } from 'react'
import Context from '../Context/Context'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from 'react'
import { auth } from '../Firebase/Firebase'
import { useNavigate } from 'react-router-dom'

import { signOut } from 'firebase/auth'

const Header = () => {
  const { Theme, toggleTheme } = useContext(Context)
  const [user, loading, error] = useAuthState(auth)
  const [Menustate, setMenustate] = useState(false)

  const navigate = useNavigate()

  return (
    <div className={`${Theme}`}>
      <div className="Nav">
        <Link
          to="/"
          style={{ color: 'white', textDecoration: 'none', marginLeft: '20px' }}
        >
          <div className="Logo">
            <h2>
              To Do List</h2>
          </div>
        </Link>
        <div
          className="The-Nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {user && (
            <NavLink to="/" className="Nav-btn">
              Home
            </NavLink>
          )}
          {!user && (
            <div>
              <NavLink to="/Signin" className="Nav-btn">
                Sign in
              </NavLink>
              <NavLink to="/Signup" className="Nav-btn">
                Sign up
              </NavLink>
            </div>
          )}

          {/* For Dark Mood */}
          <FiMoon
            className="DarkMood"
            onClick={() => {
              toggleTheme(Theme === 'Light' ? 'dark' : 'Light')
            }}
          />
          <BiSun
            className="LightMood"
            onClick={() => {
              toggleTheme(Theme === 'Light' ? 'dark' : 'Light')
            }}
          />
          {/* End DarkMood */}
          {user && (
            <button
              onClick={() => {
                setMenustate(Menustate === false ? true : false)
              }}
              className="user"
            >
              <span className="person1"></span>
              <span className="person2"></span>
            </button>
          )}
          {user && (
            <div className="Container">
              <div
                className="user-nav"
                style={{ bottom: Menustate ? '0px' : '100vw' }}
              >
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <div>
                    <p>{user.displayName}</p>
                  </div>
                  <div>
                    <p>{user.email}</p>
                  </div>{' '}
                </div>
                <NavLink className="Nav-btn-user" to="/profile">
                  Profile
                </NavLink>
                {/* start sign out button */}
                <button
                  className="Nav-btn-user"
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        console.log('Sign-out successful.')
                        navigate('/')
                      })
                      .catch((error) => {
                        // An error happened.
                      })
                  }}
                >
                  {' '}
                  Sign-out{' '}
                </button>
                {/* end sign out button */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
