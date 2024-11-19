import api, { getHeaderConfig } from "@/app/utils/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Checkbox, message, Modal } from "antd";
import React, { useState } from "react";
import { Edit, Trash2 } from "react-feather";
import AddTodo from "../add-task-form";
import {
  handleDeleteTodo,
  handleUpdateTodo,
} from "@/apiHelperFunction/project";
import { COLORS } from "@/components/utils/constants";

const Tasks = ({ todo, index }: { todo: any; index: number }) => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<boolean>(false);
  const [showAddTodo, setShowAddTodo] = useState<boolean>(false);

  const toggleAddTodo = () => {
    setShowAddTodo((prevShowAddTodo) => !prevShowAddTodo);
  };

  const mutation = useMutation({
    mutationFn: () =>
      handleUpdateTodoStatus({ completed: status, id: todo?.id }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      if (data) {
        message.success("Status updated successfully");
      }
    },
    onError: (error: any) => {
      message.error(error.error);
      console.log(error.error);
    },
  });

  const todoDeleteMutation = useMutation({
    mutationFn: () => handleDeleteTodo(todo.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      if (data) {
        message.success("Task deleted successfully ");
      }
    },
    onError: (error: any) => {
      message.error(error.error);
    },
  });

  const handleUpdateTodoStatus = async ({
    id,
    completed,
  }: {
    id: any;
    completed: any;
  }) => {
    try {
      const todoStatus = status;
      const response = await api.put(
        `/todos/${id}`,
        { completed: todoStatus },
        getHeaderConfig()
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };

  const toggleTodoCompletion = (e: any) => {
    setStatus(e.target.checked);
    mutation.mutate();
  };

  const toggleEditTodo = () => {
    toggleAddTodo();
  };

  const handleEditTodo = (formData: any) => {
    setShowAddTodo(false);
  };

  const toggleDeleteTodo = async () => {
    todoDeleteMutation.mutate();
  };

  const getBackgroundColor = (id: any) => {
    return COLORS?.[id % COLORS.length];
  };

  return (
    <>
      <div
        className="w-full mb-2 rounded-md"
        style={{ backgroundColor: getBackgroundColor(index) }}
      >
        <li
          key={todo.id}
          className="w-full rounded-lg  p-2 flex items-center justify-between"
        >
          <div className="flex items-start gap-2">
            <Checkbox
              checked={todo.completed}
              onChange={(e) => toggleTodoCompletion(e)}
              className="mt-1"
            />
            <div>
              <h2 className=" text-xl p-0 font-medium text-gray-900 dark:text-gray-800">
                {todo?.title}
              </h2>
              <p className="text-sm text-gray-500">{todo?.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Edit
                size={18}
                className="cursor-pointer text-gray-500 hover:text-gray-600"
                onClick={toggleEditTodo}
              />
              <Trash2
                size={18}
                className="cursor-pointer text-red-500 hover:text-gray-600"
                onClick={toggleDeleteTodo}
                data-testid="delete-todo"
              />
            </div>
          </div>
        </li>
      </div>

      <Modal
        title="Edit Task"
        open={showAddTodo}
        onCancel={toggleAddTodo}
        footer={null}
        destroyOnClose
      >
        <AddTodo
          task={todo}
          onSuccess={handleEditTodo}
          projectId={todo?.projectId}
        />
      </Modal>
    </>
  );
};

export default Tasks;
