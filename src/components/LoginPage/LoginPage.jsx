import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';
function LoginPage() {
  const history = useHistory();

  return (
    <>
     <img src= '/images/loginPic.png' className='myimage'/>
     <div className='loginPicture'>
      <LoginForm />

      <center>
        <button
          type="button"
          className="button-24"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
    </>
  );
}

export default LoginPage;
