import axios from 'axios';

const NOTION_API_BASE_URL = 'https://api.notion.com/v1';
const TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

const notionClient = axios.create({
  baseURL: NOTION_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',
  },
});

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

export const getBlockChildren = async (blockId: string) => {
  try {
    const response = await fetch(`/api/notion/${blockId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching Notion block children:', error);
    return [];
  }
};
