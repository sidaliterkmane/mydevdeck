import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ChangePassword from "./components/ChangePassword";

const Dashboard = () => {
  // Accessing user context to retrieve and update user information
  const { user, setUser }: any = useContext(UserContext);
  const navigate = useNavigate();

  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    // Check if user data is available
    if (user) {
      // Check if it's the first login
      if (user.completedRegistration === false) {
        setShowChangePassword(true);
      } else {
        setShowChangePassword(false);
      }
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
      localStorage.removeItem("user");
      setUser(null);
      toast.success("You have successfully logged out.");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handlePasswordChangeConfirm = async (newPassword: string) => {
    try {
      await axios.post("/auth/change-password", { password: newPassword });

      // Re-fetch user profile to update context
      const profileResponse = await axios.get("/auth/profile");
      setUser(profileResponse.data);

      setShowChangePassword(false);
      toast.success("Password changed successfully.");
    } catch (error) {
      console.error("Password change failed:", error);
      toast.error("Failed to change password.");
    }
  };

  // Redirect to login if user is not logged in
  if (user === null) {
    navigate("/login");
    return null;
  }

  // Display a loading message while user data is being fetched
  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-950">
      <div className="border border-neutral-800 w-[400px] rounded-xl p-[2rem] flex flex-col gap-4 justify-between items-center">
        <p>Logged in as : {user.email}</p>
        <button
          onClick={handleLogout}
          className="w-full h-[40px] rounded-lg border border-neutral-800 bg-neutral-900 pl-4 text-sm text-neutral-300 transition hover:brightness-105"
        >
          Logout →
        </button>
      </div>

      {showChangePassword && (
        <ChangePassword
          header="Looks like this is your first time..."
          description="Please change your password in order to complete your registration"
          confirmContent="Complete registration"
          handleClose={() => setShowChangePassword(false)}
          handleConfirm={handlePasswordChangeConfirm}
          popup={showChangePassword}
        />
      )}
    </div>
  );
};

export default Dashboard;
