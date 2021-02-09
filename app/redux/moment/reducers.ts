import produce from 'immer';
import { ActionTypes, MomentAction } from './actions';
import { SetCurrentMomentPayload, SetCurrentPhotoPayload } from './payloads';

export interface MomentState {
  currentIndex?: number;
  currentPhotoIndex?: number;
}

export const initialState: MomentState = {};

export const reducers = (state: MomentState = initialState, action: MomentAction): MomentState =>
  produce(
    state,
    (draft): MomentState => {
      const { type, payload } = action;

      switch (type) {
        case ActionTypes.SET_CURRENT_MOMENT:
          draft.currentIndex = (payload as SetCurrentMomentPayload).index;
          return draft;
        case ActionTypes.SET_CURRENT_PHOTO:
          draft.currentPhotoIndex = (payload as SetCurrentPhotoPayload).index;
          return draft;
        default:
          return state;
      }
    },
  );
