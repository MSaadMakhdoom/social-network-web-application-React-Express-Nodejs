import "./leftBar.scss";
// import usestate and useeffect
import { useState,useEffect } from "react";
import axios from "axios";
import { getToken } from "../../LocalStorageService"

const LeftBar = () =>
{

  const [veteran,setVeteran] = useState({
    fullName: "",
    email: "",
    profession: "",
    stars: ""
  })

  async function loadVeteran()
  {
    console.log("Loading Veteran Data");
    try
    {
      let apiResponse = await axios.get("http://localhost:4000/veteran/get-profiledata",{
        headers: { authorization: `${getToken()}` }
      });

      setVeteran(apiResponse.data)
      console.log("Veteran Data : ",apiResponse.data)

    }
    catch (Error)
    {
      console.log("Unable to Load Veteran Data ",Error)
    }
  }
  useEffect(() =>
  {
    loadVeteran();

  },[])

  return (
    <div className="leftBar">
      <div className="container">
        <span><strong>Name : </strong>{veteran.fullName}</span>
        <br />
        <span><strong>Profession :  </strong>{veteran.profession}</span>
        <br />
        <span><strong>Stars : </strong>{veteran.stars}</span>
        <br />
      </div>
    </div>
  );
};

export default LeftBar;
