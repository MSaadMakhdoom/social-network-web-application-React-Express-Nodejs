import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () =>
{

  const [inputs,setInputs] = useState({
    username: "",
    email: "",
    password: "",
    description: "",
    typeofuser: "",

  });

  const [err,setErr] = useState(null);

  const handleChange = (e) =>
  {
    setInputs((prev) => ({ ...prev,[e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => 
  {
    e.preventDefault();
    console.log("Inputs : ",inputs)
    try
    {
      await axios.post("http://localhost:4000/users/create-user",inputs);
    } catch (err)
    {
      console.log("error  ; ",err)
      alert("Error while Sending Data");
    }
  };


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <span>Do you have an vetran account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <span>Do you have an community account?</span>
          <Link to="/communityLogin">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>

            <input
              type="text"
              placeholder="Company name"
              name="username"
              onChange={handleChange}
            />



            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Company Discription"
              name="description"
              onChange={handleChange}
            />



            <select name="typeofuser" onChange={handleChange}>
              <option value="Educational_Institutions">Public and private sector educational institutions </option>
              <option value="Organization">Public and private organizations</option>
              <option value="NGO">NGOs</option>
            </select>
            {err && err}
            <Link> <button onClick={handleClick} >Register</button></Link>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
