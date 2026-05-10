import { useEffect, useState } from "react";
import axios from "axios";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    packageName: "",
    packageCategory: "General",
    numberOfClasses: "4",
    classType: "General",
    startDate: "",
    endDate: "",
    price: "",
  });

  const fetchPackages = async () => {
    const response = await axios.get("http://localhost:5000/api/packages");
    setPackages(response.data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/packages", formData);

    setFormData({
      packageName: "",
      packageCategory: "General",
      numberOfClasses: "4",
      classType: "General",
      startDate: "",
      endDate: "",
      price: "",
    });

    fetchPackages();
  };

  return (
    <div>
      <h2>Packages</h2>

      <form onSubmit={handleSubmit}>
        <input name="packageName" placeholder="Package Name" value={formData.packageName} onChange={handleChange} required />

        <select name="packageCategory" value={formData.packageCategory} onChange={handleChange}>
          <option value="General">General</option>
          <option value="Senior">Senior</option>
        </select>

        <select name="numberOfClasses" value={formData.numberOfClasses} onChange={handleChange}>
          <option value="1">1 Class</option>
          <option value="4">4 Classes</option>
          <option value="10">10 Classes</option>
          <option value="unlimited">Unlimited</option>
        </select>

        <select name="classType" value={formData.classType} onChange={handleChange}>
          <option value="General">General</option>
          <option value="Special">Special</option>
        </select>

        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />

        <button type="submit">Add Package</button>
      </form>

      <h3>Package List</h3>

      <ul>
        {packages.map((pkg) => (
          <li key={pkg._id}>
            {pkg.packageId} - {pkg.packageName} - {pkg.numberOfClasses} classes - ${pkg.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Packages;