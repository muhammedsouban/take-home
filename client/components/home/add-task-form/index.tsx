import {
  handleAddTodo,
  handleUpdateTodo,
} from "@/apiHelperFunction/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Form, Input, message } from "antd";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";

const AddTodo = ({
  projectId,
  onSuccess,
  task,
}: {
  projectId: any;
  onSuccess?: any;
  task?: any;
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isEmpty(task)) {
      form.setFieldsValue({
        title: task?.title,
        description: task?.description,
      });
    }
  }, [task]);

  const onFinish = (value: any) => {
    if (task?.id) {
      todoUpdateMutation.mutate(value);
    } else {
      todoMutation.mutate(value);
    }
  };

  const todoMutation = useMutation({
    mutationFn: (formData) => handleAddTodo(formData, projectId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      if (data) {
        message.success("Todo added successfully");
        onSuccess?.();
      }
    },
    onError: (error: any) => {
      message.error(error.error);
      console.log(error.error);
    },
  });

  const todoUpdateMutation = useMutation({
    mutationFn: (formData) => handleUpdateTodo(formData, task?.id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      if (data) {
        message.success("Task updated successfully");
        onSuccess?.();
      }
    },
    onError: (error: any) => {
      message.error(error.error);
      console.log(error.error);
    },
  });

  return (
    <Card>
      <Form
        name="task-form"
        onFinish={onFinish}
        layout="vertical"
        requiredMark
        form={form}
      >
        <Form.Item
          name="title"
          label="Task Title"
          rules={[
            {
              required: true,
              message: "Task title is required",
            },
          ]}
          required
        >
          <Input size="large" prefix={<></>} placeholder="Enter Task Title" />
        </Form.Item>
        <Form.Item name="description" label="Task Description">
          <Input
            size="large"
            prefix={<></>}
            placeholder="Enter Task Description"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: "0px" }}>
          <Button
            block
            type="primary"
            htmlType="submit"
            size="large"
            // loading={mutation.isPending}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddTodo;
