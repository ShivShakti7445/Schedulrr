// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Calendar, BarChart, Users, Clock } from "lucide-react";
// import { BarLoader } from "react-spinners";
// import { useUser } from "@clerk/nextjs";

// const navItems = [
//   { href: "/dashboard", label: "Dashboard", icon: BarChart },
//   { href: "/events", label: "Events", icon: Calendar },
//   { href: "/meetings", label: "Meetings", icon: Users },
//   { href: "/availability", label: "Availability", icon: Clock },
// ];

// export default function AppLayout({ children }) {
//   const pathname = usePathname();
//   const { isLoaded } = useUser();

//   return (
//     <>
//       {!isLoaded && <BarLoader width={"100%"} color="#36d7b7" />}
//       <div className="flex flex-col h-screen bg-blue-50 md:flex-row">
//         {/* Sidebar for medium screens and up */}
//         <aside className="hidden md:block w-64 bg-white">
//           <nav className="mt-8">
//             <ul>
//               {navItems.map((item) => (
//                 <li key={item.href}>
//                   <Link
//                     href={item.href}
//                     className={`flex items-center px-4 py-4 text-gray-700  hover:bg-gray-100 ${
//                       pathname === item.href ? "bg-blue-100" : ""
//                     }`}
//                   >
//                     <item.icon className="w-5 h-5 mr-3" />
//                     {item.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-8">
//           <header className="flex justify-between items-center mb-4">
//             <h2 className="text-5xl md:text-6xl gradient-title pt-2 md:pt-0 text-center md:text-left w-full">
//               {navItems.find((item) => item.href === pathname)?.label ||
//                 "Dashboard"}
//             </h2>
//           </header>
//           {children}
//         </main>

//         {/* Bottom tabs for small screens */}
//         <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md">
//           <ul className="flex justify-around">
//             {navItems.map((item) => (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className={`flex flex-col items-center py-2 px-4 ${
//                     pathname === item.href ? "text-blue-600" : "text-gray-600"
//                   }`}
//                 >
//                   <item.icon className="w-6 h-6" />
//                   <span className="text-xs mt-1">{item.label}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </>
//   );
// }


"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, BarChart, Users, Clock } from "lucide-react";
import { BarLoader } from "react-spinners";
import { useUser } from "@clerk/nextjs";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/meetings", label: "Meetings", icon: Users },
  { href: "/availability", label: "Availability", icon: Clock },
];

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const { isLoaded } = useUser();

  return (
    <>
      {!isLoaded && <BarLoader width={"100%"} color="#36d7b7" />}
      
      <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50 md:flex-row">
        
        {/* Sidebar for medium screens and up */}
        <aside className="hidden md:flex flex-col w-72 bg-white shadow-xl rounded-r-2xl transition-all duration-500 ">
          <nav className="mt-11">
            <ul>
              {navItems.map((item) => (
                <li key={item.href} className="group">
                  <Link
                    href={item.href}
                    className={`flex items-center px-8 py-5 text-gray-700 transition-all duration-300 rounded-lg group-hover:bg-indigo-100 group-hover:text-indigo-600 group-hover:scale-105 ${
                      pathname === item.href ? "bg-indigo-200 text-indigo-700 shadow-md scale-105" : ""
                    }`}
                  >
                    <item.icon className="w-6 h-6 mr-4 text-indigo-500 group-hover:text-indigo-700" />
                    <span className="text-lg font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          <header className="flex justify-between items-center mb-6">
            <h2 className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 drop-shadow-lg  pt-2 md:pt-0 text-center md:text-left ">
              {navItems.find((item) => item.href === pathname)?.label || "Dashboard"}
            </h2>
          </header>

          <div className="bg-white shadow-lg rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:scale-[1]">
            {children}
          </div>
        </main>

        {/* Bottom tabs for small screens */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t-2 rounded-t-3xl">
          <ul className="flex justify-around items-center py-2">
            {navItems.map((item) => (
              <li key={item.href} className="group">
                <Link
                  href={item.href}
                  className={`flex flex-col items-center py-3 px-4 transition-all duration-300 group-hover:scale-110 ${
                    pathname === item.href ? "text-indigo-600" : "text-gray-600 hover:text-indigo-500"
                  }`}
                >
                  <item.icon className="w-7 h-7 transition-all duration-300 group-hover:scale-125" />
                  <span className="text-sm mt-1 font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
