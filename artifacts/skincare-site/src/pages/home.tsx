import { useState } from "react";
import { useLocation } from "wouter";
import { motion, type Variants } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  Users,
  BadgeDollarSign,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

import timePhone from "@/assets/images/timeline-phone.png";
import timeDoctor from "@/assets/images/timeline-doctor.png";
import timeBox from "@/assets/images/timeline-box.png";
import sciTexture from "@/assets/images/science-texture.png";
import sciWoman from "@/assets/images/science-woman.png";
import supPair from "@/assets/images/support-pair.png";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Home() {
  const [, navigate] = useLocation();
  const [redness, setRedness] = useState([6]);
  const [quizSelection, setQuizSelection] = useState<string | null>(null);

  const handleAction = () => navigate("/apply");

  const reductionPct = Math.min(82, 30 + redness[0] * 6);

  return (
    <div className="w-full bg-background pt-24 overflow-hidden">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="w-full pt-10 md:pt-24 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-2xl mx-auto px-6 text-center space-y-5"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-brand-light text-primary px-4 py-1.5 rounded-full text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
            </span>
            Connecting patients with licensed rosacea specialists
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] text-primary">
            Rosacea care from real physicians,{" "}
            <span className="text-brand italic">without the wait.</span>
          </motion.h1>

          <motion.ul variants={fadeUp} className="inline-flex flex-col items-start gap-2.5 text-left mt-2">
            {[
              "Submit your intake form online in minutes",
              "A licensed physician reviews your case",
              "Prescription treatment shipped to your door",
              "HSA / FSA Eligible",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm font-medium text-foreground/80">
                <CheckCircle2 className="w-4 h-4 text-brand shrink-0" /> {item}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="pt-3">
            <Button
              onClick={handleAction}
              size="lg"
              className="rounded-full px-14 py-7 text-base font-semibold uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              See If You Qualify
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Mission ────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-primary text-primary-foreground px-6 text-center"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-sm uppercase tracking-widest text-primary-foreground/60">What We Do</p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight">
            We connect you with the right physician.{" "}
            <span className="text-brand-light italic">They handle the rest.</span>
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Nolique is a telehealth platform — we make it simple to submit your
            rosacea intake, get matched with a licensed physician who reviews
            your case, and receive your prescription treatment at home. We're
            the platform. The physicians are independent, licensed professionals.
          </p>
          <Button
            onClick={handleAction}
            variant="outline"
            className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary mt-4 hover:-translate-y-0.5 transition-all"
          >
            Start Your Intake <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.section>

      {/* ── Redness Slider ─────────────────────────────────────────── */}
      <section className="py-24 bg-brand-light/30 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center justify-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold">
              <ShieldCheck className="w-4 h-4" /> HSA / FSA Eligible
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-primary leading-tight">
              Not sure if you qualify?{" "}
              <span className="text-brand italic">Let's find out.</span>
            </h2>
            <p className="text-foreground/70 text-lg">
              Tell us about your rosacea. Our intake form takes about 3 minutes
              and a licensed physician will review whether prescription treatment
              is right for you — at no charge to find out.
            </p>
            <Button onClick={handleAction} size="lg" className="rounded-full px-10 py-6 text-base bg-primary hover:-translate-y-0.5 transition-all">
              Start Free Intake
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-border/40"
          >
            <div className="flex justify-between items-end mb-6 gap-4">
              <div>
                <p className="text-sm text-foreground/60 font-medium mb-1">Current redness severity:</p>
                <p className="text-3xl md:text-4xl font-serif text-primary">
                  {redness[0]} <span className="text-lg text-foreground/50 font-sans">/ 10</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-brand font-medium mb-1">Potential reduction*:</p>
                <p className="text-4xl md:text-5xl font-serif text-brand">{reductionPct}%</p>
              </div>
            </div>
            <Slider value={redness} onValueChange={setRedness} max={10} min={1} step={1} className="py-4" />
            <p className="text-xs text-foreground/40 mt-2 italic">* Based on published clinical data for prescription rosacea treatments. Individual results vary.</p>
            <Button onClick={handleAction} className="w-full mt-6 rounded-full py-6 text-lg bg-primary hover:bg-primary/90 hover:-translate-y-0.5 transition-all">
              See If I Qualify
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── About Rosacea ──────────────────────────────────────────── */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Rosacea is a medical condition.{" "}
                <span className="text-brand-light italic">It deserves medical treatment.</span>
              </h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Over-the-counter creams can't address the underlying inflammatory
                and vascular causes of rosacea. Prescription treatments — reviewed
                and prescribed by a licensed physician — target the root cause,
                not just the surface symptoms.
              </p>
              <p className="text-sm text-primary-foreground/60 italic">
                Nolique is a telehealth platform. All prescriptions are issued by
                independent licensed physicians who review each patient's intake
                individually.
              </p>
              <Button onClick={handleAction} variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary mt-4 hover:-translate-y-0.5 transition-all">
                Submit Your Intake
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <img src={sciWoman} alt="Skin care" className="w-3/4 rounded-2xl shadow-2xl relative z-10" />
              <motion.img src={sciTexture} alt="Skin texture"
                className="w-1/2 rounded-2xl shadow-xl absolute -bottom-10 -right-4 border-8 border-primary object-cover aspect-square"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How it Works ───────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-brand-light/20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight">
              How Nolique works.
            </h2>
            <p className="text-lg text-foreground/70">
              We built a simple, secure path from your first question to your
              first prescription — handled by real licensed physicians, not
              algorithms.
            </p>
            <Button onClick={handleAction} size="lg" className="rounded-full px-10 py-6 text-lg bg-primary mt-4 hover:-translate-y-0.5 transition-all">
              Get Started
            </Button>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand before:to-transparent"
          >
            {[
              { num: "01", title: "Complete Your Intake", desc: "Answer a short set of medical questions and upload photos of your skin. Takes about 3 minutes.", img: timePhone },
              { num: "02", title: "Physician Review", desc: "An independent licensed physician reviews your intake and determines if prescription treatment is appropriate for you.", img: timeDoctor },
              { num: "03", title: "Receive Your Treatment", desc: "If approved, your prescription is sent to a licensed pharmacy and shipped directly to your door.", img: timeBox },
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUp}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <motion.div
                  className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-brand text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10"
                  whileInView={{ scale: [0.5, 1.15, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                >
                  {step.num}
                </motion.div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-shadow">
                  <img src={step.img} alt={step.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-foreground/70 text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Support ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-md"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight">
              Questions along the way?{" "}
              <span className="text-brand italic">We're here.</span>
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              The Nolique support team is available to help you navigate the
              intake process, understand your treatment, or connect you with your
              prescribing physician's office for medical questions.
            </p>
            <p className="text-sm text-foreground/50 italic">
              Medical questions about your treatment are handled by the
              prescribing physician's practice, not Nolique staff.
            </p>
            <Button onClick={handleAction} size="lg" className="rounded-full px-10 py-6 text-base bg-primary hover:-translate-y-0.5 transition-all">
              <MessageCircle className="w-5 h-5 mr-2" /> Start Your Intake
            </Button>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl"
            >
              <motion.img src={sciWoman} alt="Physician" className="w-full h-full object-cover"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl mt-12"
            >
              <motion.img src={supPair} alt="Patient" className="w-full h-full object-cover"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Quiz ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <Card className="border border-border/50 shadow-2xl rounded-3xl overflow-hidden bg-white">
            <div className="bg-brand text-white p-6 text-center">
              <h3 className="font-serif text-2xl">Is Nolique right for you?</h3>
              <p className="text-white/80 text-sm mt-1">Answer one question to get started</p>
            </div>
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">
                What is your primary skin concern?
              </h2>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
              >
                {[
                  "Persistent facial redness",
                  "Visible broken capillaries",
                  "Bumps, papules & pustules",
                  "Sensitive, burning skin",
                ].map((opt) => (
                  <motion.button
                    key={opt}
                    variants={fadeUp}
                    onClick={() => setQuizSelection(opt)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-2xl border-2 text-left transition-all ${
                      quizSelection === opt
                        ? "border-brand bg-brand-light/30 shadow-md"
                        : "border-border hover:border-brand/50 hover:bg-gray-50"
                    }`}
                  >
                    <p className="font-medium text-primary">{opt}</p>
                  </motion.button>
                ))}
              </motion.div>
              <Button
                onClick={handleAction}
                disabled={!quizSelection}
                className="w-full rounded-full py-6 text-lg bg-primary hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
              >
                Continue to Intake Form
              </Button>
              <p className="text-xs text-foreground/40 text-center mt-4">
                Free to apply. A licensed physician will review your case.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 bg-brand-light/10 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-serif text-4xl md:text-5xl text-primary text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "Is Nolique a medical practice?",
                a: "No. Nolique is a telehealth platform that connects patients with independent licensed physicians. Nolique does not practice medicine, provide medical advice, or employ physicians. All prescriptions are issued by independent licensed medical professionals.",
              },
              {
                q: "Who reviews my intake form?",
                a: "Your intake is reviewed by an independent licensed physician in your state. They determine whether prescription rosacea treatment is medically appropriate for you. Nolique facilitates the platform — the physician makes all clinical decisions.",
              },
              {
                q: "What happens if I'm not approved?",
                a: "If the reviewing physician determines that prescription treatment is not appropriate for your case, you will not be charged. The physician may recommend alternative next steps.",
              },
              {
                q: "Do you accept insurance?",
                a: "Nolique does not currently bill insurance directly. However, our services may be HSA/FSA eligible. We recommend checking with your benefits provider. We can provide receipts for potential reimbursement.",
              },
              {
                q: "How long does physician review take?",
                a: "Most intake forms are reviewed by a physician within 24–48 hours. You'll be notified by email once your case has been reviewed.",
              },
              {
                q: "Is my medical information secure?",
                a: "Yes. Nolique uses HIPAA-compliant systems to store and transmit your health information. Your data is never sold or shared with third parties outside of your care team.",
              },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-border rounded-2xl px-6 data-[state=open]:border-brand transition-colors">
                <AccordionTrigger className="text-lg font-medium text-primary hover:no-underline py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pb-6 text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Value Props ────────────────────────────────────────────── */}
      <section className="py-16 border-t border-border px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { icon: ShieldCheck, label: "HIPAA Compliant" },
            { icon: Truck, label: "Free Shipping" },
            { icon: Users, label: "Licensed Physicians" },
            { icon: BadgeDollarSign, label: "HSA / FSA Eligible" },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center text-brand transition-all hover:bg-brand hover:text-white">
                <item.icon size={32} />
              </div>
              <p className="font-medium text-primary">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}