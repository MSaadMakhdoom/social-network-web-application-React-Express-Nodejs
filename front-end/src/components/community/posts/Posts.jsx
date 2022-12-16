import Post from "../post/Post";
import "./posts.scss";
import React,{ useState,useEffect } from "react";
import axios from "axios";




const Posts = () =>
{

  console.log("post page");

  console.log(localStorage.getItem("user"));


  const [data,setData] = useState([]);

  useEffect(() =>
  {

    axios.get("http://localhost:4000/community-posts/").then((res) =>
    {
      setData(res.data)
      console.log("Dat : ",res.data)
    });


  },[]);


  return <div className="posts">
    {data.map((post =>
    {
      console.log("id : ",post)
      return <Post post={post} key={post._id} />
    }))}
  </div>;
};

export default Posts;
// post => (
//   <Post post={post} key={post.id} />
