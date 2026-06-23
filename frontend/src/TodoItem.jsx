import { useState } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEdit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  const handleSave = () => {
    if (!editValue.trim()) return;
    onEdit(todo._id, editValue);
    setEdit(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo._id)} />

      {isEdit ? (
        <input
          type="text"
          className="edit-input"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setEdit(true)}>{todo.title}</span>
      )}

      {isEdit ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setEdit(true)}>Edit</button>
      )}

      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </li>
  );
}