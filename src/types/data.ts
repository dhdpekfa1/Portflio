export interface NotionPage {
  archived: boolean;
  cover: {
    type: string;
    external: {
      url: string;
    };
    file: {
      url: string;
    };
  } | null;
  created_by: {
    id: string;
    object: string;
  };
  created_time: string;
  icon: null | string;
  id: string;
  in_trash: boolean;
  last_edited_by: {
    object: string;
    id: string;
  };
  last_edited_time: string;
  object: string;
  parent: {
    database_id: string;
    type: string;
  };
  properties: Properties;
  public_url: null | string;
  url: string;
}

export interface Properties {
  Description: {
    id: string;
    type: "rich_text";
    rich_text: Array<{
      type: string;
      text: {
        content: string;
        link: null | { url: string };
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: null | string;
    }>;
  };
  Github: {
    id: string;
    type: "url";
    url: string;
  };
  Name: {
    id: string;
    type: "title";
    title: Array<{
      type: string;
      text: {
        content: string;
        link: null | { url: string };
      };
      annotations: {
        bold: boolean;
        italic: boolean;
        strikethrough: boolean;
        underline: boolean;
        code: boolean;
        color: string;
      };
      plain_text: string;
      href: null | string;
    }>;
  };
  Playstore: {
    id: string;
    type: "url";
    url: string;
  };
  WorkPeriod: {
    id: string;
    type: "date";
    date: {
      start: string;
      end: string;
      time_zone: null | string;
    };
  };
  tags: {
    id: string;
    type: "multi_select";
    multi_select: Array<{
      id: string;
      name: string;
      color: string;
    }>;
  };
}
