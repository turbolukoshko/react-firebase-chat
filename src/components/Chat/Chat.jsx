import React, { useState } from 'react';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../services/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Chat = () => {

  const [value, setValue] = useState('');
  const [user] = useAuthState(auth());
  const [messages, loading] = useCollectionData(firestore.collection('messages').orderBy('createdAt'))

  const sendMessage = async() => {
    firestore.collection('messages').add({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setValue('');
  }

  if(loading) {
    return <h1>Loading ...</h1>
  }

  return(
    <div>
      <button onClick={() => auth().signOut() }>Sign Out</button>
      <div className="chat__field">
        <div className="message">
          {messages.map(message => {
            return(<div>
              <img src={message.photoURL} alt={message.photoURL} />
              <p>{message.email}</p>
              <p>{message.text}</p>
            </div>)
          })}
        </div>
      </div>
      <div>
        <input
          type="text"
          onChange={e => setValue(e.target.value)}
          value={value}
          placeholder="Enter your message"  
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
