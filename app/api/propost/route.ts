import { NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import { email } from "zod";
import owner from "@/app/dashboard/(valprop)/post/page";

const prisma = new PrismaClient();
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newRecord = await prisma.property.create({
      data: {
        title: body.title,
        status: body.status,
        type: body.selected,
        description: body.description,
        constructionYear: body.condate,
        isBathroomshared: body.shared,
        ownerName: body.ownname,
        ownerEmail: body.ownemail,
        ownerPhone: body.ownphone,
        area: body.area,
        price: body.price,
        bedrooms: body.bedroom,
        bathrooms: body.bathroom,
        elevator:body.elevator,
        Parking:body.Parking
      },
    });
        return NextResponse.json({ status: 201 })

  } catch (err) {
    console.log(err);
     return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 })
  }
}
export async function GET(req:Request){
    try{
        const properties=await prisma.property.findMany()
        return NextResponse.json(properties);

    }
    catch(err){
        return NextResponse.json(
            [],
      { status: 500 }

        )
    }
}
