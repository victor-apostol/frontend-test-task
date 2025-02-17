import { Folder } from "src/types/gallery";

import FolderIcon from "../assets/icons/folder.png";

type Props = {
  activeFolderId: string;
  folder: Folder;
  onActiveFolderChange: (folder: Folder) => void;
};

const FolderItem = ({
  activeFolderId,
  folder,
  onActiveFolderChange,
}: Props) => {
  return (
    <div
      className={`pl-2 rounded-md cursor-pointer py-[2px] ${
        activeFolderId === folder.name ? "bg-gray-200" : "hover:bg-slate-100"
      }`}
    >
      <div
        key={folder.name}
        className={`flex items-center gap-4`}
        onClick={() => onActiveFolderChange(folder)}
      >
        <img
          src={FolderIcon}
          className="h-4 w-4 select-none"
          alt="folder icon"
        />

        <div className="flex gap-4">
          <span>{folder.name}</span>
          <span className="text-gray-500 text-xs leading-[24px]">
            {folder.items.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FolderItem;
