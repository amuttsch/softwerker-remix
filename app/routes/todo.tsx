import type { LinksFunction, LoaderFunction } from "remix";
import { Link, useRouteData } from "remix";

import stylesUrl from "../styles/index.css";

import { Outlet } from "react-router-dom";
import { getSession } from "../session";
import { Todo } from "../types";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return { todos: session.get("todos") ?? [] };
};

export default function Home() {
  const { todos } = useRouteData();

  return (
    <>
      List of stuff
      <ul>
        {todos.map((todo: Todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.done ? "line-through" : undefined }}
          >
            <Link to={`/todo/${todo.id}`}>{todo.todo}</Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
}
