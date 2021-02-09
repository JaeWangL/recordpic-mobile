import {
  ChangeCurrentMomentPayload,
  ChangeCurrentPhotoPayload,
  SetCurrentMomentPayload,
  SetCurrentPhotoPayload,
} from './payloads';

export enum ActionTypes {
  CHANGE_CURRENT_MOMENT = 'moment/CHANGE_CURRENT_MOMENT',
  SET_CURRENT_MOMENT = 'moment/SET_CURRENT_MOMENT',
  CHANGE_CURRENT_PHOTO = 'moment/CHANGE_CURRENT_PHOTO',
  SET_CURRENT_PHOTO = 'moment/SET_CURRENT_PHOTO',
}

export interface ChangeCurrentMomentAction {
  type: typeof ActionTypes.CHANGE_CURRENT_MOMENT;
  payload: ChangeCurrentMomentPayload;
}

export interface ChangeCurrentPhotoAction {
  type: typeof ActionTypes.CHANGE_CURRENT_PHOTO;
  payload: ChangeCurrentPhotoPayload;
}

export interface SetCurrentMomentAction {
  type: typeof ActionTypes.SET_CURRENT_MOMENT;
  payload: SetCurrentMomentPayload;
}

export interface SetCurrentPhotoAction {
  type: typeof ActionTypes.SET_CURRENT_PHOTO;
  payload: SetCurrentPhotoPayload;
}

export type MomentAction =
  | ChangeCurrentMomentAction
  | SetCurrentMomentAction
  | ChangeCurrentPhotoAction
  | SetCurrentPhotoAction;

export const changeCurrentMoment = (payload: ChangeCurrentMomentPayload): MomentAction => ({
  type: ActionTypes.CHANGE_CURRENT_MOMENT,
  payload,
});

export const setCurrentMoment = (payload: SetCurrentMomentPayload): MomentAction => ({
  type: ActionTypes.SET_CURRENT_MOMENT,
  payload,
});

export const changeCurrentPhoto = (payload: ChangeCurrentPhotoPayload): MomentAction => ({
  type: ActionTypes.CHANGE_CURRENT_PHOTO,
  payload,
});

export const setCurrentPhoto = (payload: SetCurrentPhotoPayload): MomentAction => ({
  type: ActionTypes.SET_CURRENT_PHOTO,
  payload,
});
