import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { CheckCircle2, Star, ShieldCheck, Truck, Stethoscope, BadgeDollarSign, Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CountUp } from "@/components/animated/count-up";
import { Marquee } from "@/components/animated/marquee";

import heroWoman from "@/assets/images/portraits/woman-40s_1.jpg";
import heroMan from "@/assets/images/portraits/man-50s_1.jpg";
import p1 from "@/assets/images/portraits/woman-40s_2.jpg";
import p2 from "@/assets/images/portraits/woman-40s_3.jpg";
import p3 from "@/assets/images/portraits/woman-40s_4.jpg";
import p4 from "@/assets/images/portraits/man-50s_2.jpg";
import p5 from "@/assets/images/portraits/man-50s_3.jpg";
import p6 from "@/assets/images/portraits/woman-60s_1.jpg";
import p7 from "@/assets/images/portraits/woman-60s_2.jpg";
import p8 from "@/assets/images/portraits/woman-60s_3.jpg";

import prodSerum from "@/assets/images/product-serum.png";
import prodCream from "@/assets/images/product-cream.png";
import prodTablets from "@/assets/images/product-tablets.png";
import prodPen from "@/assets/images/product-pen.png";
import prodTube from "@/assets/images/product-tube.png";

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

const PRESS_LOGOS = [
  { text: "Forbes", className: "font-serif text-3xl tracking-tight" },
  { text: "healthline", className: "font-sans font-bold text-2xl tracking-tight lowercase" },
  { text: "WebMD", className: "font-sans font-extrabold text-2xl tracking-tight" },
  { text: "FORTUNE", className: "font-serif font-black text-2xl tracking-widest" },
  { text: "FAST COMPANY", className: "font-sans font-extrabold text-2xl tracking-tight" },
  { text: "The New York Times", className: "font-serif italic text-2xl" },
  { text: "Bloomberg", className: "font-serif font-semibold text-2xl tracking-tight" },
  { text: "VOGUE", className: "font-serif text-3xl tracking-[0.15em]" },
  { text: "ALLURE", className: "font-sans font-black text-2xl tracking-tighter" },
  { text: "Harper's BAZAAR", className: "font-serif italic text-2xl" },
  { text: "ELLE", className: "font-sans font-medium text-3xl tracking-[0.4em]" },
];

const TESTIMONIALS_TOP = [
  { name: "Terika", quote: "My provider was knowledgeable and helpful. She answered all my questions and made me feel as if this was not our first time meeting. I was very comfortable.", img: p1 },
  { name: "Marcus", quote: "Years of unexplained flushing. Within 6 weeks of starting my Rx my cheeks were a normal color again. Life-changing.", img: p4 },
  { name: "Jamie", quote: "The questions are to the point and easy to navigate. I'm able to voice my concerns if needed and ask questions of Lumé. They are quick to respond and keep me updated on my prescription.", img: p2 },
  { name: "Annette", quote: "I'd given up on rosacea creams. The personalized formula my dermatologist sent actually calms my skin instead of burning it.", img: p7 },
];

const TESTIMONIALS_BOTTOM = [
  { name: "Lou-Ann", quote: "Lumé doctors & staff have been very professional and prompt with any questions I have and their support & care. I feel in great hands! My redness has improved dramatically and I requested to stay on a maintenance dose.", img: p3 },
  { name: "Elizabeth", quote: "My clinician was kind, informative, gave a clear understanding of expectations, what was needed and future follow ups and dosage changes. Very easy to understand and helpful.", img: p6 },
  { name: "Devon", quote: "The bumps and pustules I'd been hiding for two years are gone. I haven't worn full coverage foundation in months.", img: p5 },
  { name: "Priya", quote: "Easy intake, fast shipping, and a real human dermatologist who actually reads your photos. Worth every penny.", img: p8 },
];

