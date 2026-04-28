import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { CheckCircle2, Star, ShieldCheck, Truck, Stethoscope, BadgeDollarSign, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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

export default function Home() {
  const { toast } = useToast();
  const [ageValue, setAgeValue] = useState([45]);
  const [quizSelection, setQuizSelection] = useState<string | null>(null);

  const handleAction = () => {
    toast({
      title: "Taking you to intake",
      description: "Redirecting to medical questionnaire...",
    });
  };

  const yearsYounger = Math.max(2, Math.floor((ageValue[0] - 25) / 3));

  return (
    <div className="w-full bg-background pt-24 overflow-hidden">
      {/* 1. Hero Section */}
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
            Join 50,000+ patients reversing the signs of aging
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] text-primary">
            Dermatologist-grade skincare, <span className="text-brand italic">formulated for you.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            Prescription-strength anti-aging treatments delivered to your door. Stop guessing and start seeing real clinical results.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <ul className="text-left space-y-2 mb-6 sm:mb-0 sm:mr-8">
              {["Rx-strength ingredients", "Personalized by dermatologists", "Free shipping, always", "Cancel anytime"].map((item, i) => (
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

        {/* Floating Hero Portraits */}
        <motion.div
          initial={{ opacity: 0, x: -60, rotate: -12 }}
          animate={{ opacity: 1, x: 0, rotate: -6 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block absolute left-0 top-32 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl"
        >
          <motion.img
            src={heroWoman}
            alt="Radiant woman"
            className="w-full h-full object-cover object-center"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 4 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block absolute right-0 top-40 w-56 h-72 rounded-2xl overflow-hidden shadow-2xl"
        >
          <motion.img
            src={heroMan}
            alt="Confident man"
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
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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

      {/* 3. Press Logo Strip */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-12 border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest font-semibold text-foreground/50 mb-8">As featured in</p>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60"
          >
            {[
              { text: "VOGUE", className: "font-serif text-2xl tracking-tight" },
              { text: "ALLURE", className: "font-sans font-bold text-xl tracking-tighter" },
              { text: "Harper's BAZAAR", className: "font-serif text-2xl italic" },
              { text: "ELLE", className: "font-sans font-medium text-2xl tracking-widest" },
              { text: "Forbes", className: "font-serif text-2xl" },
            ].map((logo, i) => (
              <motion.span key={i} variants={fadeUp} className={logo.className}>
                {logo.text}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 4. Product Showcase — no pricing, all funnel to Get Approved */}
      <section id="products" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-primary mb-4">
            Treatments your dermatologist will <span className="text-brand italic">prescribe for you</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-foreground/70 max-w-2xl mx-auto text-lg">
            We don't sell off-the-shelf products. Take the assessment and your provider builds a routine matched to your skin.
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
            { name: "Rx Tretinoin Serum", img: prodSerum, desc: "Gold-standard anti-aging" },
            { name: "Peptide Firming Cream", img: prodCream, desc: "Deep barrier repair" },
            { name: "Cellular Renewal Tablets", img: prodTablets, desc: "Beauty from within" },
            { name: "Precision Retinol Pen", img: prodPen, desc: "Targeted wrinkle defense" },
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
            "I spent thousands on laser treatments and luxury creams. When nothing else worked, <span className="text-brand-light italic">Lumé did.</span>"
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
        {/* Floating testimonial quotes — positioned around the central tube */}
        {[
          { text: "Very smooth and luxurious for a very busy working mom.", top: "8%", left: "4%", rotate: -3, delay: 0, duration: 7 },
          { text: "...the wrinkles vanished!", top: "16%", right: "6%", rotate: 4, delay: 0.4, duration: 8 },
          { text: "Everyone I have contact with says my skin glows.", top: "42%", left: "2%", rotate: 2, delay: 0.8, duration: 9 },
          { text: "Very kind and informative Dr. Quick and easy!", top: "58%", left: "8%", rotate: -2, delay: 0.2, duration: 7.5 },
          { text: "Every person I've talked to has been so thoughtful.", top: "44%", right: "3%", rotate: -4, delay: 0.6, duration: 8.5 },
          { text: "NP was very helpful and friendly!", bottom: "22%", right: "8%", rotate: 3, delay: 1.0, duration: 7 },
          { text: "The company and doctors — amazing, they take care of everything.", bottom: "10%", left: "10%", rotate: 1, delay: 0.5, duration: 9 },
          { text: "Real, lasting results in 12 weeks.", bottom: "8%", right: "16%", rotate: -2, delay: 0.7, duration: 8 },
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
              transition={{ duration: 1.1, delay: quote.delay, ease: [0.22, 1, 0.36, 1] }}
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

        {/* Central animated skincare tube */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="z-10 relative"
        >
          {/* Glow halo */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[520px] rounded-full bg-brand/40 blur-[100px]"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Inner soft glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[340px] rounded-full bg-brand-light/80 blur-3xl"
            animate={{ scale: [1.05, 0.95, 1.05] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* The tube — gentle floating animation */}
          <motion.img
            src={prodTube}
            alt="Lumé Prescription Retinol Serum"
            className="h-[460px] md:h-[560px] object-contain relative z-10 drop-shadow-2xl"
            animate={{ y: [0, -16, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Sparkle */}
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

      {/* 7. Interactive Slider */}
      <section className="py-24 bg-brand-light/30 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
            <ShieldCheck className="w-4 h-4" /> HSA / FSA Eligible
          </div>

          <h2 className="font-serif text-3xl md:text-5xl text-primary mb-4">Want smoother, firmer skin?</h2>
          <p className="text-foreground/60 mb-12">See what personalized prescription care can do for you.</p>

          <div className="bg-background rounded-2xl p-8 border border-border">
            <div className="flex justify-between items-end mb-6">
              <div className="text-left">
                <p className="text-sm text-foreground/60 font-medium mb-1">Your age</p>
                <motion.p
                  key={ageValue[0]}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-4xl font-serif text-primary"
                >
                  {ageValue[0]}
                </motion.p>
              </div>
              <div className="text-right">
                <p className="text-sm text-brand font-medium mb-1">Potential visible reduction</p>
                <motion.p
                  key={yearsYounger}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-4xl font-serif text-brand"
                >
                  ~{yearsYounger} yrs
                </motion.p>
              </div>
            </div>

            <Slider
              value={ageValue}
              onValueChange={setAgeValue}
              max={75}
              min={30}
              step={1}
              className="py-4"
            />

            <Button onClick={handleAction} className="w-full mt-8 rounded-full py-6 text-lg bg-primary hover:bg-primary/90 hover:-translate-y-0.5 transition-all">
              Get Approved
            </Button>
          </div>
        </motion.div>
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
          The change we've all been <span className="text-brand italic">waiting for</span>
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
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow"
            >
              <img src={img} alt="Happy patient" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 9. Science Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 border-b border-white/20 pb-16"
          >
            {[
              { title: "3x faster cell turnover", desc: "Prescription retinoids accelerate renewal better than any OTC cream." },
              { title: "Visibly plumper skin", desc: "Medical-grade peptides rebuild your skin's structural foundation." },
              { title: "91% reported glow", desc: "Patients report dramatic texture improvements in just 12 weeks." },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="flex gap-4">
                <CheckCircle2 className="w-8 h-8 text-brand-light shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-2">{stat.title}</h3>
                  <p className="text-primary-foreground/70">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">We don't just treat wrinkles. We fix your skin barrier.</h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Aging isn't just about fine lines—it's about a compromised skin barrier losing moisture and elasticity. Our clinical formulations penetrate deep to repair the cellular matrix, restoring the thick, luminous skin of your youth without harsh irritation.
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
              <img src={sciWoman} alt="Radiant skin" className="w-3/4 rounded-2xl shadow-2xl relative z-10" />
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

      {/* 10. Pastel Stat Cards */}
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
            { num: "91%", label: "Saw reduction in fine lines", bg: "bg-brand-light/30" },
            { num: "9/10", label: "Patients switch from OTC", bg: "bg-[#e6efe9]" },
            { num: "12w", label: "Average time to peak glow", bg: "bg-[#f0e6e6]" },
            { num: "24/7", label: "Dermatologist support", bg: "bg-[#fff3e0]" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              whileHover={{ scale: 1.04, y: -4, transition: { duration: 0.3 } }}
            >
              <Card className={`${stat.bg} border-none shadow-none rounded-3xl p-8 text-center h-full`}>
                <h3 className="font-serif text-6xl text-primary mb-4">{stat.num}</h3>
                <p className="text-foreground/70 font-medium">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 11. Timeline */}
      <section className="py-24 bg-brand-light/20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight">Begin your skincare journey from home.</h2>
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
              { num: "01", title: "Get Approved", desc: "Fill out a quick 3-minute medical intake form.", img: timePhone },
              { num: "02", title: "Get Prescribed", desc: "A board-certified dermatologist reviews and prescribes.", img: timeDoctor },
              { num: "03", title: "Receive your Rx", desc: "Your customized treatment ships free to your door.", img: timeBox },
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

      {/* 12. Support Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="bg-primary text-primary-foreground rounded-[3rem] p-10 md:p-20 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden"
        >
          <div className="lg:w-1/2 space-y-6 z-10">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Unlimited 24/7 support included.</h2>
            <p className="text-lg text-primary-foreground/80">
              Skin purging? Need to adjust your strength? Your dedicated care team is always one message away to ensure your journey is smooth and successful.
            </p>
            <Button onClick={handleAction} variant="outline" className="rounded-full bg-white text-primary border-none hover:bg-brand-light mt-4 hover:-translate-y-0.5 transition-all">
              Get Approved
            </Button>
          </div>
          <div className="lg:w-1/2 relative z-10 w-full aspect-video lg:aspect-square">
            <motion.img
              src={supPair}
              alt="Doctor and Patient"
              className="w-full h-full object-cover rounded-3xl shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/30 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
        </motion.div>
      </section>

      {/* 13. Testimonials */}
      <section id="reviews" className="py-24 bg-background px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">There's a reason people are <span className="text-brand italic">raving about us.</span></h2>
          <Button onClick={handleAction} className="rounded-full px-8 bg-brand hover:bg-brand/90 text-white hover:-translate-y-0.5 transition-all">I'M READY, LET'S GO</Button>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex overflow-x-auto pb-8 gap-6 max-w-7xl mx-auto snap-x px-6 md:px-0 hide-scrollbar"
        >
          {[
            { name: "Elena M.", age: 42, quote: "My skin has never felt this plump. The redness is gone and the fine lines around my eyes are barely visible.", img: p1 },
            { name: "Robert K.", age: 55, quote: "Simple, easy, and it actually works. The dark spots I've had for years are fading.", img: p4 },
            { name: "Jennifer T.", age: 39, quote: "I love the texture of the night cream. It doesn't irritate my sensitive skin like OTC retinols did.", img: p2 },
            { name: "Maria S.", age: 61, quote: "Finally a routine that addresses my neck as well as my face. Outstanding support team too.", img: p7 },
            { name: "David L.", age: 48, quote: "My wife noticed the difference in 3 weeks. I'm a believer.", img: p5 },
          ].map((review, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="min-w-[300px] max-w-[350px] shrink-0 snap-center"
            >
              <Card className="border border-border bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow h-full">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-brand text-brand" />
                    ))}
                  </div>
                  <p className="text-foreground/80 mb-8 min-h-[100px]">"{review.quote}"</p>
                  <div className="flex items-center gap-4">
                    <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-primary">{review.name}</p>
                      <p className="text-xs text-foreground/50">{review.age} years old</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 14. Quiz Card */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <Card className="border border-border/50 shadow-2xl rounded-3xl overflow-hidden bg-white">
            <div className="bg-brand text-white p-6 text-center">
              <h3 className="font-serif text-2xl">Let's build your routine</h3>
            </div>
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">What is your primary skin goal?</h2>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
              >
                {[
                  "Reduce fine lines & wrinkles",
                  "Clear dark spots & hyperpigmentation",
                  "Firm sagging skin",
                  "Improve overall texture & glow",
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

      {/* 15. FAQ */}
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
                { q: "How much does it cost?", a: "Plans start at $39/month. This includes your prescription medication, unlimited messaging with your clinical team, and free shipping. No hidden fees." },
                { q: "Will it work for my sensitive skin?", a: "Yes. Our dermatologists customize the concentration of active ingredients based on your skin type to minimize irritation while maximizing results." },
                { q: "Do you accept insurance?", a: "While we don't bill insurance directly for the medications, our services are HSA/FSA eligible, and we provide receipts you can submit." },
                { q: "What side effects should I expect?", a: "When starting prescription retinoids, some patients experience mild redness or peeling (the 'purge') for 2-4 weeks. Your provider will guide you through minimizing these effects." },
                { q: "How long until I see results?", a: "Many patients notice improved glow within 2 weeks. Significant reduction in fine lines and hyperpigmentation typically becomes visible at the 12-week mark." },
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

      {/* 16. Value Props */}
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
