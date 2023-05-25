import { AxiosResponse } from "axios";
import { FileImageResponse, FileNodesResponse } from "../types";

export type AsyncAxiosResponse<Response> = Promise<AxiosResponse<Response>>;

export type FetchFileNodes = (
  fileId: string,
  nodeId: string
) => AsyncAxiosResponse<FileNodesResponse>;

export type FetchFileImage = (
  fileId: string,
  nodeId: string
) => AsyncAxiosResponse<FileImageResponse>;

export type FetchImageRawSource = (
  imageUrl: string
) => AsyncAxiosResponse<string>;
