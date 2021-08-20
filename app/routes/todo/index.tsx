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

export default function LoginPage() {
  return (
    <>
      <Form method="post">
        <label htmlFor="todo">Todo:</label>
        <br />
        <input type="text" name="todo" id="todo" />
        <button type="submit">Add</button>
      </Form>
    </>
  );
}
