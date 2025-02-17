import { MEDIA_TYPE } from "src/constants";

export type FolderMedia = {
  id: number;
  name: string;
  url: string;
  type: MEDIA_TYPE;
};

export type Folder = {
  // treating as name as id [unique]
  name: string;
  items: Array<FolderMedia>;
};

export type MediaTypesFilter = {
  enabled: boolean;
} & Record<MEDIA_TYPE, boolean>;
