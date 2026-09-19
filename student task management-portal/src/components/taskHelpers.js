export function nextTaskStatus(status) {
  return status?.toLowerCase() === 'pending' ? 'completed' : 'pending';
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

export function deleteTask(tasks, taskId, getTaskId = (task) => task.id) {
  return tasks.filter((task) => getTaskId(task) !== taskId);
}
