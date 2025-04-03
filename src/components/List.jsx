import { useContext, useState, useMemo } from "react";
import React from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import ToDo from "./Todo";
import UserContext from "../UserContext";

function List() {
  const { todos, setTodos } = useContext(UserContext);
  const [sortBy, setSortBy] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");

  const completeTodo = (index) => {
    if (index < 0 || index >= todos.length) {
      console.error("Invalid todo index");
      return;
    }
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    if (index < 0 || index >= todos.length) {
      console.error("Invalid todo index");
      return;
    }
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const getCompletedCount = () => {
    return todos.filter((todo) => todo.isCompleted).length;
  };

  const filteredAndSortedTodos = useMemo(() => {
    let filtered = todos;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((todo) =>
        todo.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "completed":
        return [...filtered].sort((a, b) =>
          a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1
        );
      case "active":
        return [...filtered].sort((a, b) =>
          a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? -1 : 1
        );
      case "date":
        return [...filtered].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      default:
        return filtered;
    }
  }, [todos, sortBy, searchQuery]);

  if (!todos || todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-sm"
      >
        <svg
          className="w-16 h-16 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-gray-500 text-center text-lg">
          No todos yet. Add one to get started!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Your Tasks</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search todos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">Sort by...</option>
            <option value="completed">Completed First</option>
            <option value="active">Active First</option>
            <option value="date">Date</option>
          </select>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-4">
        {getCompletedCount()} of {todos.length} completed
        {searchQuery && ` • ${filteredAndSortedTodos.length} results`}
      </div>

      <AnimatePresence>
        <div className="space-y-2">
          {filteredAndSortedTodos.map((todo, index) => (
            <motion.div
              key={todo.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
            >
              <ToDo
                index={todos.indexOf(todo)}
                todo={todo}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}

List.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      text: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
      createdAt: PropTypes.string,
    })
  ),
  setTodos: PropTypes.func.isRequired,
};

export default List;
