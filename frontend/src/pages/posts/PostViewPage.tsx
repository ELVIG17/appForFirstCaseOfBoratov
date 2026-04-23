import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postsApi } from "../../entities/post/postsApi";
import type { Post } from "../../entities/post/types";
import { useAuth } from "../../app/providers/AuthProviders";

export function PostViewPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setPost(await postsApi.byId(Number(id)));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error");
      }
    })();
  }, [id]);

  async function onDelete() {
    if (!post) return;
    if (!confirm("Delete post?")) return;
    await postsApi.remove(post.id);
    nav("/posts");
  }

  if (error) return <div className="container"><div className="error">{error}</div></div>;
  if (!post) return <div className="container"><div className="muted">Loading...</div></div>;

  const isOwner = user?.id === post.authorId;

  return (
    <div className="container">
      <div className="card">
        <div className="cardHeader row">
          <h2 style={{ margin: 0 }}>{post.title}</h2>
          <div className="spacer" />
          <Link className="button buttonSecondary" to="/posts">Back</Link>
          {isOwner ? (
            <>
              <Link className="button" to={`/posts/${post.id}/edit`}>Edit</Link>
              <button className="button buttonDanger" onClick={onDelete}>Delete</button>
            </>
          ) : null}
        </div>
        <div className="cardBody">
          <div className="muted">
            by {post.author?.username ?? "unknown"} • {new Date(post.createdAt).toLocaleString()}
          </div>
          <div style={{ marginTop: 14, whiteSpace: "pre-wrap" }}>
            {post.content ?? <span className="muted">No content</span>}
          </div>
        </div>
      </div>
    </div>
  );
}