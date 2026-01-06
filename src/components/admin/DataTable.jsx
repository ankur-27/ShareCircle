import "../../styles/admin/admin-table.css";

export default function DataTable({ title, columns, data }) {
  return (
    <div className="admin-table-box">
      <h3>{title}</h3>

      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="empty">
                No records found
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, idx) => (
                  <td key={idx}>{val}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
