"use client";

import api from "@/app/utils/axios-config";
import { ROUTES, UN_AUTH_PAGES } from "@/components/utils/constants";
import { handleLogin, handleSignup } from "@/apiHelperFunction/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Checkbox, Form, Grid, Input, theme, Typography } from "antd";
import { Mail, Lock, User } from "react-feather";
import Link from "next/link";
const { Text, Title } = Typography;

export default function RegisterPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: (formData) => handleSignup(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        router.push(UN_AUTH_PAGES.LOGIN);
      }
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const onFinish = (value: any) => {
    registerMutation.mutate(value);
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center ">
        <div className="rounded-lg bg-white px-6 w-full max-w-md  py-8 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create New Account
            </h2>
          </div>
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
            className="mt-5"
          >
             <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please Enter Your Name",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<User size={14} />}
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<Mail size={14} />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<Lock size={14} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block type="primary" htmlType="submit" size="large">
              {registerMutation?.isPending ? "Signing up..." : "Sign Up"}
              </Button>
              <div className=" text-center mt-4">
                <Text>Already have an account?</Text>{" "}
                <Link className="text-indigo-600" href={UN_AUTH_PAGES.LOGIN}>Login now</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
