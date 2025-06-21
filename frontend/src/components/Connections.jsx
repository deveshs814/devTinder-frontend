import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
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
      {connections.map((connection, index) => (
        <div
          key={connection._id || connection.email || index}
          className="border p-2 m-1 rounded"
        >
          {connection.firstName}
        </div>
      ))}
    </div>
  );
};

export default Connections;
