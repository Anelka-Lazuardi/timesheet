import { handlePrismaError } from "@/utils/api";
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();



export async function GET(request: Request) {
    try {

        const { searchParams } = new URL(request.url);
        const filterTitle = searchParams.get("filterTitle")
        const filterProject = searchParams.get("filterProject")
        const condition: Prisma.ActivityWhereInput = {}

        if (filterTitle) {
            condition.title = {
                contains: filterTitle,
                mode: 'insensitive' // Use Prisma's mode for case insensitivity
            };
        }

        if (filterProject) {
            condition["projectId"] = {
                in: filterProject.split(",")
            };
        }


        const activity = await prisma.activity.findMany({ where: condition });
        const user = await prisma.user.findFirst();
        const projects = await prisma.project.findMany();
        return Response.json({
            code: 200, data: {
                activity,
                user,
                projects
            }, message: "Berhasil Get Data Kegiatan"
        })
    } catch (error) {
        const prismaError = error as PrismaClientKnownRequestError;
        const { code, msg } = handlePrismaError(prismaError)
        return Response.json({ code, data: error, message: msg })
    }

}


async function createOrUpdateActivity(data: any, isUpdate: boolean) {
    const startDate = new Date(`${data.startDate}T${data.startTime}`);
    const endDate = new Date(`${data.endDate}T${data.endTime}`);
    const payload = {
        userId: data.userId,
        title: data.title,
        projectId: data.projectId,
        startDate,
        endDate,
        duration: Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60))
    };

    if (isUpdate) {
        await prisma.activity.update({ where: { id: data.id }, data: payload });
    } else {
        await prisma.activity.create({ data: payload });
    }

    const activities = await prisma.activity.findMany();
    return activities
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const activity = await createOrUpdateActivity(data, false);
        return Response.json({ code: 200, data: activity, message: "Tambah Kegiatan Baru Berhasil" });
    } catch (error) {
        const prismaError = error as PrismaClientKnownRequestError;
        const { code, msg } = handlePrismaError(prismaError);
        return Response.json({ code, data: error, message: msg });
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json();
        const activity = await createOrUpdateActivity(data, true);
        return Response.json({ code: 200, data: activity, message: `Update Kegiatan ${data.title} Berhasil` });
    } catch (error) {
        const prismaError = error as PrismaClientKnownRequestError;
        const { code, msg } = handlePrismaError(prismaError);
        return Response.json({ code, data: error, message: msg });
    }
}

export async function DELETE(request: Request) {
    try {
        const data = await request.json();
        await prisma.activity.delete({ where: { id: data.id } });
        const activities = await prisma.activity.findMany();
        return Response.json({ code: 200, data: activities, message: "Delete Kegiatan Berhasil" });
    } catch (error) {
        const prismaError = error as PrismaClientKnownRequestError;
        const { code, msg } = handlePrismaError(prismaError)
        return Response.json({ code, data: error, message: msg })
    }
}