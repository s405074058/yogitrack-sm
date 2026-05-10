import { useEffect, useState } from "react";
import axios from "axios";

function Reports() {
  const [salesReport, setSalesReport] = useState([]);
  const [instructorReport, setInstructorReport] = useState([]);
  const [customerReport, setCustomerReport] = useState([]);
  const [paymentReport, setPaymentReport] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reports/sales").then((res) => setSalesReport(res.data));
    axios.get("http://localhost:5000/api/reports/instructors").then((res) => setInstructorReport(res.data));
    axios.get("http://localhost:5000/api/reports/customers").then((res) => setCustomerReport(res.data));
    axios.get("http://localhost:5000/api/reports/teacher-payments").then((res) => setPaymentReport(res.data));
  }, []);

  return (
    <div>
      <h2>Reports</h2>

      <h3>Package Sales Report</h3>
      <ul>
        {salesReport.map((sale) => (
          <li key={sale._id}>
            {sale.saleId} - Customer: {sale.customerId} - Package: {sale.packageId} - ${sale.amountPaid}
          </li>
        ))}
      </ul>

      <h3>Instructor Report</h3>
      <ul>
        {instructorReport.map((item) => (
          <li key={item.instructorId}>
            {item.instructorId} - {item.name} - Check-ins: {item.totalCheckIns}
          </li>
        ))}
      </ul>

      <h3>Customer Report</h3>
      <ul>
        {customerReport.map((item) => (
          <li key={item.customerId}>
            {item.customerId} - {item.name} - Balance: {item.classBalance}
          </li>
        ))}
      </ul>

      <h3>Teacher Payment Report</h3>
      <ul>
        {paymentReport.map((item) => (
          <li key={item.instructorId}>
            {item.instructorId} - {item.name} - Total Payment: ${item.totalPayment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reports;