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

  textarea {
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
  textarea:focus {
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
`;

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { currentUser, signUp } = useAuth();

  return (
    <StyledSignUp>
      <TextareaAutosize
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={`Email`}
        autoFocus
      />
      <TextareaAutosize
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={`Password`}
      />
      <TextareaAutosize
        value={passwordConfirm}
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
    </StyledSignUp>
  );
}

export default SignUp;