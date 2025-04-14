import MainLayout from '@/core/layout/MainLayout'
import Auth from '@/pages/Auth/Auth'
import ListeEmploye from '@/pages/Employee/Liste'
import { NewEmploye } from '@/pages/Employee/NewEmployee'
import UpdateEmployee from '@/pages/Employee/UpdateEmployee'
import { EmployeeLanding } from '@/pages/LandinPages/EmployeeLandin'
import LandingPage from '@/pages/LandinPages/Welcome'
import UserList from '@/pages/User/UserList'
import { ReactNode } from 'react'
import { useCookies } from 'react-cookie'
import { createBrowserRouter, Navigate } from 'react-router'
interface AuthenticatedProps {
  children: ReactNode;
}
const RedirectIfAuthenticated = ({ children }: AuthenticatedProps) => {
  const [cookies] = useCookies(['jwt']);
  const token = cookies.jwt;
  if(token) return <Navigate to="/dashboard" />
  return <>{children}</>
}

export const router = createBrowserRouter([
  {
    path: '',
    element: (
      <RedirectIfAuthenticated>
        <LandingPage />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: '/auth',
    element: (
      <RedirectIfAuthenticated>
        <Auth />
      </RedirectIfAuthenticated>
    ),
  },
  {
    path: "dashboard",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: EmployeeLanding
      },
      {
        path: "employees",
        children: [
          {
            index: true,
            Component: ListeEmploye
          },
          {
            path: 'create',
            Component: NewEmploye
          },
          {
            path: 'update/:id',
            Component: UpdateEmployee
          }
        ]
      },
      {
        path: 'users',
        children: [
          {
            index: true,
            Component: UserList
          }
        ]
      }
    ]
  }
])