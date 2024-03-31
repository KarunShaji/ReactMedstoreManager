import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import ListMedicines from "./components/medicine/Dashboard";
import CreatePost from "./components/medicine/CreateMedicine";
import ViewPost from "./components/medicine/ViewMedicine";
import EditMedine from "./components/medicine/EditMedicine";

const router = createBrowserRouter([
  { path: "", element: <App /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/dashboard", element: <ListMedicines /> },
  { path: "/create", element: <CreatePost /> },
  { path: "/view/:postId", element: <ViewPost /> },
  { path: "/edit/:postId", element: <EditMedine /> },
]);

export default router;
