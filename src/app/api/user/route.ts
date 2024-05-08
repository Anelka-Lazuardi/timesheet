import { handlePrismaError } from "@/utils/api";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const user = await prisma.user.findFirst();
        if (!user) {
            return Response.json({ code: 404, data: user, message: "User not found" })
        }
        return Response.json({ code: 200, data: user, message: "Successfully get user " })
    } catch (error) {
        const prismaError = error as PrismaClientKnownRequestError;
        const { code, msg } = handlePrismaError(prismaError)
        return Response.json({ code, data: error, message: msg })
    }

}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const user = await prisma.user.create({ data })
        return Response.json({ code: 200, data: user, message: "Successfully create user " })
    } catch (error) {
        return Response.json({ code: 500, data: error, message: "Failed create user " })
    }
}

export async function PUT(request: Request) {
    try {
        const data = await request.json()
        const user = await prisma.user.update({ where: { id: data.id }, data })
        if (!user) {
            return Response.json({ code: 404, data: user, message: "Berhasil Update Data User : User Not Found" })
        }
        return Response.json({ code: 200, data: user, message: "BUpdate User Berhasil" })
    } catch (error) {
        const prismaError = error as PrismaClientKnownRequestError;
        const { code, msg } = handlePrismaError(prismaError)
        return Response.json({ code, data: error, message: msg })
    }
}