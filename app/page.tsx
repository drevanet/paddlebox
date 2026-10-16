
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CirclePlay,
  Layers3,
  Move3D,
  Palette,
  PackageCheck,
  Sparkles,
  WandSparkles,
  Download,
  ShieldCheck,
  Zap,
  LayoutTemplate,
  Heart,
  Rotate3D,
} from "lucide-react";

import BoxScene from "@/components/box-scene";

const sample = [
  "DREVABOX",
  "MADE TO UNBOX",
  "SIDE A",
  "SIDE B",
  "YOUR BRAND",
  "SINCE 2026",
];

const features = [
  {
    icon: Layers3,
    title: "Six sides. One vision.",
    desc: "Edit the front, back, left, right, top and bottom independently. Every face has a place in your story.",
  },
  {
    icon: Move3D,
    title: "Real-time 3D preview",
    desc: "Rotate your model, inspect your concept from every angle and see your design wrap around the box.",
  },
  {
    icon: Palette,
    title: "Make it unmistakably yours",
    desc: "Customize the text on each face and use your brand color to make your packaging feel cohesive.",
  },
  {
    icon: LayoutTemplate,
    title: "Start with a clear canvas",
    desc: "No intimidating design suite. Open Drevabox, name your faces and develop your concept at your own pace.",
  },
  {
    icon: Download,
    title: "Download when you're ready",
    desc: "Export your work when your plan allows it. Your download allowance is clearly shown in the workspace.",
  },
  {
    icon: ShieldCheck,
    title: "Your work, your account",
    desc: "Keep your design workflow simple and return to the studio whenever inspiration strikes.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your workspace",
    description: "Sign up and start a new packaging concept.",
  },
  {
    number: "02",
    title: "Personalize all six faces",
    description:
      "Give each side its own words and bring your brand into the design.",
  },
  {
    number: "03",
    title: "Spin, inspect and refine",
    description:
      "Use the interactive model to look at your box from every angle.",
  },
  {
    number: "04",
    title: "Choose a plan and export",
    description:
      "Pick the subscription that matches your project and download needs.",
  },
];

