import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import StudentSchema from "../schema";

interface Props {
  params: { id: number };
}

/**
 * Handles GET request to fetch a student by ID.
 *
 * @param {NextRequest} request - The incoming request object from Next.js.
 * @param {Object} params - The route parameters passed to the API route.
 * @param {string} params.id - The ID of the student to fetch.
 * @returns {NextResponse} The response object containing the student data or an error message.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Fetch specific student from the database by ID
    const getSpecificStudent = await prisma.student.findUnique({
      where: {
        id: parseInt(params.id), // Convert the ID from string to integer
      },
    });

    // Return 404 if student is not found
    if (!getSpecificStudent)
      return NextResponse.json(
        { error: "Student not found." },
        { status: 404 }
      );

    // Return the student data if found
    return NextResponse.json(getSpecificStudent);
  } catch (error) {
    // Log error and return a 500 response if something goes wrong
    console.error("Error while getting student.", error);
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

/**
 * Handles PUT request to update a student's details.
 *
 * @param {NextRequest} request - The incoming request object containing student data.
 * @param {Object} params - The route parameters passed to the API route.
 * @param {string} params.id - The ID of the student to update.
 * @returns {NextResponse} The response object containing the updated student data or an error message.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Parse the request body to get the student data
    const body = await request.json();

    // Validate the request body against the schema
    const validateRequest = StudentSchema.safeParse(body);

    // If validation fails, return a 400 error with the validation errors
    if (!validateRequest.success)
      return NextResponse.json(validateRequest.error.errors, { status: 400 });

    // Fetch the student by ID to ensure it exists
    const findUser = await prisma.student.findUnique({
      where: {
        id: parseInt(params.id), // Convert the ID from string to integer
      },
    });

    // Return 404 if the student does not exist
    if (!findUser)
      return NextResponse.json(
        { error: "Student not found." },
        { status: 404 }
      );

    // Update the student details with the provided data
    const updateStudent = await prisma.student.update({
      where: { id: findUser.id }, // Use the student's ID to locate and update
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        isActive: body.isActive ?? true, // Default to true if isActive is not provided
      },
    });

    // Return the updated student data
    return NextResponse.json(updateStudent);
  } catch (error) {
    // Log error and return a 500 response if something goes wrong
    console.error("Failed to update student.", error);
    return NextResponse.json(
      { error: "Failed to update student." },
      { status: 500 }
    );
  }
}

/**
 * Handles DELETE request to remove a student by ID.
 *
 * @param {NextRequest} request - The incoming request object.
 * @param {Object} params - The route parameters passed to the API route.
 * @param {string} params.id - The ID of the student to delete.
 * @returns {NextResponse} The response object confirming deletion or an error message.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if the student exists before attempting to delete
    const checkStudent = await prisma.student.findUnique({
      where: { id: parseInt(params.id) }, // Convert the ID from string to integer
    });

    // Return 404 if the student is not found
    if (!checkStudent)
      return NextResponse.json(
        { error: "Student not found." },
        { status: 404 }
      );

    // Delete the student from the database
    await prisma.student.delete({
      where: {
        id: checkStudent.id, // Use the student's ID to delete
      },
    });

    // Return an empty response with a success status
    return NextResponse.json({});
  } catch (error) {
    // Log error and return a 500 response if something goes wrong
    console.error("Failed to delete student.", error);
    return NextResponse.json(
      { error: "Failed to delete the student." },
      { status: 500 }
    );
  }
}
