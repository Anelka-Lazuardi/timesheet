import { Prisma } from '@prisma/client';


export const handlePrismaError = (err: Prisma.PrismaClientKnownRequestError): { msg: string; code: number } => {
    switch (err.code) {
        case 'P2002':
            // handling duplicate key errors
            return { msg: `Duplicate field value: ${err.meta?.target ?? 'unknown'}`, code: 400 };
        case 'P2014':
            // handling invalid id errors
            return { msg: `Invalid ID: ${err.meta?.target ?? 'unknown'}`, code: 400 };
        case 'P2003':
            // handling invalid data errors
            return { msg: `Invalid input data: ${err.meta?.target ?? 'unknown'}`, code: 400 };
        default:
            // handling all other errors
            return { msg: `Something went wrong: ${err.message}`, code: 500 };
    }
};
