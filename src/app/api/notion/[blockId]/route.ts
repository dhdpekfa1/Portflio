import { NextResponse } from "next/server";
import axios from "axios";

const NOTION_API_BASE_URL = "https://api.notion.com/v1";
const NOTION_TOKEN = process.env.NOTION_TOKEN;

export async function GET(
  req: Request,
  { params }: { params: { blockId: string } }
) {
  const { blockId } = params;

  if (!NOTION_TOKEN || !blockId) {
    return NextResponse.json(
      { error: "Missing required parameters or environment variables." },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `${NOTION_API_BASE_URL}/blocks/${blockId}/children`,
      {
        headers: {
          Authorization: `Bearer ${NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
        },
        params: {
          page_size: 100,
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}
