const toHoursAndMinutes = (totalMinutes) => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  return `${hours}ч${minutes}м`;
};

export { toHoursAndMinutes };
