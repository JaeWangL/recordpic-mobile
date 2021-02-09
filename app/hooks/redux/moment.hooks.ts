import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/rootReducers';
import {
  setCurrentMoment,
  setCurrentPhoto,
  MomentAction,
  MomentState,
  SetCurrentMomentPayload,
  SetCurrentPhotoPayload,
} from '@/redux/moment';

export interface MomentStore {
  moment: MomentState;
  setCurrentMoment: (payload: SetCurrentMomentPayload) => MomentAction;
  setCurrentPhoto: (payload: SetCurrentPhotoPayload) => MomentAction;
}

export const useMomentStore = (): MomentStore => {
  const dispatch = useDispatch();
  const moment = useSelector((state: RootState) => state.moment);

  const setCurrentMomentDispatch = useCallback(
    (payload: SetCurrentMomentPayload) => dispatch(setCurrentMoment(payload)),
    [dispatch],
  );

  const setCurrentPhotoDispatch = useCallback((payload: SetCurrentPhotoPayload) => dispatch(setCurrentPhoto(payload)), [
    dispatch,
  ]);

  return {
    moment,
    setCurrentMoment: setCurrentMomentDispatch,
    setCurrentPhoto: setCurrentPhotoDispatch,
  };
};
