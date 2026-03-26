import { Check, Edit2, Plus, Trash, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTask = localStorage.getItem("tasks");
    return savedTask ? JSON.parse(savedTask) : [];
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [inputVal, setInputVal] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setTasks([
      { id: Math.floor(Math.random() * 1000), text: inputVal },
      ...tasks,
    ]);
    setInputVal("");
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setEditValue(task.text);
  };

  const handleSaveEdit = (id) => {
    if (!editValue.trim()) return;
    setEditId(null);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editValue } : task,
      ),
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  return (
    <>
      <div className="min-h-screen bg-neutral-900 flex justify-center items-center px-5 ">
        <div className="w-full max-w-md flex flex-col border border-blue-200/30 h-[60vh]  min-h-[400px] max-h-[600px] shadow-md shadow-blue-300/10 rounded-lg md:px-7 px-5 py-7">
          <h1 className="text-blue-400 text-center text-3xl font-bold mb-6">
            To-do List
          </h1>
          <form
            action=""
            className="flex gap-2 sm:gap-4 shrink-0"
            onSubmit={handleAddTask}
          >
            <input
              type="text"
              placeholder="Add a task"
              className="flex-1 min-w-0 bg-neutral-750 outline-none focus:outline-none border border-neutral-700 text-white px-3 sm:px-4 rounded-lg py-2.5 sm:py-3 focus:border-blue-300 text-sm sm:text-base"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button
              type="submit"
              className="border border-neutral-500/40 px-3 sm:px-4 flex items-center gap-1 text-white rounded-md bg-blue-700 hover:bg-blue-600 transition-colors cursor-pointer text-sm font-medium whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Add Task</span>
              <span className="sm:hidden">Add</span>
            </button>
          </form>
          <p className=" text-neutral-700 my-3 ">Tasks: {tasks.length}</p>
          {/* Task List */}

          <div
            className={`flex-1 overflow-y-auto space-y-2 rounded-lg   [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-blue-500/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-blue-500/50 ${tasks.length === 0 ? "" : "px-2 py-1 shadow-inner shadow-blue-300/20 "}`}
            draggable="false"
          >
            {tasks.length === 0 ? (
              <div className="bg-neutral-800/50 border border-dashed border-neutral-700 h-full min-h-[150px] flex flex-col gap-2 items-center justify-center p-4 rounded-lg text-center">
                <p className="text-neutral-400 font-medium text-sm sm:text-base">
                  No Tasks Added Yet
                </p>
                <p className="text-neutral-600 text-xs sm:text-sm">
                  Type above to add a new task
                </p>
              </div>
            ) : (
              tasks.map((tasks) => (
                <div
                  className={`group bg-neutral-850/40 border border-neutral-700 rounded-lg  flex items-center justify-between   ${editId === tasks.id ? "pr-3 pl-2 " : "p-3"}`}
                  key={tasks.id}
                >
                  {editId === tasks.id ? (
                    <div className="flex-1 flex justify-between">
                      <input
                        type="text"
                        className="bg-neutral-750 outline-none focus:outline-none border border-blue-300 text-white px-3 rounded-lg py-0 h-10 flex self-center focus:border-blue-300"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                      />
                      <div className="flex flex-center gap-2 justify-center  py-3">
                        <button
                          className="hover:bg-blue-300/20 text-blue-300 hover:text-blue-300 rounded-md p-1 cursor-pointer"
                          onClick={() => handleSaveEdit(tasks.id)}
                        >
                          <Check strokeWidth={1.5} className="w-5 h-5" />
                        </button>
                        <button
                          className="hover:bg-red-300/20 text-red-300 hover:text-red-300 rounded-md p-1 cursor-pointer"
                          onClick={() => handleDelete(tasks.id)}
                        >
                          <Trash2 className="w-5 h-5 " strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-white">{tasks.text}</h1>
                      <div className="md:opacity-0 group-hover:opacity-100 flex gap-2">
                        <button
                          className="hover:bg-blue-300/20 text-blue-300 hover:text-blue-300 rounded-md p-1 cursor-pointer"
                          onClick={() => handleEdit(tasks)}
                        >
                          <Edit2 strokeWidth={1.5} className="w-5 h-5" />
                        </button>
                        <button
                          className="hover:bg-red-300/20 text-red-300 hover:text-red-300 rounded-md p-1 cursor-pointer"
                          onClick={() => handleDelete(tasks.id)}
                        >
                          <Trash2 className="w-5 h-5 " strokeWidth={1.5} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
