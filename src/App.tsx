import { RouterProvider } from "react-router"
import { router } from "./routes/routes"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CookiesProvider } from "react-cookie";
import { NotificationProvider } from "./hooks/NotificationContext";
import { NotificationSystem } from "./components/shared/notification";

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <CookiesProvider defaultSetOptions={{path: "/"}}>
        <NotificationProvider>
          <NotificationSystem />
          <RouterProvider router={router} />
        </NotificationProvider>
      </CookiesProvider>
    </QueryClientProvider>
  )
}

export default App
