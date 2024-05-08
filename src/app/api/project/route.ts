import { handlePrismaError } from "@/utils/api";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";



export async function GET() {
    try {
        const prisma = new PrismaClient();
        const projects = await prisma.project.findMany();
        return Response.json({ code: 200, data: projects, message: "Berhasil Get Data Proyek" })
    } catch (error) {
        const prismaError = error as PrismaClientKnownRequestError;
        const { code, msg } = handlePrismaError(prismaError)
        return Response.json({ code, data: error, message: msg })
    }

}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const prisma = new PrismaClient();
        await prisma.project.create({ data })
        const projects = await prisma.project.findMany();
        return Response.json({ code: 200, data: projects, message: "Tambah Proyek Baru Berhasil" })
    } catch (error) {
        const prismaError = error as PrismaClientKnownRequestError;
        const { code, msg } = handlePrismaError(prismaError)
        return Response.json({ code, data: error, message: msg })
    }
}
