import { NextRequest, NextResponse } from "next/server";
import ProductSchema from "./schema";
import { prisma } from "@/prisma/client";

// export function GET(request: NextRequest) {
//   return NextResponse.json([
//     { id: 1, name: "Milk", price: 2.5 },
//     { id: 2, name: "Bread", price: 3.5 },
//   ]);
// }

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const validation = ProductSchema.safeParse(body);
//   if (!validation.success)
//     return NextResponse.json(validation.error.errors, { status: 400 });
//   return NextResponse.json(
//     { id: 10, name: body.name, price: body.price },
//     { status: 201 }
//   );
// }

export async function GET(request: NextRequest) {
  const listOfProducts = await prisma.product.findMany();
  return NextResponse.json(listOfProducts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = ProductSchema.safeParse(body);

  // Check if the required fields are present in the request
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const createProduct = prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json(createProduct, { status: 201 });
}
