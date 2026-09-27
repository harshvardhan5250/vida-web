import { NextResponse } from "next/server";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../../lib/firebase";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      projectName,
      package: selectedPackage,
      description,
      customerId,
      customerName,
      email,
    } = body;

    if (
      !projectName ||
      !selectedPackage ||
      !customerId ||
      !email
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Project name, package, customer ID and email are required.",
        },
        { status: 400 }
      );
    }

    const projectData = {
      projectName,
      package: selectedPackage,
      description: description || "",

      customerId,
      customerName: customerName || "",
      email,

      status: "Pending",

      paymentStatus: "Pending",

      progress: 0,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(
      collection(db, "projects"),
      projectData
    );

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully.",
        projectId: docRef.id,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Projects API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create project.",
      },
      { status: 500 }
    );
  }
}