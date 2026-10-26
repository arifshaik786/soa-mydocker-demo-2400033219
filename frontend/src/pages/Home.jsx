import { useMemo, useState } from 'react';
import NavBar from '../components/NavBar';
import SessionForm from '../components/SessionForm';
import SessionTable from '../components/SessionTable';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import AlertMessage from '../components/AlertMessage';
import useSessions from '../hooks/useSessions';

function Home() {
  const { sessions, loading, error, refresh, remove } = useSessions();
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState('');
  const stats = useMemo(() => ({
    total: sessions.length,
    completed: sessions.filter((session) => Boolean(session.completed)).length,
    inProgress: sessions.filter((session) => !session.completed).length,
    energy: sessions.reduce((sum, session) => sum + (Number(session.energyKwh) || 0), 0),
  }), [sessions]);

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await remove(selected.id);
      setSelected(null);
      setFeedback('Session deleted successfully.');
    } catch (requestError) {
      setFeedback(requestError.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <NavBar />
      <main id="dashboard">
        <section className="hero-section">
          <div className="container">
            <div className="row align-items-center g-4">
              <div className="col-lg-8">
                <p className="eyebrow mb-2"><i className="bi bi-broadcast-pin me-2" />Smart mobility control center</p>
                <h1>EV Charging Session Dashboard</h1>
                <p className="lead mb-0">Track energy usage, charging progress, and station activity in one clear view.</p>
              </div>
              <div className="col-lg-4 text-lg-end"><div className="hero-icon"><i className="bi bi-ev-front" /></div></div>
            </div>
          </div>
        </section>
        <div className="container content-container">
          <div className="row g-3 mb-4">
            {[['Total Sessions', stats.total, 'bi-collection', 'blue'], ['Completed', stats.completed, 'bi-check-circle', 'green'], ['In Progress', stats.inProgress, 'bi-lightning-charge', 'orange'], ['Energy Consumed', `${stats.energy.toFixed(2)} kWh`, 'bi-bar-chart-line', 'purple']].map(([label, value, icon, color]) => (
              <div className="col-6 col-xl-3" key={label}><div className="stat-card"><div className={`stat-icon ${color}`}><i className={`bi ${icon}`} /></div><div><p>{label}</p><strong>{value}</strong></div></div></div>
            ))}
          </div>
          <AlertMessage type={feedback.includes('successfully') ? 'success' : 'danger'} message={feedback} onDismiss={() => setFeedback('')} />
          <section id="add-session" className="card app-card mb-4">
            <div className="card-body p-4 p-lg-5"><div className="section-heading"><div><p className="eyebrow">Record activity</p><h2 className="h4 mb-1">Add Charging Session</h2><p className="text-muted mb-0">Capture a new vehicle charging event.</p></div><i className="bi bi-plus-circle section-icon" /></div><hr className="my-4" /><SessionForm onCreated={async () => { await refresh(); }} /></div>
          </section>
          <section id="all-sessions" className="card app-card">
            <div className="card-body p-4 p-lg-5">
              <div className="section-heading"><div><p className="eyebrow">Live records</p><h2 className="h4 mb-1">All Sessions</h2><p className="text-muted mb-0">Persisted sessions from your charging database.</p></div><button className="btn btn-outline-primary" onClick={refresh} disabled={loading}><i className="bi bi-arrow-clockwise me-2" />Refresh</button></div>
              <hr className="my-4" />
              <AlertMessage message={error} />
              <SessionTable sessions={sessions} loading={loading} onDelete={setSelected} deletingId={deleting ? selected?.id : null} />
            </div>
          </section>
        </div>
      </main>
      <footer className="py-4 text-center text-muted small">EV Charge Manager · Charging smarter for a cleaner future</footer>
      <ConfirmDeleteModal session={selected} deleting={deleting} onConfirm={confirmDelete} onCancel={() => setSelected(null)} />
    </>
  );
}

export default Home;
