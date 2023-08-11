import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function UserBadge({ setSelectedUser, selectedUsers, convo }) {
  const handledelete = (delUser) => {
    setSelectedUser(selectedUsers.filter((sel) => sel._id !== delUser));
  };
  return (
    <div className="flex">
      <div className="bg-gray-700 border rounded-lg flex justify-between px-2">
        <div className="text-white">{convo.name}</div>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => handledelete(convo._id)}
          className="p-2 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default UserBadge;
