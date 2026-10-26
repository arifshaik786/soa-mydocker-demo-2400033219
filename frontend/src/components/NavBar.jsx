function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="#dashboard">
          <span className="brand-mark"><i className="bi bi-lightning-charge-fill" /></span>
          EV Charge Manager
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="#dashboard">Dashboard</a>
            <a className="nav-link" href="#add-session">Add Session</a>
            <a className="nav-link" href="#all-sessions">All Sessions</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
