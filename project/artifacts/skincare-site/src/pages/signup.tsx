import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";

export default function Signup() {
  const [, navigate] = useLocation();
  const { signUp, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const passwordStrength = password.length >= 8
    ? password.match(/[A-Z]/) && password.match(/[0-9]/)
      ? "strong"
      : "medium"
    : password.length > 0
    ? "weak"
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: "Password too short", description: "Use at least 8 characters.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);

    if (error) {
      toast({ title: "Sign up failed", description: error, variant: "destructive" });
    } else {
      setEmailSent(true);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setGoogleLoading(false);
      toast({ title: "Google sign up failed", description: error, variant: "destructive" });
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center space-y-4"
        >
          <CheckCircle2 className="w-16 h-16 text-brand mx-auto" />
          <h2 className="font-serif text-3xl font-bold text-primary">Check your inbox</h2>
          <p className="text-muted-foreground">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
          </p>
          <p className="text-sm text-muted-foreground">
            Already confirmed?{" "}
            <Link href="/login" className="text-brand hover:underline font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-3xl font-bold text-primary">Nolique</Link>
          <p className="mt-2 text-muted-foreground text-sm">Create your account — it only takes a minute</p>
        </div>

        <div className="bg-card border border-card-border rounded-2xl p-8 shadow-sm space-y-6">
          <Button
            type="button"
            variant="outline"
            className="w-full py-6 flex items-center gap-3 font-medium"
            onClick={handleGoogle}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground tracking-widest">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" type="text" autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Smith" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordStrength && (
                <div className="flex gap-1 mt-1">
                  {["weak", "medium", "strong"].map((level, i) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        (passwordStrength === "weak" && i === 0) ||
                        (passwordStrength === "medium" && i <= 1) ||
                        passwordStrength === "strong"
                          ? passwordStrength === "weak"
                            ? "bg-destructive"
                            : passwordStrength === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-6 rounded-full bg-primary text-primary-foreground font-semibold uppercase tracking-wider"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Create Account
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            By signing up you agree to our{" "}
            <a href="/terms" className="underline hover:text-foreground">Terms</a> and{" "}
            <a href="/privacy" className="underline hover:text-foreground">Privacy Policy</a>.
          </p>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-brand font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
