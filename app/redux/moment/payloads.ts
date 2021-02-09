export interface ChangeCurrentMomentPayload {
  index: number;
}

export interface SetCurrentMomentPayload {
  index: number;
}

export interface ChangeCurrentPhotoPayload {
  index: number;
}

export interface SetCurrentPhotoPayload {
  index: number;
}

export type Payload =
  | ChangeCurrentMomentPayload
  | SetCurrentMomentPayload
  | ChangeCurrentPhotoPayload
  | SetCurrentPhotoPayload;
