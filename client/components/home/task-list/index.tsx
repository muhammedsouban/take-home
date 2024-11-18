import React from "react";
import { Card } from "antd";
import Tasks from "./tasks";
import Empty from "@/components/empty";

const TaskList = ({
  completedTodos,
  pendingTodos,
}: {
  completedTodos: any;
  pendingTodos: any;
}) => {
  return (
    <div className="w-full flex gap-2 mt-2 ">
      <Card className="w-full h-[calc(100vh-12rem)]">
        <div className="w-full flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Pending Tasks</h2>
          {!pendingTodos?.length ? (
            <Empty src="/empty-list.svg" title="It's Clean Here" />
          ) : null}
          {pendingTodos?.map((todo: any, index: number) => (
            <Tasks key={todo.id} todo={todo} index={index} />
          ))}
        </div>
      </Card>
      <Card className="w-full">
        <div className="w-full flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Completed Tasks</h2>
          {!completedTodos?.length ? (
            <Empty src="/empty-todo.svg" title="No Completed Tasks" />
          ) : null}
          {completedTodos?.map((todo: any, index: number) => (
            <Tasks key={todo.id} todo={todo} index={index} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TaskList;
