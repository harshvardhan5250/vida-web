import { NextResponse } from "next/server";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "../../../../lib/firebase";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      subject,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and message are required.",
        },
        { status: 400 }
      );
    }

    const contactData = {
      name,
      email,
      subject: subject || "General Inquiry",
      message,
      status: "New",
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(
      collection(db, "contacts"),
      contactData
    );

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully.",
        id: docRef.id,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}