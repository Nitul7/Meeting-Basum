import React, { useRef, useState } from "react";
import "../styles/ProfileSettings.css";

const ProfileSettings = () => {
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(
    "src\\assets\\mee.JPG"
  );

  const [profile, setProfile] = useState({
    name: "Nitul Tako",
    email: "tnitul80@gmail.com",
    phone: "9808812406",
    bio: "MERN Stack Developer | Tech Enthusiast | Open Source Contributor",
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // OPEN FILE PICKER
  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  // HANDLE IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // SAVE
  const handleSave = () => {
    alert("Profile Saved Successfully ✅");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* LEFT */}
        <div className="profile-left">

          <img
            src={profileImage}
            alt="profile"
          />

          {/* HIDDEN INPUT */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />

          <button onClick={handlePhotoClick}>
            Change Photo
          </button>

          <p>JPG, PNG up to 2MB</p>
        </div>

        {/* RIGHT */}
        <div className="profile-right">

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Bio</label>
            <textarea
              rows="4"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
            />
          </div>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
