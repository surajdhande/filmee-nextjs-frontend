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
      } catch (error) {
        console.error("Error fetching investment opportunities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  return (
    <section className="bg-black px-4 py-10 sm:px-8 sm:py-14 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 sm:mb-10 text-2xl sm:text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
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
          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {opportunities.map((opportunity, index) => (
              <InvestmentOpportunityCard
                key={opportunity.id || opportunity._id || opportunity.project_id || index}
                opportunity={opportunity}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
