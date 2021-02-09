export interface SetCurrentMomentPayload {
  index: number;
}

export interface SetCurrentPhotoPayload {
  index: number;
}

export type Payload = SetCurrentMomentPayload | SetCurrentPhotoPayload;
