import api, { getHeaderConfig } from "@/app/utils/axios-config";
import { ROUTES } from "@/components/utils/constants";
import { getLoginResponseObject } from "@/components/utils/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { Mail } from "react-feather";

const ProjectForm = ({ toggleProjectForm }: { toggleProjectForm: any }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleCreateProject = async (value: any) => {
    const user = getLoginResponseObject();
    try {
      if (!user) return;
      const response = await api.post(
        "/projects/create",
        { ...value, userId: user.id },
        getHeaderConfig()
      );
      return response.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };

  const mutation = useMutation({
    mutationFn: (value) => handleCreateProject(value),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["create"] });
      if (data) {
        router.push(ROUTES.PROJECT.replace("[project]", data.id));
      }
    },
    onError: (error: any) => {
      message.error(error.error);
      console.log(error.error);
    },
  });

  const onFinish = (value: any) => {
    mutation.mutate(value);
  };

  return (
    <div className="mt-6">
      <Form
        name="project_form"
        onFinish={onFinish}
        layout="vertical"
        requiredMark
      >
        <Form.Item
          name="name"
          label="Project Name"
          rules={[
            {
              required: true,
              message: "Project name is required",
            },
          ]}
          required
        >
          <Input size="large" prefix={<></>} placeholder="Enter Project Name" />
        </Form.Item>

        <Form.Item style={{ marginBottom: "0px" }}>
          <Button
            block
            type="primary"
            htmlType="submit"
            size="large"
            loading={mutation.isPending}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProjectForm;
