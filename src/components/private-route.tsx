import { Navigate } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../consts';
import { useAppSelector } from '../store/hooks';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoutes.Login} />
  );
}

export default PrivateRoute;
