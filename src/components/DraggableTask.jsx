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
  };

  const displayDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date';

  const handleEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Edit button clicked');
    onEdit(task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Delete button clicked');
    onDelete(task.id);
  };

  const handleToggleStatus = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Toggle status button clicked');
    onToggleStatus(task.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-white p-4 rounded-lg shadow-xl min-w-64 max-w-80
        ${task.status === 'completed' ? 'border-l-4 border-green-500' : 'border-l-4 border-amber-500'}
        ${isDragging ? 'rotate-2 scale-105' : 'hover:scale-105'}
        transition-all duration-200
      `}
    >
      {/* Drag Handle - Only this area is draggable */}
      <div 
        {...listeners}
        {...attributes}
        className="cursor-grab active:cursor-grabbing mb-3 pb-3 border-b border-gray-200"
        onClick={(e) => e.preventDefault()} // Prevent click events on drag handle
      >
        <h3 className={`font-semibold text-lg ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {task.name}
        </h3>
        <div className="text-sm text-gray-600 mt-1">
          Due: {displayDate}
        </div>
      </div>
      
      {/* Action Buttons - Not draggable, separate from drag handle */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="edit-btn text-amber-600 hover:text-amber-800 transition-colors p-2 text-lg hover:scale-110 bg-amber-50 rounded-lg"
            title="Edit task"
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            className="delete-btn text-red-600 hover:text-red-800 transition-colors p-2 text-lg hover:scale-110 bg-red-50 rounded-lg"
            title="Delete task"
          >
            🗑️
          </button>
        </div>
        
        <button
          onClick={handleToggleStatus}
          className={`${
            task.status === 'pending'
              ? 'bg-amber-500 hover:bg-amber-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white px-3 py-2 rounded text-sm transition-all duration-200 hover:scale-105 font-semibold`}
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