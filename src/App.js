import * as React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import * as ReactDOM from "react-dom/client";
//import {Link} from "react-router-dom";
import Root from './routes/root';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
    },
    {
      path: "/login",
      element: <Root/>,
    }
  ]);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );

}

export default App;
