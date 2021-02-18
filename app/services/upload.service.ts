import axios from 'axios';
import { apiEndpoints } from '@/configs';
import { DeleteImageBlobRequest, DeletePhotoBlobRequest } from '@/dtos';
import { LogUtil } from '@/utils';

export const uploadImageBlobAsync = async (
  data: FormData,
  accessToken: string,
  onUploadProgress?: (progressEvent: any) => void,
): Promise<string | undefined> => {
  try {
    const res = await axios.post<string>(`${apiEndpoints.upload}/image`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });

    return res.data;
  } catch (e) {
    LogUtil(JSON.stringify(e.response));
  }

  return undefined;
};

export const uploadPhotoBlobAsync = async (
  data: FormData,
  accessToken: string,
  onUploadProgress?: (progressEvent: any) => void,
): Promise<string | undefined> => {
  try {
    const res = await axios.post<string>(`${apiEndpoints.upload}/photo/profile`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });

    return res.data;
  } catch (e) {
    LogUtil(JSON.stringify(e.response));
  }

  return undefined;
};

export const deleteImageBlobAsync = async (data: DeleteImageBlobRequest, accessToken: string): Promise<boolean> => {
  const res = await axios.delete<boolean>(`${apiEndpoints.upload}/image`, {
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};

export const deletePhotoBlobAsync = async (data: DeletePhotoBlobRequest, accessToken: string): Promise<boolean> => {
  const res = await axios.delete<boolean>(`${apiEndpoints.upload}/photo/profile`, {
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};
