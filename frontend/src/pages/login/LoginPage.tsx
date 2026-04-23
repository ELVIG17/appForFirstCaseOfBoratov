import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProviders";

export function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      nav("/posts");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="cardHeader">
          <h2>Login</h2>
          <div className="muted">Auth через cookie + Vite proxy</div>
        </div>
        <div className="cardBody">
          {error ? <div className="error">{error}</div> : null}
          <form className="grid" onSubmit={onSubmit}>
            <div>
              <div className="label">Email</div>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <div className="label">Password</div>
              <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="button" disabled={busy}>{busy ? "..." : "Login"}</button>
            <div className="muted">Нет аккаунта? <Link to="/register">Register</Link></div>
          </form>
        </div>
      </div>
    </div>
  );
}