import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { store } from './index';

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
