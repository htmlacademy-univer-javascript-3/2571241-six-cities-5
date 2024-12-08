import { Link } from 'react-router-dom';
import { AppRoutes, AuthorizationStatus } from '../../../consts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logoutAction } from '../../../store/api-actions';

export function Header(): JSX.Element {
  const offers = useAppSelector((state) => state.offerList);
  const favoritesCount = offers.filter((offer) => offer.isFavorite).length;
  const isAuthorized =
    useAppSelector((state) => state.authorizationStatus) ===
    AuthorizationStatus.Auth;
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuthorized && (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoutes.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">
                      {favoritesCount}
                    </span>
                  </Link>
                </li>
              )}
              <li className="header__nav-item">
                {isAuthorized ? (
                  <Link
                    className="header__nav-link"
                    onClick={(evt) => {
                      evt.preventDefault();
                      dispatch(logoutAction());
                    }}
                    to={AppRoutes.Root}
                  >
                    <span className="header__signout">Sign out</span>
                  </Link>
                ) : (
                  <Link className="header__nav-link" to={AppRoutes.Login}>
                    <span className="header__signout">Sign in</span>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
