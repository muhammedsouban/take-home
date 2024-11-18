import React from "react";
import ProjectCard from "./card";
import { ROUTES } from "@/components/utils/constants";
import { useRouter } from "next/navigation";

export default function ProjectList({
  list,
  refreshList,
}: {
  list: any[];
  refreshList: any;
}) {
  const router = useRouter();
  const onCardClick = (id: any) => {
    router.push(ROUTES.PROJECT.replace("[project]", id));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-4  ">
      {list?.map((item: any) => (
        <div key={item?.id} className="mr-4">
          <ProjectCard
            project={item}
            key={item.id}
            onCardClick={onCardClick}
            onSuccess={refreshList}
          />
        </div>
      ))}
    </div>
  );
}
