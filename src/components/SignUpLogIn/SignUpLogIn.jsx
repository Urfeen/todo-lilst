import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import Confirm from '../Confirm/Confirm';
import InputPassword from '../InputPassword/InputPassword';
import Loader from '../Loader/Loader';

const StyledSignUpLogIn = styled.form`
  margin: 1rem 0 0;

  display: flex;
  flex-direction: column;

  &>*{
    margin: 0.5rem 0px 0 0px;
  }
  &:first-child{
    margin: 0rem 0px 0px 0px;
  }

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
    position: relative;
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
    button{
      margin: 0px 0px 0px 0.5rem;
      font-size: 1rem;
      color: #395ac0;
      max-width: 3.5rem;
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

function SignUpLogIn({ setModalClosing, modalFormIsLogin = false, setModalFormIsLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signUp, logIn } = useAuth();

  const submitHandler = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedPasswordConfirm = passwordConfirm.trim();

    if (!modalFormIsLogin && trimmedPassword !== trimmedPasswordConfirm) {
      return setError("passwords do not match")
    }

    setError('');
    setLoading(true);

    if (modalFormIsLogin) {
      return logIn(trimmedEmail, trimmedPassword)
        .then(() => {
          setModalClosing(true);
        })
        .catch((error) => {
          if (error.code) {
            setError(error.code.slice(5).split('-').join(" "));
          } else {
            setError(error);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }

    signUp(trimmedEmail, trimmedPassword)
      .then(() => {
        setModalClosing(true);
      })
      .catch((error) => {
        if (error.code) {
          setError(error.code.slice(5).split('-').join(" "));
        } else {
          setError(error);
        }
      })
      .finally(() => {
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
      <InputPassword
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={`Password`}
      />
      {!modalFormIsLogin && (
        <InputPassword
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder={`Password confirmation`}
        />
      )}
      <Confirm
        showDecline={false}
        acceptText={modalFormIsLogin ? "Log in" : "Sign up"}
        acceptDisabled={loading}
      />
      <div className="redirect">
        <span>{modalFormIsLogin ? "Don't have an account?" : "Already have an account?"}</span>
        <button
          type="button"
          onClick={() => setModalFormIsLogin(!modalFormIsLogin)}
        >{modalFormIsLogin ? "Sign up" : "Log in"}</button>
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