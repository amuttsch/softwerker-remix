import { LoaderFunction } from "remix";
import { redirect } from "@remix-run/node";
import { commitSession, getSession } from "../session";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  session.unset("loggedIn");
  session.unset("username");

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export default function LogoutPage() {
  return null;
}
