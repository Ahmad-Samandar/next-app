import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "@/prisma/client";

interface Props {
  params: { id: number };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!user)
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  // return NextResponse.json({ id: 1, name: "Yousuf" });
  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Validate the request body
  const body = await request.json();
  // If invalid, return 400
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  // Fetch the user with  the given id
  // If doesn't exist, return 404

  const checkUser = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!checkUser)
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  // update the user
  // return the updated user
  // return NextResponse.json({ id: 1, names: body.name });

  const updatedUser = await prisma.user.update({
    where: { id: checkUser.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Fetch the user from db
  // If not found, return 404

  const checkUser = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!checkUser)
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  // Delete the user
  // Return 200

  await prisma.user.delete({
    where: { id: checkUser.id },
  });

  return NextResponse.json({});
  // return NextResponse.json({});
}
