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
    <div className="container mx-auto max-w-screen-lg pt-4 mb-12 px-8">
      <div className="flex flex-wrap justify-center -mx-4 overflow-hidden">
        <div className="my-4 px-4 w-1/3 overflow-hidden">
          <h1 className="text-4xl pb-4">Stuff to do</h1>
          <ul className="list-disc ml-4">
            {todos.map((todo: Todo) => (
              <li
                key={todo.id}
                style={{
                  textDecoration: todo.done ? "line-through" : undefined,
                }}
              >
                <Link to={`/todo/${todo.id}`} className="underline">
                  {todo.todo}
                </Link>
              </li>
            ))}
          </ul>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
