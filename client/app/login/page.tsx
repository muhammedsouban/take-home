"use client";

import { ROUTES, UN_AUTH_PAGES } from "@/components/utils/constants";
import { handleLogin } from "@/apiHelperFunction/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button, Form, Input, message, Typography } from "antd";
import { Lock, Mail } from "react-feather";
const { Text, Title, Link } = Typography;

export default function LoginPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (formData) => handleLogin(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        router.push(ROUTES.HOME);
      }
    },
    onError: (error: any) => {
      message.error(error.error);
    },
  });

  const onFinish = (value: any) => {
    loginMutation.mutate(value);
  };

  return (
    <>
      <div className="flex min-h-screen items-center  justify-center py-12">
        <div className="bg-white rounded-lg w-full max-w-md px-4  lg:px-8 py-10">
          <Title className="text-center text-base">Sign in</Title>
          <Form
            name="normal_login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
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
                {loginMutation?.isPending ? "Signing in..." : "Sign in"}
              </Button>
              <div className=" text-center mt-4">
                <Text>Don't have an account?</Text>{" "}
                <Link href={UN_AUTH_PAGES.REGISTER}>Sign up now</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
