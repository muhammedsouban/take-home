import { Checkbox, message, Modal } from "antd";
import React, { useState } from "react";
import { Plus, Trash2 } from "react-feather";
import AddTodo from "../add-task-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  handleAddTodo,
  handleDeleteProject,
} from "@/apiHelperFunction/project";
import { toast } from "react-toastify";

export default function ProjectCard({ project, onCardClick, onSuccess }: any) {
  const queryClient = useQueryClient();

  const [showAddTodo, setShowAddTodo] = useState<boolean>(false);

  const todoMutation = useMutation({
    mutationFn: (formData) => handleAddTodo(formData, project?.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      if (data) {
        message.success("Task Created successfully");
      }
    },
    onError: (error: any) => {
      message.error(error.error);
      console.log(error.error);
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: () => handleDeleteProject(project.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (data) {
        message.success("Project deleted Successfully ");
        onSuccess?.();
      }
    },
    onError: (error: any) => {
      message.error(error.error);
    },
  });

  const onClick = () => {
    onCardClick?.(project.id);
  };

  const toggleAddTodo = () => {
    setShowAddTodo((prevShowAddTodo) => !prevShowAddTodo);
  };

  const onAddTodo = () => {
    setShowAddTodo(false);
  };

  const onDeleteProject = () => {
    deleteProjectMutation.mutate();
  };

  return (
    <div
      className="shadow-lg rounded-lg p-4 cursor-pointer transition-all ease-in-out hover:scale-[1.03] overflow-y-auto bg-slate-100"
      style={{ height: "300px", width: "250px" }}
    >
      <div className="flex justify-between items-center">
        <div className="rounded-tl-lg rounded-tr-lg w-full bg-light hover:bg-primary-alt cursor-pointer">
          <div
            className="flex flex-col w-full justify-between text-gray-700 hover:text-gray-800"
            onClick={onClick}
          >
            <span className="text-lg font-semibold text-primary">
              {project?.name}
            </span>
            <span className="text-[11px]">{project?.description}</span>
          </div>
        </div>
        <Trash2
          className="text-red-400 hover:text-red-500"
          size={18}
          onClick={onDeleteProject}
          data-testid="delete-project"
        />
      </div>
      <hr className="my-2" />
      {!project?.todos?.length ? (
        <div className="flex flex-col justify-center items-center h-[calc(100%-50px)]">
          <button
            className="flex items-center gap-2 text-gray-500 hover:bg-gray-800  hover:text-white transition-all ease-in-out border border-gray-300 rounded-md py-2 px-4"
            onClick={toggleAddTodo}
          >
            Add Task
            <Plus size={18} />
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-bl from-primary to-secondary mb-2 rounded-bl-lg rounded-br-lg text-light scroll-">
          <>
            <span>Tasks</span>
            <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {project?.todos?.slice(0, 3).map((item: any) => (
                <li
                  key={item.id}
                  className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                >
                  <div className="flex items-center ps-3">
                    <Checkbox defaultChecked={item?.completed} disabled />

                    <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {item?.title}
                    </label>
                  </div>
                </li>
              ))}
              {/* Show count if todos length is greater than 2 */}
              {project?.todos?.length > 3 && (
                <li
                  className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                  onClick={onClick}
                >
                  <div className="flex items-center ps-3">
                    <span className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      + {project.todos.length - 3} more
                    </span>
                  </div>
                </li>
              )}
            </ul>
          </>
        </div>
      )}

      <Modal
        title="Create Task"
        open={showAddTodo}
        onCancel={toggleAddTodo}
        footer={null}
        destroyOnClose
      >
        <AddTodo projectId={project?.id} onSuccess={onAddTodo} />
      </Modal>
    </div>
  );
}
