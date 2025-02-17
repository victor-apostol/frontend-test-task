import { FolderMedia } from "src/types/gallery";

type Props = {
  item: FolderMedia;
  isItemSelected: boolean;
  handleItemSelect: (itemId: number) => void;
  handleItemDelete: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    itemId: number
  ) => void;
  folderIndex: number;
};

const Media = ({
  item,
  isItemSelected,
  folderIndex,
  handleItemSelect,
  handleItemDelete,
}: Props) => {
  return (
    <div
      key={item.id}
      className="flex flex-col items-center"
      onClick={() => handleItemSelect(item.id)}
    >
      <div
        className="group cursor-pointer relative"
        style={
          isItemSelected
            ? {
                border: "blue 1px solid",
                padding: "8px",
                borderRadius: "12px",
                backgroundColor: "lightblue",
              }
            : {}
        }
      >
        <img src={item.url} alt="" />

        {isItemSelected && (
          <div className="absolute -translate-x-1/2 -translate-y-1/2 bottom-[1px] left-[10px] bg-blue-700 rounded-md p-[3px] text-white">
            <p className="leading-4 select-none">{folderIndex}</p>
          </div>
        )}

        <div
          className="hidden absolute -translate-x-1/2 -translate-y-1/2 top-[1px] right-[-8px] group-hover:block opacity-0 group-hover:opacity-100 group-hover:block transition-opacity delay-300 cursor-pointer"
          onClick={(e) => handleItemDelete(e, item.id)}
        >
          <span className="text-red-500 font-bold text-lg">X</span>
        </div>
      </div>

      <span
        className="text-gray-500"
        style={isItemSelected ? { color: "blue" } : {}}
      >
        {item.name}
      </span>
    </div>
  );
};

export default Media;
