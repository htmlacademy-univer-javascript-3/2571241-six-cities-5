import MainPage from '../../pages/main-page/main-page';
import NotFound from '../../pages/errors/404';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../../consts';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route';
import { useAppSelector } from '../../store/hooks';
import { LoadingScreen } from '../../pages/loading-page/loading-page';
import HistoryRouter from '../history-route';
import browserHistory from '../../browser-history';
import { isOffersDataStillLoading } from '../../store/data-process/data-process.selectors';

function App(): JSX.Element {
  const isDataStillLoading = useAppSelector(isOffersDataStillLoading);
  if (isDataStillLoading) {
    return <LoadingScreen />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoutes.Root} element={<MainPage />} />
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route path={AppRoutes.Offer} element={<OfferPage />} />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
