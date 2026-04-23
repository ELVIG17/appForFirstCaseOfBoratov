import { useEffect, useState } from "react";
import { messagesApi } from "../../entities/message/messageApi";
import type { Message } from "../../entities/message/types";

export function InboxPage() {
  const [items, setItems] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      setItems(await messagesApi.inbox(50));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  }

  useEffect(() => { load(); }, []);

  async function markRead(id: number) {
    await messagesApi.markRead(id);
    await load();
  }

  return (
    <div className="container">
      <div className="row" style={{ marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Inbox</h2>
        <div className="spacer" />
        <button className="button buttonSecondary" onClick={load}>Refresh</button>
      </div>

      {error ? <div className="error">{error}</div> : null}

      <div className="grid">
        {items.map((m) => {
          const unread = !m.readAt;
          return (
            <div key={m.id} className="card">
              <div className="cardBody">
                <div className="row">
                  <div style={{ fontWeight: 800 }}>From: {m.sender?.username ?? m.senderId}</div>
                  <div className="spacer" />
                  {unread ? <span className="badge">unread</span> : <span className="muted">read</span>}
                </div>

                <div className="muted" style={{ marginTop: 6 }}>{new Date(m.createdAt).toLocaleString()}</div>
                <div style={{ marginTop: 10, whiteSpace: "pre-wrap" }}>{m.text}</div>

                {unread ? (
                  <div className="row" style={{ marginTop: 12 }}>
                    <button className="button" onClick={() => markRead(m.id)}>Mark as read</button>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}