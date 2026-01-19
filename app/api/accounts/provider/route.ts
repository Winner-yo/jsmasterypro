import { NextResponse } from "next/server";

import User from "@/database/user.model";
import { handleError } from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";


export async function POST(request: Request) {
    const { providerAccountId } = await request.json();
    try {
        const validateData = AccountSchema.partial().safeParse({
          providerAccountId,
        });
        
        if (!validateData.success)
            throw new ValidationError(validateData.error.flatten().fieldErrors);

        const account = await User.findOne({ providerAccountId });
        if (!account) throw new NotFoundError("Account");

        return NextResponse.json(
            {
            success: true,
            data: account
           },
            { status: 200 }
        );
    } catch (error) {
        return handleError(error,'api') as APIErrorResponse;
    }
}