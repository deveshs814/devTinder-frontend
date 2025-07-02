import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL  } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        API_BASE_URL  + "/request/review" + "/"+ status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (error) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(API_BASE_URL  + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.requests));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return <h1>Loading...</h1>;
  if (requests.length === 0) return <h1 className="flex justify-center my-10">No Request Found</h1>;

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="font-bold text-2xl mb-4">Connection Requests</h1>
      {requests.map((request, index) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={request._id || request.emailId || index}
            className="border p-4 m-2 rounded w-80 shadow-md bg-blue-400"
          >
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="w-20 h-20 rounded-full mx-auto mb-2 object-cover"
            />
            <h2 className="text-lg font-semibold text-center">
              {firstName} {lastName}
            </h2>
            {age && (
              <p className="text-sm text-center text-gray-600">Age: {age}</p>
            )}
            {gender && (
              <p className="text-sm text-center text-gray-600">
                Gender: {gender}
              </p>
            )}
            {about && (
              <p className="text-sm text-center mt-2 italic">"{about}"</p>
            )}
            <div className="flex justify-center items-center gap-4 my-6">
              <button
                className="btn bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition duration-300"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn bg-pink-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition duration-300"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
