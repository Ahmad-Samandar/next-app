import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import StudentSchema from "../schema";

interface Props {
  params: { id: number };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const getSpecificStudent = await prisma.student.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!getSpecificStudent)
      return NextResponse.json(
        { error: "Student not found." },
        { status: 404 }
      );

    return NextResponse.json(getSpecificStudent);
  } catch (error) {
    console.error("Error while getting student.", error);
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validateRequest = StudentSchema.safeParse(body);

    if (!validateRequest.success)
      return NextResponse.json(validateRequest.error.errors, { status: 400 });

    const findUser = await prisma.student.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!findUser)
      return NextResponse.json(
        { error: "Student not found." },
        { status: 404 }
      );

    const updateStudent = await prisma.student.update({
      where: { id: findUser.id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        isActive: body.isActive ?? true,
      },
    });
    return NextResponse.json(updateStudent);
  } catch (error) {
    console.error("Faild to update student.", error);
    return NextResponse.json(
      { error: "Failed to update student." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const checkStudent = await prisma.student.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!checkStudent)
      return NextResponse.json(
        { error: "Student not found." },
        { status: 404 }
      );

    await prisma.student.delete({
      where: {
        id: checkStudent.id,
      },
    });

    return NextResponse.json({});
  } catch (error) {
    console.error("Failed to delete student.", error);
    return NextResponse.json(
      { error: "Failed to delete the Student" },
      { status: 404 }
    );
  }
}
