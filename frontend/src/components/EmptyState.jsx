function EmptyState() {
  return (
    <div className="empty-state text-center py-5">
      <i className="bi bi-ev-front display-5 text-muted" />
      <h3 className="h5 mt-3">No charging sessions yet</h3>
      <p className="text-muted mb-0">Add your first session to see it appear here.</p>
    </div>
  );
}

export default EmptyState;
