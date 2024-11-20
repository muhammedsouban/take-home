"use client";

import api, { getHeaderConfig } from "@/app/utils/axios-config";
import Empty from "@/components/empty";
import ProjectList from "@/components/home/project-card";
import { getLoginResponseObject } from "@/components/utils/helper";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Button, Card, Modal } from "antd";
import { Plus } from "react-feather";
import Breadcrumbs from "@/components/breadCrumb";
import ProjectForm from "@/components/home/create-project-form";
import Shell from "@/components/shell";

export default function Home() {
  const [list, setList] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const toggleProjectForm = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const userData = getLoginResponseObject();
    setUser(userData);
  }, []);

  const getProjects = async () => {
    try {
      if (isEmpty(user)) return;
      const headerConfig = getHeaderConfig();
      const response = await api.get(
        `/projects/list/${user?.id}`,
        headerConfig
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    enabled: !isEmpty(user),
  });

  useEffect(() => {
    setList(data);
  }, [data]);

  return (
    <>
      <div className="flex flex-col">
        <Breadcrumbs items={[{ label: "Projects", key: "projects" }]} />
        {isPending ? (
          <Shell />
        ) : (
          <Card className="h-[calc(100vh-100px)]">
            <div className="flex justify-between ">
              <div className="text-2xl font-semibold">Projects</div>
              <Button
                type="primary"
                size="large"
                className="flex items-center space-x-2"
                onClick={toggleProjectForm}
              >
                <Plus size={14} /> Create Project
              </Button>
            </div>
            <div className=" mt-6">
              {!list?.length ? (
                <Empty title="No Projects Found" />
              ) : (
                <ProjectList list={list} refreshList={refetch} />
              )}
            </div>
          </Card>
        )}
      </div>
      <Modal
        open={showModal}
        onCancel={toggleProjectForm}
        footer={null}
        title="Create Project"
        destroyOnClose
      >
        <ProjectForm toggleProjectForm={toggleProjectForm} />
      </Modal>
    </>
  );
}
