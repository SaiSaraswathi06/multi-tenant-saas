import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

export default function Tasks() {
  const { id } = useParams();  // project_id from URL
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    try {
      const res = await api.get(`/tasks/project/${id}`);
      setTasks(res.data);
    } catch {
      alert("Failed to fetch tasks");
    }
  };

  const addTask = async () => {
    if (!title.trim()) return alert("Enter task name");
    await api.post("/tasks", { title, project_id: id });
    setTitle("");
    loadTasks();
  };

  const updateStatus = async (taskId, status) => {
    await api.put(`/tasks/${taskId}`, { status });
    loadTasks();
  };

  const deleteTask = async (taskId) => {
    await api.delete(`/tasks/${taskId}`);
    loadTasks();
  };

useEffect(() => { loadTasks(); }, [id]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>📝 Task Manager</h1>
      <h3>Add Task</h3>

      <input 
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        placeholder="Task name"
        style={{padding:"10px", width:"250px"}}
      />
      <button onClick={addTask} style={{padding:"10px", marginLeft:"10px"}}>Add</button>

      <h2 style={{marginTop:"30px"}}>Tasks</h2>

      <ul style={{lineHeight:"35px"}}>
        {tasks.map(t => (
          <li key={t.id}>
            <b>{t.title}</b> — {t.status}

            <select 
              value={t.status} 
              onChange={e => updateStatus(t.id, e.target.value)}
              style={{marginLeft:"10px"}}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <button 
              onClick={()=>deleteTask(t.id)}
              style={{marginLeft:"10px", background:"red", color:"#fff", padding:"5px 10px"}}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <br/>
      <button onClick={() => navigate("/dashboard")} style={{padding:"8px"}}>
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}
