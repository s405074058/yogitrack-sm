import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    preferredCommunication: "email",
  });

  const fetchCustomers = async () => {
    const response = await axios.get("http://localhost:5000/api/customers");
    setCustomers(response.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/customers", formData);

    setFormData({
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
      preferredCommunication: "email",
    });

    fetchCustomers();
  };

  return (
    <div>
      <h2>Customers</h2>

      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

        <select name="preferredCommunication" value={formData.preferredCommunication} onChange={handleChange}>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>

        <button type="submit">Add Customer</button>
      </form>

      <h3>Customer List</h3>

      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            {customer.customerId} - {customer.firstName} {customer.lastName} - Balance: {customer.classBalance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Customers;