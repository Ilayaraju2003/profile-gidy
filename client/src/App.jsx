import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {

  const [profiles, setProfiles] = useState([]);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Fetch profiles
  const fetchProfiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/profile, https://profile-gidy.onrender.com/api/profile");
      setProfiles(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfiles();
  }, []);

  // Dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Like / Endorse
  const handleLike = async (id) => {

    const res = await axios.post(
      `https://profile-gidy.onrender.com/api/profile/${id}/endorse`
    );

    setProfiles((prev) =>
      prev.map((p) =>
        p.ID === id ? res.data : p
      )
    );
  };

  if (profiles.length === 0) return <div className="loading">Loading...</div>;

  return (
    <div className="container">

      {/* Header */}
      <div className="header">

        <h1>Developer Profiles</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-btn"
        >
          Toggle Theme
        </button>

      </div>

      {/* Profile Cards */}
      <div className="profile-grid">

        {profiles.map((profile) => (

          <div key={profile.ID} className="profile-card">

            <h2>{profile.NAME}</h2>

            <p className="role">{profile.ROLE}</p>

            <p>
              Marks: <b>{profile.MARK}</b>
            </p>

            <p>
              Grade: <b>{profile.GRADE}</b>
            </p>

            {/* Skills */}
            <div className="skills">

              {profile.SKILLS.split(",").map((skill) => (

                <span key={skill} className="skill">
                  {skill}
                </span>

              ))}

            </div>

            {/* Like button */}
            <button
              onClick={() => handleLike(profile.ID)}
              className="endorse-btn"
            >
              👍 {profile.LIKES}
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;