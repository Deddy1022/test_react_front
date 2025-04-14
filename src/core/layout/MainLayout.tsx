import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Header />
      <div className=" w-full flex m-0 flex-col justify-between py-5 px-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
