import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import Confirm from '../Confirm/Confirm';
import Loader from '../Loader/Loader';

const StyledSignUpLogIn = styled.form`
  margin: 1rem 0 0;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input {
    width: 100%;
    resize: none;
    padding: 4px;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0);
    border: 1px #2b3044 solid;
    color: #ccc;
    transition: border 0.2s ease, color 0.2s ease;
    border-radius: 3px;
  }
  input:focus {
    border: 1px #395ac0 solid;
    box-shadow: 0px 0px 3px 1px #395ac050;
    color: #fff;
  }
  button {
    width: 100%;
  }
  .redirect{
    padding: 0.5rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ddd;
    gap: 0.5rem;
    span{
    }
    button{
      font-size: 1rem;
      color: #395ac0;
      /* max-width: 4rem; */
      flex: 0 1 3rem;
      filter: drop-shadow(0 0 0px #000);
      transition: filter 0.2s ease, text-decoration 0.2s ease;
      &:hover,
      &:focus{
        text-decoration: underline;
        filter: drop-shadow(0 0 1px #395ac0);
      }
    }
  }
  .error{
    padding: 0 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: tomato;
  }
  .loader-box{
    padding: 0 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function SignUpLogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  const { signUp } = useAuth();

  const submitHandler = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedPasswordConfirm = passwordConfirm.trim();

    if (trimmedPassword !== trimmedPasswordConfirm) {
      return setError("passwords do not match")
    }

    setError('');
    setLoading(true);

    signUp(trimmedEmail, trimmedPassword)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setError(error.code.slice(5).split('-').join(" "));
        setLoading(false);
      });
  }

  return (
    <StyledSignUpLogIn onSubmit={submitHandler}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={`Email`}
        autoFocus
        type="email"
      />
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder={`Password`}
      />
      <input
        value={passwordConfirm}
        type="password"
        onChange={(e) => setPasswordConfirm(e.target.value)}
        placeholder={`Password confirmation`}
      />
      <Confirm
        showDecline={false}
        acceptText="Sign up"
        acceptDisabled={loading}
      />
      <div className="redirect">
        <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
        >{isLogin ? "Sign up" : "Log in"}</button>
      </div>
      {loading && (
        <div className="loader-box">
          <Loader size={25} />
        </div>
      )}
      {error && (
        <div className="error">
          <span>{error}</span>
        </div>
      )}
    </StyledSignUpLogIn>
  );
}

export default SignUpLogIn;