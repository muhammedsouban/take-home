import api, { getHeaderConfig } from "@/app/utils/axios-config";
import Breadcrumbs from "@/components/breadCrumb";
import { ROUTES } from "@/components/utils/constants";
import { handleDownload } from "@/apiHelperFunction/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Breadcrumb, Button, Card, message } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Check, Download, Edit, Plus, Save, X } from "react-feather";
import { toast } from "react-toastify";

const ProjectHeader = ({
  toggleAddTodo,
  projectName,
  setProjectName,
  onNameUpdate,
  completedTodos,
  pendingTodos,
}: {
  toggleAddTodo: any;
  projectName: any;
  setProjectName: any;
  onNameUpdate: any;
  completedTodos: any;
  pendingTodos: any;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const totalTodos = completedTodos?.length + pendingTodos?.length;
  const [projectNametoSet, setProjectNametoSet] = useState();

  useEffect(() => {
    setProjectNametoSet(projectName);
  }, [projectName]);

  const handleChange = (e: any) => {
    const { value } = e.target;
    setProjectNametoSet(value);
  };
  const handleSave = () => {
    setIsEditing(false);
    onNameUpdate?.();
    setProjectName(projectNametoSet);
  };

  const downloadProjectMutation = useMutation({
    mutationFn: (data) => handleDownload(data),
    onSuccess: () => {
      message.success("Project Exported Successfully");
    },
    onError: (error: any) => {
      message.error(error.error);
    },
  });

  const onDownload = async () => {
    const data: any = {
      title: projectName,
      completedTodos,
      totalTodos,
      pendingTodos,
    };
    downloadProjectMutation.mutate(data);
  };

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "Projects", key: "projects", href: ROUTES.HOME },
          { label: projectName, key: projectName },
        ]}
      />
      <Card>
        <div className="flex  justify-between items-center">
          <div>
            <div className=" flex items-center gap-2">
              {isEditing ? (
                <input
                  type="text"
                  value={projectNametoSet}
                  onChange={handleChange}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              ) : (
                <h1 className="text-2xl font-bold">{projectName}</h1>
              )}
              {!isEditing ? (
                <Edit
                  size={18}
                  className="cursor-pointer"
                  onClick={() => setIsEditing(true)}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    type="primary"
                    size="large"
                    className="flex items-center space-x-2 "
                    onClick={handleSave}
                  >
                    <Check size={16} />
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    className="flex items-center space-x-2 "
                    onClick={() => {
                      setIsEditing(false), setProjectNametoSet(projectName);
                    }}
                    danger
                  >
                    <X size={16} />
                  </Button>
                </div>
              )}
            </div>
            {totalTodos > 0 ? (
              <div className="text-sm font-semibold text-gray-500 mt-1">{`${
                completedTodos?.length || 0
              } / ${totalTodos} Task${
                totalTodos > 1 ? "s" : ""
              } Completed`}</div>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="primary"
              size="large"
              className="flex items-center space-x-2"
              onClick={toggleAddTodo}
            >
              <Plus size={14} /> Create Task
            </Button>
            <Button
              type="primary"
              size="large"
              className="flex items-center space-x-2"
              onClick={() => onDownload()}
            >
              <Download size={14} />
              Export
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectHeader;
