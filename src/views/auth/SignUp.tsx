import React, { ChangeEvent, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { register } from "services/auth.service";
import { UserType } from "types/user";

function ValidateEmail(email: string) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return true;
  }
    alert("You have entered an invalid email address!")
    return false;
}

const SignUp: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  let navigate:NavigateFunction=useNavigate();

  const initalState : UserType = {
    username: "",
    email: "",
    password: "",
    confirm: "",
  }
  const [inputs, setInputs] = useState<UserType>(initalState);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { username, email, password, confirm}= inputs;

    // validate input values
    if (!username || !email || !password) {
      alert('fill all fields');
      return;
    }
    if (!ValidateEmail(email)) {
      return;
    }
    if (password.length < 6) {
      alert('Password should be more than 6')
      return;
    }
    if (password!=confirm) {
      alert('Password should match with Confirm')
      return;
    }

    //
    register(username, email!, password).then(
      (response) => {
        navigate("/auth/sign-in");
        window.location.reload();
        alert("Congratulations on your join!")
      },
      (error)=>{
        console.log('error')
      }
    )
  }

  return (
    <div className=" flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[5vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign Up
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign up!
        </p>
        <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign Up with Google
          </h5>
        </div>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-[1px] w-full bg-gray-200 dark:bg-navy-700" />
        </div>

        <form onSubmit={handleSubmit}>
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
          {/* Email */}
          <InputField
            name="email"
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="text"
            value={inputs.email || ""}
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
          <InputField
            name="confirm"
            variant="auth"
            extra="mb-3"
            label="Confirm*"
            placeholder="Min. 8 characters"
            id="confirm"
            type="password"
            value={inputs.confirm || ""}
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

          </div>
          <button type="submit" className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign Up
          </button>
        </form>
        <div className="mt-4">

          <a
            href=" "
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
