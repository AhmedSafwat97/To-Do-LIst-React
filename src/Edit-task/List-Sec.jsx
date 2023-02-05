import React from 'react'
import { AiFillDelete } from '@react-icons/all-files/ai/AiFillDelete'
import { db } from '../Firebase/Firebase'
import { arrayRemove, doc } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'
import { updateDoc } from 'firebase/firestore'


const ListSec = ({ Id, user }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, Id))


  if (value) {

    return (
      <>
        <section className="All-Task">
          {value.data().List.map((item, index) => (
            <dev key={index} className="Task-List">
              <h3>{item}</h3>
              {/* To remove Data from the array */}
              <AiFillDelete
                onClick={async (eo) => {
                  await updateDoc(doc(db, user.uid, Id), {
                    List: arrayRemove(item),
                  })
                }}
                className="delete-Task"
              />
            </dev>
          ))}
        </section>
      </>
    )
  }
}

export default ListSec

