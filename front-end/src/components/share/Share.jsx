import "./share.scss";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import axios from "axios";


import { useContext } from "react";
import { getToken } from "../../LocalStorageService"

const Share = () =>
{


  console.log("share page")

  console.log("frontend share page");
  console.log();
  //how to get cookie access token            




  const [inputs,setInputs] = useState({

    postTitle: "",
    postDescription: ""

  });

  const [err,setErr] = useState(null);

  const navigate = useNavigate()


  const handleChange = (e) =>
  {
    setInputs((prev) => ({ ...prev,[e.target.name]: e.target.value }));
  };

  const handleClick = async (e) =>
  {
    e.preventDefault();

    try
    {
      await axios.post("http://localhost:4000/posts/add-post",inputs,{
        headers: {
          authorization: `${getToken()}`
        }
      });
      navigate("/")
    } catch (err)
    {
      setErr(err.response.data);
    }
  };

  console.log(err);

  return (
    <div className="share">
      <div className="container">
        <form>
          <div className="top">
            <input
              type="text"
              placeholder="Title"
              name="postTitle"
              onChange={handleChange}
            />


            <input
              type="text"
              placeholder="Post discription"
              name="postDescription"
              onChange={handleChange}
            />

          </div>
          <hr />
          <div className="bottom">
            <div className="right">
              <button onClick={handleClick}  >Post</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Share;
