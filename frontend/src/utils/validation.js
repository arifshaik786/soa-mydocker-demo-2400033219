export function validateSession(values) {
  const errors = {};
  const stationName = values.stationName.trim();
  const vehicleNumber = values.vehicleNumber.trim();
  const energyText = String(values.energyKwh).trim();

  if (!stationName) errors.stationName = 'Station name is required.';
  else if (stationName.length > 100) errors.stationName = 'Station name must be 100 characters or fewer.';

  if (!vehicleNumber) errors.vehicleNumber = 'Vehicle number is required.';
  else if (vehicleNumber.length > 20) errors.vehicleNumber = 'Vehicle number must be 20 characters or fewer.';

  const energy = Number(energyText);
  if (!energyText) errors.energyKwh = 'Energy consumption is required.';
  else if (!Number.isFinite(energy)) errors.energyKwh = 'Enter a valid number.';
  else if (energy <= 0) errors.energyKwh = 'Energy must be greater than zero.';
  else if (energy > 100000) errors.energyKwh = 'Energy must not exceed 100000 kWh.';

  if (!['true', 'false'].includes(values.completed)) errors.completed = 'Select a charging status.';
  return errors;
}
