import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const NOTION_API_BASE_URL = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';

// Next.js 15에서는 런타임에 환경 변수 확인
function getNotionToken() {
  return process.env.NOTION_TOKEN;
}

type NotionBlock = {
  id: string;
  type: string;
  has_children?: boolean;
  [key: string]: unknown;
};

const fetchChildrenPage = async (
  blockId: string,
  token: string,
  startCursor?: string,
): Promise<{
  results: NotionBlock[];
  has_more: boolean;
  next_cursor: string | null;
}> => {
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

const fetchAllBlockChildrenRecursive = async (
  blockId: string,
  token: string,
): Promise<NotionBlock[]> => {
  const results: NotionBlock[] = [];
  let nextCursor: string | null | undefined = undefined;
  let hasMore = true;

  while (hasMore) {
    const page = await fetchChildrenPage(
      blockId,
      token,
      nextCursor || undefined,
    );
    results.push(...(page.results || []));
    hasMore = page.has_more;
    nextCursor = page.next_cursor;
  }

  const blocksWithChildren = await Promise.all(
    results.map(async (block) => {
      if (!block.has_children) return block;

      const children = await fetchAllBlockChildrenRecursive(block.id, token);
      const blockContent =
        typeof block[block.type] === 'object' && block[block.type] !== null
          ? (block[block.type] as Record<string, unknown>)
          : {};

      return {
        ...block,
        [block.type]: {
          ...blockContent,
          children,
        },
      };
    }),
  );

  return blocksWithChildren;
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

    const results = await fetchAllBlockChildrenRecursive(blockId, NOTION_TOKEN);
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
