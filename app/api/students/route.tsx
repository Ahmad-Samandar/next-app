import { NextRequest, NextResponse } from "next/server";
import StudentSchema from "./schema";
import { prisma } from "@/prisma/client";

/**
 * Handles GET request to fetch all students.
 *
 * @param {NextRequest} request - The incoming request object from Next.js.
 * @returns {NextResponse} The response object containing the list of students or an error message.
 */
export async function GET(request: NextRequest) {
  try {
    // Fetch all students from the database using Prisma
    const getStudents = await prisma.student.findMany();

    // Return the list of students as a JSON response
    return NextResponse.json(getStudents);
  } catch (error) {
    // Log the error and return a 500 response in case of failure
    console.error("Error fetching students.", error);
    return NextResponse.json(
      { error: "Failed to fetch students." },
      { status: 500 }
    );
  }
}

/**
 * Handles POST request to create a new student.
 *
 * @param {NextRequest} request - The incoming request object containing the new student data.
 * @returns {NextResponse} The response object containing the newly created student or an error message.
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body to extract student data
    const body = await request.json();

    // Validate the request body against the schema
    const validateRequest = StudentSchema.safeParse(body);
    if (!validateRequest.success) {
      // If validation fails, return a 400 error with the validation errors
      return NextResponse.json(
        { error: validateRequest.error.errors },
        { status: 400 }
      );
    }

    // Convert the email to lowercase to avoid case-sensitivity issues
    const email = body.email.toLowerCase();

    // Check if a student with the provided email already exists in the system
    const checkIfStudentExist = await prisma.student.findUnique({
      where: {
        email: email,
      },
    });

    // If a student with the same email exists, return a 400 error
    if (checkIfStudentExist) {
      return NextResponse.json(
        { error: "Student is already in the system." },
        { status: 400 }
      );
    }

    // Create a new student in the database with the provided data
    const createNewStudent = await prisma.student.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: email,
        isActive: body.isActive ?? true,
      },
    });

    // Return the newly created student with a 201 status (created)
    return NextResponse.json(createNewStudent, { status: 201 });
  } catch (error) {
    // Log the error and return a 500 response if something goes wrong
    console.error("Error creating student:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the student." },
      { status: 500 }
    );
  }
}
