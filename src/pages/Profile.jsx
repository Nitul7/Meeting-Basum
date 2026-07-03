import React, { useRef, useState, useEffect } from "react";
import "../styles/ProfileSettings.css";
import { getMyProfile, updateMyProfile, uploadAvatar } from "../services/ProfileService";
import { toast } from "react-toastify";

const ProfileSettings = () => {
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(
    "src\\assets\\mee.JPG"
  );

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          bio: data.bio || "",
        });
        if (data.avatar) {
          setProfileImage(data.avatar);
        }
      } catch (error) {
        toast.error("Could not load profile");
      }
    };
    fetchProfile();
  }, []);

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
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);

    try {
      const updated = await uploadAvatar(file);
      setProfileImage(updated.avatar);
    } catch (error) {
      toast.error("Could not upload photo");
    }
  };

  // SAVE
  const handleSave = async () => {
    try {
      await updateMyProfile({
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
      });
      toast.success("Profile saved successfully!");
    } catch (error) {
      toast.error("Could not save profile");
    }
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
              disabled
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
