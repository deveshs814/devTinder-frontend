import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard.jsx";

const Feed = () => {
  const feed = useSelector((store) => store.feed); // 'feed' will be null initially, then an array
  const dispatch = useDispatch();

  const getFeed = async () => {
    // Only fetch if the feed is currently null or empty
    if (feed && feed.length > 0) return; // If feed exists and has users, do nothing
    
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // Assuming res.data is an array of users
      dispatch(addFeed(res.data));
    } catch (error) {
      console.error("Error fetching feed:", error.message);
      // You might want to handle this more gracefully, e.g., show an error message to the user
    }
  };

  useEffect(() => {
    // This effect will run on initial mount.
    // It will also re-run if 'feed' changes to null or an empty array,
    // which triggers a new fetch.
    getFeed();
  }, [feed]); // Add 'feed' to the dependency array

  if (!feed || feed.length === 0) {
    // Show loading or "no users" message if feed is null or empty
    if (feed === null) return <h1 className="flex justify-center my-10">Loading new users...</h1>
    return <h1 className="flex justify-center my-10">No New Users found!!</h1>;
  }
  
  // If feed exists and has users, display the first one
  return (
    <div className="flex justify-center my-5">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;