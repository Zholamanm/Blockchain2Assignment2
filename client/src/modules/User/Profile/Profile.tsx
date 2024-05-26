import React, { useEffect, useState } from "react";
import UserService from "../../../services/UserService";
import User from "../../../types/User";
import "./Profile.css";

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [userID, setUserId] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await UserService.getProfile();
        setUserProfile(profile);
        setUserId(profile._id);
        setUsername(profile.username || "");
        setBio(profile.bio || "");
        setEmail(profile.email || "");
        setFirstname(profile.firstname || "");
        setLastname(profile.lastname || "");
        setWalletAddress(profile.wallet_address || "");
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProfile = await UserService.updateProfile({
        userID,
        username,
        bio,
        email,
        firstname,
        lastname,
        wallet_address: walletAddress,
      });
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
      <div className="profile-container">
        <h2>User Profile</h2>
        {userProfile && (
            <form className="profile-form" onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label>Bio:</label>
                <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div>
                <label>Wallet Address:</label>
                <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                />
              </div>
              <button type="submit" className="update-button">
                Update Profile
              </button>
            </form>
        )}
      </div>
  );
};

export default Profile;
