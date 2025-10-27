import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Navigation from './components/Navigation';
import FilterButtons from './components/FilterButtons';
import TaskColumn from './components/TaskColumn';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Completing Task Board Assignment", dueDate: "2025-09-28", status: "pending" },
    { id: 2, name: "studying objects", dueDate: "2025-10-05", status: "pending" },
    { id: 3, name: "shopping", dueDate: "2025-10-20", status: "pending" },
    { id: 4, name: "writing", dueDate: "2025-10-01", status: "completed" },
    { id: 5, name: "preparing", dueDate: "2025-11-04", status: "pending" }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [nextId, setNextId] = useState(6);

  const sensors = useSensors(useSensor(PointerSensor));

  // Filter tasks based on search and filter
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'pending' && task.status === 'pending') ||
      (filter === 'completed' && task.status === 'completed');
    
    return matchesSearch && matchesFilter;
  });

  // Separate tasks by status
  const todoTasks = filteredTasks.filter(task => task.status === 'pending');
  const doneTasks = filteredTasks.filter(task => task.status === 'completed');

  // Task Operations
  const handleAddTask = (name, dueDate, status) => {
    const newTask = {
      id: nextId,
      name,
      dueDate,
      status
    };
    setTasks(prev => [...prev, newTask]);
    setNextId(prev => prev + 1);
  };

  const handleEditTask = (task) => {
    const newName = prompt('Edit task name:', task.name);
    if (newName !== null && newName.trim() !== '') {
      setTasks(prev => prev.map(t => 
        t.id === task.id ? { ...t, name: newName.trim() } : t
      ));
    }

    const newDate = prompt('Edit due date (YYYY-MM-DD):', task.dueDate);
    if (newDate !== null) {
      setTasks(prev => prev.map(t => 
        t.id === task.id ? { ...t, dueDate: newDate } : t
      ));
    }
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(t => t.id !== taskId));
    }
  };

  const handleToggleStatus = (taskId) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'pending' ? 'completed' : 'pending';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  // Drag and Drop Handlers
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Task reordering within same column
    if (activeId !== overId) {
      const activeTask = tasks.find(task => task.id === activeId);
      const overTask = tasks.find(task => task.id === overId);

      if (activeTask && overTask && activeTask.status === overTask.status) {
        // Reorder within same status
        const statusTasks = tasks.filter(task => task.status === activeTask.status);
        const otherTasks = tasks.filter(task => task.status !== activeTask.status);
        
        const oldIndex = statusTasks.findIndex(task => task.id === activeId);
        const newIndex = statusTasks.findIndex(task => task.id === overId);

        if (oldIndex !== newIndex) {
          const newStatusTasks = arrayMove(statusTasks, oldIndex, newIndex);
          setTasks([...otherTasks, ...newStatusTasks]);
        }
      }
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled by the state update in the input field
  };

  return (
    <div className="bg-amber-900 min-h-screen">
      <Navigation 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchSubmit={handleSearchSubmit}
      />

      <div className="container mx-auto px-4 sm:px-8 py-8">
        <h1 className="text-xl font-mono font-bold mb-6 text-center text-white">Task Management Board</h1>
        
        <FilterButtons 
          currentFilter={filter}
          onFilterChange={setFilter}
        />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-col lg:flex-row justify-center gap-4">
            <TaskColumn
              title="To Do (pending)"
              tasks={todoTasks}
              onAddTask={handleAddTask}
              onTaskEdit={handleEditTask}
              onTaskDelete={handleDeleteTask}
              onTaskToggleStatus={handleToggleStatus}
              status="pending"
            />

            <TaskColumn
              title="Done (completed)"
              tasks={doneTasks}
              onAddTask={handleAddTask}
              onTaskEdit={handleEditTask}
              onTaskDelete={handleDeleteTask}
              onTaskToggleStatus={handleToggleStatus}
              status="completed"
            />
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default App;