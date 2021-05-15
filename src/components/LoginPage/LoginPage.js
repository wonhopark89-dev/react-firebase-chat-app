import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import firebase from '../../firebase';

function LoginPage() {
  // submit 시 체크
  const {register, watch, errors, handleSubmit} = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorFromSubmit(error.message);
      setLoading(false);
      setTimeout(() => setErrorFromSubmit(''), 5000);
    }
  };

  return (
    <div className={'auth-wrapper'}>
      <div style={{textAlign: 'center'}}>
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input name="email" type="email" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
        {errors.email?.type === 'required' && <p>This email field is required</p>}
        {errors.email?.type === 'pattern' && <p>The format is not email</p>}

        <label>Password</label>
        <input name="password" type="password" ref={register({required: true, minLength: 6})} />
        {errors.password?.type === 'required' && <p>This password field is required</p>}
        {errors.password?.type === 'minLength' && <p>Password must have at least 6 characters.</p>}

        {errorFromSubmit && <p>{errorFromSubmit}</p>}

        <input type="submit" disabled={loading} />
        <Link style={{color: 'gray', textDecoration: 'none'}} to="register">
          아직 아이디가 없다면..
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
