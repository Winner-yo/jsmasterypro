import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

import User from "@/database/user.model";
import { handleError } from "@/lib/handlers/error";
import { NotFoundError, RequestError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";

// api/users/[id] Get user by ID
export async function GET(
    _: Request, { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        if (!id) throw new RequestError(400, "User id is required");
        if (!isValidObjectId(id)) throw new RequestError(400, "Invalid user id");

        await dbConnect();
        const user = await User.findById(id);
        if (!user) throw new NotFoundError("User"); // Handle user not found

        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        return handleError(error,'api') as APIErrorResponse;
    }
}

// api/users/[id] Delete user by ID
export async function DELETE(
    _: Request, { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        if (!id) throw new RequestError(400, "User id is required");
        if (!isValidObjectId(id)) throw new RequestError(400, "Invalid user id");
        await dbConnect();

        const user = await User.findByIdAndDelete(id);
        if (!user) throw new NotFoundError("User"); // Handle user not found

        return NextResponse.json({ success: true, data: user }, { status: 200 });
    } catch (error) {
        return handleError(error,'api') as APIErrorResponse;
    }
}

// api/users/[id] Update user by ID
export async function PUT(
    request: Request, { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        if (!id) throw new RequestError(400, "User id is required");
        if (!isValidObjectId(id)) throw new RequestError(400, "Invalid user id");
        await dbConnect();

        const body = await request.json();
        const validateData = UserSchema.partial().parse(body);

        const updatedUser = await User.findByIdAndUpdate(id, validateData,
            { new: true, runValidators: true });

        if (!updatedUser) throw new NotFoundError("User"); // Handle user not found    

        return NextResponse.json(
            { success: true, data: updatedUser },
            { status: 200 });
    } catch (error) {
        return handleError(error,'api') as APIErrorResponse;
    }
}