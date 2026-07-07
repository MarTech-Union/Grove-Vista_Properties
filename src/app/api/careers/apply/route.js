import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024;
const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 6 && digits.length <= 15;
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const fullName = (formData.get("fullName") || "").toString().trim();
    const nationality = (formData.get("nationality") || "").toString().trim();
    const inMumbai = (formData.get("inMumbai") || "").toString().trim();
    const department = (formData.get("department") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim().toLowerCase();
    const mobile = (formData.get("mobile") || "").toString().trim();
    const privacyAccepted = formData.get("privacyAccepted") === "on";
    const cvFile = formData.get("cvFile");

    if (!fullName || !nationality || !inMumbai || !department) {
      return NextResponse.json({ message: "Please fill all required fields." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Please provide a valid email address." }, { status: 400 });
    }
    if (!isValidPhone(mobile)) {
      return NextResponse.json({ message: "Please provide a valid mobile number." }, { status: 400 });
    }
    if (!privacyAccepted) {
      return NextResponse.json({ message: "Please accept the privacy policy before submitting." }, { status: 400 });
    }
    if (!(cvFile instanceof File) || cvFile.size === 0) {
      return NextResponse.json({ message: "Please upload your CV before submitting." }, { status: 400 });
    }
    if (cvFile.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ message: "CV file must be 4MB or smaller." }, { status: 400 });
    }
    if (cvFile.type && !ALLOWED_CV_TYPES.includes(cvFile.type)) {
      return NextResponse.json({ message: "Please upload a PDF or DOC file." }, { status: 400 });
    }

    const id = `CAR-${randomUUID().slice(0, 8).toUpperCase()}`;
    const submittedAt = new Date().toISOString();
    const application = { id, fullName, email, mobile, department, nationality, inMumbai, cvFileName: cvFile.name, submittedAt };

    const col = await getCollection("applications");
    await col.insertOne(application);

    return NextResponse.json(
      { message: "Application submitted successfully.", data: { applicationId: id, fullName, email, mobile, department, inMumbai, cvFileName: cvFile.name, submittedAt } },
      { status: 200 }
    );
  } catch (err) {
    console.error("[careers/apply]", err);
    return NextResponse.json({ message: "Unable to process application." }, { status: 500 });
  }
}
