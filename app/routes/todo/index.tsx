import { ActionFunction } from "remix";
import { Form } from "@remix-run/react";
import { commitSession, getSession } from "../../session";
import { redirect } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const body = new URLSearchParams(await request.text());

  const todo = body.get("todo");
  const todos = session.get("todos") ?? [];

  todos.push({ todo: todo, id: todos.length + 1, done: false });
  session.set("todos", todos);

  return redirect("/todo", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function TodoIndex() {
  return (
    <>
      <Form className="flex flex-col" method="post">
        <label className="text-3xl mt-4 mb-2" htmlFor="todo">
          Add Todo:
        </label>
        <br />
        <input
          className="text-sm rounded border p-2"
          type="text"
          name="todo"
          id="todo"
        />
        <button
          className="mt-2 rounded disabled:opacity-50 bg-softwerker-dark hover:bg-softwerker-light transition duration-150 ease-in-out text-white font-bold py-1"
          type="submit"
        >
          Add
        </button>
      </Form>
    </>
  );
}
