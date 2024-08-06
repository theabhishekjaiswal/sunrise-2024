import Task from '@/model/Task';
import { initialTasks } from '@/utils/TaskList';

let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
  tasks = [...initialTasks];
}

export function getActiveTasks(): Task[] {
  return tasks.filter(task => !task.completed);
}

export function getCompletedTasks(): Task[] {
  return tasks.filter(task => task.completed);
}

export function getAllTasks(): Task[] {
  return tasks;
}

export function completeTask(taskId: number): void {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.completed = true;
  }
}

export function createTask(title: string, description: string, persona: string, group: number): void {
  const newTask = new Task(
    Date.now(), 
    title,
    description,
    persona,
    group
  );
  tasks.push(newTask);
}

export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    Object.assign(task, updatedTask);
  }
}

export function deleteTask(taskId: number): void {
  tasks = tasks.filter(task => task.id !== taskId);
}
