import { useEffect, useState } from "react";
import axios from "axios";

function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    preferredCommunication: "email",
  });

  const fetchInstructors = async () => {
    const response = await axios.get("http://localhost:5000/api/instructors");
    setInstructors(response.data);
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/instructors", formData);

    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
      preferredCommunication: "email",
    });

    fetchInstructors();
  };

  return (
    <div>
      <h2 className="page-title">Instructors 🌷</h2>

      <div className="card">
        <h3>Add New Instructor</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <select
            name="preferredCommunication"
            value={formData.preferredCommunication}
            onChange={handleChange}
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>

          <button type="submit">💗 Add Instructor</button>
        </form>
      </div>

      <div className="card">
        <h3>Instructor List</h3>

        <ul>
          {instructors.map((instructor) => (
            <li key={instructor._id}>
              <strong>{instructor.instructorId}</strong> —{" "}
              {instructor.firstName} {instructor.lastName} — {instructor.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Instructors;