const useCases = [
  {
    number: "01",
    title: "Small business packaging",
    description:
      "Explore visual directions for candles, skincare, accessories and handmade goods.",
  },
  {
    number: "02",
    title: "Subscription box concepts",
    description:
      "Imagine the unboxing experience before you decide how the packaging should feel.",
  },
  {
    number: "03",
    title: "Creative presentations",
    description:
      "Bring a 3D visual into a pitch, mood board or early conversation with your team.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full bg-violet/10 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 pt-14 md:grid-cols-2 md:pb-24 md:pt-20">
          <div className="relative z-10">
            <div className="eyebrow">
              <Sparkles size={14} />
              YOUR IDEAS, IN 3D
            </div>

            <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.04] tracking-[-.055em] sm:text-6xl lg:text-7xl">
              Packaging design that{" "}
              <span className="text-violet">
                comes to life.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Meet Drevabox, your friendly 3D box maker.
              Customize all six faces, spin your design in real
              time, and turn your next big idea into a box worth
              opening.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/editor" className="btn-primary">
                Start designing
                <ArrowRight size={17} />
              </Link>

              <Link href="/pricing" className="btn-secondary">
                <CirclePlay size={17} />
                Explore plans
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-slate-600">
              <span className="flex items-center gap-2">
                <Check className="text-violet" size={17} />
                Six editable faces
              </span>

              <span className="flex items-center gap-2">
                <Check className="text-violet" size={17} />
                Live 3D preview
              </span>

              <span className="flex items-center gap-2">
                <Check className="text-violet" size={17} />
                No design degree needed
              </span>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[
                  "#f9c9b6",
                  "#c5d7ff",
                  "#c8f2d9",
                  "#f7d7ff",
                ].map((color) => (
                  <span
                    key={color}
                    className="h-9 w-9 rounded-full border-2 border-white"
                    style={{ background: color }}
                  />
                ))}
              </div>

              <div>
                <p className="text-sm font-extrabold">
                  Made for makers and dreamers
                </p>
                <p className="text-xs text-slate-500">
                  Small brands, big ideas, better packaging.
                </p>
              </div>
            </div>
          </div>

          {/* HERO 3D PREVIEW */}
          <div className="relative min-w-0">
            <div className="pointer-events-none absolute inset-8 rounded-[40px] bg-gradient-to-br from-violet/20 via-white to-mint/40 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-soft">
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-slate-400">
                    Live 3D studio
                  </p>
                  <p className="mt-1 font-extrabold">
                    Signature box concept
                  </p>
                </div>

                <span className="rounded-full bg-mint/60 px-3 py-1 text-xs font-extrabold text-emerald-900">
                  Preview
                </span>
              </div>

              <BoxScene
                faces={sample}
                className="h-[360px] w-full overflow-hidden rounded-3xl sm:h-[430px]"
              />

              <div className="flex items-center justify-between px-3 py-3 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-2">
                  <Rotate3D size={15} />
                  Drag to rotate
                </span>
                <span>6 faces · Interactive model</span>
              </div>
            </div>

            <div className="absolute -left-5 top-24 hidden rounded-2xl border border-white bg-white p-4 shadow-soft sm:block">
              <Palette className="text-violet" />
              <p className="mt-2 text-sm font-extrabold">
                Your colors
              </p>
              <p className="text-xs text-slate-500">
                Your brand, your way
              </p>
            </div>

            <div className="absolute -right-4 bottom-14 hidden rounded-2xl border border-white bg-white p-4 shadow-soft sm:block">
              <PackageCheck className="text-emerald-600" />
              <p className="mt-2 text-sm font-extrabold">
                Ready to export
              </p>
              <p className="text-xs text-slate-500">
                When you're happy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 py-7 text-center sm:grid-cols-4">
          {[
            ["6", "Editable faces"],
            ["3D", "Interactive preview"],
            ["∞", "Ideas welcome"],
            ["1", "Simple workspace"],
          ].map(([number, label]) => (
            <div key={label}>
              <p className="text-2xl font-black text-violet">
                {number}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section-pad">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">
              <WandSparkles size={14} />
              A SMALL TOOL WITH BIG POSSIBILITIES
            </div>

            <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              Everything you need to{" "}
              <span className="text-violet">
                think outside the box.
              </span>
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              From first sketch to polished concept, Drevabox
              keeps the creative process clear, intuitive and fun.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <article
                key={title}
                className="group rounded-3xl border border-slate-200/80 bg-white p-7 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet/10 text-violet transition group-hover:bg-violet group-hover:text-white">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 text-xl font-extrabold">
                  {title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="bg-[#111827] py-20 text-white"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
          <div>
            <div className="eyebrow border-white/10 bg-white/10 text-mint">
              <Zap size={14} />
              YOUR CREATIVE FLOW
            </div>

            <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              From blank canvas to{" "}
              <span className="text-mint">
                box-worthy.
              </span>
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-300">
              A great concept doesn't need a complicated process.
              Drevabox makes it easy to explore ideas before you
              commit to a final direction.
            </p>

            <div className="mt-8 grid gap-6">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 font-black text-mint">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="font-extrabold">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/editor" className="btn-primary mt-9">
              Open the 3D editor
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-3">
            <BoxScene
              faces={[
                "MAKE IT",
                "MEMORABLE",
                "YOUR",
                "BRAND",
                "THE BIG",
                "REVEAL",
              ]}
              accent="#7557f6"
              className="h-[420px] overflow-hidden rounded-[1.5rem]"
            />

            <div className="flex items-center justify-between px-3 py-4">
              <div>
                <p className="font-bold">
                  Your concept, in motion
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Interactive 3D box preview
                </p>
              </div>

              <span className="rounded-full bg-mint px-3 py-1.5 text-xs font-black text-slate-900">
                LIVE MODEL
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="eyebrow">
                <Heart size={14} />
                MADE FOR YOUR NEXT BIG THING
              </div>

              <h2 className="mt-5 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
                A better box starts with a better idea.
              </h2>
            </div>

            <p className="max-w-md leading-7 text-slate-600">
              Product packaging, subscription boxes, gift
              concepts or a fun personal project — give your idea
              a shape you can actually see.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {useCases.map((item) => (
              <div
                key={item.number}
                className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200"
              >
                <p className="text-sm font-black text-violet">
                  {item.number}
                </p>

                <h3 className="mt-4 text-xl font-extrabold">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-violet to-[#9b83ff] px-7 py-12 text-white sm:px-12 md:flex md:items-center md:justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[.16em] text-white/70">
                YOUR NEXT IDEA IS WAITING
              </p>

              <h2 className="mt-3 max-w-2xl text-3xl font-black sm:text-4xl">
                Ready to make something worth opening?
              </h2>

              <p className="mt-3 max-w-xl leading-7 text-white/80">
                Create your account, open the studio and start
                shaping your box.
              </p>
            </div>

            <Link
              href="/sign-up"
              className="mt-7 inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-4 font-extrabold text-violet transition hover:-translate-y-1 md:ml-8 md:mt-0"
            >
              Create free account
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
