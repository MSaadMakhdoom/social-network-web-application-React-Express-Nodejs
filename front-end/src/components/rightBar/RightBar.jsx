import "./rightBar.scss";
import { useEffect,useState } from "react";
import axios from "axios";
import { getToken } from "../../LocalStorageService"







const RightBar = () =>
{
  const [followersList,setFollowerList] = useState([])
  const [hobbyList,setHobbyList] = useState([])
  const [hobby,setHobby] = useState("")
  // 
  async function loadFollowers()
  {
    try
    {
      let apiResponse = await axios.get("http://localhost:4000/veteran/get-followers",{
        headers: { authorization: `${getToken()}` }
      });
      setFollowerList(apiResponse.data)
    }
    catch (error)
    {
      console.log("API Call Failed : ",error)

    }
    console.log("Followers List : ",followersList)
  }

  useEffect(() =>
  {
    loadFollowers();
    loadHobbies()
  },[])

  function hobbyInputHandler(event)
  {
    setHobby(event.target.value);
  }
  function handleAddHobby()
  {
    console.log("Hobby : ",hobby);
    if (hobby === "")
    {
      alert("Hobby Input Cannot Be empty");
      return;
    }
    // Seend hobby to backend
    try
    {
      let apiResponse = axios.post("http://localhost:4000/veteran/add-newhobby",{ hobby: hobby },
        {
          headers: {
            authorization: `${getToken()}`
          }
        })
      console.log("Add Hobby Request Completed Successfully")
    } catch (error)
    {
      console.log("Catch Error")
    }
    setHobby("")
  }

  async function loadHobbies()
  {
    console.log("Load Hobbies Called")
    try
    {
      console.log("Calling API")
      let apiResponse = await axios.get("http://localhost:4000/veteran/get-allhobbies",{
        headers: {
          authorization: `${getToken()}`
        }
      });

      console.log("API Response : ",apiResponse.data)
      setHobbyList(apiResponse.data);
    } catch (error)
    {
      console.log("Catch Error")
    }
  }
  return (
    <div className="rightBar">

      <div className="container">

        <div className="item">
          <span>Add Hobby</span>
          <div className="user">
            <div className="userInfo">
              <input
                type="text"
                placeholder="hobby"
                name="hobby"
                onChange={hobbyInputHandler}
                value={hobby}
              />

            </div>
            <div className="buttons">
              <button onClick={handleAddHobby}>Add Hobby</button>
            </div>
          </div>

        </div>

        <div className="item">
          <span>Vetrans Hobby :  </span>
          <div className="user">
            <div className="userInfo">
              {
                hobbyList.map((hobby) =>
                {
                  return (
                    <h3>{hobby}</h3>
                  )
                }
                )}
            </div>

          </div>
        </div>
        <div className="item">
          <span>Follower</span>
          <div className="user">
            <div className="userInfo">
              {
                followersList.map((follower) =>
                {
                  return (
                    <div>
                      <button>{follower.fullName}</button>
                      <br />
                    </div>
                  )
                })
              }
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default RightBar;
