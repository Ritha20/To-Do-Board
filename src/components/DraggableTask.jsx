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
    willChange: 'transform',
    userSelect: 'none',
    touchAction: 'none',
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
        min-h-48 w-80 overflow-hidden rounded-lg bg-white p-6 shadow-2xl 
        pointer-events-auto absolute cursor-grab
        ${task.status === 'completed' ? 'border-l-4 border-green-500' : 'border-l-4 border-amber-500'}
        ${isDragging ? 'scale-105 rotate-2' : 'hover:scale-105'}
        transition-all duration-200 ease-out
        transform-gpu
      `}
      draggable="false"
    >
      {/* Task Header - Polaroid Style */}
      <div className="flex justify-between items-start mb-4">
        <h3 className={`font-bold text-xl ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.name}
        </h3>
        <div className="flex space-x-2 ml-3">
          <button
            onClick={handleEdit}
            className="edit-btn text-amber-600 hover:text-amber-800 transition-colors p-2 text-lg hover:scale-110 bg-amber-50 rounded-lg shadow-sm"
            title="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="delete-btn text-red-600 hover:text-red-800 transition-colors p-2 text-lg hover:scale-110 bg-red-50 rounded-lg shadow-sm"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
      
      {/* Due Date */}
      <div className="text-sm text-gray-600 mb-4 font-medium">
        📅 Due: {displayDate}
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={handleToggleStatus}
            className={`${
              task.status === 'pending'
                ? 'bg-amber-500 hover:bg-amber-600'
                : 'bg-green-500 hover:bg-green-600'
            } text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 hover:scale-105 font-semibold shadow-md`}
          >
            {task.status === 'pending' ? '✓ Complete' : '↶ Reopen'}
          </button>
        </div>
      </div>

      {/* Status Badge - Polaroid Style */}
      <div className={`absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
        task.status === 'pending' ? 'bg-amber-500 text-white' : 'bg-green-500 text-white'
      }`}>
        {task.status === 'pending' ? 'TO DO' : 'DONE'}
      </div>

      {/* Decorative Corner */}
      <div className="absolute bottom-2 right-2 text-2xl opacity-20">
        {task.status === 'pending' ? '📝' : '✅'}
      </div>
    </div>
  );
};

export default DraggableTask;