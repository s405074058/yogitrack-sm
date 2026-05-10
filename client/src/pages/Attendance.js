import { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [formData, setFormData] = useState({
    classId: "",
    customerId: "",
  });

  const fetchAttendance = async () => {
    const response = await axios.get("http://localhost:5000/api/attendance");
    setAttendance(response.data);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/attendance", formData);

      setFormData({
        classId: "",
        customerId: "",
      });

      fetchAttendance();

      if (response.data.warning) {
        alert(response.data.warning);
      } else {
        alert("Attendance recorded successfully");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error recording attendance");
    }
  };

  return (
    <div>
      <h2>Attendance</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="classId"
          placeholder="Class ID, e.g. CL00001"
          value={formData.classId}
          onChange={handleChange}
          required
        />

        <input
          name="customerId"
          placeholder="Customer ID, e.g. C00001"
          value={formData.customerId}
          onChange={handleChange}
          required
        />

        <button type="submit">Record Attendance</button>
      </form>

      <h3>Attendance List</h3>

      <ul>
        {attendance.map((record) => (
          <li key={record._id}>
            {record.attendanceId} - Class: {record.classId} - Customer: {record.customerId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Attendance;