// profile/components/ProfileCard.tsx

import { useState, useEffect } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext

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
          setUserInfo({
            full_name: userData.name,
            email: userData.email,
            age: userData.age || null,
            sex: userData.sex || null,
            height: userData.height || null,
            weight: userData.weight || null,
          });
        } else {
          console.error("User document not found in Firestore.");
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
  }, [userId]); // Re-run if userId changes

  return (
    <div className="w-full max-w-4xl p-6 mb-6 bg-gray-900 border border-gray-300 rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-gray-300">{userInfo?.full_name || "User"}</span>
      </h1>
      <p className="text-md mb-2">
        <span className="text-cyan-100">Email: </span>
        {userInfo?.email || "N/A"}
      </p>
      <p className="text-md mb-2">
        <span className="text-cyan-100">Age: </span>
        {userInfo?.age || "N/A"}
      </p>
      <p className="text-md mb-2">
        <span className="text-cyan-100">Sex: </span>
        {userInfo?.sex || "N/A"}
      </p>
      <p className="text-md mb-2">
        <span className="text-cyan-100">Height: </span>
        {userInfo?.height || "N/A"}
      </p>
      <p className="text-md mb-2">
        <span className="text-cyan-100">Weight: </span>
        {userInfo?.weight || "N/A"}
      </p>
      <p className="text-md font-bold">
        <span className="text-cyan-100">Total Posted Articles: </span>
        {totalArticles}
      </p>
    </div>
  );
};

export default ProfileCard;
