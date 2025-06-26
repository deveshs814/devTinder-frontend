import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender|| "");
  const [about, setAbout] = useState(user.about|| "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center">
          <div className="card bg-base-300 w-96 shadow-sm m-16">
            <div className="card-body px-10">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="input">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                  <input
                    type="search"
                    value={firstName}
                    className="grow"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </label>

                <label className="input mt-4">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  </g>
                  <input
                    type="text"
                    value={lastName}
                    className="grow"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                  />
                </label>
                <label className="input mt-4">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  </g>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="grow outline-none"
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="others">others</option>
                  </select>
                </label>

                <label className="input mt-4">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  </g>
                  <input
                    type="number"
                    value={age}
                    className="grow"
                    onChange={(e) => setAge(Number(e.target.value))}
                    placeholder="age"
                  />
                </label>
                <label className="input mt-4">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  </g>
                  <input
                    type="url"
                    value={photoUrl}
                    className="grow"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="Photo Url"
                  />
                </label>
                <label className="input mt-4">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  </g>
                  <input
                    type="text"
                    value={about}
                    className="grow"
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="About"
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully!!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
