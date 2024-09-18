import { NextRequest, NextResponse } from "next/server";
import StudentSchema from "./schema";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const getStudents = await prisma.student.findMany();
    return NextResponse.json(getStudents);
  } catch (error) {
    console.error("Error fetching students.", error);
    return NextResponse.json(
      { error: "Failed to fetch students." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body using zod schema
    const validateRequest = StudentSchema.safeParse(body);
    if (!validateRequest.success) {
      return NextResponse.json(
        { error: validateRequest.error.errors },
        { status: 400 }
      );
    }

    // Ensure email is stored in lowercase to avoid case-sensitivity issues
    const email = body.email.toLowerCase();

    // Check if the student already exists in the system
    const checkIfStudentExist = await prisma.student.findUnique({
      where: {
        email: email,
      },
    });

    if (checkIfStudentExist) {
      return NextResponse.json(
        { error: "Student is already in the system." },
        { status: 400 }
      );
    }

    const createNewStudent = await prisma.student.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: email,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json(createNewStudent, { status: 201 });
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the student." },
      { status: 500 }
    );
  }
}
