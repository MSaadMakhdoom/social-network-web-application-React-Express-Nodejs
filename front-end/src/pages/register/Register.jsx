import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import Joi from "joi"
import { useNavigate } from 'react-router-dom';

const Register = () =>
{


  let navigate = useNavigate(); // Navigator
  // State Handler in input feilds
  const [state,setState] = useState(() =>
  {
    return {
      fullName: "",
      email: "",
      password: "",
      profession: "",
    }
  });
  // function to handle the inputs
  function handleInput(event)
  {
    let { name,value } = event.target;
    console.log(name,value)
    setState((prevState) =>
    {
      return {
        ...prevState,
        [name]: value
      }
    });
  }
  function validateRegistrationInput(data)
  {
    const registerValidation = Joi.object({
      fullName: Joi.string().min(6).required(),
      email: Joi.string().min(6).email({ tlds: { allow: false } }).required(),
      password: Joi.string().min(6).required(),
      profession: Joi.string().min(6).required()
    });
    return registerValidation.validate(data);
  }



  let handleSubmitButton = async () =>
  {
    console.log("Initial Data :  ",state);
    // validate Input Feilds
    let { error } = validateRegistrationInput(state);
    if (error)
    {
      alert("Error : " + error.message);
      return;
    }

    // If Validation Passed 
    console.log("Vetern Ready to Register : ",state);

    try
    {
      // If Got the error 409 Confilic Error
      await axios.post("http://localhost:4000/veteran/register",state);
    } catch (error)
    {
      //    Check weather this was code=409
      if (!error.response)
      {
        alert("--- Error: Server Not Responding --- ");
      }
      else if (error.response.status === 409)
      {
        alert("Email has already been taken")
      }
      else
      {
        alert("Some other(than email same) error Occured } " + error.message);
      }
      return;
    }

    alert("Registration Successfull");
    navigate("/login");


  }
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>

            <input
              type="text"
              placeholder="name"
              name="fullName"
              onChange={handleInput}
            />



            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleInput}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInput}
            />
            <input
              type="text"
              placeholder="Profession"
              name="profession"
              onChange={handleInput}
            />

            <Link>
              <button onClick={handleSubmitButton} >Register</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
