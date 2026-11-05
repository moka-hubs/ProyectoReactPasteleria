import { AppProvider } from "./context/Contexto";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={routes} />
    </AppProvider>
  );
}

export default App;
