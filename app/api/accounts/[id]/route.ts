import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import { handleError } from "@/lib/handlers/error";
import { NotFoundError, RequestError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema} from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";

// api/users/[id] Get user by ID
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) throw new NotFoundError("Account");

    await dbConnect();
    const account = await Account.findById(id);
    if (!account) throw new NotFoundError("Account"); // Handle user not found
      

      return NextResponse.json(
          { success: true, data: account },
          { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// api/users/[id] Delete user by ID
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) throw new RequestError(400, "User id is required");
    if (!isValidObjectId(id)) throw new RequestError(400, "Invalid user id");
    await dbConnect();

    const account = await Account.findByIdAndDelete(id);
    if (!account) throw new NotFoundError("Account"); // Handle user not found

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// api/users/[id] Update user by ID
export async function PUT(
  request: Request,
  { params } : { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    if (!id) throw new NotFoundError("Account");
  try {
      
    if (!id) throw new RequestError(400, "User id is required");
    if (!isValidObjectId(id)) throw new RequestError(400, "Invalid user id");
    await dbConnect();

    const body = await request.json();
      const validateData = AccountSchema.partial().safeParse(body);
      if (!validateData.success)
          throw new ValidationError(validateData.error.flatten().fieldErrors);

    const updatedAccount = await Account.findByIdAndUpdate(id, validateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedAccount) throw new NotFoundError("Account"); // Handle user not found

    return NextResponse.json(
      { success: true, data: updatedAccount },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
