import axios from "axios";
import { API_BASE_URL  } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(API_BASE_URL  + "/user/connections", {
        withCredentials: true,
      });

      console.log("Fetched connections:", res.data.connections); // Should show array of user objects
      dispatch(addConnections(res.data.connections));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <h1>Loading...</h1>;
  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
  <div className="flex flex-col items-center my-10">
    <h1 className="font-bold text-2xl mb-4">Connections</h1>
    {connections.map((connection, index) => {
      const { firstName, lastName, photoUrl, age, gender, about } = connection;

      return (
        <div
          key={connection._id || connection.emailId || index}
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
          {age && <p className="text-sm text-center text-gray-600">Age: {age}</p>}
          {gender && <p className="text-sm text-center text-gray-600">Gender: {gender}</p>}
          {about && <p className="text-sm text-center mt-2 italic">"{about}"</p>}
        </div>
      );
    })}
  </div>
);

};

export default Connections;
