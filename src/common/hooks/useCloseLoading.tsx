import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadingStatus } from '@/common/redux/feature/loading';

export default function useCloseLoading() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadingStatus('none'));
  }, []);
}
