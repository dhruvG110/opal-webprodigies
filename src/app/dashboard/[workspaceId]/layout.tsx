import { onAuthUser } from "@/actions/user";
import { redirect } from "next/navigation";
import {
  getAllUserVideos,
  getNotifications,
  getWorkspaceFolders,
  getWorkspaces,
  VerifyAccessToWorkspace,
} from "@/actions/workspace";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import Sidebar from "@/components/ui/Global/Sidebar";
type Props = {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
};
const layout = async ({ children, params }: Props) => {
  const { workspaceId } = await params;
  const auth = await onAuthUser();
  if (!auth.user?.workspace) {
    redirect("/auth/sign-in");
  }
  if (!auth.user?.workspace.length) {
    redirect("/auth/sign-in");
  }
  const hasAccess = await VerifyAccessToWorkspace(workspaceId);
  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }
  if (!hasAccess.data?.workspace) {
    return null;
  }
  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkspaces(),
  });
  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-screen">
        <Sidebar activeWorkspaceId={workspaceId} />
      </div>
      {children}
    </HydrationBoundary>
  );
};

export default layout;
