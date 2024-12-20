"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const VerifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };
    const isUserinWorkSpace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
            members: {
              every: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });
    return {
      status: 200,
      data: { workspace: isUserinWorkSpace },
    };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 500 };
  }
};
export const getWorkspaceFolders = async (workspaceId: string) => {
  try {
    const isFolder = await client.folder.findMany({
      where: {
        workSpaceId: workspaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });
    if (isFolder && isFolder.length > 0) {
      return {
        status: 200,
        data: isFolder,
      };
    }
    return { status: 404, data: [] };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 500 };
  }
};
export const getAllUserVideos = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };
    const videos = await client.video.findMany({
      where: {
        OR: [
          { workSpaceId: workspaceId },
          { Folder: { workSpaceId: workspaceId } },
        ],
      },
      select: {
        id: true,
        title: true,
        description: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            image: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (videos && videos.length > 0) {
      return {
        status: 200,
        data: videos,
      };
    }
    return { status: 404, data: [] };
  } catch (error) {
    console.log("🔴 ERROR", error);
    return { status: 500 };
  }
};

export const getWorkspaces = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };
    const workspaces = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });
    if (workspaces) {
      return {
        status: 200,
        data: workspaces,
      };
    }
    return { status: 400, data: [] };
  } catch (error) {
    return { status: 500, error: error };
  }
};
export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };
    const notifications = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });
    if (notifications && notifications.notification.length > 0) {
      return {
        status: 200,
        data: notifications,
      };
    }
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 500, error: error };
  }
};
