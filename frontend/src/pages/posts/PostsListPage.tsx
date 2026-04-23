import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProviders";
import { postsApi } from "../../entities/post/postsApi";
import type { Post } from "../../entities/post/types";

export function PostsListPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setPosts(await postsApi.list());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error");
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="row" style={{ marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Posts</h2>
        <div className="spacer" />
        {user ? <Link className="button" to="/posts/new">New post</Link> : <span className="muted">Login to create posts</span>}
      </div>

      {error ? <div className="error">{error}</div> : null}

      <div className="grid">
        {posts.map((p) => (
          <div key={p.id} className="card">
            <div className="cardBody">
              <div className="row">
                <Link to={`/posts/${p.id}`} style={{ fontSize: 18, fontWeight: 800 }}>{p.title}</Link>
                <div className="spacer" />
                <span className="muted">#{p.id}</span>
              </div>
              <div className="muted" style={{ marginTop: 8 }}>
                by {p.author?.username ?? "unknown"} • {new Date(p.createdAt).toLocaleString()}
              </div>
              {p.content ? <div style={{ marginTop: 10 }}>{p.content}</div> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}