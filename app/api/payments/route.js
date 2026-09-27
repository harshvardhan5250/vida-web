import { NextResponse } from "next/server";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      userId,
      customerName,
      email,
      projectId,
      projectName,
      amount,
      paymentId,
      status,
    } = body;

    if (
      !userId ||
      !email ||
      !projectId ||
      !amount
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User ID, email, project ID and amount are required.",
        },
        { status: 400 }
      );
    }

    const paymentData = {
      userId,

      customerName: customerName || "",
      email,

      projectId,
      projectName: projectName || "",

      amount: Number(amount),

      paymentId: paymentId || "",

      status: status || "Pending",

      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(
      collection(db, "payments"),
      paymentData
    );

    return NextResponse.json(
      {
        success: true,
        message: "Payment record created successfully.",
        paymentRecordId: docRef.id,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Payments API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create payment record.",
      },
      { status: 500 }
    );
  }
}