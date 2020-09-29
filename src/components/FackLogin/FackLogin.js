import React, { useState } from 'react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase-confiq';

firebase.initializeApp(firebaseConfig);

function FackLogin() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
  })

//   const [loggedInUser, setLoggedInUser ] = useContext(UserContext);
//   const history = useHistory();
//   const location = useLocation();

  var googleProvider = new firebase.auth.GoogleAuthProvider();
  var facebookProvider = new firebase.auth.FacebookAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const {email, displayName, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser)
      console.log(res)
    })
    .catch(error=> {
      console.log(error)
      console.log(error.message)
    })
  }

  const handleFbLogin = () => {
    firebase.auth().signInWithPopup(facebookProvider)
    .then((res) => {
      console.log(res)
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
     // var token = result.credential.accessToken;
      // The signed-in user info.
      //var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  }

  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: false
         }
         setUser(signOutUser)
    })
    .catch(error => {
      console.log(error)
    })     
  }

  const handleBlur = (e) => {
    //console.log(e.target.name, e.target.value)
    let isFieldValied = true;
    if (e.target.name === 'email') {
        isFieldValied = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
        const isPasswordValied = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
        isFieldValied = isPasswordValied && passwordHasNumber;
    }
    if(isFieldValied){
      const newUserInfo = {...user};
      console.log(newUserInfo)
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo)
    }
  }
  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then( res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        updateUserName(user.name)
      })
      .catch(error => {
      // Handle Errors here.
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
      // ...
      });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        console.log('sign in user info', res.user);
      })
      .catch(function(error) {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
     
    }
    e.preventDefault();
  }

 


  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
      //photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      console.log('user name updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }

  return (
    <div className="App">
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <p><img src={user.photo} alt=""/></p>
        </div>
      }
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
          <button onClick={handleSignIn}>Sign In</button>
        }
        <br/>
        <button onClick={handleFbLogin}>Sign In With facebook</button>
        
        <h1>Our own Authentication</h1>
        Email: {user.email}<br/>
        password: {user.password}<br/>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
        <label htmlFor="newUser">New User Sign up</label>
        <form action="" onClick={handleSubmit}>
          {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder='Your Name' /> } <br/>
          <input type="text" onBlur={handleBlur} name="email" placeholder="Your email" required /><br/>
          <input type="password" onBlur={handleBlur} name="password" id=""placeholder="Your Password" required /><br/>
          <input type="submit" value={newUser ? "Sign up" : "Sign in"}/>
      { user.success && <p style={{color: 'green'}}>User { newUser ? 'created' : 'Logged In'} successfully</p>}
        </form>
        <p style={{color: 'red'}}>{user.error} </p>
    </div>
  );
}

export default FackLogin;
