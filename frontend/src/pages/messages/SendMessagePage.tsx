import { useState } from "react";
import { messagesApi } from "../../entities/message/messageApi"

export function SendMessagePage() {
  const [receiverId, setReceiverId] = useState("1");
  const [text, setText] = useState("Привет!");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setBusy(true);
    try {
      const rid = Number(receiverId);
      if (!Number.isFinite(rid) || rid <= 0) throw new Error("receiverId must be a number");
      if (!text.trim()) throw new Error("text required");

      await messagesApi.send(rid, text);
      setSuccess("Message sent");
      setText("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="cardHeader"><h2>Send message</h2></div>
        <div className="cardBody">
          {error ? <div className="error">{error}</div> : null}
          {success ? <div className="success">{success}</div> : null}

          <form className="grid" onSubmit={onSubmit}>
            <div>
              <div className="label">Receiver userId</div>
              <input className="input" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} />
            </div>
            <div>
              <div className="label">Text</div>
              <textarea className="textarea" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <button className="button" disabled={busy}>{busy ? "..." : "Send"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}