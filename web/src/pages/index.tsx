import { useState } from 'react';
import Task from '@/model/Task';
import { getActiveTasks, getCompletedTasks, getAllTasks, completeTask, createTask, deleteTask } from '@/modules/taskManager';
import styles from './index.module.css';

export default function Home() {
  const [activeTasks, setActiveTasks] = useState<Task[]>(getActiveTasks());
  const [progressTasks, setProgressTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>(getCompletedTasks());

  const handleChooseTask = (taskId: number) => {
    const task = activeTasks.find(t => t.id === taskId);
    if (task) {
      setActiveTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
      setProgressTasks(prevTasks => [...prevTasks, task]);
    } else {
      console.error('Task not found for choosing.');
    }
  };

  const handleCompleteTask = (taskId: number) => {
    const task = progressTasks.find(t => t.id === taskId);
    if (task) {
      setProgressTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
      setCompletedTasks(prevTasks => [...prevTasks, task]);
    } else {
      console.error('Task not found for completing.');
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setActiveTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    setProgressTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    setCompletedTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Task Board</h1>
      <div className={styles.taskCounts}>
        <div className={styles.taskCount}>To Do: {activeTasks.length}</div>
        <div className={styles.taskCount}>In Progress: {progressTasks.length}</div>
        <div className={styles.taskCount}>Completed: {completedTasks.length}</div>
      </div>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h2 className={styles.columnHeading}>To Do</h2>
          <ul className={styles.taskList}>
            {activeTasks.map(task => (
              <li key={task.id} className={styles.taskItem}>
                <span className={styles.taskName}>{task.title}</span>
                <div>
                  <button
                    className={styles.button}
                    onClick={() => handleChooseTask(task.id)}
                  >
                    Choose
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <h2 className={styles.columnHeading}>In Progress</h2>
          <ul className={styles.taskList}>
            {progressTasks.map(task => (
              <li key={task.id} className={styles.taskItem}>
                <span className={styles.taskName}>{task.title}</span>
                <div>
                  <button
                    className={styles.button}
                    onClick={() => handleCompleteTask(task.id)}
                  >
                    Complete
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <h2 className={styles.columnHeading}>Completed</h2>
          <ul className={styles.taskList}>
            {completedTasks.map(task => (
              <li key={task.id} className={styles.taskItem}>
                <span className={styles.taskName}>{task.title}</span>
                <button
                  className={styles.button}
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
