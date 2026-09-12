import test from 'node:test';
import assert from 'node:assert/strict';
import { nextTaskStatus, createTask, deleteTask } from './taskHelpers.js';

test('nextTaskStatus flips pending to completed and completed to pending', () => {
  assert.equal(nextTaskStatus('pending'), 'completed');
  assert.equal(nextTaskStatus('completed'), 'pending');
});

test('createTask creates a task with default pending status and a title', () => {
  const task = createTask('New study task');

  assert.equal(task.title, 'New study task');
  assert.equal(task.status, 'pending');
  assert.equal(task.description, '');
  assert.ok(typeof task.id === 'number');
});

test('deleteTask removes the matching task id and keeps the other tasks', () => {
  const tasks = [
    { id: 1, title: 'Alpha', status: 'pending' },
    { id: 2, title: 'Beta', status: 'completed' }
  ];

  const result = deleteTask(tasks, 1);

  assert.deepEqual(result, [
    { id: 2, title: 'Beta', status: 'completed' }
  ]);
});
