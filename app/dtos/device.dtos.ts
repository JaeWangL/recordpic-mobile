export enum DeviceTokenType {
  Android = 0,
  iOS = 1,
}

export interface CreateDeviceRequest {
  userId: number;
  type: DeviceTokenType;
  deviceToken: string;
}

export interface DeleteDeviceRequest {
  userId: number;
  type: DeviceTokenType;
}

export interface UpdateDeviceRequest {
  userId: number;
  type: DeviceTokenType;
  deviceToken: string;
}

export interface DevicePreviewDto {
  type: DeviceTokenType;
  deviceToken: string;
}
