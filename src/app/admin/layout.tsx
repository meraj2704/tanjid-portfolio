// src/app/admin/layout.tsx
import Link from "next/link";
import { Code, LayoutDashboard, Folder, FileText, LogOut } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { clearToken } from "@/src/lib/auth"; // just for logout

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Logout handler
  // const handleLogout = () => {
  //   clearToken(); // remove token cookie
  //   window.location.href = "/login"; // redirect after logout
  // };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-background text-foreground">
      {/* Sidebar */}
      <div className="hidden border-r border-border bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          {/* Logo */}
          <div className="flex h-14 items-center border-b border-border px-4 lg:px-6">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <Code className="h-6 w-6 text-accent-primary" />
              <span className="text-lg">Admin Panel</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium lg:px-6 gap-2">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/projects"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
              >
                <Folder className="h-4 w-4" />
                Projects
              </Link>
              <Link
                href="/admin/services"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
              >
                <FileText className="h-4 w-4" />
                Services
              </Link>
              <Link
                href="/admin/technologies"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
              >
                <FileText className="h-4 w-4" />
                Technologies
              </Link>
            </nav>
          </div>

          {/* Logout */}
          <div className="mt-auto p-4 border-t border-border">
            <Button
              // onClick={handleLogout}
              variant="destructive"
              className="w-full flex items-center justify-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Mobile header */}
        <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-4 lg:h-[60px] lg:px-6 md:hidden">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Code className="h-6 w-6 text-accent-primary" />
            <span className="text-lg">Admin Panel</span>
          </Link>
        </header>

        {/* Page content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
