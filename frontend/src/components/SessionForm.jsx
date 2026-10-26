import { useState } from 'react';
import { addSession } from '../services/sessionService';
import { validateSession } from '../utils/validation';
import AlertMessage from './AlertMessage';
import LoadingSpinner from './LoadingSpinner';

const initialValues = { stationName: '', vehicleNumber: '', energyKwh: '', completed: '' };

function SessionForm({ onCreated }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [success, setSuccess] = useState('');

  const update = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const validationErrors = validateSession(values);
    setErrors(validationErrors);
    setRequestError('');
    setSuccess('');
    if (Object.keys(validationErrors).length) return;

    setSaving(true);
    try {
      const created = await addSession({
        stationName: values.stationName.trim(),
        vehicleNumber: values.vehicleNumber.trim(),
        energyKwh: Number(values.energyKwh),
        completed: values.completed === 'true',
      });
      setValues(initialValues);
      setSuccess(`Session${created?.id ? ` #${created.id}` : ''} created successfully.`);
      await onCreated();
    } catch (error) {
      setRequestError(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      <AlertMessage type="success" message={success} onDismiss={() => setSuccess('')} />
      <AlertMessage message={requestError} onDismiss={() => setRequestError('')} />
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label" htmlFor="stationName">Station Name</label>
          <input id="stationName" name="stationName" className={`form-control ${errors.stationName ? 'is-invalid' : ''}`} value={values.stationName} onChange={update} maxLength="100" required />
          {errors.stationName && <div className="invalid-feedback">{errors.stationName}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="vehicleNumber">Vehicle Number</label>
          <input id="vehicleNumber" name="vehicleNumber" className={`form-control ${errors.vehicleNumber ? 'is-invalid' : ''}`} value={values.vehicleNumber} onChange={update} maxLength="20" required />
          {errors.vehicleNumber && <div className="invalid-feedback">{errors.vehicleNumber}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="energyKwh">Energy Consumption (kWh)</label>
          <input id="energyKwh" name="energyKwh" type="number" step="any" min="0.01" max="100000" className={`form-control ${errors.energyKwh ? 'is-invalid' : ''}`} value={values.energyKwh} onChange={update} required />
          {errors.energyKwh && <div className="invalid-feedback">{errors.energyKwh}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="completed">Charging Status</label>
          <select id="completed" name="completed" className={`form-select ${errors.completed ? 'is-invalid' : ''}`} value={values.completed} onChange={update} required>
            <option value="">Select status</option>
            <option value="false">In Progress</option>
            <option value="true">Completed</option>
          </select>
          {errors.completed && <div className="invalid-feedback">{errors.completed}</div>}
        </div>
      </div>
      <button className="btn btn-primary mt-4 px-4" type="submit" disabled={saving}>
        {saving ? <LoadingSpinner label="Saving..." /> : <><i className="bi bi-plus-lg me-2" />Add Session</>}
      </button>
    </form>
  );
}

export default SessionForm;
