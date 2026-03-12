type NotionBlockNode = {
  id: string;
  type: string;
  has_children?: boolean;
  [key: string]: unknown;
};

type NotionBlockChildrenResponse<TBlock extends NotionBlockNode> = {
  results?: TBlock[];
  has_more?: boolean;
  next_cursor?: string | null;
};

type FetchChildrenPage<TBlock extends NotionBlockNode> = (
  blockId: string,
  startCursor?: string,
) => Promise<NotionBlockChildrenResponse<TBlock>>;

const fetchAllNotionBlockChildrenRecursive = async <
  TBlock extends NotionBlockNode,
>(
  blockId: string,
  fetchChildrenPage: FetchChildrenPage<TBlock>,
): Promise<TBlock[]> => {
  const collected: TBlock[] = [];
  let hasMore = true;
  let nextCursor: string | null | undefined = undefined;

  while (hasMore) {
    const page = await fetchChildrenPage(blockId, nextCursor || undefined);
    const pageResults = page.results || [];

    collected.push(...pageResults);
    hasMore = Boolean(page.has_more);
    nextCursor = page.next_cursor;
  }

  return Promise.all(
    collected.map(async (block) => {
      if (!block.has_children) return block;

      const children = await fetchAllNotionBlockChildrenRecursive(
        block.id,
        fetchChildrenPage,
      );

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
      } as TBlock;
    }),
  );
};

export {
  fetchAllNotionBlockChildrenRecursive,
  type NotionBlockNode,
  type NotionBlockChildrenResponse,
};
