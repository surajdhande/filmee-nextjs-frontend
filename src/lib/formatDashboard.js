export function formatCompactNumber(n) {
  const num = Number(n) || 0;
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toLocaleString();
}

const SYMBOL = { USD: "$", INR: "₹", EUR: "€", GBP: "£" };

export function formatCurrency(amount, currency = "USD") {
  const num = Number(amount) || 0;
  const code = (currency || "USD").toUpperCase();
  if (code === "INR") {
    if (num >= 1_000_000) {
      return `₹${(num / 1_000_000).toFixed(1)}M`;
    }
    return `₹${num.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  }
  const sym = SYMBOL[code] || `${code} `;
  if (num >= 1_000_000) {
    return `${sym}${(num / 1_000_000).toFixed(1)}M`;
  }
  return `${sym}${num.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export function projectMoney(amount, project) {
  return formatCurrency(amount, project?.currency || "USD");
}
