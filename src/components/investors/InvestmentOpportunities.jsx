"use client";

import { useEffect, useState } from "react";
import InvestmentOpportunityCard from "./InvestmentOpportunityCard";
import { getInvestmentOpportunities } from "@/services/investorService";

export default function InvestmentOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const data = await getInvestmentOpportunities();
        setOpportunities(data);
console.log("Investment opportunities:", data);
      } catch (error) {
        console.error("Error fetching investment opportunities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <section className="bg-black px-6 py-14 sm:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Current Investment Opportunities
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-red-500" />
            <span className="ml-3 text-zinc-400">
              Loading opportunities...
            </span>
          </div>
        ) : opportunities.length === 0 ? (
          <p className="py-20 text-center text-zinc-400">
            No investment opportunities available at the moment.
          </p>
        ) : (
          <div className="grid gap-15 md:grid-cols-2">
            {opportunities.map((opportunity) => (
              <InvestmentOpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
