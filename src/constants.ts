import { Folder } from "./types/gallery";

export enum MEDIA_TYPE {
  IMAGE = "image",
  VIDEO = "video",
  GIF = "gif",
}

export const folders: Array<Folder> = [
  {
    name: "Folder_1",
    items: [
      {
        id: 1,
        type: MEDIA_TYPE.VIDEO,
        url: "https://picsum.photos/200/300",
        name: "pic_one.mp4",
      },
      {
        id: 2,
        type: MEDIA_TYPE.IMAGE,
        url: "https://picsum.photos/200/300",
        name: "pic_two.png",
      },
      {
        id: 3,
        type: MEDIA_TYPE.GIF,
        url: "https://picsum.photos/200/300",
        name: "pic_three.gif",
      },
      {
        id: 4,
        type: MEDIA_TYPE.IMAGE,
        url: "https://picsum.photos/200/300",
        name: "pic_four.png",
      },
      {
        id: 5,
        type: MEDIA_TYPE.VIDEO,
        url: "https://picsum.photos/200/300",
        name: "pic_five.mp4",
      },
    ],
  },
  {
    name: "Folder_2",
    items: [
      {
        id: 6,
        type: MEDIA_TYPE.VIDEO,
        url: "https://picsum.photos/200/300",
        name: "pic_six.mp4",
      },
      {
        id: 7,
        type: MEDIA_TYPE.GIF,
        url: "https://picsum.photos/200/300",
        name: "pic_seven.gif",
      },
    ],
  },
  {
    name: "Empty_F",
    items: [],
  },
];
