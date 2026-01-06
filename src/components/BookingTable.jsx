export default function BookingTable() {
  return (
    <div className="booking-table">
      <h3>Recent Bookings</h3>

      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Area</th>
            <th>Service</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Amit</td>
            <td>Kolkata</td>
            <td>Plumbing</td>
            <td className="pending">Pending</td>
          </tr>

          <tr>
            <td>Rohit</td>
            <td>Barasat</td>
            <td>Electrical</td>
            <td className="completed">Completed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
