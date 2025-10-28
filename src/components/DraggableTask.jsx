import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const DraggableTask = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    position: 'absolute',
    left: `${task.x}px`,
    top: `${task.y}px`,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1000 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const displayDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date';

  const handleEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onEdit(task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete(task.id);
  };

  const handleToggleStatus = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleStatus(task.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        bg-white p-4 rounded-lg shadow-xl task-card transition-all duration-200 
        hover:shadow-2xl hover:scale-105 min-w-64 max-w-80
        ${task.status === 'completed' ? 'border-l-4 border-green-500' : 'border-l-4 border-amber-500'}
        ${isDragging ? 'rotate-2' : ''}
      `}
    >
      {/* Task Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className={`font-semibold text-lg ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.name}
        </h3>
        <div className="flex space-x-2 ml-3">
          <button
            onClick={handleEdit}
            className="edit-btn text-amber-600 hover:text-amber-800 transition-colors p-1 text-lg hover:scale-125"
            title="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="delete-btn text-red-600 hover:text-red-800 transition-colors p-1 text-lg hover:scale-125"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
      
      {/* Task Details */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Due: {displayDate}</span>
        <button
          onClick={handleToggleStatus}
          className={`${
            task.status === 'pending'
              ? 'bg-amber-500 hover:bg-amber-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white px-3 py-2 rounded text-xs transition-colors hover:scale-105 font-semibold`}
        >
          {task.status === 'pending' ? '✓ Complete' : '↶ Reopen'}
        </button>
      </div>

      {/* Status Badge */}
      <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold ${
        task.status === 'pending' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'
      }`}>
        {task.status === 'pending' ? 'TO DO' : 'DONE'}
      </div>
    </div>
  );
};

export default DraggableTask;