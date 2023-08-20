import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store'

// Replacement methods for `useDispatch` and `useSelector`
// https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector