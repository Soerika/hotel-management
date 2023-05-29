import React, { useContext } from "react";
import { format } from "date-fns";

function UserProfile({ user }) {
  return (
    <div>
      <div>
        <label className="font-semibold text-lg">Legal name</label>
        <p className="text-gray-500">{user.name}</p>
      </div>
      <hr className="mt-5 mb-5"></hr>
      <div>
        <label className="font-semibold text-lg">Email address</label>
        <p className="text-gray-500">{user.email}</p>
      </div>
      <hr className="mt-5 mb-5"></hr>
      <div>
        <label className="font-semibold text-lg">Password</label>
        <p className="text-gray-500">
          {user.password
            .split("")
            .map((c) => "*")
            .join("")}
        </p>
      </div>
      <hr className="mt-5 mb-5"></hr>
      <div>
        <label className="font-semibold text-lg">Birthday</label>
        <p className="text-gray-500">
          {format(new Date(user.birthday), "PPP")}
        </p>
      </div>
      <hr className="mt-5 mb-5"></hr>
      <div>
        <label className="font-semibold text-lg">Gender</label>
        <p className="text-gray-500">{user.gender || "Not provide"}</p>
      </div>
      <hr className="mt-5 mb-5"></hr>

      <div>
        <label className="font-semibold text-lg">Phone number</label>
        <p className="text-gray-500">{user.phone}</p>
      </div>
    </div>
  );
}

export default UserProfile;
