"use client";

import { useRouter } from "next/navigation";

const paths = [
  {
    role: "FILMMAKER",
    title: "Filmmakers",
    description:
        "Pitch projects and connect with investors.",

    features: [
        "Create compelling pitches",
        "Track funding progress",
        "Connect with talent",
        ],
    button: "Get Started",
    cardHref: "/filmmaker",
    image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
},
    {
    role: "INVESTOR",
    title: "Investors",
    description:
        "Discover and fund promising film projects.",
    features: [
        "Browse curated projects",
        "Track investments",
        "Market insights",
    ],
    button: "Start Investing",
    image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    },
  {
    role: "TALENT",
    title: "Talent",
    description:
        "Showcase your skills and land your next role.",
    features: [
        "Build portfolios",
        "Apply to projects",
        "Network with creators",
    ],
    button: "Build Profile",
    cardHref: "/Talent",
    image:
"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
    },
];

export default function ChoosePath() {
  const router = useRouter();

  return (
    <section className="bg-black py-14 px-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 max-w-2xl">
          <h2 className="text-5xl font-extrabold tracking-tight text-white">
            Choose Your Path
          </h2>

          <p className="mt-2 text-lg text-zinc-400">
        Join the community that fits your creative journey.
        </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {paths.map((item) => (
            <div
  key={item.role}
  onClick={() => item.cardHref && router.push(item.cardHref)}
  className={`group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 transition-all duration-300 hover:border-red-600 ${
    item.cardHref ? "cursor-pointer" : ""
  }`}
>

              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"></img>

              <div className="flex flex-1 flex-col p-5">

                <h3 className="text-2xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
  {item.description}
</p>

        {item.features && (
        <ul className="mt-5 space-y-2 text-sm text-zinc-300">
            {item.features.map((feature) => (
            <li
                key={feature}
                className="flex items-center gap-2"
            >
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
                {feature}
            </li>
            ))}
        </ul>
        )}


                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/signup?role=${item.role}`);
                  }}
                  className="mt-8 w-full rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 py-3 font-semibold text-white transition duration-300 hover:brightness-110"
                >
                  {item.button}
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}