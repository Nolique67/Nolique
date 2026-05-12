import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import ForgotPassword from "@/pages/forgot-password";
import AuthCallback from "@/pages/auth-callback";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

// Routes that should NOT show the global Navbar/Footer (standalone auth pages)
const AUTH_ROUTES = ["/login", "/signup", "/forgot-password", "/auth/callback"];

function AppShell() {
  return (
    <Switch>
      {/* Auth pages — no global nav */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/auth/callback" component={AuthCallback} />

      {/* Dashboard — has its own layout with nav embedded */}
      <Route path="/dashboard" component={Dashboard} />

      {/* Main site — with global Navbar + Footer */}
      <Route>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Switch>
              <Route path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppShell />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
