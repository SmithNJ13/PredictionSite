import { useState } from "react";
import profileIcon from "../../assets/profileIcon.png";
import {UserPen} from 'lucide-react';

const ProfileBanner = ({ user, totalNetXG }) => {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState(user.description || "");
  const [charLimit] = useState(50);
  const [showToast, setShowToast] = useState(false);


  function changeEdit() {
    setEditMode(prev => !prev);
  }

  return (
    <div className="p-8 mb-8 relative overflow-hidden">
      <div className="absolute inset-0"></div>
      <div className="relative z-10">
        <div className="flex flex-row items-center gap-6 mb-4 ml-4">
          <img 
            className="border-2 border-green-400 rounded-full w-28 h-28 object-cover hover:bg-black/60 hover:cursor-pointer" 
            src={"https://files.softicons.com/download/application-icons/msn-icons-by-chris-scholten/ico/offline.ico"}
            alt="Profile"
          />
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-white tracking-tight">{user.username}</h1>
            <div className="flex items-center gap-2 mx-6">
              <span className="text-white text-lg">Net xG:</span>
              <span className={"text-red-400 text-lg font-bold"}>
                {totalNetXG >= 0 ? '+' : ''}{totalNetXG.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      <div className="flex flex-col border-t border-green-400/30 pt-4 relative">
        <UserPen size={22} className="self-end hover:cursor-pointer" onClick={changeEdit} />

        {!editMode ? (
          <p className="mx-6 text-white text-lg select-none">{description}</p>
        ) : (
          <>
            <textarea
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= charLimit) {
                  setDescription(e.target.value);
                  setShowToast(false);
                } else {
                  setShowToast(true);
                }
              }}
              className="mx-6 text-white bg-slate-700 text-lg p-2 rounded resize-none relative"
              rows={4}/>
            <div className="text-sm text-gray-400 text-right px-6">{description.length}/{charLimit}</div>
            <button
              className="self-end mt-1 mx-2 font-bold w-20 bg-green-600/50 rounded text-center p-1 hover:bg-green-600"
              onClick={() => setEditMode(false)}> Save </button>
            {showToast && (
              <div className="absolute bottom-0 right-0 m-4 bg-red-600 text-white text-sm px-3 py-2 rounded shadow-lg z-50">
                Character limit reached!
              </div>
            )}
          </>
        )}
      </div>
      </div>
    </div>
  );
};

export default ProfileBanner
