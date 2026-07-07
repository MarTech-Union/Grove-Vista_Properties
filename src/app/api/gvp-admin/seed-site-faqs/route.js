export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { randomUUID } from "crypto";

const FAQS = [
  // Buying Property
  { category: "buying", order: 1, question: "How do I start the process of buying a luxury apartment in Mumbai?", answer: "The first step is to define your budget, preferred location, and must-have features, then connect with a specialist at Grove Vista Properties who will match you with verified listings and guide you through legal due diligence to registration." },
  { category: "buying", order: 2, question: "What documents do I need to buy property in Mumbai?", answer: "You will need your PAN card, Aadhaar card, proof of address, income proof, and bank statements; Grove Vista Properties coordinates with legal advisors to ensure your documentation checklist is complete before any agreement is signed." },
  { category: "buying", order: 3, question: "What is stamp duty on property in Mumbai in 2026?", answer: "Stamp duty in Maharashtra is 5% of the property value for properties above INR 30 lakh, and ready reckoner rates have been held unchanged for FY2026-27 — meaning your stamp duty cost is stable if you buy now." },
  { category: "buying", order: 4, question: "What is RERA and why does it matter when buying property in Mumbai?", answer: "RERA (Real Estate Regulatory Authority) registration ensures that a project has received statutory approvals, that the developer has disclosed financials, and that delivery timelines are legally binding; Grove Vista Properties only lists RERA-registered projects on its platform." },
  { category: "buying", order: 5, question: "How long does it take to complete a property purchase in Mumbai?", answer: "From the registration agreement, a typical Mumbai property transaction takes 30 to 90 days, depending on loan processing, legal checks, and developer documentation; Grove Vista Properties has closed transactions in as little as 11 days for cash buyers." },
  { category: "buying", order: 6, question: "How do I verify if a property in Mumbai is RERA approved?", answer: "You can verify any project's RERA registration by checking the MahaRERA website at maharerait.mahaonline.gov.in; Grove Vista Properties only lists RERA-compliant projects and provides registration details upfront for every listing." },

  // Services & Support
  { category: "service&support", order: 1, question: "Does Grove Vista Properties offer off-plan and ready-to-move listings?", answer: "Yes, Grove Vista Properties offers verified listings across off-plan, under-construction, and ready-to-move categories in Mumbai, giving buyers the flexibility to choose based on budget, timeline, and investment strategy." },
  { category: "service&support", order: 2, question: "Can I list my property for sale or rent with Grove Vista Properties?", answer: "Yes, Grove Vista Properties provides full seller and landlord services including professional marketing, access to a verified buyer and tenant pool, and expert pricing guidance; contact us through the website to begin." },
  { category: "service&support", order: 3, question: "Does Grove Vista Properties help with home loans and legal services?", answer: "Grove Vista Properties offers access to home loan assistance, legal due diligence, title search, property registration, and escrow services as part of a full end-to-end buying experience." },
  { category: "service&support", order: 4, question: "How do I contact Grove Vista Properties for a property enquiry?", answer: "You can reach the Grove Vista Properties team by WhatsApp at +91 89287 99951, by phone at +91 90827 99951, or by filling in the enquiry form on the website; our specialists typically respond within a few hours." },

  // Renting & Leasing
  { category: "renting", order: 1, question: "Is it better to buy a ready-to-move or under-construction 2BHK in Mumbai?", answer: "Ready-to-move 2BHK flats in Mumbai have no GST if the project has a completion certificate and offer zero wait risk, while under-construction homes are typically priced lower but carry delivery timeline risk — Grove Vista Properties helps you assess both options." },
  { category: "renting", order: 2, question: "Are maintenance charges included in the house rent in Mumbai?", answer: "Not always — maintenance charges are sometimes paid separately to the housing society and can add INR 2,000 to INR 20,000 per month to your cost — Grove Vista Properties always clarifies this upfront for every rental listing." },
  { category: "renting", order: 3, question: "How do I avoid rental fraud in Mumbai?", answer: "Always verify that the person showing you a property is the actual owner by asking for title documents — never pay a deposit without a signed agreement, use digital payments for a clear record, and use verified agents like Grove Vista Properties to avoid fraudulent listings." },
  { category: "renting", order: 4, question: "What is the rent for a villa or bungalow in Mumbai?", answer: "A 4BHK villa or bungalow in areas like Juhu, Bandra, or Chembur rents for INR 2 lakh to INR 5 lakh per month, depending on size, garden, and amenities — Grove Vista Properties lists premium independent houses for corporate tenants and high-net-worth renters." },

  // Luxury Homes
  { category: "luxury", order: 1, question: "What is the difference between luxury and ultra-luxury homes in Mumbai?", answer: "Luxury homes offer premium amenities and prime addresses typically above INR 5 crore, while ultra-luxury homes add bespoke design, private lifts, concierge services, and sea-facing configurations in locations like Worli and Juhu, often above INR 20 crore." },
  { category: "luxury", order: 2, question: "Which is the most expensive area for luxury flats in Mumbai?", answer: "Worli is Mumbai's most expensive residential address in 2026, with property rates ranging from INR 70,000 to over INR 1,10,000 per sq ft, followed closely by Malabar Hill, Bandra West, and Prabhadevi." },
  { category: "luxury", order: 3, question: "What amenities do luxury flats in Mumbai offer?", answer: "Luxury flats in Mumbai typically include rooftop infinity pools, private gyms, concierge services, smart home automation, EV charging stations, and 24-hour security — Grove Vista Properties only lists projects where amenities are fully operational." },
  { category: "luxury", order: 4, question: "What is the stamp duty on luxury flats in Mumbai in 2026?", answer: "Stamp duty in Maharashtra is 5 percent of the property value for homes above INR 30 lakh, and ready reckoner rates are unchanged for FY2026-27, meaning your acquisition cost is stable if you buy now through Grove Vista Properties." },
  { category: "luxury", order: 5, question: "Do luxury flats in Mumbai come furnished?", answer: "Most luxury flats are sold with premium fittings and modular kitchens but unfurnished — some ultra-luxury projects offer branded, fully furnished interiors as an option, and Grove Vista Properties can connect you with interior partners if needed." },

  // Working With Us
  { category: "agency", order: 1, question: "Can I list my property for sale or rent with Grove Vista Properties?", answer: "Yes, Grove Vista Properties provides full seller and landlord services including professional marketing, access to a verified buyer and tenant pool, and expert pricing guidance; contact us through the website to begin." },
  { category: "agency", order: 2, question: "Does Grove Vista Properties help with home loans and legal services?", answer: "Grove Vista Properties offers access to home loan assistance, legal due diligence, title search, property registration, and escrow services as part of a full end-to-end buying experience." },
  { category: "agency", order: 3, question: "Does Grove Vista Properties offer off-plan and ready-to-move listings?", answer: "Yes, Grove Vista Properties offers verified listings across off-plan, under-construction, and ready-to-move categories in Mumbai, giving buyers the flexibility to choose based on budget, timeline, and investment strategy." },
  { category: "agency", order: 4, question: "How do I contact Grove Vista Properties for a property enquiry?", answer: "You can reach the Grove Vista Properties team by WhatsApp at +91 89287 99951, by phone at +91 90827 99951, or by filling in the enquiry form on the website; our specialists typically respond within a few hours." },
];

export async function POST() {
  try {
    const col = await getCollection("site_faqs");

    const docs = FAQS.map((f) => ({
      ...f,
      id: `sfaq-${randomUUID().slice(0, 8)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    await col.insertMany(docs);

    return NextResponse.json(
      { message: `Inserted ${docs.length} FAQs across 5 categories.`, inserted: docs.length },
      { status: 201 }
    );
  } catch (err) {
    console.error("[seed-site-faqs]", err);
    return NextResponse.json({ message: "Seed failed. " + err.message }, { status: 500 });
  }
}
