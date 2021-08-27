import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { Link, useRouteData } from "remix";

import stylesUrl from "../styles/index.css";
import { getSession } from "../session";

export let meta: MetaFunction = () => {
  return {
    title: "Softwerker Remix",
    description: "Demoseite für Remix.run",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return {
    message: "Vielen Dank für das Lesen meines Artikels :-)",
    loggedIn: session.get("loggedIn"),
    username: session.get("username"),
  };
};

export default function Index() {
  let data = useRouteData();

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2 className="text-4xl mb-8">
        Hallo auf der Website des Remix Softwerker Artikel
      </h2>
      <p>
        Auf dieser Seite findet ihr die Beispiel Implementierung, die in dem{" "}
        <a href="https://info.codecentric.de/softwerker-vol-18">
          Softwerker Vol. 18
        </a>{" "}
        Artikel beschrieben wurde.
      </p>
      <p>Für euch eine Nachricht von dem Server: {data.message}</p>
      <p className="mt-8">
        {data.loggedIn ? (
          <Link to="/logout" className="font-bold">
            Hallo {data.username}! Du bist eingeloggt, klicke hier um dich
            auszuloggen.
          </Link>
        ) : (
          <Link to="/login" className="font-bold">
            Login Beispiel
          </Link>
        )}
      </p>
      <p className="mt-8">
        <Link to="/todo" className="font-bold">
          Todo Beispiel
        </Link>
      </p>
    </div>
  );
}
