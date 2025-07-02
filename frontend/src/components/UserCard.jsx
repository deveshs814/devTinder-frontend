import axios from "axios";
import { API_BASE_URL  } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const {_id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        API_BASE_URL  + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      res.status(400).send("can't get the users on the feed!!")
    }
  };
  return (
    <div className="card bg-base-300 w-80 mt-16 h-[450px] shadow-sm overflow-hidden">
      <figure>
        <img src={user.photoUrl} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender} </p>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button className="btn btn-secondry"
           onClick={() => handleSendRequest("interested", _id)}
          >Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
