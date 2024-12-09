import axios from "axios";

const NOTION_API_BASE_URL = "https://api.notion.com/v1";
const TOKEN = process.env.TOKEN;
const DATABASE_ID = process.env.DATABASE_ID;

const notionClient = axios.create({
  baseURL: NOTION_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  },
});

export const getDataList = async () => {
  try {
    const res = await notionClient.post(`/databases/${DATABASE_ID}/query`);

    if (!res) {
      throw new Error();
    }
    return res.data.results;
  } catch (err) {
    console.error("Error querying Notion database:", err);
    return {
      props: {
        projects: [],
      },
    };
  }
};
