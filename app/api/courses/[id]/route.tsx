import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import CourseSchema from "../schema";

interface Props {
  params: { id: number };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const getCourse = await prisma.course.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!getCourse)
      return NextResponse.json(
        { error: "Course doesn't exists." },
        { status: 404 }
      );

    return NextResponse.json(getCourse);
  } catch (error) {
    console.error("Error while fething course.", error);
    return NextResponse.json(
      { error: "Error occured while fetching course." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const requestBody = await request.json();
    const validateRequest = CourseSchema.safeParse(requestBody);

    if (!validateRequest.success)
      return NextResponse.json(
        validateRequest.error.errors.map((err) => err.message),
        { status: 400 }
      );

    const existingCourse = await prisma.course.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!existingCourse)
      return NextResponse.json(
        { error: "Course doesn't exist." },
        { status: 404 }
      );

    const updateExistingCourse = await prisma.course.update({
      where: { id: existingCourse.id },
      data: {
        courseName: requestBody.courseName,
        courseCode: requestBody.courseCode,
        courseCredits: requestBody.courseCredits,
        courseInstructor: requestBody.courseInstructor,
        isActive: requestBody.isActive ?? true,
      },
    });

    return NextResponse.json(updateExistingCourse);
  } catch (error) {
    console.error("Error while updating course.", error);
    return NextResponse.json(
      { error: "Error occured while updating course" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const checkCourse = await prisma.course.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!checkCourse)
      return NextResponse.json({ error: "Course not found." }, { status: 404 });

    await prisma.course.delete({
      where: { id: checkCourse.id },
    });

    return NextResponse.json({});
  } catch (error) {
    console.error("Error occured while deleting course.", error);
    return NextResponse.json(
      { error: "Error occured while deleting course." },
      { status: 500 }
    );
  }
}
