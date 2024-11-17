import MainPage from '../components/pages/main-page/main-page';
import NotFound from '../components/pages/errors/404';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../consts';
import LoginPage from '../components/pages/login-page/login-page';
import FavoritesPage from '../components/pages/favorites-page/favorites-page';
import OfferPage from '../components/pages/offer-page/offer-page';
import PrivateRoute from '../components/private-route';
import { Offer } from '../types/offer';
type AppScreenProps = {
  offers: Offer[];
};

function App(props: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoutes.Root}
          element={<MainPage/>}
        />
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route path={AppRoutes.Offer} element={<OfferPage />} />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage offers={props.offers} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
