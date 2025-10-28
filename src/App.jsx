import React, { useState } from 'react';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import Navigation from './components/Navigation';
import DraggableTask from './components/DraggableTask';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Completing Task Board Assignment", dueDate: "2025-09-28", status: "pending", x: 50, y: 100 },
    { id: 2, name: "studying objects", dueDate: "2025-10-05", status: "pending", x: 200, y: 150 },
    { id: 3, name: "shopping", dueDate: "2025-10-20", status: "pending", x: 350, y: 200 },
    { id: 4, name: "writing", dueDate: "2025-10-01", status: "completed", x: 500, y: 100 },
    { id: 5, name: "preparing", dueDate: "2025-11-04", status: "pending", x: 650, y: 150 }
  ]);

  const [nextId, setNextId] = useState(6);
  const [newTask, setNewTask] = useState({ name: '', dueDate: '', status: 'pending' });
  const [showAddForm, setShowAddForm] = useState(false);

  // Better sensors with activation constraints
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 3, // Only start dragging after 3px movement
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, // 150ms delay for touch
        tolerance: 5, // 5px tolerance
      },
    })
  );

  // Task Operations
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.name.trim()) {
      const taskToAdd = {
        id: nextId,
        name: newTask.name,
        dueDate: newTask.dueDate,
        status: newTask.status,
        x: Math.random() * (window.innerWidth - 300),
        y: Math.random() * (window.innerHeight - 200)
      };
      setTasks(prev => [...prev, taskToAdd]);
      setNextId(prev => prev + 1);
      setNewTask({ name: '', dueDate: '', status: 'pending' });
      setShowAddForm(false);
    }
  };

  const handleEditTask = (task) => {
    console.log('Editing task:', task.id);
    const newName = prompt('Edit task name:', task.name);
    if (newName !== null && newName.trim() !== '') {
      setTasks(prev => prev.map(t => 
        t.id === task.id ? { ...t, name: newName.trim() } : t
      ));
    }

    const newDate = prompt('Edit due date (YYYY-MM-DD):', task.dueDate || '');
    if (newDate !== null) {
      setTasks(prev => prev.map(t => 
        t.id === task.id ? { ...t, dueDate: newDate } : t
      ));
    }
  };

  const handleDeleteTask = (taskId) => {
    console.log('Deleting task:', taskId);
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== taskId));
    }
  };

  const handleToggleStatus = (taskId) => {
    console.log('Toggling status for task:', taskId);
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'pending' ? 'completed' : 'pending';
        console.log(`Changed task ${taskId} from ${task.status} to ${newStatus}`);
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  // Handle task movement
  const handleDragEnd = (event) => {
    const { active, delta } = event;
    
    setTasks(prev => prev.map(task => {
      if (task.id === active.id) {
        return {
          ...task,
          x: Math.max(0, task.x + delta.x),
          y: Math.max(0, task.y + delta.y)
        };
      }
      return task;
    }));
  };

  return (
    <div className="bg-amber-900 min-h-screen relative overflow-hidden">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-8 py-8">
        <h1 className="text-xl font-mono font-bold mb-6 text-center text-white">Click beloow to add task 😎 Bad Girllll</h1>

        {/* Add Task Section */}
        <div className="mb-8 flex justify-center">
          {showAddForm ? (
            <div className="bg-amber-100 rounded-lg p-6 w-full max-w-md z-50 relative">
              <h2 className="text-xl font-semibold mb-4 text-center">Add New Task</h2>
              <form onSubmit={handleAddTask}>
                <input
                  type="text"
                  placeholder="Task Name"
                  value={newTask.name}
                  onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                  className="w-full mb-3 p-3 border rounded text-sm sm:text-base"
                  required
                  autoFocus
                />
                <input
                  type="date"
                  placeholder="Due Date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full mb-3 p-3 border rounded text-sm sm:text-base"
                />
                <div className="flex space-x-2 mb-3 justify-center">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="pending"
                      checked={newTask.status === 'pending'}
                      onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                      className="mr-2"
                    />
                    To Do
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="completed"
                      checked={newTask.status === 'completed'}
                      onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                      className="mr-2"
                    />
                    Done
                  </label>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-amber-800 text-white px-4 py-2 rounded flex-1 text-sm sm:text-base hover:bg-amber-700 transition-colors"
                  >
                    Add Task
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
              className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition text-lg font-semibold z-10 relative"
            >
              ➕ Add New Task
            </button>
          )}
        </div>

        {/* Free Moving Tasks Area */}
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          <div className="relative min-h-screen">
            {tasks.map((task) => (
              <DraggableTask
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        </DndContext>

        {/* Status indicators */}
        <div className="fixed bottom-4 left-4 bg-amber-800 text-white px-4 py-2 rounded-lg z-10">
          To Do: {tasks.filter(t => t.status === 'pending').length} | 
          Done: {tasks.filter(t => t.status === 'completed').length}
        </div>
      </div>
    </div>
  );
};

export default App;