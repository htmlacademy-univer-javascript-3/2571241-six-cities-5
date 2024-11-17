import { CITY_INFO, CityData } from '../../../consts';
import { changeCityAction } from '../../../store/actions';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { City } from '../../../types/city';

function CitiesList(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCityName = useAppSelector((state) => state.cityName);
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITY_INFO.map((city: City) => (
            <li key={city.name} className="locations__item">
              <a
                className={`locations__item-link tabs__item${
                  currentCityName === city.name ? ' tabs__item--active' : ''
                }`}
                onClick={() => {
                  dispatch(changeCityAction(CityData[city.name]));
                }}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
