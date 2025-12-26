import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const getProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const createProject = async () => {
    if (!name) return alert("Enter project name");
    await api.post("/projects", { name });
    setName("");
    getProjects();
  };

  const openProject = (id) => navigate(`/tasks/${id}`);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => { getProjects(); }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>🚀 Dashboard</h1>
      <h3>Create Project</h3>

      <input 
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createProject}>Add</button>

      <h2 style={{ marginTop: "30px" }}>Your Projects</h2>
      <ul>
        {projects.map(p => (
          <li key={p.id}>
            {p.name}
            <button onClick={() => openProject(p.id)}>View Tasks</button>
          </li>
        ))}
      </ul>

      <button onClick={logout} style={{ marginTop: "30px" }}>Logout</button>
    </div>
  );
}

export default Dashboard;   // <-- MUST be on a new line AFTER component closes
