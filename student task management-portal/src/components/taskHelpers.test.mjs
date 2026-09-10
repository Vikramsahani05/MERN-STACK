import test from 'node:test';
import assert from 'node:assert/strict';
import { nextTaskStatus, createTask } from './taskHelpers.js';

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
