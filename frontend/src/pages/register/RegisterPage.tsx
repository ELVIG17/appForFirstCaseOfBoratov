import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProviders";

export function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [username, setUsername] = useState("test");
  const [email, setEmail] = useState("test@mail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await register(username, email, password);
      nav("/login");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Register error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="cardHeader"><h2>Register</h2></div>
        <div className="cardBody">
          {error ? <div className="error">{error}</div> : null}
          <form className="grid" onSubmit={onSubmit}>
            <div>
              <div className="label">Username</div>
              <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <div className="label">Email</div>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <div className="label">Password</div>
              <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button className="button" disabled={busy}>{busy ? "..." : "Create account"}</button>
            <div className="muted">Уже есть аккаунт? <Link to="/login">Login</Link></div>
          </form>
        </div>
      </div>
    </div>
  );
}