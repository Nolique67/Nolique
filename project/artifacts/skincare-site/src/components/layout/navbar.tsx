import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out", description: "See you soon!" });
    navigate("/");
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col bg-background/90 backdrop-blur-md border-b border-border/40">
      {/* Promo Bar */}
      <div className="bg-background border-b border-border/40 py-2 px-4 text-center text-sm font-medium tracking-wide text-foreground/70">
        <span className="font-bold text-brand">New Patient Offer!</span> Get your first month at 20% off — no code needed.
      </div>

      {/* Main Nav */}
      <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-primary">
          Nolique
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button
                onClick={() => navigate("/dashboard")}
                variant="ghost"
                className="hidden sm:flex items-center gap-2 text-sm font-medium"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="hidden sm:flex items-center gap-2 rounded-full px-5 py-5 text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate("/login")}
                variant="ghost"
                className="hidden sm:flex items-center gap-2 text-sm font-medium"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="rounded-full px-7 py-5 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm text-sm uppercase tracking-wider"
              >
                Get Approved
              </Button>
            </>
          )}

          <button
            className="p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="bg-background border-t border-border/50 absolute top-full left-0 right-0 flex flex-col shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="max-w-7xl mx-auto w-full px-6 py-6 flex flex-col gap-1">
            {[
              { label: "How it Works", href: "/#how-it-works" },
              { label: "Reviews", href: "/#reviews" },
              { label: "FAQ", href: "/#faq" },
            ].map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="py-3 px-4 text-base font-medium rounded-xl hover:bg-brand-light transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </a>
            ))}

            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border/40">
              {user ? (
                <>
                  <Button
                    variant="outline"
                    className="w-full py-6 text-base font-medium"
                    onClick={() => { navigate("/dashboard"); setIsOpen(false); }}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    My Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full py-6 text-base font-medium text-muted-foreground"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full py-6 text-base font-medium"
                    onClick={() => { navigate("/login"); setIsOpen(false); }}
                  >
                    Log In
                  </Button>
                  <Button
                    className="w-full py-6 text-base font-semibold rounded-full bg-primary text-primary-foreground uppercase tracking-wider"
                    onClick={() => { navigate("/signup"); setIsOpen(false); }}
                  >
                    Get Approved
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
