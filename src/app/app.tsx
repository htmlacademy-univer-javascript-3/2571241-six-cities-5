import MainPage from '../components/pages/main-page/main-page';
import NotFound from '../components/pages/errors/404';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../consts';
import LoginPage from '../components/pages/login-page/login-page';
import FavoritesPage from '../components/pages/favorites-page/favorites-page';
import OfferPage from '../components/pages/offer-page/offer-page';
import PrivateRoute from '../components/private-route';
import { useAppSelector } from '../store/hooks';
import { LoadingScreen } from '../components/pages/loading-page/loading-page';

function App(): JSX.Element {
  const isDataStillLoading = useAppSelector(
    (state) => state.isOffersDataLoading
  );
  if (isDataStillLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoutes.Root} element={<MainPage />} />
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route path={AppRoutes.Offer} element={<OfferPage />} />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
