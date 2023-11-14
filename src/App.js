import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import Root from "./routes/root";
import Login from "./routes/login";
import SignUp from "./routes/sign-up";
import Home from "./routes/logged-in/home";
import Details from "./routes/logged-in/details";
import Settings from "./routes/logged-in/settings";
import UploadBusinessPhotos from './routes/logged-in/upload-business-photos';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/business/add-photos",
      element: <UploadBusinessPhotos/>,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/auth/home",
      element: <Home />,
    },
    {
      path: "/auth/details",
      element: <Details />,
    },
    {
      path: "/auth/settings",
      element: <Settings />,
    },
  ]);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
