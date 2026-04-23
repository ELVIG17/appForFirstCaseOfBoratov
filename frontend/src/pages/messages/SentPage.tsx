import { useEffect, useState } from "react";
import { messagesApi } from "../../entities/message/messageApi";
import type { Message } from "../../entities/message/types";

export function SentPage() {
  const [items, setItems] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setError(null);
    try {
      setItems(await messagesApi.sent(50));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="container">
      <div className="row" style={{ marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Sent</h2>
        <div className="spacer" />
        <button className="button buttonSecondary" onClick={load}>Refresh</button>
      </div>

      {error ? <div className="error">{error}</div> : null}

      <div className="grid">
        {items.map((m) => (
          <div key={m.id} className="card">
            <div className="cardBody">
              <div className="row">
                <div style={{ fontWeight: 800 }}>To: {m.receiver?.username ?? m.receiverId}</div>
                <div className="spacer" />
                <span className="muted">#{m.id}</span>
              </div>
              <div className="muted" style={{ marginTop: 6 }}>{new Date(m.createdAt).toLocaleString()}</div>
              <div style={{ marginTop: 10, whiteSpace: "pre-wrap" }}>{m.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}