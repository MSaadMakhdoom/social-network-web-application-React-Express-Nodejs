
import { Link } from "react-router-dom";
import "./login.scss";
import { useContext,useState } from "react";
import Joi from "joi"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { storeToken } from "../../../LocalStorageService"

const Login = () =>
{

  const navigate = useNavigate()

  const [state,setState] = useState(() =>
  {
    return {
      email: "",
      password: ""
    }

  }); // State to take input

  // input handler onChange function
  function inputHandler(event)
  {
    let { name,value } = event.target
    setState((prevState) => { return { ...prevState,[name]: value } })
  }

  //Login Input validator
  function validateLoginInput(data)
  {
    const loginValidation = Joi.object({
      email: Joi.string().min(6).email({ tlds: { allow: false } }).required(),
      password: Joi.string().min(6).required()
    });
    return loginValidation.validate(data);
  }

  // function for login button
  let loginButtonHandler = async () =>
  {
    let { error } = validateLoginInput(state);
    if (error)
    {
      alert("Error : " + error.message);
      return;
    }

    console.log("Validationg Check passed ");
    // send request to server
    try
    {
      var apiResponse = await axios.post("http://localhost:4000/users/login",state);

      storeToken(apiResponse.data.token);
      navigate("/Community")

    }
    catch (error)
    {
      if (!error.response)
      {
        alert("Error : Server Not Responding");
      }
      else if (error.response.status === 401)
      {
        alert("Error : Invalid email or password");
      }
      else
      {
        alert("Error : Some Random Error Occured")
        console.log("error : " + error)
      }
      return
    }

  }


  // 


  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <p>
            <li> Veterans</li>
            <li> Public and private sector educational institutions</li>
            <li>Public and private organizations</li>
            <li>NGOs</li>
          </p>

          <span>Don't you have an Vetrans account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
          <span>Don't you have an Community account?</span>
          <Link to="/communityRegister">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login Community</h1>
          <form>
            <input
              type="text"
              placeholder="email"
              name="email"
              onChange={inputHandler}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={inputHandler}
            />

            <Link>
              <button onClick={loginButtonHandler}>Login</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
