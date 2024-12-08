import MainPage from '../components/pages/main-page/main-page';
import NotFound from '../components/pages/errors/404';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from '../consts';
import LoginPage from '../components/pages/login-page/login-page';
import FavoritesPage from '../components/pages/favorites-page/favorites-page';
import OfferPage from '../components/pages/offer-page/offer-page';
import PrivateRoute from '../components/private-route';
import { useAppSelector } from '../store/hooks';
import { LoadingScreen } from '../components/pages/loading-page/loading-page';
import HistoryRouter from '../components/history-route';
import browserHistory from '../browser-history';

function App(): JSX.Element {
  const isDataStillLoading = useAppSelector(
    (state) => state.isOffersDataLoading
  );
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
