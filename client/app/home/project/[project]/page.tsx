"use client";
import api, { getHeaderConfig } from "@/app/utils/axios-config";
import AddTodo from "@/components/home/add-task-form";
import ProjectHeader from "@/components/home/project-details-header";
import TaskList from "@/components/home/task-list";
import Shell from "@/components/shell";
import { ROUTES } from "@/components/utils/constants";
import { findProject, handleAddTodo } from "@/apiHelperFunction/project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message, Modal } from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProjectDetails = () => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const [project, setProject] = useState<any>({});
  const [projectName, setProjectName] = useState<string>("Project Name");
  const [showAddTodo, setShowAddTodo] = useState<boolean>(false);
  const [completedTodos, setCompletedTodos] = useState<any>([]);
  const [pendingTodos, setPendingTodos] = useState<any>([]);

  const handleUpdateProject = async ({
    id,
    projectName,
  }: {
    id: any;
    projectName: any;
  }) => {
    try {
      const response = await api.put(
        `/projects/${id}`,
        { name: projectName },
        getHeaderConfig()
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };

  const mutation = useMutation({
    mutationFn: () =>
      handleUpdateProject({ id: params?.project, projectName: projectName }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["update"] });
      if (data) {
        message.success("Project Updated successfully");
      }
    },
    onError: (error: any) => {
      message.error(error.error);
      console.log(error.error);
    },
  });

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["project"],
    queryFn: () => findProject(params?.project),
  });

  useEffect(() => {
    setProject(data);
    setProjectName(data?.name);
    setCompletedTodos(data?.todos?.filter((todo: any) => todo?.completed));
    setPendingTodos(data?.todos?.filter((todo: any) => !todo?.completed));
  }, [data]);

  const toggleAddTodo = () => {
    setShowAddTodo((prevShowAddTodo) => !prevShowAddTodo);
  };

  const onNameUpdate = () => {
    mutation.mutate();
  };

  const onAddTodo = () => {
    setShowAddTodo(false);
    findProject(params?.project);
  };

  if (isPending) {
    return <Shell />;
  }
  return (
    <div>
      <ProjectHeader
        toggleAddTodo={toggleAddTodo}
        onNameUpdate={onNameUpdate}
        setProjectName={setProjectName}
        projectName={projectName}
        completedTodos={completedTodos}
        pendingTodos={pendingTodos}
      />

      <TaskList completedTodos={completedTodos} pendingTodos={pendingTodos} />
      <Modal
        title="Create Task"
        open={showAddTodo}
        onCancel={toggleAddTodo}
        footer={null}
      >
        <AddTodo projectId={project?.id} onSuccess={onAddTodo} />
      </Modal>
    </div>
  );
};

export default ProjectDetails;
