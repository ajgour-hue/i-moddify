import React,{useState} from "react";
import "../style/login.scss";
import FormGroup from "../components/FormGroup";
import { Link, useNavigate } from "react-router";

import { useAuth } from "../hooks/useAuth";

const Login = () => {
  
  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate('/')
  }

  return (
    <main className="login-page">
      <div className="form-container">
        <div className="header-section">
          <h1>Welcome Back</h1>
          <p>Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <FormGroup
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            label="email"
            placeholder="name@company.com"
          />

          <FormGroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            label="password"
            placeholder="••••••••"
          />

          <button type="submit" className="button ">
            Sign In
          </button>

          <div className="footer-text">
            Don't have an account?
            <Link to="/register">Sign up</Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
