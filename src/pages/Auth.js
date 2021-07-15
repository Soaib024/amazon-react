import AuthButton from "../components/AuthButton";
import Input from "../components/Input";
import logo from "../images/logo.svg";

import { signinRequest, signupRequest } from "../api/UserApi";

import isEmail from "validator/lib/isEmail";

import React, { useRef, useState } from "react";

import { Link, useHistory } from "react-router-dom";

const Login = ({
  showSignupHandler,
  login,
  loginEmailRef,
  loginPasswordRef,
}) => (
  <div className="flex flex-col items-center">
    <h3 className="text-gray-500">Login</h3>
    <form
      action=""
      method="post"
      className="flex flex-col items-center space-y-4 px-4 "
      onSubmit={login}
    >
      <Input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        ref={loginEmailRef}
      />

      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        ref={loginPasswordRef}
      />

      <AuthButton type="submit" text="Login"></AuthButton>
      <p className="text-gray-500 text-sm">
        New to Amazon?{" "}
        <span
          className="link text-gray-700 text-md"
          onClick={showSignupHandler}
        >
          Create an account here.
        </span>
      </p>
    </form>
  </div>
);

const Register = ({
  showSigninHandler,
  register,
  registerEmailRef,
  registerNameRef,
  registerPasswordRef,
  registerPasswordConfirmRef,
}) => (
  <div className="flex flex-col items-center">
    <h3 className="text-gray-500">Create Account</h3>
    <form
      action=""
      method="post"
      className="flex flex-col items-center space-y-4 px-4 "
      onSubmit={register}
    >
      <Input
        type="text"
        name="text"
        placeholder="Your name (min 4 characters)"
        ref={registerNameRef}
      />
      <Input
        type="email"
        name="email"
        placeholder="Email"
        ref={registerEmailRef}
      />

      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password (min 6 characters)"
        ref={registerPasswordRef}
      />
      <Input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm password"
        ref={registerPasswordConfirmRef}
      />

      <AuthButton type="submit" text="Continue">
        Sign up
      </AuthButton>
      <p className="text-gray-500 text-sm">
        Already have an account?{" "}
        <span
          className="link text-gray-700 text-md"
          onClick={showSigninHandler}
        >
          Login here.
        </span>
      </p>
    </form>
  </div>
);

const Auth = () => {
  const [showLogin, setshowLogin] = useState(true);
  const [error, setError] = useState(undefined);

  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();
  const registerEmailRef = useRef();
  const registerNameRef = useRef();
  const registerPasswordRef = useRef();
  const registerPasswordConfirmRef = useRef();
  const history = useHistory();

  const showSigninHandler = () => {
    setshowLogin(true);
    setError(undefined);
  };

  const showSignupHandler = () => {
    setshowLogin(false);
    setError(undefined);
  };

  const login = (e) => {
    e.preventDefault();
    const email = loginEmailRef.current.value;
    const password = loginPasswordRef.current.value;

    if (!isEmail(email)) {
      setError("Your email is invalid");
    } else if (error === "Your email is invalid") {
      setError(undefined);
    }

    if (password.trim() < 6) {
      setError(error === "Password should be atleast 6 characters");
    } else if ("Password should be atleast 6 characters") {
      setError(undefined);
    }

    signinRequest({ email, password }).then((res) => {
      if (res.status === "error") {
        setError(res.message);
      } else {
        history.push("/");
      }
    });
  };

  const register = (e) => {
    e.preventDefault();
    const email = registerEmailRef.current.value;
    const name = registerNameRef.current.value;
    const password = registerPasswordRef.current.value;
    const confirmPassword = registerPasswordConfirmRef.current.value;

    if (!isEmail(email)) {
      setError("Your email is invalid");
    } else if (error === "Your email is invalid") {
      setError(undefined);
    }

    if (password.trim() < 6) {
      setError("Password should be atleast 6 characters");
    } else if (error === "Password should be atleast 6 characters") {
      setError(undefined);
    }

    if (password !== confirmPassword) {
      setError("Password and confirm password does not match");
    } else if (error === "Password and confirm password does not match") {
      setError(undefined);
    }

    // make register request
    signupRequest({
      email,
      password,
      name,
      confirmPassword,
    }).then((res) => {
      if (res.status === "error") {
        setError(res.message);
      } else {
        history.push("/");
      }
    });
  };

  return (
    <div className="py-20 space-y-8 sm:flex sm:space-y-0 md:mt-52 md:justify-around md:items-center">
      <Link to="/">
        <div className="w-60 mx-auto md:w-96"><img src={logo} alt="logo" className="w-full"></img></div>
      </Link>
      <div>
        {error && <p className="text-gray-800 text-xl py-5 px-3 ">{error}</p>}
        {showLogin && (
          <Login
            showSignupHandler={showSignupHandler}
            login={login}
            loginEmailRef={loginEmailRef}
            loginPasswordRef={loginPasswordRef}
          ></Login>
        )}
        {!showLogin && (
          <Register
            showSigninHandler={showSigninHandler}
            register={register}
            registerEmailRef={registerEmailRef}
            registerNameRef={registerNameRef}
            registerPasswordRef={registerPasswordRef}
            registerPasswordConfirmRef={registerPasswordConfirmRef}
          ></Register>
        )}
      </div>
    </div>
  );
};

export default Auth;
