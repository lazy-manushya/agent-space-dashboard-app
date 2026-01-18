import { fetchBoeHeadersMetadata } from "@/api/boe-headers/boeHeadersData.service";

export async function GET() {
  try {
    const metadata = await fetchBoeHeadersMetadata();
    return Response.json(metadata, { status: 200 });
  } catch (error) {
    console.error("Error fetching BOE headers metadata:", error);
    return Response.json(
      { error: "Failed to fetch metadata" },
      { status: 500 },
    );
  }
}
