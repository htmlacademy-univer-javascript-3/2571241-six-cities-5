import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../consts';
import { useAppSelector } from '../store/hooks';
import { getAuthCheckedStatus } from '../store/user-process/user-process.selectors';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector(getAuthCheckedStatus);
  return isAuth ? children : <Navigate to={AppRoutes.Login} />;
}

export default PrivateRoute;
