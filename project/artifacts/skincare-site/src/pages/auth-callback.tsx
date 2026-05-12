import { useEffect } from "react";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

/**
 * Supabase redirects here after:
 * - Email confirmation
 * - OAuth (Google) sign-in
 * - Password reset
 *
 * The URL will contain either a `code` param (PKCE flow) or a fragment (#access_token…).
 * Supabase JS SDK handles both automatically when detectSessionInUrl: true.
 */
export default function AuthCallback() {
  const [, navigate] = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      } else {
        // Might still be processing — wait for onAuthStateChange
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session) {
            subscription.unsubscribe();
            navigate("/dashboard");
          } else {
            subscription.unsubscribe();
            navigate("/login");
          }
        });
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center flex-col gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-brand" />
      <p className="text-muted-foreground text-sm">Signing you in…</p>
    </div>
  );
}
