import React from 'react'
import Header from '../Header/Header'
import { Link } from 'react-router-dom'
import './Home.css'
import Error404 from '../Error404/Erorr404'
import Loading from '../Loading/Loading'
import Context from '../Context/Context'
import { useContext } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../Firebase/Firebase'
import { useState } from 'react'
import CardList from './Card-list'
import Modal from '../Popup Modal/Modal'
import { doc, setDoc } from 'firebase/firestore'
import NotificationModel from '../Popup Modal/Notification-Model'
import { collection, limit, orderBy, query, where } from 'firebase/firestore'

const Home = () => {
  const [user, loading, error] = useAuthState(auth)
  const { Theme, ModalState, changeModalState } = useContext(Context)
  const [TitleList, setTitleList] = useState('')
  const [ListItems, setListItems] = useState([])
  const [Hideaddbtn, setHideaddbtn] = useState(true)
  const [ShowMessage, setShowMessage] = useState(false)
  const [ShowModel, setShowModel] = useState(false)
  const [orderdata, setorderdata] = useState()
  const [NewBtnopacity, setNewBtnopacity] = useState('1')
  const [OldBtnopacity, setOldBtnopacity] = useState('1')
  const [selectValue, setselectValue] = useState('')

  // ===============================================
  // for filter The data
  const Completed = where('completed', '==', true)
  const NotCompleted = where('completed', '==', false)
  const Newest = orderBy('id', 'desc')
  const Oldest = orderBy('id', 'asc')
  // ===============================================

  if (error) {
    return <Error404 />
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
        </Helmet>
      </HelmetProvider>
      <Header />

      <div className={`Home ${Theme}`}>
        {/* ====================================================== */}
        {/* when not user */}
        {!user && (
          <div className="Notuser">
              <h1 className='home-message'>
                Please{' '}
                <Link style={{ fontSize: '30px' }} to="/signin">
                  sign in
                </Link>{' '}
                to continue
              </h1>
          </div>
        )}
        {/* ====================================================== */}

        {user && (
          <div className="Home">
            <div className="v-message" style={{ marginTop: '30px' }}>
              <h4>
                Hello {user.displayName} <span>🧡</span>
              </h4>
            </div>
            <section className="btns-filter">
              <select
                value={selectValue}
                id="Select-filter"
                onChange={(eo) => {
                  if (eo.target.value === 'Completed') {
                    setselectValue('Completed')
                    setorderdata(Completed)
                    setOldBtnopacity('1')
                    setNewBtnopacity('1')
                  } else if (eo.target.value === 'Notcompleted') {
                    setselectValue('Notcompleted')
                    setorderdata(NotCompleted)
                    setOldBtnopacity('1')
                    setNewBtnopacity('1')
                  } else if (eo.target.value === 'All') {
                    setselectValue('All')
                    setorderdata(Oldest)
                    setOldBtnopacity('1')
                    setNewBtnopacity('0.6')
                  }
                }}
              >
                <option value="All"> All Tasks </option>
                <option value="Completed"> Completed </option>
                <option value="Notcompleted"> Not Completed </option>
              </select>

              {selectValue === 'All' && (
                <div>
                  <button
                    onClick={() => {
                      setorderdata(Newest)
                      setOldBtnopacity('0.6')
                      setNewBtnopacity('1')
                    }}
                    style={{ opacity: NewBtnopacity }}
                    className="Filter-btn"
                  >
                    Newest first
                  </button>
                  <button
                    onClick={() => {
                      setorderdata(Oldest)
                      setNewBtnopacity('0.6')
                      setOldBtnopacity('1')
                    }}
                    style={{ opacity: OldBtnopacity }}
                    className="Filter-btn"
                  >
                    Oldest first
                  </button>
                </div>
              )}
            </section>
            {/* add new list */}

            <div className="add-new">
              <button
                className="add-btn"
                onClick={() => {
                  setShowModel(ShowModel === false ? true : false)
                  console.log(ModalState)
                }}
              >
                Add New list
              </button>
              {ShowModel && (
                <Modal>
                  <form>
                    <div>
                      <input
                        onChange={(eo) => {
                          setTitleList(eo.target.value)
                        }}
                        value={TitleList}
                        type="text"
                        placeholder="Enter list Name"
                        required
                      />
                      <button
                        onClick={async (eo) => {
                          eo.preventDefault()
                          if (TitleList !== '') {
                            console.log('waiting.............')
                            const TaskId = new Date().getTime()
                            await setDoc(doc(db, user.uid, `${TaskId}`), {
                              title: TitleList,
                              List: ListItems,
                              id: TaskId,
                              completed: false,
                            })
                            setTitleList('')
                            setShowMessage(true)
                            setTimeout(() => {
                              setShowMessage(false)
                            }, 4000)
                            console.log('done...............')
                          }
                        }}
                      >
                        Add list
                      </button>
                    </div>
                  </form>
                </Modal>
              )}
            </div>
            {/* ======================================= */}
            <CardList OrderData={orderdata} user={user} ListItems={ListItems} />
            {/* ======================================== */}
            <NotificationModel ShowMessage={ShowMessage}>
              <span>List added successfully</span>
            </NotificationModel>
          </div>
        )}
      </div>
    </>
  )
}

export default Home
