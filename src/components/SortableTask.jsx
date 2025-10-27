import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableTask = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const displayDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date';

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  const handleToggleStatus = (e) => {
    e.stopPropagation();
    onToggleStatus(task.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-3 rounded shadow task-card transition-all duration-200 hover:shadow-md"
    >
      {/* Drag Handle */}
      <div 
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing mb-2 pb-2 border-b border-gray-200"
      >
        <div className="flex justify-between items-start">
          <h3 className={`font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
            {task.name}
          </h3>
          <div className="flex space-x-1">
            <button
              onClick={handleEdit}
              className="edit-btn text-amber-600 hover:text-amber-800 transition-colors"
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              onClick={handleDelete}
              className="delete-btn text-red-600 hover:text-red-800 transition-colors"
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Due: {displayDate}</span>
        <button
          onClick={handleToggleStatus}
          className={`${
            task.status === 'pending'
              ? 'bg-amber-500 hover:bg-amber-600'
              : 'bg-gray-500 hover:bg-gray-600'
          } text-white px-2 py-1 rounded text-xs transition-colors`}
        >
          {task.status === 'pending' ? 'Mark Complete' : 'Mark Incomplete'}
        </button>
      </div>
    </div>
  );
};

export default SortableTask;