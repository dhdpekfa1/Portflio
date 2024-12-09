import axios from "axios";
import { TOKEN, DATABASE_ID } from "../../config";

const NOTION_API_BASE_URL = "https://api.notion.com/v1";

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
    throw err;
  }
};
