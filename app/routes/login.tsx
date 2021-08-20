import {
  ActionFunction,
  json,
  LoaderFunction,
  usePendingFormSubmit,
  useRouteData,
} from "remix";
import { redirect } from "@remix-run/node";
import { commitSession, getSession } from "../session";
import { Form } from "@remix-run/react";
import { login } from "../api/auth";

export const LOGIN_REDIRECT_SESSION_KEY = "login_redirect_url";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const body = new URLSearchParams(await request.text());

  const username = body.get("username");
  const password = body.get("password");

  const successful = login(username, password);
  let redirectUri = "/login";

  if (successful) {
    session.set("loggedIn", "true");
    redirectUri = session.get(LOGIN_REDIRECT_SESSION_KEY) || "/";
  } else {
    session.flash("error", true);
  }

  return redirect(redirectUri, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.get("loggedIn") === "true") {
    return redirect("/");
  }

  return json({
    isError: session.get("error") === true,
  });
};

export default function LoginPage() {
  const { isError } = useRouteData();
  const pendingFormSubmit = usePendingFormSubmit();
  const errorClasses = isError ? "border-red-500" : "";

  return (
    <>
      <div className="container mx-auto max-w-screen-lg pt-4 mb-12 px-8">
        <div className="flex flex-wrap justify-center -mx-4 overflow-hidden">
          <div className="my-4 px-4 w-1/3 overflow-hidden">
            <Form className="flex flex-col" method="post">
              <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                Username
              </label>
              <input
                className={`text-sm rounded border p-2 ${errorClasses}`}
                type="text"
                name="username"
              />
              <label className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                Password
              </label>
              <input
                className={`text-sm rounded border p-2 ${errorClasses}`}
                type="password"
                name="password"
              />
              <button
                className="mt-2 rounded disabled:opacity-50 bg-green-600 hover:bg-green-500 transition duration-150 ease-in-out text-white font-bold py-1"
                type="submit"
                disabled={pendingFormSubmit !== undefined}
              >
                Log in
              </button>
              {isError ? (
                <p className="mt-1 text-sm text-red-700">
                  Error! Please try again.
                </p>
              ) : null}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
