import { BrowserRouter } from "react-router-dom";
import { Navbar } from "../widgets/navbar/Navbar";
import { AppRouter } from "./router/AppRouter";

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}