import type { LinksFunction, LoaderFunction } from "remix";
import { ActionFunction, useRouteData } from "remix";

import stylesUrl from "../../styles/index.css";

import React, { useCallback } from "react";
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
  const todo = todos.find((t) => t.id.toString() === params.todo);

  return todo;
};

export default function Home() {
  const todo = useRouteData();

  return (
    <>
      Todo: {todo.todo} (Done: {todo.done ? "true" : "false"})
      <Form method="post">
        <button type="submit">Toggle</button>
      </Form>
    </>
  );
}
