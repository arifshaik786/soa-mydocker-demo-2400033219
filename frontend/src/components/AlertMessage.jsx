function AlertMessage({ type = 'danger', message, onDismiss }) {
  if (!message) return null;
  return (
    <div className={`alert alert-${type} d-flex align-items-start justify-content-between gap-3`} role="alert">
      <span><i className={`bi ${type === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`} />{message}</span>
      {onDismiss && <button className="btn-close" aria-label="Dismiss message" onClick={onDismiss} />}
    </div>
  );
}

export default AlertMessage;
