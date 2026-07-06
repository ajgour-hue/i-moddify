import React, { useState } from 'react'

import FormGroup from '../components/FormGroup';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const Register = () => {

  
  const { loading, handleRegister } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await handleRegister({  email,username, password });
    navigate('/')
  }


  return (
    <main className='login-page'>
      <div className='form-container'>
        <div className="header-section">
          <h1>Create Account</h1>
          <p>Please enter your details to sign up.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <FormGroup
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          type="text"
          label="Username"
          placeholder="Enter your username"
          />

          <FormGroup 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            label="Email"
            placeholder="Enter your email"
          />
          <FormGroup 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            label="Password"
            placeholder="••••••••"
          />
          <button type='submit' className="button ">Sign Up</button>
          
          <div className="footer-text">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </div>
        </form>
      </div>
    </main>
  );
};


export default Register
