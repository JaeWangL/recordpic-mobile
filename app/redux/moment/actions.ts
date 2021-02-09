import { SetCurrentMomentPayload, SetCurrentPhotoPayload } from './payloads';

export enum ActionTypes {
  SET_CURRENT_MOMENT = 'moment/SET_CURRENT_MOMENT',
  SET_CURRENT_PHOTO = 'moment/SET_CURRENT_PHOTO',
}

export interface SetCurrentMomentAction {
  type: typeof ActionTypes.SET_CURRENT_MOMENT;
  payload: SetCurrentMomentPayload;
}

export interface SetCurrentPhotoAction {
  type: typeof ActionTypes.SET_CURRENT_PHOTO;
  payload: SetCurrentPhotoPayload;
}

export type MomentAction = SetCurrentMomentAction | SetCurrentPhotoAction;

export const setCurrentMoment = (payload: SetCurrentMomentPayload): MomentAction => ({
  type: ActionTypes.SET_CURRENT_MOMENT,
  payload,
});

export const setCurrentPhoto = (payload: SetCurrentPhotoPayload): MomentAction => ({
  type: ActionTypes.SET_CURRENT_PHOTO,
  payload,
});
