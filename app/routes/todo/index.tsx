export default function LoginPage() {
  const pendingFormSubmit = usePendingFormSubmit();

  return (
    <>
      <Form method="post">
        ...
        <button type="submit" disabled={pendingFormSubmit !== undefined}>
          Log in
        </button>
      </Form>
    </>
  );
}
