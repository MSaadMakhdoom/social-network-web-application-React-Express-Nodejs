import Post from "../post/Post";
import "./posts.scss";
import React,{ useState,useEffect } from "react";
import axios from "axios";

import { getToken } from "../../LocalStorageService"


const Posts = () =>
{
  const [data,setData] = useState([]);

  const loadPosts = () =>
  {
    axios.get("http://localhost:4000/posts/get-allposts",{
      headers: { authorization: `${getToken()}` }
    }
    ).then((res) =>
    {
      setData(res.data)
    });

  }

  useEffect(() =>
  {
    loadPosts();
  },[]);


  return <div className="posts">
    {data.map(post => (
      <Post post={post} key={post.id} />
    ))}
  </div>;
};

export default Posts;
