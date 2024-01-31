import React, { useState } from 'react';


const Todolist = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);


  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks];
      if (editIndex !== null) {
        updatedTasks[editIndex].text = newTask;
        setEditIndex(null);
      } else {
        updatedTasks.push({ text: newTask, isCompleted: false });
      }
      setTasks(updatedTasks);
      setNewTask('');
    }
  };


  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };


  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    setTasks(updatedTasks);
  };


  const editTask = (index) => {
    setNewTask(tasks[index].text);
    setEditIndex(index);
  };


  const clearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.isCompleted);
    setTasks(updatedTasks);
  };


  const hasCompletedTasks = tasks.some((task) => task.isCompleted);


  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">To Do List</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow border rounded px-2 py-1 mr-2"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
          {editIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex items-center justify-between mb-2 p-4 border rounded ${
              task.isCompleted ? 'bg-gray-100' : ''
            }`}
          >
            <span className={task.isCompleted ? 'line-through text-gray-500' : ''}>{task.text}</span>
            <div className="space-x-2">
              <button onClick={() => editTask(index)} className="text-blue-500 hover:underline">
                Edit
              </button>
              <button onClick={() => removeTask(index)} className="text-red-500 hover:underline">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {hasCompletedTasks && (
        <button
          onClick={clearCompleted}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Completed
        </button>
      )}
    </div>
  );
};


export default Todolist;