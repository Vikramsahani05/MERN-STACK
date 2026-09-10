export function nextTaskStatus(status) {
  return status === 'pending' ? 'completed' : 'pending';
}

export function formatTimeSpent(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;

  return `${hours}h ${minutes}m`;
}

export function createTask(title, description = '', timeSpent = 0) {
  return {
    id: Date.now(),
    title,
    description,
    status: 'pending',
    timeSpent
  };
}
