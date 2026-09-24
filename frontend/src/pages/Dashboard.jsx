import { useEffect, useState } from "react";
import api from "../services/api";
import { logout } from "../services/auth";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("auth/profile/")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("You are not logged in.");
      });
  }, []);

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  if (!user) {
    return <h2>Loading dashboard...</h2>;
  }

  return (
    <div>
      <h1>Student Dashboard</h1>

      <h2>Welcome, {user.username}</h2>

      <p>Email: {user.email}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;