"use client";
import Image from "next/image";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../select";
import { useRouter } from "next/navigation";
import { Separator } from "../../separator";
import { useUserQueryData } from "@/hooks/userQueryData";
import { getWorkspaces } from "@/actions/workspace";
import { WorkSpaceProps } from "@/types/index.type";

const Sidebar = ({ activeWorkspaceId }: { activeWorkspaceId: string }) => {
  const router = useRouter();
  const { data, isFetched } = useUserQueryData(
    ["user-workspaces"],
    getWorkspaces
  );
  const { data: workspace } = data as WorkSpaceProps;
  const onChangeActiveWorkspace = (workspaceId: string) => {
    router.push(`/dashboard/${workspaceId}`);
  };
  return (
    <div className="bg-[#111111]  flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="p-4 bg-[#111111] flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0">
        <Image src="/favicon.ico" alt="Opal" width={40} height={40} />
        <p className="text-2xl">Opal</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16  bg-transparent">
          <SelectValue
            placeholder="Select a workspace"
          />
            <SelectContent className="bg-[#111111] backdrop:blur-xl">
              <SelectGroup>
                <SelectLabel>Workspaces</SelectLabel>
                <Separator />
                {workspace.workspace.map((workspace) => (
                  <SelectItem key={workspace.id} value={workspace.id}>
                    {workspace.name}
                  </SelectItem>
                ))}
                {workspace.members.length > 0 && workspace.members.map((workspace) => 
                  workspace.Workspace && (
                    <SelectItem 
                      key={workspace.Workspace.id} 
                      value={workspace.Workspace.id}
                    >
                      {workspace.Workspace.name}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
       
        </SelectTrigger>
      </Select>
    </div>
  );
};

export default Sidebar;
