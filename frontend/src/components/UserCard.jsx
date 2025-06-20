const UserCard = ({user}) => {
  const {firstName,lastName,photoUrl,age,gender,about} = user;
  return (
   <div className="card bg-base-300 w-80 mt-16 h-[450px] shadow-sm overflow-hidden">
      <figure>
        <img
          src={user.photoUrl}
          alt="Photo"
        /> 
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender} </p>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondry">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
