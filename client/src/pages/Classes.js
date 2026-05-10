import { useEffect, useState } from "react";
import axios from "axios";

function Classes() {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    instructorId: "",
    className: "",
    day: "Monday",
    time: "",
    classType: "General",
    payRate: "",
  });

  const fetchClasses = async () => {
    const response = await axios.get("http://localhost:5000/api/classes");
    setClasses(response.data);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/classes", formData);

      setFormData({
        instructorId: "",
        className: "",
        day: "Monday",
        time: "",
        classType: "General",
        payRate: "",
      });

      fetchClasses();
    } catch (error) {
      alert(error.response?.data?.message || "Error adding class");
    }
  };

  return (
    <div>
      <h2>Classes</h2>

      <form onSubmit={handleSubmit}>
        <input name="instructorId" placeholder="Instructor ID, e.g. I00001" value={formData.instructorId} onChange={handleChange} required />
        <input name="className" placeholder="Class Name" value={formData.className} onChange={handleChange} required />

        <select name="day" value={formData.day} onChange={handleChange}>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>

        <input name="time" placeholder="Time, e.g. 9:00 AM" value={formData.time} onChange={handleChange} required />

        <select name="classType" value={formData.classType} onChange={handleChange}>
          <option value="General">General</option>
          <option value="Special">Special</option>
        </select>

        <input type="number" name="payRate" placeholder="Pay Rate" value={formData.payRate} onChange={handleChange} required />

        <button type="submit">Add Class</button>
      </form>

      <h3>Class List</h3>

      <ul>
        {classes.map((classItem) => (
          <li key={classItem._id}>
            {classItem.classId} - {classItem.className} - {classItem.day} {classItem.time} - Instructor: {classItem.instructorId}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Classes;