import { useEffect, useState } from "react";

import Filters from "./components/Menu/Filters";
import Media from "./components/Media";
import FolderItem from "./components/FolderItem";

import { folders, MEDIA_TYPE } from "./constants";

import { Folder, FolderMedia } from "./types/gallery";

import FolderIcon from "./assets/icons/folder.png";

const App = () => {
  const [activeFolder, setActiveFolder] = useState<Folder>(folders[0]);
  const [selectedFolderItemsIds, setSelectedFolderItemsIds] = useState<
    Array<number>
  >([]);
  const [displayedFolderItems, setDisplayedFolderItems] = useState<
    Array<FolderMedia>
  >(activeFolder.items);
  const [mediaTypesFilter, setMediaTypesFilter] = useState({
    enabled: true,
    [MEDIA_TYPE.IMAGE]: true,
    [MEDIA_TYPE.VIDEO]: true,
    [MEDIA_TYPE.GIF]: true,
  });

  const isItemSelected = selectedFolderItemsIds.length > 0;

  const handleMediaSelect = (itemId: number) => {
    if (!selectedFolderItemsIds.includes(itemId)) {
      setSelectedFolderItemsIds((prev) => [...prev, itemId]);

      return;
    }

    setSelectedFolderItemsIds((prev) => prev.filter((item) => item !== itemId));
  };

  const handleSelectAllMedia = () => {
    setSelectedFolderItemsIds(
      isItemSelected ? [] : activeFolder.items.map((item) => item.id)
    );
  };

  const handleMediaDelete = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    targetItemId: number
  ) => {
    event.stopPropagation();
    setActiveFolder((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== targetItemId),
    }));
    setDisplayedFolderItems((prev) =>
      prev.filter((item) => item.id !== targetItemId)
    );
    setSelectedFolderItemsIds((prev) => [
      ...prev.filter((itemId) => itemId !== targetItemId),
    ]);
  };

  const handleMediaTypeFilterChange = () => {
    const { enabled, ...filters } = mediaTypesFilter;

    if (
      mediaTypesFilter.enabled &&
      displayedFolderItems.length !== activeFolder.items.length
    ) {
      setDisplayedFolderItems(activeFolder.items);

      return;
    }

    const activeMediaTypeFilters = Object.keys(filters).filter(
      (key) => mediaTypesFilter[key as MEDIA_TYPE] === true
    );

    setDisplayedFolderItems(
      activeFolder.items.filter((folderItem) =>
        activeMediaTypeFilters.includes(folderItem.type)
      )
    );
  };

  useEffect(() => {
    setSelectedFolderItemsIds([]);
    handleMediaTypeFilterChange();
  }, [activeFolder.name]);

  useEffect(() => {
    handleMediaTypeFilterChange();
  }, [mediaTypesFilter]);

  return (
    <div className="grid grid-cols-[15%_85%] min-h-screen px-4 pt-2">
      <div className="flex grid-cols-1 flex-col">
        <div className="header-logo flex gap-4">
          <img src={FolderIcon} className="w-8 h-8" alt="app logo" />
          <span className="text-lg">Media gallery</span>
        </div>

        <div className="menu flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-semibold pl-2">Folder</span>

            <div className="flex flex-col gap-2">
              {folders.map((folder) => (
                <FolderItem
                  key={folder.name}
                  activeFolderId={activeFolder.name}
                  folder={folder}
                  onActiveFolderChange={() => setActiveFolder(folder)}
                />
              ))}
            </div>
          </div>

          <Filters
            folder={activeFolder}
            mediaTypesFilter={mediaTypesFilter}
            onMediaFilterChange={(arg) => setMediaTypesFilter(arg)}
          />
        </div>
      </div>

      <div className="gallery">
        {activeFolder.items.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen">
            <span>Your folder is empty</span>
          </div>
        ) : displayedFolderItems.length === 0 ? (
          <div className="flex items-center justify-center min-h-screen">
            <span>Your items are hidden based on your active filters</span>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-2">
              <input
                checked={isItemSelected}
                onChange={() => handleSelectAllMedia()}
                type="checkbox"
              />

              <span>{selectedFolderItemsIds.length} selected</span>
            </div>

            <div className="grid grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
              {displayedFolderItems.map((item) => (
                <Media
                  key={item.id}
                  item={item}
                  folderIndex={selectedFolderItemsIds.indexOf(item.id) + 1}
                  isItemSelected={selectedFolderItemsIds.includes(item.id)}
                  handleItemSelect={handleMediaSelect}
                  handleItemDelete={handleMediaDelete}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
