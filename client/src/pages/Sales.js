import { useEffect, useState } from "react";
import axios from "axios";

function Sales() {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    customerId: "",
    packageId: "",
    amountPaid: "",
    modeOfPayment: "Card",
    validityStartDate: "",
    validityEndDate: "",
  });

  const fetchSales = async () => {
    const response = await axios.get("http://localhost:5000/api/sales");
    setSales(response.data);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/sales", formData);

      setFormData({
        customerId: "",
        packageId: "",
        amountPaid: "",
        modeOfPayment: "Card",
        validityStartDate: "",
        validityEndDate: "",
      });

      fetchSales();
      alert("Sale recorded successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Error recording sale");
    }
  };

  return (
    <div>
      <h2>Sales</h2>

      <form onSubmit={handleSubmit}>
        <input name="customerId" placeholder="Customer ID, e.g. C00001" value={formData.customerId} onChange={handleChange} required />
        <input name="packageId" placeholder="Package ID, e.g. P00001" value={formData.packageId} onChange={handleChange} required />
        <input type="number" name="amountPaid" placeholder="Amount Paid" value={formData.amountPaid} onChange={handleChange} required />

        <select name="modeOfPayment" value={formData.modeOfPayment} onChange={handleChange}>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Online">Online</option>
        </select>

        <input type="date" name="validityStartDate" value={formData.validityStartDate} onChange={handleChange} required />
        <input type="date" name="validityEndDate" value={formData.validityEndDate} onChange={handleChange} required />

        <button type="submit">Record Sale</button>
      </form>

      <h3>Sales List</h3>

      <ul>
        {sales.map((sale) => (
          <li key={sale._id}>
            {sale.saleId} - Customer: {sale.customerId} - Package: {sale.packageId} - ${sale.amountPaid}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sales;