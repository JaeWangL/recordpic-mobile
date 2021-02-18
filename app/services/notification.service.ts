import axios from 'axios';
import { apiEndpoints } from '@/configs';
import { DeleteNotificationRequest, NotificationPreviewDto, PaginatedItemsViewModel } from '@/dtos';

export const getNotificationsPreviewAsync = async (
  userId: number,
  accessToken: string,
  pageIndex = 0,
  pageSize = 10,
): Promise<PaginatedItemsViewModel<NotificationPreviewDto>> => {
  const res = await axios.get<PaginatedItemsViewModel<NotificationPreviewDto>>(
    `${apiEndpoints.notifications}/user/${userId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  );

  return res.data;
};

export const deleteNotificationAsync = async (
  data: DeleteNotificationRequest,
  accessToken: string,
): Promise<boolean> => {
  const res = await axios.get<boolean>(`${apiEndpoints.notifications}`, {
    data,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return res.data;
};
