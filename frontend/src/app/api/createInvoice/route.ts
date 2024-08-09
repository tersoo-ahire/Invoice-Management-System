import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
  try {
    const {
      customerName,
      invoiceNumber,
      date,
      totalAmount,
      paymentStatus,
      files,
    } = await req.json();

    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName,
        invoiceNumber,
        date,
        totalAmount,
        paymentStatus,
        files,
      }),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error updating invoice", error: error.message },
      { status: 500 }
    );
  }
}
