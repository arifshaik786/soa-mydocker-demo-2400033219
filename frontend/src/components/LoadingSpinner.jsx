function LoadingSpinner({ label = 'Loading...' }) {
  return <span className="d-inline-flex align-items-center gap-2"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />{label}</span>;
}

export default LoadingSpinner;
