import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import firebase from '../../firebase';

function RegisterPage() {
  // submit 시 체크
  const { register, watch, errors, handleSubmit } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState('');
  const [loading, setLoading] = useState(false);
  // 실시간으로 입력 시 체크
  //  const { register, watch, errors } = useForm({ mode: 'onChange' });
  const password = useRef();
  password.current = watch('password');

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      setLoading(true);
      let createUser = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
      // console.log(createUser);
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
      <div style={{ textAlign: 'center' }}>
        <h3>Register</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input name="email" type="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
        {errors.email?.type === 'required' && <p>This email field is required</p>}
        {errors.email?.type === 'pattern' && <p>The format is not email</p>}

        <label>Name</label>
        <input name="name" ref={register({ required: true, maxLength: 10 })} />
        {/* {errors.name?.type === 'required' && <p>This name field is required</p>} */}
        {errors.name && errors.name.type === 'maxLength' && <p>Your input exceed maximum length</p>}

        <label>Password</label>
        <input name="password" type="password" ref={register({ required: true, minLength: 6 })} />
        {errors.password?.type === 'required' && <p>This password field is required</p>}
        {errors.password?.type === 'minLength' && <p>Password must have at least 6 characters.</p>}

        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          ref={register({ required: true, validate: (v) => v === password.current })}
        />
        {errors.password_confirm?.type === 'required' && <p>This password confirm field is required</p>}
        {errors.password_confirm?.type === 'validate' && <p>The passwords do not match</p>}

        {errorFromSubmit && <p>{errorFromSubmit}</p>}

        <input type="submit" disabled={loading} />
        <Link style={{ color: 'gray', textDecoration: 'none' }} to="login">
          이미 아이디가 있다면..
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
