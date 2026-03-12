import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import {
  fetchAllNotionBlockChildrenRecursive,
  type NotionBlockNode,
  type NotionBlockChildrenResponse,
} from '@/utils/notion-recursive-fetch';

const NOTION_API_BASE_URL = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

// Next.js 15에서는 런타임에 환경 변수 확인
function getNotionToken() {
  return process.env.NOTION_TOKEN;
}

const fetchChildrenPage = async (
  blockId: string,
  token: string,
  startCursor?: string,
): Promise<NotionBlockChildrenResponse<NotionBlockNode>> => {
  const response = await axios.get(
    `${NOTION_API_BASE_URL}/blocks/${blockId}/children`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      params: {
        page_size: 100,
        ...(startCursor ? { start_cursor: startCursor } : {}),
      },
    },
  );

  return response.data;
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ blockId: string }> },
): Promise<NextResponse> {
  try {
    const { blockId } = await params;
    const NOTION_TOKEN = getNotionToken();

    if (!NOTION_TOKEN) {
      return NextResponse.json(
        { error: 'Missing NOTION_TOKEN environment variable.' },
        { status: 500 },
      );
    }

    if (!blockId) {
      return NextResponse.json(
        { error: 'Missing blockId parameter.' },
        { status: 400 },
      );
    }

    const results = await fetchAllNotionBlockChildrenRecursive(
      blockId,
      (targetBlockId, startCursor) =>
        fetchChildrenPage(targetBlockId, NOTION_TOKEN, startCursor),
    );
    return NextResponse.json({ results }, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500;
      const errorData = error.response?.data;

      // 에러 데이터가 객체인 경우 처리
      const errorMessage =
        typeof errorData === 'object' && errorData !== null
          ? errorData.message || errorData.error || JSON.stringify(errorData)
          : errorData || error.message || 'Failed to fetch from Notion API';

      return NextResponse.json({ error: errorMessage }, { status: statusCode });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred.' },
        { status: 500 },
      );
    }
  }
}
