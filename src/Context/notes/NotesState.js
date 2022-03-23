import NoteContext from './NoteContext'
import React, {useState} from 'react'
const NotesState = (props)=>{
    let arr = [
        {
          _id: "6239a8113b9aed0d10df9d93",
          user: "6238718930872a3e1652f005",
          title: "hey this is me",
          desciption: "this is my sample description",
          tag: "sample note",
          date: "2022-03-22T10:42:25.468Z",
          __v: 0
        },
        {
          _id: "6239a8113b9aed0d10df9d95",
          user: "6238718930872a3e1652f005",
          title: "hey this is me",
          desciption: "this is my sample description",
          tag: "sample note",
          date: "2022-03-22T10:42:25.689Z",
          __v: 0
        }
      ]
    const [Notes, setNotes] = useState(arr)
    return(
        <NoteContext.Provider value={{Notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NotesState;