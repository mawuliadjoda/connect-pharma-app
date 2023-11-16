import { Navigate, Outlet } from "react-router-dom"

type ProtectedRouteProps = {
    isAllowed: boolean,
    redirectTo: string,
    children?: any
}
export default function ProtectedRoute({ isAllowed, redirectTo, children }: ProtectedRouteProps) {
 if (isAllowed) {
  return <Navigate to={redirectTo} />
 }
 return children ? children : <Outlet />
}