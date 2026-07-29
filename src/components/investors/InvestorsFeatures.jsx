import { Target, BarChart3, Users } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Curated Opportunities",
    description:
      "Hand-picked projects with strong commercial potential and experienced teams.",
  },
  {
    icon: BarChart3,
    title: "Transparent Analytics",
    description:
      "Real-time tracking of your investments with detailed performance metrics.",
  },
  {
    icon: Users,
    title: "Expert Network",
    description:
      "Connect with industry professionals and fellow investors in our exclusive community.",
  },
];

export default function InvestorsFeatures() {
  return (
    <section className="bg-black px-4 pt-6 pb-6 sm:px-8 sm:pb-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center rounded-2xl border border-zinc-900 px-6 py-8 sm:px-8 sm:py-10 text-center"
              style={{ backgroundColor: "rgb(16, 24, 40)" }}
            >
              <feature.icon
                size={32}
                className="mb-5 text-red-500"
              />
              <h3 className="text-lg font-bold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
