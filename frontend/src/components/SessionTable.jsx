import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';

function StatusBadge({ completed }) {
  return <span className={`badge ${completed ? 'text-bg-success' : 'text-bg-warning'}`}>{completed ? 'Completed' : 'In Progress'}</span>;
}

function SessionTable({ sessions, loading, onDelete, deletingId }) {
  if (loading) return <div className="text-center py-5"><LoadingSpinner label="Loading sessions..." /></div>;
  if (!sessions.length) return <EmptyState />;

  return (
    <>
      <div className="table-responsive d-none d-md-block">
        <table className="table align-middle mb-0">
          <thead><tr><th>ID</th><th>Station Name</th><th>Vehicle Number</th><th>Energy (kWh)</th><th>Status</th><th className="text-end">Actions</th></tr></thead>
          <tbody>{sessions.map((session) => (
            <tr key={session.id}>
              <td className="fw-semibold text-muted">#{session.id}</td>
              <td>{session.stationName || '—'}</td>
              <td>{session.vehicleNumber || '—'}</td>
              <td>{Number(session.energyKwh || 0).toFixed(2)}</td>
              <td><StatusBadge completed={Boolean(session.completed)} /></td>
              <td className="text-end"><button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(session)} disabled={deletingId === session.id}><i className="bi bi-trash me-1" />{deletingId === session.id ? 'Deleting...' : 'Delete'}</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="d-md-none session-cards">{sessions.map((session) => (
        <div className="session-card" key={session.id}>
          <div className="d-flex justify-content-between align-items-start mb-3"><span className="fw-semibold">#{session.id}</span><StatusBadge completed={Boolean(session.completed)} /></div>
          <h3 className="h6 mb-1">{session.stationName || 'Unnamed station'}</h3>
          <p className="text-muted small mb-3">{session.vehicleNumber || 'No vehicle number'}</p>
          <div className="d-flex justify-content-between align-items-center"><span><strong>{Number(session.energyKwh || 0).toFixed(2)}</strong> kWh</span><button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(session)} disabled={deletingId === session.id}><i className="bi bi-trash me-1" />Delete</button></div>
        </div>
      ))}</div>
    </>
  );
}

export default SessionTable;
