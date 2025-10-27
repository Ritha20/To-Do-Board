import React, { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTask from './SortableTask';

const TaskColumn = ({ title, tasks, onAddTask, onTaskEdit, onTaskDelete, onTaskToggleStatus, status }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', dueDate: '' });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.name.trim()) {
      onAddTask(newTask.name, newTask.dueDate, status);
      setNewTask({ name: '', dueDate: '' });
      setShowAddForm(false);
    }
  };

  const taskIds = tasks.map(task => task.id);

  return (
    <div className="bg-amber-100 rounded-lg p-4 w-full lg:w-80 flex-shrink-0 min-h-96">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      
      <div className="space-y-2 mb-4 min-h-48">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              task={task}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
              onToggleStatus={onTaskToggleStatus}
            />
          ))}
        </SortableContext>
      </div>

      {/* Add Task Section */}
      {showAddForm ? (
        <div className="bg-white p-3 rounded shadow">
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Task Name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="w-full mb-2 p-2 border rounded text-sm sm:text-base"
              required
            />
            <input
              type="date"
              placeholder="Due Date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              className="w-full mb-2 p-2 border rounded text-sm sm:text-base"
            />
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-amber-800 text-white px-4 py-2 rounded flex-1 text-sm sm:text-base hover:bg-amber-700 transition-colors"
              >
                Add Card
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded flex-1 text-sm sm:text-base hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-amber-500 text-white px-4 py-2 rounded w-full hover:bg-amber-600 transition text-sm sm:text-base"
        >
          <i className="fas fa-plus mr-2"></i>Add Card
        </button>
      )}
    </div>
  );
};

export default TaskColumn;