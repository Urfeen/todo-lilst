import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import Confirm from '../Confirm/Confirm';

const StyledSignUp = styled.form`
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
    flex-direction: column;
    align-items: center;
    color: #ddd;
    gap: 0.5rem;
  }
  .error{
    padding: 0 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: tomato;
  }
`;

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const { currentUser, signUp } = useAuth();

  const submitHandler = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedPasswordConfirm = passwordConfirm.trim();

    if (trimmedPassword !== trimmedPasswordConfirm) {
      return setError("passwords do not match")
    }

    signUp(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error.message);
        setError(errorCode.slice(5).split('-').join(" "));
      });
  }

  return (
    <StyledSignUp onSubmit={submitHandler}>
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
      />
      <div className="redirect">
        <span>Already have an account?</span>
        <span>Login</span>
      </div>
      {error && (
        <div className="error">
          <span>{error}</span>
        </div>
      )}
    </StyledSignUp>
  );
}

export default SignUp;