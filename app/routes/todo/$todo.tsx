import type { LinksFunction, LoaderFunction } from "remix";
import { ActionFunction, Link, useRouteData } from "remix";

import stylesUrl from "../../styles/index.css";

import React from "react";
import { commitSession, getSession } from "../../session";
import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { Todos } from "../../types";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const action: ActionFunction = async ({ request, params }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const todos = (session.get("todos") ?? []) as Todos;

  const todoIdx = todos.findIndex((t) => t.id.toString() === params.todo);
  todos[todoIdx].done = !todos[todoIdx].done || false;
  session.set("todos", todos);

  return redirect(`/todo/${params.todo}`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export let loader: LoaderFunction = async ({ params, request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  const todos = (session.get("todos") ?? []) as Todos;
  return todos.find((t) => t.id.toString() === params.todo);
};

export default function Todo() {
  const todo = useRouteData();

  return (
    <>
      <div className="flex flex-col mt-4">
        <h1 className="text-3xl">Your todo:</h1>
        <p>Name: {todo.todo}</p>
        <p>Is done: {todo.done ? "true" : "false"}</p>
        <Form className="flex flex-col" method="post">
          <button
            className="mt-2 rounded disabled:opacity-50 bg-softwerker-dark hover:bg-softwerker-light transition duration-150 ease-in-out text-white font-bold py-1"
            type="submit"
          >
            Toggle
          </button>
        </Form>
        <Link
          className="mt-2 rounded disabled:opacity-50 bg-softwerker-dark hover:bg-softwerker-light transition duration-150 ease-in-out text-white text-center font-bold py-1"
          to="/todo"
        >
          Back
        </Link>
      </div>
    </>
  );
}
