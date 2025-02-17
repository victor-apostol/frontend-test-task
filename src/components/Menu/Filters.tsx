import { useState } from "react";

import { Folder, MediaTypesFilter } from "src/types/gallery";
import { MEDIA_TYPE } from "../../constants";

import FolderIcon from "../../assets/icons/folder.png";
import DownArrowIcon from "../../assets/icons/down-arrow.png";

type Props = {
  folder: Folder;
  mediaTypesFilter: MediaTypesFilter;
  onMediaFilterChange: (filterOption: MediaTypesFilter) => void;
};

const Filters = ({ folder, mediaTypesFilter, onMediaFilterChange }: Props) => {
  const [showMediaTypeOptions, setShowMediaTypeOptios] =
    useState<boolean>(false);

  const mediaTypeAmounts = folder.items.reduce(
    (result, item) => {
      if (item.type === "image") result.imagesAmount++;
      else if (item.type === "video") result.videosAmount++;
      else if (item.type === "gif") result.gifsAmount++;

      return result;
    },
    { imagesAmount: 0, videosAmount: 0, gifsAmount: 0 }
  );

  const handleMediaTypeFilterToogle = (
    mediaTypeFilterOption: MEDIA_TYPE | "all"
  ) => {
    if (mediaTypeFilterOption === "all") {
      onMediaFilterChange({
        enabled: !mediaTypesFilter.enabled,
        image: !mediaTypesFilter.enabled,
        video: !mediaTypesFilter.enabled,
        gif: !mediaTypesFilter.enabled,
      });

      return;
    }

    onMediaFilterChange({
      ...mediaTypesFilter,
      enabled: mediaTypesFilter.enabled ? false : mediaTypesFilter.enabled,
      [mediaTypeFilterOption]: !mediaTypesFilter[mediaTypeFilterOption],
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="font-semibold">Filters</span>

      <div>
        <div className="flex items-center justify-between mb-2">
          <div
            className="flex items-center gap-2 cursor-pointer "
            onClick={() => setShowMediaTypeOptios((prevState) => !prevState)}
          >
            <span className="leading-[0px] text-gray-500">Media type</span>

            <img
              src={DownArrowIcon}
              className="w-[10px] h-[10px] select-none"
              style={
                showMediaTypeOptions ? { transform: "rotate(180deg)" } : {}
              }
              alt="arrow icon"
            />
          </div>

          <input
            type="checkbox"
            checked={mediaTypesFilter.enabled}
            onChange={() => handleMediaTypeFilterToogle("all")}
          />
        </div>

        {showMediaTypeOptions && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={FolderIcon}
                  className="w-4 h-4 select-none"
                  alt="image icon"
                />
                <span>Images</span>
                <span className="text-gray-500 text-xs leading-[24px]">
                  {mediaTypeAmounts.imagesAmount}
                </span>
              </div>

              <input
                type="checkbox"
                checked={mediaTypesFilter.image}
                onChange={() => handleMediaTypeFilterToogle(MEDIA_TYPE.IMAGE)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={FolderIcon}
                  className="w-4 h-4 select-none"
                  alt="video icon"
                />
                <span>Videos</span>
                <span className="text-gray-500 text-xs leading-[24px]">
                  {mediaTypeAmounts.videosAmount}
                </span>
              </div>

              <input
                type="checkbox"
                checked={mediaTypesFilter.video}
                onChange={() => handleMediaTypeFilterToogle(MEDIA_TYPE.VIDEO)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={FolderIcon}
                  className="w-4 h-4 select-none"
                  alt="gif icon"
                />
                <span>GIF</span>
                <span className="text-gray-500 text-xs leading-[24px]">
                  {mediaTypeAmounts.gifsAmount}
                </span>
              </div>

              <input
                type="checkbox"
                checked={mediaTypesFilter.gif}
                onChange={() => handleMediaTypeFilterToogle(MEDIA_TYPE.GIF)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
