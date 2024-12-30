import '../../../markup/css/404.css';

function NotFound(): JSX.Element {
  return (
    <main className="not_found_main">
      <h1 className="not_found_h1">404</h1>
      <h2 className="not_found_h2">Error: 404 page not found</h2>
      <p className="not_found_p">
        Sorry, the page you&apos;re looking for cannot be accessed
      </p>
    </main>
  );
}

export default NotFound;