export default function Home() {
  const { toast } = useToast();
  const [redness, setRedness] = useState([6]);
  const [quizSelection, setQuizSelection] = useState<string | null>(null);

  const handleAction = () => {
    toast({
      title: "Taking you to intake",
      description: "Redirecting to your rosacea assessment...",
    });
  };

  const reductionPct = Math.min(82, 30 + redness[0] * 6);

  return (
    <div className="w-full bg-background pt-24 overflow-hidden">
      {/* 1. Hero */}
      <section className="relative max-w-7xl mx-auto px-6 py-12 md:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center max-w-4xl mx-auto space-y-6 z-10 relative"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-brand-light text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            Trusted by 50,000+ patients calming rosacea for good
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] text-primary">
            Calm the redness, <span className="text-brand italic">restore your skin.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            Prescription rosacea treatments — metronidazole, azelaic acid, ivermectin and more — formulated by dermatologists and delivered to your door.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <ul className="text-left space-y-2 mb-6 sm:mb-0 sm:mr-8">
              {["Rx-strength rosacea care", "Personalized by dermatologists", "Free shipping, always", "Cancel anytime"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-brand" /> {item}
                </li>
              ))}
            </ul>
            <Button onClick={handleAction} size="lg" className="rounded-full px-12 py-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5">
              Get Approved
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -60, rotate: -12 }}
          animate={{ opacity: 1, x: 0, rotate: -6 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          className="hidden lg:block absolute left-0 top-32 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl"
        >
          <motion.img
            src={heroWoman}
            alt="Rosacea-free radiant woman"
            className="w-full h-full object-cover object-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 4 }}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
          className="hidden lg:block absolute right-0 top-40 w-56 h-72 rounded-2xl overflow-hidden shadow-2xl"
        >
          <motion.img
            src={heroMan}
            alt="Confident rosacea patient"
            className="w-full h-full object-cover object-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>
      </section>

      {/* 2. Asymmetric Portrait Collage */}
      <section className="py-12 w-full overflow-hidden bg-brand-light/30">
        <div className="flex gap-4 md:gap-6 px-4 md:px-0 -ml-12 md:-ml-24 w-[150vw] md:w-[120vw]">
          {[p1, p2, p3, p4, p5, p6, p7].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              className={`relative overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-shadow shrink-0 ${
                i % 2 === 0 ? "w-48 md:w-64 h-64 md:h-80 mt-8" : "w-56 md:w-72 h-72 md:h-96 mb-8"
              }`}
            >
              <img src={img} alt="Customer" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Press Logo Marquee — slides left */}
      <section className="py-14 border-b border-border/50 bg-background">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-foreground/50">Proud to be featured and advertised in</p>
        </div>
        <Marquee duration={40} className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {PRESS_LOGOS.map((logo, i) => (
            <span
              key={i}
              className={`${logo.className} text-foreground/40 hover:text-foreground/70 transition-colors mx-12 whitespace-nowrap`}
            >
              {logo.text}
            </span>
          ))}
        </Marquee>
      </section>

      {/* 4. Treatment Showcase — no pricing, all funnel to Get Approved */}
      <section id="products" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-primary mb-4">
            Prescription rosacea treatments, <span className="text-brand italic">tailored to your skin</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-foreground/70 max-w-2xl mx-auto text-lg">
            We don't sell off-the-shelf creams. Take the assessment and your dermatologist builds a routine that targets your subtype.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { name: "Rx Metronidazole Gel", img: prodSerum, desc: "Anti-inflammatory rosacea standard" },
            { name: "Azelaic Acid 15% Cream", img: prodCream, desc: "Calms redness & evens tone" },
            { name: "Ivermectin Treatment", img: prodTablets, desc: "Targets papules & pustules" },
            { name: "Brimonidine Redness Relief", img: prodPen, desc: "Same-day vascular relief" },
          ].map((prod, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Card className="border-none shadow-sm hover:shadow-2xl transition-all duration-500 bg-brand-light/20 overflow-hidden group h-full">
                <div className="p-6 h-64 flex items-center justify-center relative overflow-hidden bg-brand-light/40">
                  <motion.img
                    src={prod.img}
                    alt={prod.name}
                    className="h-full object-contain mix-blend-multiply"
                    whileHover={{ scale: 1.08, rotate: -2 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <CardContent className="p-6 flex flex-col">
                  <p className="text-sm text-brand font-medium mb-1">{prod.desc}</p>
                  <h3 className="font-serif text-xl text-primary mb-4">{prod.name}</h3>
                  <Button
                    onClick={handleAction}
                    variant="outline"
                    className="rounded-full border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary text-primary transition-all group/btn w-full"
                  >
                    Get Approved
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-foreground/50 mt-10 italic"
        >
          Final formulation determined by your prescribing dermatologist.
        </motion.p>
      </section>

      {/* 5. Big Quote */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-primary text-primary-foreground px-6 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm uppercase tracking-widest text-primary-foreground/60 mb-6"
          >
            10,000+ Patients Agree
          </motion.p>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="flex justify-center gap-1 mb-8"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-6 h-6 fill-brand text-brand" />
            ))}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-serif text-4xl md:text-6xl leading-tight mb-8"
          >
            "I tried every cream at the counter for my rosacea. When nothing else worked, <span className="text-brand-light italic">Lumé did.</span>"
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-lg text-primary-foreground/70"
          >
            — Sarah T., 48, Verified Lumé Patient
          </motion.p>
        </div>
      </motion.section>

      {/* 6. Animated Tube + Floating Testimonial Cloud */}
      <section className="py-32 px-6 relative overflow-hidden max-w-7xl mx-auto min-h-[760px] flex items-center justify-center">
        {[
          { text: "My cheeks finally look like mine again.", top: "8%", left: "4%", rotate: -3, delay: 0, duration: 7 },
          { text: "...the redness vanished!", top: "16%", right: "6%", rotate: 4, delay: 0.4, duration: 8 },
          { text: "Everyone notices my calm, even skin.", top: "42%", left: "2%", rotate: 2, delay: 0.8, duration: 9 },
          { text: "Very kind and informative Dr. Quick and easy!", top: "58%", left: "8%", rotate: -2, delay: 0.2, duration: 7.5 },
          { text: "Every person I've talked to has been so thoughtful.", top: "44%", right: "3%", rotate: -4, delay: 0.6, duration: 8.5 },
          { text: "NP was very helpful and friendly!", bottom: "22%", right: "8%", rotate: 3, delay: 1.0, duration: 7 },
          { text: "The team takes care of everything — no flare-up panic.", bottom: "10%", left: "10%", rotate: 1, delay: 0.5, duration: 9 },
          { text: "Real, lasting calm in 12 weeks.", bottom: "8%", right: "16%", rotate: -2, delay: 0.7, duration: 8 },
        ].map((quote, i) => {
          const positionStyle: React.CSSProperties = {};
          if (quote.top) positionStyle.top = quote.top;
          if (quote.bottom) positionStyle.bottom = quote.bottom;
          if (quote.left) positionStyle.left = quote.left;
          if (quote.right) positionStyle.right = quote.right;

          return (
            <motion.div
              key={i}
              className="absolute hidden md:block max-w-[260px] pointer-events-none select-none"
              style={positionStyle}
              initial={{ opacity: 0, scale: 0.7, rotate: quote.rotate * 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: quote.rotate }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, delay: quote.delay, ease: EASE }}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: quote.duration, repeat: Infinity, ease: "easeInOut", delay: quote.delay }}
              >
                <p className="font-serif text-2xl lg:text-3xl text-foreground/25 leading-tight italic">
                  "{quote.text}"
                </p>
                <div className="flex items-center gap-2 mt-2 opacity-30">
                  <CheckCircle2 className="w-3 h-3 text-brand" />
                  <span className="text-[10px] uppercase tracking-wider text-foreground/40">Verified Lumé Patient</span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: EASE }}
          className="z-10 relative"
        >
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[520px] rounded-full bg-brand/40 blur-[100px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[340px] rounded-full bg-brand-light/80 blur-3xl"
            animate={{ scale: [1.05, 0.95, 1.05] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={prodTube}
            alt="Lumé Prescription Rosacea Treatment"
            className="h-[460px] md:h-[560px] object-contain relative z-10 drop-shadow-2xl"
            animate={{ y: [0, -16, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-12 -right-4 z-20 text-brand"
            animate={{ scale: [0, 1, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          <motion.div
            className="absolute bottom-20 -left-6 z-20 text-brand"
            animate={{ scale: [0, 1, 0], rotate: [0, -180, -360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* 7. Interactive Slider — animated count */}
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
              Want to <span className="text-brand italic">calm your redness</span> for good?
            </h2>
            <p className="text-foreground/70 text-lg">
              It's not magic — it's <span className="text-brand font-semibold">dermatology science</span>. Personalized prescription rosacea care that targets the actual triggers behind your flare-ups, not just the symptoms.
            </p>
            <Button onClick={handleAction} size="lg" className="rounded-full px-10 py-6 text-base bg-primary hover:-translate-y-0.5 transition-all">
              Get Approved
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
                <p className="text-3xl md:text-4xl font-serif text-primary">{redness[0]} <span className="text-lg text-foreground/50 font-sans">/ 10</span></p>
              </div>
              <div className="text-right">
                <p className="text-sm text-brand font-medium mb-1">Potential reduction:</p>
                <p className="text-4xl md:text-5xl font-serif text-brand">
                  <CountUp to={reductionPct} duration={1.4} suffix="%" />
                </p>
              </div>
            </div>

            <Slider
              value={redness}
              onValueChange={setRedness}
              max={10}
              min={1}
              step={1}
              className="py-4"
            />

            <Button onClick={handleAction} className="w-full mt-8 rounded-full py-6 text-lg bg-primary hover:bg-primary/90 hover:-translate-y-0.5 transition-all">
              Find My Routine
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 8. 8-Portrait Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif text-4xl md:text-5xl text-primary text-center mb-16"
        >
          The clear, calm skin we've all been <span className="text-brand italic">waiting for</span>
        </motion.h2>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {[p8, p2, p4, p6, p1, p7, p3, p5].map((img, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.85, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
              }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow"
            >
              <img src={img} alt="Happy patient" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 9. Light Stat Row — gold checkmarks (replaces dark science section) */}
      <section className="py-20 bg-brand-light/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { num: 6, suffix: "x", label: "more effective than OTC rosacea creams" },
              { num: 82, suffix: "%", label: "of patients see visible redness reduction" },
              { num: 93, suffix: "%", label: "kept their skin clear long-term" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-brand" />
                </div>
                <div>
                  <h3 className="font-serif text-3xl text-primary">
                    <CountUp to={stat.num} duration={1.6} suffix={stat.suffix} />
                  </h3>
                  <p className="text-foreground/70 text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-xs text-foreground/50 mt-6 text-center italic">
            * Data based on Lumé patients over their first 6 months of treatment.
          </p>
        </div>
      </section>

      {/* 10. Science Story */}
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
                We don't just hide redness. <span className="text-brand-light italic">We treat the cause.</span>
              </h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Rosacea isn't a cosmetic problem — it's a chronic inflammatory condition driven by vascular reactivity, demodex mites, and an impaired skin barrier. Our prescription protocols target every layer at once: anti-inflammatories to quiet flare-ups, antiparasitics to clear papules, and barrier repair to keep your skin calm long after treatment.
              </p>
              <Button onClick={handleAction} variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-primary mt-4 hover:-translate-y-0.5 transition-all">
                Get Approved
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              <img src={sciWoman} alt="Calm, even skin" className="w-3/4 rounded-2xl shadow-2xl relative z-10" />
              <motion.img
                src={sciTexture}
                alt="Skin texture"
                className="w-1/2 rounded-2xl shadow-xl absolute -bottom-10 -right-4 border-8 border-primary object-cover aspect-square"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 11. Pastel Stat Cards — count up */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-serif text-4xl md:text-5xl text-primary mb-16"
        >
          Why are so many patients signing up? <span className="text-brand italic">It works.</span>
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { num: 91, suffix: "%", label: "Saw reduction in facial redness", bg: "bg-brand-light/30" },
            { num: 9, suffix: "/10", label: "Patients switch from OTC", bg: "bg-[#e6efe9]" },
            { num: 12, suffix: "w", label: "Average time to lasting calm", bg: "bg-[#f0e6e6]" },
            { num: 24, suffix: "/7", label: "Dermatologist support", bg: "bg-[#fff3e0]" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
              }}
              whileHover={{ scale: 1.04, y: -4, transition: { duration: 0.3 } }}
            >
              <Card className={`${stat.bg} border-none shadow-none rounded-3xl p-8 text-center h-full`}>
                <h3 className="font-serif text-6xl text-primary mb-4">
                  <CountUp to={stat.num} duration={2} suffix={stat.suffix} />
                </h3>
                <p className="text-foreground/70 font-medium">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 12. Timeline */}
      <section id="how-it-works" className="py-24 bg-brand-light/20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight">Begin your rosacea journey from home.</h2>
            <p className="text-lg text-foreground/70">No waiting rooms. No pharmacy lines. Just expert care on your schedule.</p>
            <Button onClick={handleAction} size="lg" className="rounded-full px-10 py-6 text-lg bg-primary mt-4 hover:-translate-y-0.5 transition-all">Get Approved</Button>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-brand before:to-transparent"
          >
            {[
              { num: "01", title: "Get Approved", desc: "Fill out a quick 3-minute medical intake form and upload skin photos.", img: timePhone },
              { num: "02", title: "Get Prescribed", desc: "A board-certified dermatologist reviews and prescribes your rosacea treatment.", img: timeDoctor },
              { num: "03", title: "Receive your Rx", desc: "Your customized treatment ships free to your door, every month.", img: timeBox },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
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

      {/* 13. Support — twin-photo layout */}
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
              Unlimited 24/7 support <span className="text-brand italic">included.</span>
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Lumé provides 24/7 access to a dedicated team of dermatology specialists, ensuring you have the support you need <span className="text-brand font-semibold">around the clock</span>. With unlimited appointments, messaging and support, you can confidently reach out for guidance, ask questions, or address flare-ups any time.
            </p>
            <Button onClick={handleAction} size="lg" className="rounded-full px-10 py-6 text-base bg-primary hover:-translate-y-0.5 transition-all">
              <MessageCircle className="w-5 h-5 mr-2" /> Get Approved
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
              <motion.img
                src={sciWoman}
                alt="Lumé dermatologist"
                className="w-full h-full object-cover"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl mt-12"
            >
              <motion.img
                src={supPair}
                alt="Patient holding Lumé treatment"
                className="w-full h-full object-cover"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 14. Testimonials — two rows, opposite directions */}
      <section id="reviews" className="py-24 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto text-center mb-16 px-6"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">There's a reason people are <span className="text-brand italic">raving about us.</span></h2>
          <Button onClick={handleAction} className="rounded-full px-8 bg-brand hover:bg-brand/90 text-white hover:-translate-y-0.5 transition-all">I'M READY, LET'S GO</Button>
        </motion.div>

        <div className="space-y-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {/* Top row — slides left */}
          <Marquee duration={55} direction="left">
            {TESTIMONIALS_TOP.map((review, i) => (
              <TestimonialCard key={`top-${i}`} review={review} variant="light" />
            ))}
          </Marquee>

          {/* Bottom row — slides right */}
          <Marquee duration={60} direction="right">
            {TESTIMONIALS_BOTTOM.map((review, i) => (
              <TestimonialCard key={`bot-${i}`} review={review} variant="cream" />
            ))}
          </Marquee>
        </div>
      </section>

      {/* 15. Quiz Card */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <Card className="border border-border/50 shadow-2xl rounded-3xl overflow-hidden bg-white">
            <div className="bg-brand text-white p-6 text-center">
              <h3 className="font-serif text-2xl">Let's build your rosacea routine</h3>
            </div>
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">What is your primary skin concern?</h2>

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
                Get Approved
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* 16. FAQ */}
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
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "What kinds of rosacea does Lumé treat?", a: "Our dermatologists treat all four rosacea subtypes: erythematotelangiectatic (redness & flushing), papulopustular (bumps & pustules), phymatous (skin thickening), and ocular rosacea symptoms. Your assessment will route you to the right protocol." },
                { q: "Will it work for my sensitive skin?", a: "Yes. Our dermatologists customize the concentration and combination of active ingredients based on your skin's tolerance, so you can calm rosacea without burning, stinging, or making it worse." },
                { q: "Do you accept insurance?", a: "While we don't bill insurance directly for the medications, our services are HSA/FSA eligible, and we provide receipts you can submit for reimbursement." },
                { q: "What side effects should I expect?", a: "When starting prescription rosacea treatments, some patients experience mild dryness or temporary redness for 1-2 weeks. Your provider will guide you through minimizing these effects with the right barrier repair cream." },
                { q: "How long until I see results?", a: "Many patients notice calmer skin within 2-4 weeks. Significant reduction in persistent redness and pustules typically becomes visible at the 8-12 week mark." },
              ].map((faq, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <AccordionItem value={`item-${i}`} className="bg-white border border-border rounded-2xl px-6 data-[state=open]:border-brand transition-colors">
                    <AccordionTrigger className="text-lg font-medium text-primary hover:no-underline py-6">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70 pb-6 text-base leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* 17. Value Props */}
      <section className="py-16 border-t border-border px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { icon: ShieldCheck, label: "Money-back Guarantee" },
            { icon: Truck, label: "Free 2-day Delivery" },
            { icon: Stethoscope, label: "Doctor-led Plans" },
            { icon: BadgeDollarSign, label: "No Hidden Fees" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
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

interface TestimonialCardProps {
  review: { name: string; quote: string; img: string };
  variant: "light" | "cream";
}

function TestimonialCard({ review, variant }: TestimonialCardProps) {
  const bg = variant === "light" ? "bg-[#f3f1e8]" : "bg-[#f7eee5]";
  return (
    <div className={`${bg} mx-3 rounded-3xl p-8 w-[400px] shrink-0 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={review.img} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
          <p className="font-bold text-primary">{review.name}</p>
        </div>
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-4 h-4 fill-brand text-brand" />
          ))}
        </div>
      </div>
      <p className="text-foreground/80 text-sm leading-relaxed">"{review.quote}"</p>
    </div>
  );
}
