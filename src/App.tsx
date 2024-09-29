import React from 'react';
import MainPage from './pages/MainPage/MainPage';

type AppScreenProps = {
    rentalOffersCount: number
}

function App(props: AppScreenProps): JSX.Element {
  return (
    <React.StrictMode>
      <MainPage rentalOffersCount={props.rentalOffersCount} />
    </React.StrictMode>
  );
}

export default App;
