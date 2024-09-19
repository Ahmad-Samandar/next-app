import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import CourseSchema from "./schema";

export async function GET(request: NextRequest) {
  try {
    const getCourses = await prisma.course.findMany();
    return NextResponse.json(getCourses);
  } catch (error) {
    console.error("Cannot fetch courses.", error);
    return NextResponse.json(
      { error: "An error occured while fetching courses." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = CourseSchema.safeParse(body);

    if (!validationResult.success)
      return NextResponse.json(
        validationResult.error.errors.map((err) => err.message),
        { status: 400 }
      );

    const existingCourse = await prisma.course.findUnique({
      where: {
        courseCode: body.courseCode,
      },
    });

    if (existingCourse)
      return NextResponse.json(
        { error: "Course already exists." },
        { status: 400 }
      );

    const createNewCourse = await prisma.course.create({
      data: {
        courseName: body.courseName,
        courseCode: body.courseCode,
        courseCredits: body.courseCredits,
        courseInstructor: body.courseInstructor,
        isActive: body.isActive ?? true,
      },
    });

    return NextResponse.json(createNewCourse, { status: 201 });
  } catch (error) {
    console.error("Cannot create new course.", error);
    return NextResponse.json(
      { error: "An error occured while creating a new course." },
      { status: 500 }
    );
  }
}
