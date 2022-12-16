import "./share.scss";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import axios from "axios";

import { useContext } from "react";
import { getToken } from "../../../LocalStorageService";

const Share = () =>
{
  console.log("share page");

  console.log("frontend share page");

  const [inputs,setInputs] = useState({
    postdescription: "",
    setstars: "",
  });

  const [err,setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) =>
  {
    setInputs((prev) => ({ ...prev,[e.target.name]: e.target.value }));
  };

  const handleClick = async (e) =>
  {
    e.preventDefault();

    try
    {
      await axios.post("http://localhost:4000/community-posts/create-post",inputs,{
        headers: {
          authorization: `${getToken()}`,
        },
      });
      navigate("/Community");
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
              placeholder="Event Discription"
              name="postdescription"
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder=" set stars "
              name="setstars"
              onChange={handleChange}
            />
          </div>
          <br />
          <div className="left">
            <button>
              <input type="file" id="file" style={{ display: "none" }} />
              <label htmlFor="file">
                <div className="item">
                  <img src="" alt="" />
                  <span>Add Image</span>
                </div>
              </label>
            </button>
          </div>

          <hr />
          <div className="bottom">
            <div className="right">
              <button onClick={handleClick}>Post</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Share;
