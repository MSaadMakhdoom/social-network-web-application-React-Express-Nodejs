import "./profile.scss";
import Posts from "../../components/posts/Posts"
import { useLocation } from "react-router-dom";
import { getToken } from "../../LocalStorageService"


import React,{ useState,useEffect } from "react";
import axios from "axios";
import { useContext } from "react";

const Profile = () =>
{
  const userId = useLocation().pathname.split("/")[2];

  const [data,setData] = useState({
    fullName: "",
    email: "",
    profession: ""
  });

  async function loadProfile()
  {
    let apiResponse = await axios.get("http://localhost:4000/veteran/get-userData/" + userId,{
      headers: { authorization: `${getToken()}` }
    });
    setData(apiResponse.data)
  }
  useEffect(() =>
  {
    loadProfile();
  },[]);

  const handleClick = async (e) => 
  {
    try
    {
      e.preventDefault();
      let apiResponse = await axios.get("http://localhost:4000/veteran/follow/" + userId,{
        headers: { authorization: `${getToken()}` }
      });
    } catch (error)
    {
      console.log(error);
    }
  };

  return (
    <div className="profile">
      <div className="images">

        <img
          src="https://upload.wikimedia.org/wikipedia/en/e/e4/National_University_of_Computer_and_Emerging_Sciences_logo.png"
          alt=""
          className="profilePic"
        />
      </div>

      <div className="profileContainer">
        <div className="uInfo">

          <div className="center">
            <h2>{data.fullName}</h2>

            <h5>{data.profession}</h5>
            <h5> {data.email}</h5>

            <button onClick={handleClick} >follow</button>
          </div>

          <div>
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
