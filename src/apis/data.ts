import axios from 'axios';
import { Block, NotionPage } from '@/types/data';

const NOTION_API_BASE_URL = 'https://api.notion.com/v1';
const TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Notion API용 Axios 인스턴스
const notionClient = axios.create({
  baseURL: NOTION_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',
  },
});

type NotionBlock = {
  id: string;
  type: string;
  has_children?: boolean;
  [key: string]: unknown;
};

type NotionBlockChildrenResponse = {
  results?: NotionBlock[];
  has_more?: boolean;
  next_cursor?: string | null;
};

export const getDataList = async () => {
  try {
    const res = await notionClient.post(`/databases/${DATABASE_ID}/query`, {
      sorts: [
        {
          property: 'order',
          direction: 'descending',
        },
      ],
    });

    if (!res || !res.data || !res.data.results) {
      throw new Error('Invalid response structure');
    }
    return res.data.results;
  } catch (err) {
    console.error('Error querying Notion database:', err);
    return [];
  }
};

const normalizeTitle = (value: string) => value.replace(/\s/g, '').trim();

const getNameTitle = (page: NotionPage) =>
  page.properties?.Name?.title?.[0]?.plain_text || '';

const getOrderNumber = (page: NotionPage) => {
  const order = page.properties?.order;
  return typeof order?.number === 'number'
    ? order.number
    : Number.NEGATIVE_INFINITY;
};

export const getAboutMePage = async (): Promise<NotionPage | null> => {
  try {
    const res = await notionClient.post(`/databases/${DATABASE_ID}/query`, {
      filter: {
        property: 'isHide',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'order',
          direction: 'descending',
        },
      ],
      page_size: 100,
    });

    const results = (res?.data?.results || []) as NotionPage[];
    if (results.length === 0) return null;

    const sortedResults = [...results].sort(
      (a, b) => getOrderNumber(b) - getOrderNumber(a),
    );

    const target =
      sortedResults.find(
        (page) =>
          normalizeTitle(getNameTitle(page)) === normalizeTitle('자기소개'),
      ) ||
      sortedResults.find((page) =>
        normalizeTitle(getNameTitle(page)).includes('자기소개'),
      ) ||
      sortedResults[0];

    return target || null;
  } catch (err) {
    console.error('Error querying About Me page from Notion:', err);
    return null;
  }
};

export const getBlockChildren = async (blockId: string) => {
  try {
    const response = await fetch(`/api/notion/${blockId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching Notion block children:', error);
    return [];
  }
};

export const getBlockChildrenFromNotion = async (
  blockId: string,
): Promise<Block[]> => {
  const fetchAllChildrenRecursive = async (
    targetBlockId: string,
  ): Promise<NotionBlock[]> => {
    const collected: NotionBlock[] = [];
    let hasMore = true;
    let nextCursor: string | null | undefined = undefined;

    while (hasMore) {
      const res: { data: NotionBlockChildrenResponse } =
        await notionClient.get<NotionBlockChildrenResponse>(
          `/blocks/${targetBlockId}/children`,
          {
            params: {
              page_size: 100,
              ...(nextCursor ? { start_cursor: nextCursor } : {}),
            },
          },
        );

      const pageResults = (res.data?.results || []) as NotionBlock[];
      collected.push(...pageResults);
      hasMore = Boolean(res.data?.has_more);
      nextCursor = res.data?.next_cursor;
    }

    return Promise.all(
      collected.map(async (block) => {
        if (!block.has_children) return block;

        const children = await fetchAllChildrenRecursive(block.id);
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
  };

  try {
    const results = await fetchAllChildrenRecursive(blockId);
    return results as Block[];
  } catch (error) {
    console.error('Error fetching Notion blocks from server:', error);
    return [];
  }
};
