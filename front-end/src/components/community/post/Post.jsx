import "./post.scss";

import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

import { Link } from "react-router-dom";

const Post = ({ post }) =>
{

  //TEMPORARY
  const liked = false;

  console.log("Post id")
  console.log(post.userid)

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">

            <div className="details">
              <Link
                to={`/Communityprofile/${post.vet_id}`}

                style={{ textDecoration: "none",color: "inherit" }}
              >

                <span className="name">{post.postdescription}</span>
                <h6>{post.setstars}</h6>
              </Link>

            </div>
          </div>

        </div>
        <div className="content">
          <p>{post.title}</p>
          <h4> {post.description} </h4>
        </div>
        <div className="info">

          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>

      </div>
    </div>
  );
};

export default Post;
