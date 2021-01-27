import React, { useState } from 'react';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../services/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Loader from '../Loader/Loader';
import './Chat.scss';

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
    return <Loader />;
  }

  return(
    <div className="chat">
      <nav className="chat__navigation-wrapper">
        <div className="chat__navigation">
          <img 
            src={user.photoURL ? user.photoURL : '/images/user.png'} 
            alt="chat__navigation-avatar" 
            className="chat__navigation-avatar"
          />
          <p className="chat__navigation-username">
            {user.email ? user.email : user.displayName}
          </p>
          <button 
            onClick={() => auth().signOut() }
            className="chat__navigation-btn"
          >
            Sign Out
          </button>
        </div>
      </nav>
      <div className="chat__field">
        <div className="chat__field-messages">
          {messages.map(message => {
            return(
              <div
                key={message.createdAt}
                className={message.displayName || message.email ===  (user.email || user.displayName) ? 'message-wrapper right' : 'message-wrapper"'}
              >
                <div
                  className="chat__field-message"
                >
                  <img 
                    src={message.photoURL ? message.photoURL : '/images/user.png'} alt={message.photoURL}
                    alt="avatar"
                    className="chat__field-avatar"
                  />
                  <div className="chat__field-content">
                    <p className="chat__field-content-username">
                      {message.displayName ? message.displayName : message.email}
                    </p>
                    <p className="chat__field-content-message" >{message.text}</p>
                  </div>
                </div>
              </div>
            )
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
