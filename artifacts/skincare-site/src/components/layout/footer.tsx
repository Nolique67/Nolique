import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-serif text-3xl font-bold mb-4 text-brand-light">Lumé</h2>
            <p className="text-primary-foreground/70 text-sm mb-6 max-w-xs">
              Prescription rosacea care formulated by dermatologists, delivered to your door.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <p>support@joinlume.com</p>
              <p>1-800-555-LUME</p>
              <p>123 Skin Health Way, NY 10001</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-brand-light">Treatments</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">Rx Metronidazole Gel</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Azelaic Acid 15% Cream</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ivermectin Treatment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Brimonidine Redness Relief</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-brand-light">Company</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Medical Board</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Reviews</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-brand-light">Support</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Provider Login</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
          <p>© {new Date().getFullYear()} Lumé Health Inc. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">HIPAA Notice</a>
          </div>
        </div>

        <div className="mt-12 text-[10px] leading-relaxed text-primary-foreground/40 max-w-5xl">
          <p className="mb-2">
            *Prescription products require an online consultation with a physician who will determine if a prescription is appropriate. Benefits and risks will be discussed during the consultation. Results may vary and are not guaranteed. Information provided on this site is for educational purposes and should not replace professional medical advice.
          </p>
          <p>
            Lumé partners with independent medical groups and pharmacies to provide telehealth services. Pharmacy services provided by Lumé Pharmacy Network. Check our Pharmacy Providers page for a complete list of licensed pharmacies.
          </p>
        </div>
      </div>
    </footer>
  );
}
