import { createBrowserRouter } from "react-router-dom";
import RootView from "../views/RootView";
import Inicio from "../views/Inicio"
import Ejercicio2 from "../views/Ejercicio2";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootView />,
    children: [
      {
        path: "/",
        element: <Inicio />,
      },
      {
        path: "Ejercicio2",
        element: <Ejercicio2 />,
      },
    ],
  },
]);
