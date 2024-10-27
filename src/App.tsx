import MainPage from './pages/MainPage/MainPage';
import NotFound from './pages/errors/404';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from './consts';
import LoginPage from './pages/Login/LoginPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import OfferPage from './pages/Offer/OfferPage';
import PrivateRoute from './components/private-route';
import { Offer } from './types/offer';

type AppScreenProps = {
  rentalOffersCount: number;
  offers: Offer[];
};

function App(props: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoutes.Root}
          element={
            <MainPage
              rentalOffersCount={props.rentalOffersCount}
              offers={props.offers}
            />
          }
        />
        <Route path={AppRoutes.Login} element={<LoginPage />} />
        <Route path={AppRoutes.Offer} element={<OfferPage />} />
        <Route
          path={AppRoutes.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
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
