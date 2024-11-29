import { Todo } from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li
      className={`flex justify-between items-center p-4 border rounded-md ${
        todo.completed ? "bg-green-100 dark:bg-green-500" : "bg-white dark:bg-slate-700"
      }`}
    >
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id!)}
          className="mr-3"
        />
        <span className={`text-lg ${todo.completed ? "line-through" : ""}`}>
          {todo.body}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo._id!)}
        className="px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
