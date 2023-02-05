import React from 'react'
import { Link } from 'react-router-dom'
import { useCollection } from 'react-firebase-hooks/firestore'
import { db } from '../Firebase/Firebase'
import ReactLoading from 'react-loading'
import Moment from 'react-moment'
import { AiFillCheckCircle } from '@react-icons/all-files/ai/AiFillCheckCircle'
import { collection, query} from "firebase/firestore";
import './Home.css'

const CardList = ({ user, Showthebtn , OrderData }) => {
  const [value, loading, error] = useCollection(query(collection(db, user.uid), OrderData ))


  if (error) {
    return <h1>ERROR</h1>
  }

  if (loading) {
    return (
      <section className="mttt">
        <ReactLoading type={'spin'} color={'white'} height={77} width={77} />
      </section>
    )
  }

  if (value) {
    console.log(value.docs.length)
    return (
      <>
        {value.docs.length === 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div className="empty-area">
              <div className="img-home1">
                <img
                  style={{ width: '100%' }}
                  src="../../img/add new list.png"
                  alt=""
                />
              </div>
              <h1>Add your list Now</h1>
            </div>
          </div>
        )}

        <section className="Card-area">
          {value.docs.map((item) => {
            return (
              <div key={item.data().id} className="Card-item">
                <Link
                  className="to"
                  style={{ textDecoration: 'none' }}
                  to={`/EditTask/${item.data().id}`}
                >
                  <div className="Head-list">
                    <h4
                      style={{
                        textDecoration: item.data().completed
                          ? '4px  line-through black'
                          : null,
                      }}
                    >
                      {item.data().title}
                    </h4>
                    <p className="time">
                      <Moment fromNow date={item.data().id} />
                    </p>
                  </div>
                  {item.data().completed && (
                    <div style={{display : "flex"}}>
                      <AiFillCheckCircle
                        style={{
                          color: 'orange',
                          fontSize: '25px',
                          marginRight: '6px',
                        }}
                      />
                      <p style={{ marginBottom: '0' }}>Successfully Completed</p>
                    </div>
                  )}
                  <ul>
                    {item.data().List.map((item, index) => {
                      if (index < 2) {
                        return <li key={index}> {item} </li>
                      } else {
                        return false
                      }
                    })}
                  </ul>
                </Link>
              </div>
            )
          })}
        </section>
      </>
    )
  }
}

export default CardList
