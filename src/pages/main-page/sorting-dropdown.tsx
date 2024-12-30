import { memo, useState } from 'react';
import { SortingOption, SortingOptionsList } from '../../consts';

type SortingDropDownProps = {
  onSortChange: (selectedSort: SortingOption) => void;
};

function SortingDropdown({ onSortChange: onSortChangeAction }: SortingDropDownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(SortingOption.Popular);

  const handleSortChange = (sortOption: SortingOption) => {
    setIsOpen(false);
    setSelectedSort(sortOption);
    onSortChangeAction(sortOption);
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {selectedSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {SortingOptionsList.map((option) => (
            <li
              key={option}
              className={`places__option ${
                option === selectedSort ? 'places__option--active' : ''
              }`}
              tabIndex={0}
              onClick={() => handleSortChange(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

const MemorizedSortingDropdown = memo(SortingDropdown);
export default MemorizedSortingDropdown;
