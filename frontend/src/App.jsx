import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const handleAddUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      setMessage(data.message);

      setName("");
      setEmail("");
    } catch (error) {
      setMessage("Error adding user");
    }
  };

  const handleFetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.log("Error fetching users");
    }
  };

  const handleDeleteUser = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:5000/users/${email}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      alert(data.message);

      handleFetchUsers();
    } catch (error) {
      console.log("Error deleting user");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>User Directory App</h1>

      <div>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", marginBottom: "10px" }}
        />

        <br />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", marginBottom: "10px" }}
        />

        <br />

        <button
          onClick={handleAddUser}
          style={{ padding: "10px", cursor: "pointer" }}
        >
          Add User
        </button>

        <p>{message}</p>
      </div>

      <hr />

      <button
        onClick={handleFetchUsers}
        style={{ padding: "10px", cursor: "pointer" }}
      >
        Fetch All Users
      </button>

      <h2>Users List</h2>

      <ul>
        {users.map((user, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {user.name} - {user.email}

            <button
              onClick={() => handleDeleteUser(user.email)}
              style={{
                marginLeft: "10px",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

