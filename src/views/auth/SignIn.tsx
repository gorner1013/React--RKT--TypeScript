import React, { ChangeEvent, useEffect, useState } from "react";
import { login } from "services/auth.service";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { UserType } from "types/user";
import { useAuth } from '../../contexts/AuthProvider';

import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";

//Redux Toolkit
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setUser } from "redux/userSlice";



export default function SignIn() {
  let navigate: NavigateFunction = useNavigate();
  let auth = useAuth();
  //React Redux Hooks
  const dispatch = useAppDispatch(); //set state in store through reducer
  const userState = useAppSelector(state => state.userReducer);
  console.log(userState.user)
  const initalState: UserType = {
    username: "",
    password: "",
  }
  const [inputs, setInputs] = useState<UserType>(initalState);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { username, email, password } = inputs;

    login(username, password).then((data) => {
      dispatch(setUser(data));
      console.log("user", data);

      localStorage.setItem("auth_token", data.accessToken);
      localStorage.setItem("userId", data.id);
      // localStorage.setItem("avatar", data.avatar);
      // console.log(localStorage.getItem('userId'));
      auth.signin(data.accessToken, () => {
        navigate('/admin', { replace: true });
      });
    }).catch((err) => {
      alert(err);
    })
  }

  useEffect(() => {
    // localStorage.clear;
    localStorage.removeItem("auth_token");
  }, []);


  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-[1px] w-full bg-gray-200 dark:bg-navy-700" />
        </div>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <InputField
            name="username"
            variant="auth"
            extra="mb-3"
            label="Username*"
            placeholder="Input Your Name,Please!"
            id="username"
            type="text"
            value={inputs.username || ""}
            onChange={handleChange}


          />

          {/* Password */}
          <InputField
            name="password"
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            value={inputs.password || ""}
            onChange={handleChange}

          />
          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              href=" "
            >
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href="sign-up"
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}
