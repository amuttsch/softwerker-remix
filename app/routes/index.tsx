import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { Link, useRouteData } from "remix";

import stylesUrl from "../styles/index.css";

export let meta: MetaFunction = () => {
  return {
    title: "Softwerker Remix",
    description: "Demoseite für Remix.run",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async () => {
  return { message: "Vielen Dank für das Lesen meines Artikels :-)" };
};

export default function Index() {
  let data = useRouteData();

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>Hallo auf der Website des Remix Softwerker Artikel</h2>
      <p>
        Auf dieser Seite findet ihr die Beispiel Implementierung, die in dem{" "}
        <a href="https://info.codecentric.de/softwerker-vol-18">
          Softwerker Vol. 18
        </a>{" "}
        Artikel beschrieben wurde.
      </p>
      <p>Für euch eine Nachricht von dem Server: {data.message}</p>
      <p>
        <Link to="/login">Login Beispiel</Link>
      </p>
      <p>
        <Link to="/todo">Todo Beispiel</Link>
      </p>
    </div>
  );
}
