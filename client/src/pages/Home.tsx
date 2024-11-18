import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { Todo } from "../types/Todo";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000/api/todos";

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    setTodos(response.data);
  };

  const addTodo = async (body: string) => {
    const response = await axios.post(API_URL, { body, completed: false });
    setTodos((prev) => [...prev, response.data]);
  };

  const toggleTodo = async (id: string) => {
    await axios.patch(`${API_URL}/${id}`);
    fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 
                    dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Glass Card Container */}
        <Card className="backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 
                        border-none shadow-xl dark:shadow-black/20">
          <CardContent className="p-6">
            {/* Header */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="mb-8 text-center"
            >
              <div className="inline-flex items-center justify-center space-x-2 
                            mb-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-1">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Stay Organized
                </span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                           dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Todo List
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Keep track of your tasks and get things done
              </p>
            </motion.div>

            {/* Progress Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tasks completed
                </span>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {todos.filter(todo => todo.completed).length}/{todos.length}
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${(todos.filter(todo => todo.completed).length / Math.max(todos.length, 1)) * 100}%`
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 
                           rounded-full"
                />
              </div>
            </div>

            {/* Todo Form */}
            <div className="mb-6">
              <TodoForm onAddTodo={addTodo} />
            </div>

            {/* Todo List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {todos.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-12 h-12 
                                rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
                    <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                    No tasks yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Add your first task to get started
                  </p>
                </div>
              ) : (
                <TodoList
                  todos={todos}
                  onToggleTodo={toggleTodo}
                  onDeleteTodo={deleteTodo}
                />
              )}
            </motion.div>

            {/* Footer Stats */}
            {todos.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {todos.filter(todo => !todo.completed).length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Pending Tasks
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {todos.filter(todo => todo.completed).length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Completed Tasks
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Home;
