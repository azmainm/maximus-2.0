// profile/components/ProfileCard.tsx

import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

interface UserInfo {
  full_name: string;
  email: string;
  age: number | null;
  sex: string | null;
  height: number | null;
  weight: number | null;
}

const ProfileCard = () => {
  const { userId } = useAuth(); // Fetch logged-in user's ID from AuthContext
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserInfo, setEditedUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    if (!userId) return; // If no user is logged in, exit early

    // Fetch user profile and articles
    const fetchUserData = async () => {
      try {
        // Fetch user details from Firestore "users" collection
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userDetails = {
            full_name: userData.name,
            email: userData.email,
            age: userData.age || null,
            sex: userData.sex || "N/A",
            height: userData.height || null,
            weight: userData.weight || null,
          };
          setUserInfo(userDetails);
          setEditedUserInfo(userDetails); // Set editable copy
        } else {
          console.error("User not found.");
        }

        // Fetch total number of articles posted by the user from "posts" collection
        const postsQuery = query(collection(db, "posts"), where("userId", "==", userId));
        const postsSnapshot = await getDocs(postsQuery);
        setTotalArticles(postsSnapshot.size); // Count total articles
      } catch (error) {
        console.error("Error fetching user data or posts:", error);
      }
    };

    fetchUserData();
  }, [userId]); // re-run if userId changes

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: keyof UserInfo, value: string | number | null) => {
    setEditedUserInfo((prev) => prev && { ...prev, [field]: value });
  };

  const handleSave = async () => {
    if (!userId || !editedUserInfo) return;

    try {
      // Update Firestore with new values
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        name: editedUserInfo.full_name,
        age: editedUserInfo.age,
        sex: editedUserInfo.sex,
        height: editedUserInfo.height,
        weight: editedUserInfo.weight,
      });

      // Update UI with new values
      setUserInfo(editedUserInfo);
      setIsEditing(false);
      toast.success("Changes have been saved!", {
        position: "bottom-right",
        autoClose: 3000,
      });return;
    } catch (error) {
      toast.error("Failed to update changes. Please try again later.", {
        position: "bottom-right",
        autoClose: 3000,
      });return;
      console.error("Error updating user information:", error);
    }
  };


  return (
    <div className="w-full max-w-4xl p-6 mb-6 bg-gray-900 border border-gray-300 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-2">
          <span className="text-gray-300">
            {isEditing ? (
              <input
              type="text"
              value={editedUserInfo?.full_name || ""}
              onChange={(e) => handleInputChange("full_name", e.target.value)}
              className="bg-gray-800 text-white rounded-md px-2 py-1 focus:outline-none max-w-full w-full sm:max-w-xs"
            />            
            ) : (
              userInfo?.full_name || "User"
            )}
          </span>
        </h1>
        <button
          onClick={isEditing ? handleSave : handleEditToggle}
          className="text-cyan-500 hover:text-cyan-700 font-bold ml-2"
        >
          {isEditing ? "✓" : "Edit"}
        </button>
      </div>
      <p className="text-md mb-2">
        <span className="text-cyan-100">Email: </span>
        {userInfo?.email || "N/A"}
      </p>
      <p className="text-md mb-2">
        <span className="text-cyan-100">Age: </span>
        {isEditing ? (
          <input
            type="number"
            value={editedUserInfo?.age || ""}
            onChange={(e) => handleInputChange("age", Number(e.target.value) || null)}
            className="bg-gray-800 text-white rounded-md px-2 py-1 focus:outline-none"
          />
        ) : (
          userInfo?.age || "N/A"
        )}
      </p>
      <p className="text-md mb-2">
        <span className="text-cyan-100">Sex: </span>
        {isEditing ? (
          <select
            value={editedUserInfo?.sex || "N/A"}
            onChange={(e) => handleInputChange("sex", e.target.value)}
            className="bg-gray-800 text-white rounded-md px-2 py-1 focus:outline-none"
          >
            <option>N/A</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        ) : (
          userInfo?.sex || "N/A"
        )}
      </p>
      <p className="text-md mb-2">
  <span className="text-cyan-100">Height: </span>
  {isEditing ? (
    <input
      type="text"
      value={editedUserInfo?.height || ""}
      placeholder="Height in cm/ft.inch"
      onChange={(e) => handleInputChange("height", e.target.value || null)}
      className="bg-gray-800 text-white rounded-md px-2 py-1 focus:outline-none"
    />
  ) : (
    userInfo?.height || "N/A"
  )}
</p>

<p className="text-md mb-2">
  <span className="text-cyan-100">Weight: </span>
  {isEditing ? (
    <input
      type="text"
      value={editedUserInfo?.weight || ""}
      placeholder="Weight in kg/lbs"
      onChange={(e) => handleInputChange("weight", e.target.value || null)}
      className="bg-gray-800 text-white rounded-md px-2 py-1 focus:outline-none"
    />
  ) : (
    userInfo?.weight || "N/A"
  )}
</p>

      <p className="text-md font-bold">
        <span className="text-cyan-100">Total Posted Articles: </span>
        {totalArticles}
      </p>
    </div>
  );
};

export default ProfileCard;
