export interface ServerResponseTags {
  tags: ServerResponseSingleTag[];
  isError: boolean;
}

export interface ServerResponseSingleTag {
  _id: string;
  count: number;
}

export interface UIResponseTags {
  tags: UIResponseSingleTag[];
  isError: boolean;
}

export interface UIResponseSingleTag {
  tagName: string;
  count: number;
}
