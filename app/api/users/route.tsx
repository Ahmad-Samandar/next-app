import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "@/prisma/client";

// This function handles GET requests and returns a JSON response.
// It takes a NextRequest object as a parameter, which ensures that the response is not cached.
// The response is an array of objects containing the id and name of users.
export async function GET(request: NextRequest) {
  // keep in mind, that if we put as an argument request: NextRequest
  // the result of this will not be cached, else it will be cached.
  const users = await prisma.user.findMany();
  // return NextResponse.json([
  //   { id: 1, name: "Ahmad" },
  //   { id: 2, name: "Shoaib" },
  // ]);
  return NextResponse.json(users);
}

// This async function handles POST requests and expects a JSON payload in the request body.
// It first attempts to parse the request body to extract the "name" field.
// If the "name" field is missing, it returns a 400 Bad Request response with an error message.
// If the "name" field is provided, it returns a 201 Created response with the new user data.
export async function POST(request: NextRequest) {
  // Parse the request body to get the JSON payload
  const body = await request.json();
  const validation = schema.safeParse(body);

  // Check if the "name" field is present, otherwise return an error
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Before creating a user, check if the user exist in the system by their email
  const checkUser = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (checkUser)
    return NextResponse.json(
      { error: "User already in the system." },
      { status: 400 }
    );

  const createUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  // Return a successful response with the created user data
  // return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
  return NextResponse.json(createUser, { status: 201 });
}
