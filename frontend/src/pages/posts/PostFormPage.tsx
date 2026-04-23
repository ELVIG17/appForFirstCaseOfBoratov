import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postsApi } from "../../entities/post/postsApi";
import type { Post } from "../../entities/post/types";

export function PostFormPage() {
  const { id } = useParams();
  const editing = Boolean(id);
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!editing) return;
    (async () => {
      try {
        const p = await postsApi.byId(Number(id));
        setTitle(p.title);
        setContent(p.content ?? "");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error");
      }
    })();
  }, [editing, id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (!title.trim()) throw new Error("Title required");

      let post: Post;
      if (editing) {
        post = await postsApi.update(Number(id), { title, content });
      } else {
        post = await postsApi.create(title, content);
      }
      nav(`/posts/${post.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="cardHeader row">
          <h2 style={{ margin: 0 }}>{editing ? "Edit post" : "New post"}</h2>
          <div className="spacer" />
          <Link className="button buttonSecondary" to="/posts">Back</Link>
        </div>
        <div className="cardBody">
          {error ? <div className="error">{error}</div> : null}
          <form className="grid" onSubmit={onSubmit}>
            <div>
              <div className="label">Title</div>
              <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <div className="label">Content</div>
              <textarea className="textarea" value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <button className="button" disabled={busy}>{busy ? "..." : editing ? "Save" : "Create"}</button>
          </form>
        </div>
      </div>
    </div>
  );
}