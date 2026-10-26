function ConfirmDeleteModal({ session, deleting, onConfirm, onCancel }) {
  if (!session) return null;
  return (
    <div className="modal-backdrop-custom" role="presentation">
      <div className="modal-dialog modal-dialog-centered" role="dialog" aria-modal="true" aria-labelledby="delete-title">
        <div className="modal-content border-0 shadow">
          <div className="modal-header"><h2 className="modal-title h5" id="delete-title">Delete session?</h2><button className="btn-close" onClick={onCancel} aria-label="Close" disabled={deleting} /></div>
          <div className="modal-body">Delete <strong>{session.stationName}</strong> (ID #{session.id})? This action cannot be undone.</div>
          <div className="modal-footer"><button className="btn btn-light" onClick={onCancel} disabled={deleting}>Cancel</button><button className="btn btn-danger" onClick={onConfirm} disabled={deleting}>{deleting ? 'Deleting...' : 'Delete session'}</button></div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
