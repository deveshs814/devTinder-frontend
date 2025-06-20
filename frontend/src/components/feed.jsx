import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard.jsx";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      // res.status(400).send("error : " + error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed && (
      <div className="flex justify-center my-5">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
