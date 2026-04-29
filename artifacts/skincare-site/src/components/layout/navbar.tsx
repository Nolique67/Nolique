import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col bg-background/80 backdrop-blur-md border-b border-border/50">
      {/* Promo Bar */}
      <div className="bg-brand text-white py-2 px-4 text-center text-sm font-medium tracking-wide">
        Calm your rosacea for good. Enjoy 15% off your first month.
      </div>
      
      {/* Main Nav */}
      <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-primary">
          Lumé
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-foreground/80">
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
          <a href="#reviews" className="hover:text-primary transition-colors">Reviews</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="font-medium">Log in</Button>
          <Button className="rounded-full px-6 font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm">
            Get Approved
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border/50 absolute top-full left-0 right-0 flex flex-col p-4 shadow-lg animate-in fade-in slide-in-from-top-2">
          <a href="#how-it-works" className="py-3 px-4 text-lg font-medium border-b border-border/30" onClick={() => setIsOpen(false)}>How it Works</a>
          <a href="#reviews" className="py-3 px-4 text-lg font-medium border-b border-border/30" onClick={() => setIsOpen(false)}>Reviews</a>
          <a href="#faq" className="py-3 px-4 text-lg font-medium border-b border-border/30" onClick={() => setIsOpen(false)}>FAQ</a>
          <div className="flex flex-col gap-3 mt-6 px-4">
            <Button variant="outline" className="w-full text-lg py-6">Log in</Button>
            <Button className="w-full text-lg py-6 rounded-full bg-primary text-primary-foreground">Get Approved</Button>
          </div>
        </div>
      )}
    </header>
  );
}
