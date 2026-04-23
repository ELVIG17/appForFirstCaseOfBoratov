import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../app/providers/AuthProviders";
import { messagesApi } from "../../entities/message/messageApi";

export function Navbar() {
  const { user, logout } = useAuth();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let t: number | undefined;

    async function load() {
      if (!user) return;
      try {
        const { count } = await messagesApi.unreadCount();
        setUnread(count);
      } catch {
        setUnread(0);
      }
    }

    if (user) {
      load();
      t = window.setInterval(load, 7000);
    } else {
      setUnread(0);
    }

    return () => {
      if (t) window.clearInterval(t);
    };
  }, [user]);

  return (
    <div className="card" style={{ margin: "16px auto 0", maxWidth: "var(--max)" }}>
      <div className="cardBody row">
        <Link to="/" style={{ fontWeight: 800 }}>App</Link>

        <NavLink to="/posts">Posts</NavLink>

        {user && (
          <>
            <NavLink to="/messages/inbox">
              Inbox {unread > 0 ? <span className="badge">{unread}</span> : null}
            </NavLink>
            <NavLink to="/messages/sent">Sent</NavLink>
            <NavLink to="/messages/new">Send</NavLink>
          </>
        )}

        <div className="spacer" />

        {!user ? (
          <div className="row">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        ) : (
          <div className="row">
            <span className="muted">{user.username} ({user.email})</span>
            <button className="button buttonSecondary" onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}