import React, { useState } from 'react';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../services/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Loader from '../Loader/Loader';
import { validation } from '../../helpers/validation';
import './Chat.scss';

const Chat = () => {

  
  const [value, setValue] = useState('');
  const [user] = useAuthState(auth());
  const [messages, loading] = useCollectionData(firestore.collection('messages').orderBy('createdAt'));
  const [error, setError] = useState(null);
  
  const sendMessage = async() => {
    
    if(!validation(value)) {
      setError('Message cannot be empty');
      return;
    }
    
    firestore.collection('messages').add({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    
    setValue('');
    setError('');
  }

  console.log(user.email );
  
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
            {user.displayName ? user.displayName : user.email}
          </p>
          <button 
            onClick={() => auth().signOut() }
            className="chat__navigation-btn"
          >
            Sign Out
          </button>
        </div>
      </nav>
      <div className="chat__area-container">
        <div className="chat__area">
          {messages.map(message => {
            return(
              <div
                key={message.createdAt}
                className={message.uid === user.uid ? 'chat__area-block--right' : 'chat__area-block'}
              >
                <div
                  className="chat__area-block__content"
                >
                  <img 
                    src={message.photoURL ? message.photoURL : '/images/user.png'} alt={message.photoURL}
                    alt="avatar"
                    className="chat__area-block__content-avatar"
                  />
                  <div className="chat__area-block__content-message">
                    <p className="chat__area-block__content-message__username">
                      {message.displayName ? message.displayName : message.email || 'Anonymous User'}
                    </p>
                    <p className="chat__area-block__content-message-message" >{message.text}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="chat__container-new-message">
        <div className="chat__new-message">
          <input
            type="text"
            onChange={e => setValue(e.target.value)}
            value={value}
            placeholder="Write something"
            className="chat__new-message-input"  
          />
          <button 
            onClick={sendMessage}
            className="chat__new-message-btn"  
          >
            <img 
              src="/images/send.png" 
              alt="send button" 
              className="chat__new-message-btn-img"
            />
          </button>
        </div>
        <div className="chat__new-message-error">{error && <p>{error}</p>}</div>
      </div>
    </div>
  );
}

export default Chat;
