export default function LoginPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Login</h1>
      <p>
        Use o client (ex.: página ou API client) para autenticar com email e
        senha.
      </p>
      <p>
        Para autenticação via API (Scalar), faça GET em{" "}
        <code>/api/auth/csrf</code> e depois POST em{" "}
        <code>/api/auth/callback/credentials</code> com <code>csrfToken</code>,
        <code>email</code>, <code>password</code> e <code>json=true</code>.
      </p>
    </main>
  );
}
