import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/rootReducers';
import {
  changeCurrentMoment,
  changeCurrentPhoto,
  MomentAction,
  MomentState,
  ChangeCurrentMomentPayload,
  ChangeCurrentPhotoPayload,
} from '@/redux/moment';

export interface MomentStore {
  moment: MomentState;
  changeCurrentMoment: (payload: ChangeCurrentMomentPayload) => MomentAction;
  changeCurrentPhoto: (payload: ChangeCurrentPhotoPayload) => MomentAction;
}

export const useMomentStore = (): MomentStore => {
  const dispatch = useDispatch();
  const moment = useSelector((state: RootState) => state.moment);

  const changeCurrentMomentDispatch = useCallback(
    (payload: ChangeCurrentMomentPayload) => dispatch(changeCurrentMoment(payload)),
    [dispatch],
  );

  const changeCurrentPhotoDispatch = useCallback(
    (payload: ChangeCurrentPhotoPayload) => dispatch(changeCurrentPhoto(payload)),
    [dispatch],
  );

  return {
    moment,
    changeCurrentMoment: changeCurrentMomentDispatch,
    changeCurrentPhoto: changeCurrentPhotoDispatch,
  };
};
