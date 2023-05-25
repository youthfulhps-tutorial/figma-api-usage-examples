import axiosInstance from "./index";
import { FetchFileImage, FetchFileNodes, FetchImageRawSource } from "./types";

export const fetchFileNodes: FetchFileNodes = (fileId, nodeId) => {
  return axiosInstance.get(`/files/${fileId}/nodes?ids=${nodeId}`);
};

export const fetchFileImage: FetchFileImage = (fileId, nodeId) => {
  return axiosInstance.get(`images/${fileId}?ids=${nodeId}&format=svg`);
};

export const fetchImageRawSource: FetchImageRawSource = (imageUrl) => {
  return axiosInstance.get(imageUrl);
};
