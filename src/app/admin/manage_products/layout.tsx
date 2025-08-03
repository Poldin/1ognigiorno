"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Image, FolderOpen, Home } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    {
      name: "Cover Items",
      href: "/admin/manage_products/cover",
      icon: Image,
      current: pathname === "/admin/manage_products/cover",
    },
    {
      name: "Categories",
      href: "/admin/manage_products/categories", 
      icon: FolderOpen,
      current: pathname === "/admin/manage_products/categories",
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
          <div className="fixed inset-y-0 left-0 w-full bg-white">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="mt-6 px-4">
              <Link
                href="/"
                onClick={toggleMobileMenu}
                className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg mb-2"
              >
                <Home className="h-5 w-5 mr-3" />
                Torna al sito
              </Link>
              
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className={`flex items-center px-4 py-3 rounded-lg mb-2 ${
                      item.current
                        ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      <div className="lg:flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
              </div>
              
              <nav className="mt-8 flex-1 px-2 space-y-1">
                <Link
                  href="/"
                  className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  <Home className="h-5 w-5 mr-3" />
                  Torna al sito
                </Link>
                
                <div className="mt-8">
                  <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Gestione Prodotti
                  </h3>
                  <div className="mt-2 space-y-1">
                    {navigation.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                            item.current
                              ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:max-w-none">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}