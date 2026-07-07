export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { randomUUID } from "crypto";

const SAMPLE_FAQS = [
  // ── Lodha ──
  {
    developer: "lodha",
    question: "What types of properties does Lodha Group offer?",
    answer:
      "Lodha Group offers a wide range of properties including ultra-luxury residences, premium apartments, villas, and integrated townships across Mumbai, Pune, Hyderabad, and London. Their portfolio spans affordable housing through their Casa brand to the iconic World One skyscraper.",
    order: 1,
  },
  {
    developer: "lodha",
    question: "What is the possession timeline for Lodha projects?",
    answer:
      "Lodha Group is known for timely delivery. Most of their under-construction projects have possession timelines of 2–4 years from the date of booking. Ready-to-move inventory is available in several of their completed townships such as Palava and Lodha Belmondo.",
    order: 2,
  },
  {
    developer: "lodha",
    question: "Does Lodha Group provide home loan assistance?",
    answer:
      "Yes, Lodha Group has tie-ups with major banks and NBFCs including HDFC, SBI, ICICI, and Axis Bank. Their in-house relationship managers assist buyers through the entire home loan process, from documentation to disbursement.",
    order: 3,
  },
  {
    developer: "lodha",
    question: "What amenities are offered in Lodha developments?",
    answer:
      "Lodha developments feature world-class amenities such as Olympic-size swimming pools, landscaped gardens, fully equipped gyms, clubhouses, sports courts, concierge services, and 24/7 security. Their integrated townships also include schools, hospitals, and retail zones.",
    order: 4,
  },
  {
    developer: "lodha",
    question: "Are Lodha projects RERA registered?",
    answer:
      "Yes, all Lodha Group projects are registered with MahaRERA (Maharashtra Real Estate Regulatory Authority) as mandated by law. RERA registration details are available on both the Lodha website and the MahaRERA portal for full transparency.",
    order: 5,
  },

  // ── Oberoi ──
  {
    developer: "oberoi",
    question: "What makes Oberoi Realty different from other developers?",
    answer:
      "Oberoi Realty is known for its unwavering commitment to quality, design excellence, and on-time delivery. Each project is conceived as a landmark with meticulous attention to architecture, materials, and lifestyle amenities, setting a benchmark in Mumbai's premium real estate market.",
    order: 1,
  },
  {
    developer: "oberoi",
    question: "Which locations does Oberoi Realty operate in?",
    answer:
      "Oberoi Realty primarily operates in Mumbai's prime micro-markets including Goregaon, Mulund, Borivali, Worli, and Thane. Their flagship development, Oberoi Garden City in Goregaon, spans over 80 acres with residential, commercial, retail, and hospitality components.",
    order: 2,
  },
  {
    developer: "oberoi",
    question: "Does Oberoi Realty offer ready-to-move apartments?",
    answer:
      "Yes, Oberoi Realty has ready-to-move apartments available in several completed projects. Contact our sales team for the latest inventory of possession-ready units across Oberoi Esquire, Oberoi Eternia, and Oberoi Enigma.",
    order: 3,
  },
  {
    developer: "oberoi",
    question: "What is the price range for Oberoi Realty apartments?",
    answer:
      "Oberoi Realty caters to the premium and ultra-luxury segment. Prices typically range from ₹3 Cr for 2 BHK apartments in their mid-range projects to ₹20 Cr+ for larger configurations in their ultra-luxury developments. Prices vary by project, configuration, and floor.",
    order: 4,
  },
  {
    developer: "oberoi",
    question: "Can NRIs invest in Oberoi Realty projects?",
    answer:
      "Absolutely. NRI investment in Oberoi Realty projects is fully supported. NRIs can purchase residential properties under FEMA regulations. Oberoi Realty has a dedicated NRI desk to assist with documentation, power of attorney procedures, and repatriation of funds.",
    order: 5,
  },

  // ── Godrej ──
  {
    developer: "godrej",
    question: "What is Godrej Properties known for?",
    answer:
      "Godrej Properties is one of India's leading real estate developers, known for delivering quality homes backed by the 125-year-old Godrej brand legacy. They are recognized for sustainable construction practices, innovative design, and consistent delivery across residential, commercial, and township projects.",
    order: 1,
  },
  {
    developer: "godrej",
    question: "Where does Godrej Properties have projects in Mumbai?",
    answer:
      "Godrej Properties has several projects in Mumbai and the MMR region, including Godrej Reserve in Kandivali, Godrej Alive in Mulund, Godrej Emerald in Thane, and Godrej Nurture in Panvel. They also have developments in Vikhroli through their mother company's land assets.",
    order: 2,
  },
  {
    developer: "godrej",
    question: "What sustainability practices does Godrej Properties follow?",
    answer:
      "Godrej Properties is a pioneer in green building in India. Many of their projects hold IGBC (Indian Green Building Council) certifications. They incorporate rainwater harvesting, solar energy, energy-efficient systems, and eco-friendly construction materials across their developments.",
    order: 3,
  },
  {
    developer: "godrej",
    question: "How can I book a Godrej Properties apartment?",
    answer:
      "You can book a Godrej Properties apartment by visiting their site office, contacting authorised channel partners like Grove Vista Properties, or through the online booking portal. A token amount is required to initiate the booking, followed by execution of the sale agreement.",
    order: 4,
  },
  {
    developer: "godrej",
    question: "Does Godrej Properties have commercial projects?",
    answer:
      "Yes, Godrej Properties develops commercial real estate including office spaces, IT parks, and mixed-use developments. Their commercial portfolio includes projects in BKC, Vikhroli, and Pune. These are ideal for corporates and investors looking for Grade-A office space.",
    order: 5,
  },

  // ── Piramal ──
  {
    developer: "piramal",
    question: "What are Piramal Realty's flagship projects in Mumbai?",
    answer:
      "Piramal Realty's flagship projects include Piramal Vaikunth in Thane, Piramal Revanta in Mulund, and Piramal Mahalaxmi in the heart of Mumbai near the iconic Mahalaxmi Racecourse. Each project is a landmark development with distinctive architecture and premium amenities.",
    order: 1,
  },
  {
    developer: "piramal",
    question: "What sets Piramal Realty apart in the luxury segment?",
    answer:
      "Piramal Realty is backed by the Piramal Group, a diversified global business conglomerate. Their projects feature curated global architecture, bespoke interiors, and hospitality-grade services. They focus on creating holistic living experiences, not just homes.",
    order: 2,
  },
  {
    developer: "piramal",
    question: "Are Piramal projects RERA compliant?",
    answer:
      "Yes, all Piramal Realty projects are RERA registered with MahaRERA. Buyers can verify project details including approved plans, schedule of development, and developer information on the MahaRERA website using the RERA registration number provided for each project.",
    order: 3,
  },
  {
    developer: "piramal",
    question: "What configurations does Piramal Realty offer?",
    answer:
      "Piramal Realty offers 2 BHK, 3 BHK, and 4 BHK apartment configurations, along with penthouses and duplex units in select projects. Carpet areas typically range from 700 sq ft for compact 2 BHKs to over 3,000 sq ft for large 4 BHK penthouses.",
    order: 4,
  },
  {
    developer: "piramal",
    question: "Does Piramal Realty offer payment plans?",
    answer:
      "Yes, Piramal Realty offers flexible payment plans including construction-linked plans (CLP), down-payment plans with discounts, and subvention schemes in select projects. They also have tie-ups with major banks for pre-approved home loans at competitive interest rates.",
    order: 5,
  },

  // ── Marathon ──
  {
    developer: "marathon",
    question: "How long has Marathon Group been in real estate?",
    answer:
      "Marathon Group has been a prominent name in Mumbai's real estate sector for over 50 years. Founded in the 1960s, they have delivered millions of square feet of residential, commercial, and retail developments across Mumbai, establishing a legacy of trust and quality.",
    order: 1,
  },
  {
    developer: "marathon",
    question: "What types of projects does Marathon Group develop?",
    answer:
      "Marathon Group develops a diverse portfolio including affordable and mid-segment housing through their Marathon Nexzone and NeoHousing projects, premium residences, IT parks, commercial offices, and retail spaces. Their projects span Lower Parel, Mulund, Bhandup, and Panvel.",
    order: 2,
  },
  {
    developer: "marathon",
    question: "What is Marathon Nexzone?",
    answer:
      "Marathon Nexzone in Panvel is one of Mumbai's largest integrated townships spanning 350+ acres. It features residential apartments, IT/SEZ zones, retail high streets, schools, hospitals, and recreational facilities — offering a self-sufficient community living experience.",
    order: 3,
  },
  {
    developer: "marathon",
    question: "Does Marathon Group offer affordable housing options?",
    answer:
      "Yes, Marathon Group is one of the few premium developers with a strong affordable housing segment. Their NeoHousing projects offer PMAY-eligible homes with compact yet efficient layouts, making homeownership accessible for first-time buyers in Mumbai's suburbs.",
    order: 4,
  },
  {
    developer: "marathon",
    question: "How do I schedule a site visit to a Marathon project?",
    answer:
      "You can schedule a site visit by contacting Grove Vista Properties, calling the Marathon Group sales office, or filling out an inquiry form on our website. Our team will coordinate a personalised site visit at a time convenient for you.",
    order: 5,
  },

  // ── Sale – Residential ──
  { developer: "sale-residential", order: 1, question: "What is the process of buying a residential property in India?", answer: "The process involves selecting the right property, verifying RERA registration and legal documents (title deed, occupancy certificate), signing the sale agreement, paying stamp duty (4–7% of value), and registering ownership at the local sub-registrar's office. Grove Vista's advisors guide you through every step." },
  { developer: "sale-residential", order: 2, question: "What are the stamp duty charges for residential properties in Maharashtra?", answer: "In Maharashtra, stamp duty is 5% for men and 4% for women buyers on residential properties above ₹45 lakh. An additional 1% registration fee applies. Concessions are available under PMAY for first-time buyers." },
  { developer: "sale-residential", order: 3, question: "Can NRIs buy residential property in India?", answer: "Yes, NRIs can purchase residential properties in India under FEMA regulations without RBI approval. Payments must be made in Indian Rupees through NRE/NRO accounts. NRIs are also entitled to claim home loan interest deductions under Section 24." },
  { developer: "sale-residential", order: 4, question: "What is the difference between a ready-to-move and under-construction property?", answer: "Ready-to-move properties can be occupied immediately with no GST applicable, whereas under-construction properties attract 5% GST but often come at a lower entry price with potential for higher appreciation. The right choice depends on your timeline and investment goal." },
  { developer: "sale-residential", order: 5, question: "What documents should I check before buying a residential property?", answer: "Key documents include: title deed, sale agreement, RERA registration certificate, occupancy certificate (OC), commencement certificate (CC), encumbrance certificate (EC), approved building plan, and property tax receipts. Always verify there are no pending dues or litigation." },

  // ── Sale – Commercial ──
  { developer: "sale-commercial", order: 1, question: "What are the advantages of buying commercial property in India?", answer: "Commercial properties typically yield higher rental returns (6–10% per annum) compared to residential (2–4%). They offer long-term lease agreements (usually 3–9 years with lock-in periods), making them a stable investment for wealth generation." },
  { developer: "sale-commercial", order: 2, question: "What types of commercial properties are available for sale?", answer: "Commercial real estate includes Grade-A office spaces, IT parks, retail shops, showrooms, warehouses, and mixed-use developments. Each category has distinct investment characteristics, tenant profiles, and yield expectations." },
  { developer: "sale-commercial", order: 3, question: "What is GST on commercial property purchase?", answer: "Under-construction commercial properties attract 12% GST. Ready-to-move commercial spaces with an occupancy certificate are exempt from GST. Input Tax Credit (ITC) is available to registered businesses purchasing commercial properties." },
  { developer: "sale-commercial", order: 4, question: "What should I check for due diligence on a commercial property?", answer: "Beyond the standard title and RERA checks, verify: zoning and land use permissions, fire NOC, environmental clearances, existing tenancy agreements, building structure certificate, and HVAC/lift compliance for commercial occupancy." },
  { developer: "sale-commercial", order: 5, question: "Can I avail a loan to buy commercial property in India?", answer: "Yes, banks and NBFCs offer Loan Against Commercial Property (LACP) and commercial property purchase loans at 8.5–11% interest rates, typically financing up to 65–70% of the property value. Loan tenure is usually up to 15 years." },

  // ── Rent – Residential ──
  { developer: "rent-residential", order: 1, question: "What documents do I need to rent a residential property in India?", answer: "You typically need: Aadhaar card, PAN card, last 3 months' salary slips or ITR (for self-employed), bank statement, and employer reference letter. The landlord may also request your rental history or a guarantor." },
  { developer: "rent-residential", order: 2, question: "What is a Leave and Licence agreement?", answer: "A Leave and Licence (L&L) agreement is the standard rental contract in India. It gives the tenant a licence to use the property for a fixed period (usually 11 months) without creating any tenancy rights. It must be registered with the sub-registrar to be legally valid." },
  { developer: "rent-residential", order: 3, question: "How much security deposit is standard for renting in Mumbai?", answer: "In Mumbai, a security deposit of 2–6 months' rent is typical for residential rentals. The deposit is refundable at the end of the tenancy, subject to deductions for damages (if any) beyond normal wear and tear." },
  { developer: "rent-residential", order: 4, question: "Can a landlord increase rent during the agreement period?", answer: "No. Rent cannot be increased during the active agreement period unless specifically permitted in the contract. Annual rent escalation of 5–10% is usually agreed upon at the time of renewal." },
  { developer: "rent-residential", order: 5, question: "What are the tenant's rights in India?", answer: "Tenants have the right to peaceful enjoyment of the property, timely return of security deposit, proper notice before eviction, and the right to essential services (water, electricity). The Rent Control Act provides additional protections in older tenancies." },

  // ── Rent – Commercial ──
  { developer: "rent-commercial", order: 1, question: "What is a typical lease tenure for commercial office space in India?", answer: "Commercial office leases in India are typically 3+3+3 years (9 years total) or 5-year agreements with a renewal option. Grade-A offices often come with a 3-year lock-in period, meaning neither party can exit before 3 years without penalties." },
  { developer: "rent-commercial", order: 2, question: "What is CAM charge in a commercial lease?", answer: "CAM (Common Area Maintenance) charges are levied by landlords to cover costs of maintaining common areas like lobbies, lifts, parking, and landscaping. These are typically ₹15–50 per sq ft per month in Grade-A properties and are separate from the base rent." },
  { developer: "rent-commercial", order: 3, question: "Is GST applicable on commercial rent?", answer: "Yes, GST at 18% is applicable on commercial rent above ₹20 lakh per annum. The landlord collects GST and remits it to the government. Registered tenants can claim Input Tax Credit (ITC) on the GST paid." },
  { developer: "rent-commercial", order: 4, question: "What is a fit-out allowance in commercial leasing?", answer: "Many landlords offer a fit-out allowance (also called a tenant improvement allowance) — a contribution towards the tenant's interior fit-out costs. This is common in Grade-A buildings and can range from ₹100–500 per sq ft depending on the deal terms." },
  { developer: "rent-commercial", order: 5, question: "What are the key terms to negotiate in a commercial lease?", answer: "Key negotiation points include: base rent, rent escalation rate (typically 15% every 3 years), lock-in period, security deposit (3–6 months' rent), fit-out allowance, renewal options, exit clause, and subletting rights." },

  // ── Off-Plan – Residential ──
  { developer: "off-plan-residential", order: 1, question: "What is an off-plan residential property?", answer: "An off-plan residential property is purchased before the project is constructed — usually at the pre-launch or early construction stage. Buyers benefit from lower entry prices (typically 10–20% below market), flexible payment plans, and capital appreciation potential over the construction period." },
  { developer: "off-plan-residential", order: 2, question: "Is it safe to invest in off-plan residential projects in India?", answer: "Yes, with proper due diligence. Always verify the project's RERA registration, the developer's delivery track record, and the land title. RERA mandates a dedicated escrow account where 70% of collections must be deposited, protecting buyer funds." },
  { developer: "off-plan-residential", order: 3, question: "What are construction-linked payment plans?", answer: "A construction-linked plan (CLP) ties instalment payments to defined construction milestones — e.g., 10% on booking, 15% on plinth level, 20% on floor casting, etc. This ensures you pay as the project progresses and reduces upfront risk." },
  { developer: "off-plan-residential", order: 4, question: "What is a subvention scheme for off-plan properties?", answer: "A subvention scheme allows buyers to pay only a small initial amount (10–20%) at booking. The balance is borne by a bank as a home loan, with the developer paying the EMIs during the construction period. The buyer takes over EMIs only after possession." },
  { developer: "off-plan-residential", order: 5, question: "What happens if the developer delays possession of my off-plan home?", answer: "Under RERA, developers must pay interest at the SBI PLR + 2% rate for every month of delay beyond the RERA-committed date. Buyers also have the right to withdraw and claim a full refund with interest if they choose not to wait." },

  // ── Off-Plan – Commercial ──
  { developer: "off-plan-commercial", order: 1, question: "Why invest in off-plan commercial property?", answer: "Off-plan commercial properties offer attractive entry prices (15–25% below completed market rates), the ability to customise interiors before construction is complete, and strong appreciation potential in prime business districts. Pre-leasing opportunities are also available in many Grade-A off-plan projects." },
  { developer: "off-plan-commercial", order: 2, question: "What due diligence is needed for off-plan commercial investments?", answer: "Verify: RERA registration, land title and zoning for commercial use, developer's financial strength, key approvals (environmental clearance, fire NOC), proposed building specifications (Grade-A standards, HVAC, floor-to-ceiling height), and the escrow account status." },
  { developer: "off-plan-commercial", order: 3, question: "Can I pre-lease an off-plan commercial property?", answer: "Yes. Many developers and brokers arrange pre-lease agreements with corporates for under-construction commercial spaces. Pre-leasing guarantees rental income from possession date and significantly de-risks the investment from a cash flow perspective." },
  { developer: "off-plan-commercial", order: 4, question: "What is the typical ROI for off-plan commercial property?", answer: "Off-plan commercial properties in prime locations like BKC, Lower Parel, or Navi Mumbai's CBD zones can deliver 8–12% annual rental yields post-completion, in addition to 20–40% capital appreciation during the construction cycle." },
  { developer: "off-plan-commercial", order: 5, question: "What payment plans are available for off-plan commercial properties?", answer: "Common payment structures include: 10:90 (10% on booking, 90% on possession), construction-linked plans, and time-linked plans. For institutional investors, custom payment schedules can be negotiated directly with the developer through a channel partner." },
];

export async function POST() {
  try {
    const col = await getCollection("developer_faqs");

    const docs = SAMPLE_FAQS.map((f) => ({
      ...f,
      id: `faq-${randomUUID().slice(0, 8)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    await col.insertMany(docs);

    return NextResponse.json(
      { message: `Inserted ${docs.length} sample FAQs across 5 developers and 6 listing pages.`, inserted: docs.length },
      { status: 201 }
    );
  } catch (err) {
    console.error("[seed-faqs]", err);
    return NextResponse.json({ message: "Seed failed. " + err.message }, { status: 500 });
  }
}
