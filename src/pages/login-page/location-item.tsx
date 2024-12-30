import { Link } from 'react-router-dom';
import { AppRoutes, CityInfoList } from '../../consts';
import { changeCityAction } from '../../store/data-process/data-process.slice';
import { useAppDispatch } from '../../store/hooks';
import { redirectToRoute } from '../../store/actions';

export function LocationItem(): JSX.Element {
  const randomCityIndex = Math.floor(Math.random() * CityInfoList.length);
  const randomCity = CityInfoList[randomCityIndex];
  const dispatch = useAppDispatch();
  const handleOnCityClick = () => {
    dispatch(changeCityAction(randomCity));
    dispatch(redirectToRoute(AppRoutes.Root));
  };
  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link
          className="locations__item-link"
          to={AppRoutes.Root}
          onClick={handleOnCityClick}
        >
          <span>{randomCity.name}</span>
        </Link>
      </div>
    </section>
  );
}
