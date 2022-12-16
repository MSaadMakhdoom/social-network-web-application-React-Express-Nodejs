import ComminityPosts from "../../../components/community/posts/Posts.jsx"
import CommunityShare from "../../../components/community/share/Share.jsx"

import "./home.scss"

const Home = () =>
{
  return (
    <div className="home">
      <CommunityShare />
      <ComminityPosts />
    </div>
  )
}

export default Home