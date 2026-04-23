import { Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "../providers/RequireAuth";

import { LoginPage } from "../../pages/login/LoginPage";
import { RegisterPage } from "../../pages/register/RegisterPage";

import { PostsListPage } from "../../pages/posts/PostsListPage";
import { PostViewPage } from "../../pages/posts/PostViewPage";
import { PostFormPage } from "../../pages/posts/PostFormPage";

import { InboxPage } from "../../pages/messages/InboxPage";
import { SentPage } from "../../pages/messages/SentPage";
import { SendMessagePage } from "../../pages/messages/SendMessagePage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/posts" element={<PostsListPage />} />
      <Route path="/posts/:id" element={<PostViewPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/posts/new" element={<PostFormPage />} />
        <Route path="/posts/:id/edit" element={<PostFormPage />} />

        <Route path="/messages/inbox" element={<InboxPage />} />
        <Route path="/messages/sent" element={<SentPage />} />
        <Route path="/messages/new" element={<SendMessagePage />} />
      </Route>

      <Route
        path="*"
        element={
          <div className="container">
            <div className="error">Not found</div>
          </div>
        }
      />
    </Routes>
  );
}