import axios from 'axios';
import { Alert } from 'react-native';
import { apiEndpoints } from '@/configs';
import { DevicePreviewDto, CreateDeviceRequest, DeleteDeviceRequest } from '@/dtos';
import { translate } from '@/i18n';
import { isAxiosError, LogUtil } from '@/utils';

export const createDeviceAsync = async (
  request: CreateDeviceRequest,
  accessToken: string,
): Promise<DevicePreviewDto | undefined> => {
  try {
    const res = await axios.post<DevicePreviewDto>(apiEndpoints.devices, request, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      Alert.alert('', translate('error.server'));
    }
    LogUtil(error);
  }

  return undefined;
};

export const deleteDeviceAsync = async (request: DeleteDeviceRequest, accessToken: string): Promise<boolean> => {
  try {
    const res = await axios.delete<boolean>(apiEndpoints.devices, {
      data: request,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      Alert.alert('', translate('error.server'));
    }
    LogUtil(error);
  }

  return false;
};
