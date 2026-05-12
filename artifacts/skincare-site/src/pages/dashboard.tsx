import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Loader2, FileText, Clock, CheckCircle2, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";

type Consultation = {
  id: string;
  status: string;
  rednessLevel: number | null;
  primarySymptom: string | null;
  createdAt: string;
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending Review", color: "bg-yellow-100 text-yellow-800" },
  under_review: { label: "Under Review", color: "bg-blue-100 text-blue-800" },
  approved: { label: "Approved", color: "bg-green-100 text-green-800" },
  active: { label: "Active Treatment", color: "bg-brand-light text-primary" },
  declined: { label: "Declined", color: "bg-red-100 text-red-800" },
  cancelled: { label: "Cancelled", color: "bg-muted text-muted-foreground" },
};

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { user, signOut, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Fetch consultations from the API
  useEffect(() => {
    if (!user) return;

    const fetchConsultations = async () => {
      try {
        const { supabase } = await import("@/lib/supabase");
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const res = await fetch(
          `${import.meta.env.VITE_API_URL ?? ""}/api/consultations`,
          {
            headers: { Authorization: `Bearer ${session.access_token}` },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setConsultations(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setDataLoading(false);
      }
    };

    fetchConsultations();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed out", description: "Come back soon!" });
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between mb-10"
        >
          <div>
            <h1 className="font-serif text-4xl font-bold text-primary">
              Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(" ")[0]}` : ""}
            </h1>
            <p className="text-muted-foreground mt-1">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </motion.div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: FileText, label: "Total Consultations", value: consultations.length },
            { icon: Clock, label: "Pending Review", value: consultations.filter(c => c.status === "pending" || c.status === "under_review").length },
            { icon: CheckCircle2, label: "Active Treatment", value: consultations.filter(c => c.status === "active" || c.status === "approved").length },
          ].map(({ icon: Icon, label, value }) => (
            <Card key={label} className="border-card-border">
              <CardContent className="pt-6">
                <Icon className="w-6 h-6 text-brand mb-2" />
                <div className="text-3xl font-bold text-primary">{value}</div>
                <div className="text-sm text-muted-foreground mt-1">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Consultations list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl font-semibold text-primary">Your Consultations</h2>
            <Button
              onClick={() => navigate("/")}
              className="rounded-full bg-primary text-primary-foreground font-semibold"
            >
              Start New Consultation
            </Button>
          </div>

          {dataLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-brand" />
            </div>
          ) : consultations.length === 0 ? (
            <Card className="border-card-border">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <User className="w-12 h-12 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">No consultations yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Complete our intake form to get your personalized rosacea treatment.
                  </p>
                </div>
                <Button onClick={() => navigate("/")} className="rounded-full bg-primary text-primary-foreground mt-2">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {consultations.map((c) => {
                const cfg = STATUS_CONFIG[c.status] ?? { label: c.status, color: "bg-muted text-muted-foreground" };
                return (
                  <Card key={c.id} className="border-card-border hover:shadow-md transition-shadow">
                    <CardHeader className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">
                            Consultation #{c.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            Submitted {new Date(c.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                          </p>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>
                      {c.primarySymptom && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Primary concern: <span className="capitalize text-foreground">{c.primarySymptom}</span>
                          {c.rednessLevel ? ` · Redness level: ${c.rednessLevel}/10` : ""}
                        </p>
                      )}
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
