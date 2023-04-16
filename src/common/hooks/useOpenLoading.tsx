import { useDispatch } from 'react-redux';
import { loadingStatus } from '@/common/redux/feature/loading';

export default function useOpenLoading() {
  const dispatch = useDispatch();
  return () => dispatch(loadingStatus('isLoading'));
}
