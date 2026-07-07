export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { randomUUID } from "crypto";
import * as XLSX from "xlsx";

function makeId() {
  return `prop-${randomUUID().slice(0, 8)}`;
}

function makeSlug(title = "") {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function normalise(row) {
  // Accept flexible column names (case-insensitive, trimmed)
  const get = (keys) => {
    for (const k of keys) {
      const found = Object.keys(row).find(
        (rk) => rk.trim().toLowerCase() === k.toLowerCase()
      );
      if (found !== undefined && row[found] !== undefined && row[found] !== "") {
        return String(row[found]).trim();
      }
    }
    return "";
  };

  const title = get(["title", "property name", "name"]);
  if (!title) return null;

  const price = get(["price", "price (inr)", "listed price"]);
  const priceCrRaw = get(["pricecr", "price cr", "price (cr)", "price in cr", "crore"]);
  const priceCr = parseFloat(priceCrRaw) || 0;

  const category = get(["category", "type"]).toLowerCase();
  const validCategories = ["sale", "rent", "off-plan", "off plan"];
  const cat = validCategories.includes(category)
    ? category.replace(" ", "-")
    : "sale";

  const propertyFor = get(["propertyfor", "property for", "for"]).toLowerCase();
  const propFor = ["commercial"].includes(propertyFor) ? "commercial" : "residential";

  const type = get(["property type", "type", "unit type"]) || "Apartment";
  const status = get(["status", "possession status"]) || "Ready";
  const location = get(["location", "area", "city", "address"]);
  const sqft = get(["sqft", "sq ft", "area (sqft)", "area sqft", "carpet area"]);
  const beds = parseInt(get(["beds", "bedrooms", "bhk"])) || 0;
  const baths = parseInt(get(["baths", "bathrooms", "washrooms"])) || 0;
  const description = get(["description", "details", "about"]);
  const image = get(["image", "image url", "photo url", "photo"]);
  const tag = get(["tag", "label", "badge"]);

  return {
    id: makeId(),
    title,
    price,
    priceCr,
    location,
    category: cat,
    propertyFor: propFor,
    type,
    status,
    sqft,
    beds,
    baths,
    description,
    image,
    tag,
    slug: makeSlug(title),
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ message: "No file uploaded." }, { status: 400 });
    }

    const mimeOk =
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.type === "application/vnd.ms-excel" ||
      file.type === "" ||
      file.name?.endsWith(".xlsx") ||
      file.name?.endsWith(".xls") ||
      file.name?.endsWith(".csv");

    if (!mimeOk) {
      return NextResponse.json(
        { message: "Invalid file type. Please upload an .xlsx, .xls, or .csv file." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    if (!rows.length) {
      return NextResponse.json({ message: "The sheet is empty." }, { status: 400 });
    }

    const docs = rows.map(normalise).filter(Boolean);

    if (!docs.length) {
      return NextResponse.json(
        { message: "No valid rows found. Ensure the sheet has a 'title' column." },
        { status: 400 }
      );
    }

    const col = await getCollection("properties");
    await col.insertMany(docs);

    return NextResponse.json(
      {
        message: `Successfully imported ${docs.length} propert${docs.length !== 1 ? "ies" : "y"}.`,
        imported: docs.length,
        skipped: rows.length - docs.length,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[upload-properties]", err);
    return NextResponse.json({ message: "Upload failed. " + err.message }, { status: 500 });
  }
}
