"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";

const RED = "#E50914";

export default function EscrowPaymentFlow({
  film,
  investmentAmount,
  onClose,
}) {
  const amount = Number(investmentAmount) || 0;
  const platformFee = useMemo(() => amount * 0.025, [amount]);
  const totalDue = amount + platformFee;

  const [step, setStep] = useState("payment");
  const [accountMode, setAccountMode] = useState("login");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);

  function formatCurrency(value) {
    return `$${Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }

  function handleSecurePayment() {
    setStep("account");
  }

  function handleLogin() {
    if (!email || !password) return;
    setAccountCreated(true);
    setStep("payment-method");
  }

  function handleCreateAccount() {
    if (!email || !password) return;
    setAccountCreated(true);
    setStep("payment-method");
  }

  function handleContinueToReview() {
    setStep("review");
  }

  function handleCreateEscrow() {
    setStep("created");
  }

  function handleFundEscrow() {
    setStep("dashboard");
  }

  function renderAccountStep() {
    if (accountCreated) {
      return (
        <div className="flex flex-col items-center text-center py-7">
          <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mb-5">
            <CheckCircle2 size={34} className="text-green-400" />
          </div>

          <h2 className="text-2xl font-bold text-white">
            Escrow Account Connected
          </h2>
          <p className="text-zinc-400 text-sm mt-2 max-w-sm">
            Your account has been verified and connected securely to continue
            with this investment.
          </p>

          <div className="w-full mt-6 bg-[#181818] border border-[#2A2A2A] rounded-2xl p-5 text-left">
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 text-sm">Email</span>
              <span className="text-white text-sm font-semibold">
                {email}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 text-sm">Escrow Status</span>
              <span className="text-green-400 text-sm font-bold">
                CONNECTED
              </span>
            </div>
          </div>

          <button
            onClick={() => setStep("payment-method")}
            className="w-full mt-6 py-3.5 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white font-bold uppercase tracking-wider"
          >
            Continue to Payment
          </button>
        </div>
      );
    }

    return (
      <div>
        <StepHeader
          icon={<ShieldCheck size={22} />}
          title={accountMode === "login" ? "Login to Escrow" : "Create an Escrow Account"}
          subtitle={
            accountMode === "login"
              ? "Securely login to continue with your investment."
              : "Create your secure escrow account to continue."
          }
          onBack={() => setStep("payment")}
        />

        <div className="mt-6 space-y-4">
          <Field
            label="Email Address"
            icon={<Mail size={16} />}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
          />

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  accountMode === "login"
                    ? "Enter your password"
                    : "Create a strong password"
                }
                className="w-full bg-[#0D0D0D] border border-[#303030] focus:border-[#E50914] rounded-xl py-3 pl-11 pr-11 text-white outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {accountMode === "create" && (
            <div className="bg-[#171717] border border-[#2A2A2A] rounded-xl p-4 text-xs text-zinc-400 space-y-2">
              <p className="text-white font-semibold">Strong passwords have:</p>
              <p className="flex gap-2">
                <Check size={14} className="text-green-400" />
                At least 7 characters
              </p>
              <p className="flex gap-2">
                <Check size={14} className="text-green-400" />
                One uppercase and one lowercase character
              </p>
              <p className="flex gap-2">
                <Check size={14} className="text-green-400" />
                One number or special character
              </p>
            </div>
          )}

          <button
            onClick={
              accountMode === "login"
                ? handleLogin
                : handleCreateAccount
            }
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white font-bold uppercase tracking-wider"
          >
            {accountMode === "login" ? "Secure Login" : "Sign Up"}
          </button>

          {accountMode === "login" ? (
            <>
              <button
                onClick={() => setAccountMode("create")}
                className="w-full border border-[#E50914]/70 text-[#E50914] py-3 rounded-full font-bold uppercase tracking-wider"
              >
                Create New Escrow Account
              </button>
              <p className="text-center text-xs text-zinc-500">
                Don't have an escrow account? Create one above.
              </p>
            </>
          ) : (
            <>
              <button
                onClick={() => setAccountMode("login")}
                className="w-full text-sm text-zinc-400 hover:text-white"
              >
                Already have an account?{" "}
                <span className="text-[#E50914] font-semibold">Login here</span>
              </button>
            </>
          )}

          <SecurityNotice />
        </div>
      </div>
    );
  }

  function renderPaymentMethod() {
    return (
      <div>
        <StepHeader
          icon={<WalletCards size={22} />}
          title="Secure Payment"
          subtitle="Choose how you would like to fund the escrow."
          onBack={() => setStep("account")}
        />

        <ProgressSteps current={2} />

        <div className="mt-5 space-y-3">
          <PaymentOption
            active={paymentMethod === "card"}
            icon={<CreditCard size={20} />}
            title="Credit / Debit Card"
            subtitle="Pay securely using your card"
            onClick={() => setPaymentMethod("card")}
          />

          <PaymentOption
            active={paymentMethod === "bank"}
            icon={<Building2 size={20} />}
            title="Bank Transfer"
            subtitle="Transfer funds from your bank account"
            onClick={() => setPaymentMethod("bank")}
          />
        </div>

        {paymentMethod === "card" && (
          <div className="mt-5 space-y-4">
            <Field
              label="Cardholder Name"
              placeholder="John Doe"
              value={cardName}
              onChange={setCardName}
            />
            <Field
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={setCardNumber}
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Expiry Date"
                placeholder="MM/YY"
                value={expiry}
                onChange={setExpiry}
              />
              <Field
                label="CVC"
                placeholder="123"
                value={cvc}
                onChange={setCvc}
              />
            </div>
          </div>
        )}

        {paymentMethod === "bank" && (
          <div className="mt-5 bg-[#171717] border border-[#303030] rounded-2xl p-5">
            <p className="text-white font-semibold mb-2">
              Bank Transfer
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Bank transfer instructions will be provided after you review
              and confirm the investment.
            </p>
          </div>
        )}

        <button
          onClick={handleContinueToReview}
          className="w-full mt-6 py-3.5 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white font-bold uppercase tracking-wider"
        >
          Continue
        </button>
      </div>
    );
  }

  function renderReview() {
    return (
      <div>
        <StepHeader
          icon={<ShieldCheck size={22} />}
          title="Review Your Payment"
          subtitle="Review everything before creating your escrow."
          onBack={() => setStep("payment-method")}
        />

        <ProgressSteps current={3} />

        <div className="mt-5 bg-[#181818] border border-[#2A2A2A] rounded-2xl p-5">
          <SummaryRow label="Project" value={film.title} />
          <SummaryRow label="Investment Amount" value={formatCurrency(amount)} />
          <SummaryRow label="Platform Fee (2.5%)" value={formatCurrency(platformFee)} />
          <div className="border-t border-[#303030] mt-3 pt-4">
            <SummaryRow
              label="Total Due Today"
              value={formatCurrency(totalDue)}
              highlight
            />
          </div>
        </div>

        <div className="mt-4 bg-[#1A0A0A] border border-[#E50914]/30 rounded-2xl p-4 flex gap-3">
          <Lock size={18} className="text-[#E50914] shrink-0" />
          <p className="text-xs text-zinc-400 leading-relaxed">
            Your funds will be held securely in escrow and released according
            to the agreed milestone conditions.
          </p>
        </div>

        <button
          onClick={handleCreateEscrow}
          className="w-full mt-6 py-3.5 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white font-bold uppercase tracking-wider"
        >
          Confirm & Create Escrow
        </button>
      </div>
    );
  }

  function renderCreated() {
    return (
      <div className="text-center py-5">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-500/15 flex items-center justify-center">
          <CheckCircle2 size={42} className="text-green-400" />
        </div>

        <h2 className="text-2xl font-bold text-white mt-5">
          Escrow Created Successfully!
        </h2>

        <p className="text-zinc-400 text-sm mt-2">
          Your project escrow has been created and is ready to be funded.
        </p>

        <div className="mt-6 bg-[#181818] border border-[#2A2A2A] rounded-2xl p-5 text-left">
          <SummaryRow label="Escrow ID" value="ESC-2026-000124" />
          <SummaryRow label="Project" value={film.title} />
          <SummaryRow label="Investment Amount" value={formatCurrency(amount)} />
          <SummaryRow label="Status" value="AWAITING FUNDING" highlight />
        </div>

        <button
          onClick={handleFundEscrow}
          className="w-full mt-6 py-3.5 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white font-bold uppercase tracking-wider"
        >
          Proceed to Fund Escrow
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 border border-[#E50914]/70 text-[#E50914] py-3 rounded-full font-bold uppercase tracking-wider"
        >
          Go to Project
        </button>
      </div>
    );
  }

  function renderDashboard() {
    return (
      <div>
        <StepHeader
          icon={<ShieldCheck size={22} />}
          title="My Escrow"
          subtitle="Manage your escrow investment inside Filmee."
          onBack={() => setStep("created")}
        />

        <div className="grid grid-cols-2 gap-3 mt-6">
          <StatCard label="Escrow Status" value="ACTIVE" />
          <StatCard label="Funding" value="LOCKED" />
        </div>

        <div className="mt-5 bg-[#181818] border border-[#2A2A2A] rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold">{film.title}</p>
              <p className="text-zinc-500 text-xs mt-1">ESC-2026-000124</p>
            </div>
            <span className="text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-[10px] font-bold">
              IN PROGRESS
            </span>
          </div>

          <div className="mt-5">
            <SummaryRow label="Invested Amount" value={formatCurrency(amount)} />
            <SummaryRow label="Escrow Amount" value={formatCurrency(amount)} />
            <SummaryRow label="Release Model" value="Milestones" />
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-3">
            Milestone Plan
          </p>

          {[
            ["Pre-production", "30%", "PENDING"],
            ["Production", "40%", "PENDING"],
            ["Post-production", "30%", "PENDING"],
          ].map(([name, percentage, status], index) => (
            <div
              key={name}
              className="flex items-center gap-3 bg-[#181818] border border-[#2A2A2A] rounded-xl p-4 mb-2"
            >
              <div className="w-8 h-8 rounded-full bg-[#E50914]/15 text-[#E50914] flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold">{name}</p>
                <p className="text-zinc-500 text-xs">{percentage} of investment</p>
              </div>
              <span className="text-zinc-500 text-[10px] font-bold">
                {status}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-5 border border-[#E50914]/70 text-[#E50914] py-3 rounded-full font-bold uppercase tracking-wider"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md px-4 py-6">
      <div className="relative w-full max-w-[520px] max-h-[92vh] overflow-y-auto bg-[#101010] border border-[#292929] rounded-3xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 text-zinc-500 hover:text-white"
        >
          <X size={19} />
        </button>

        <div className="p-7">
          {step === "payment" && (
            <>
              <StepHeader
                icon={<ShieldCheck size={22} />}
                title="Secure Escrow Payment"
                subtitle="Your investment will be held securely in escrow and released to the filmmaker as milestones are completed."
              />

              <InvestmentSummary
                film={film}
                amount={amount}
                fee={platformFee}
                total={totalDue}
                formatCurrency={formatCurrency}
              />

              <div className="mt-4 bg-[#1A0A0A] border border-[#E50914]/30 rounded-2xl p-4 flex gap-3">
                <Lock size={18} className="text-[#E50914] shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">
                    Your Investment is Protected
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                    Funds are held in escrow and only released when agreed
                    milestones are completed and approved.
                  </p>
                </div>
              </div>

              <button
                onClick={handleSecurePayment}
                className="w-full mt-6 py-3.5 rounded-full bg-gradient-to-r from-[#E50914] to-[#B3070F] text-white font-bold uppercase tracking-wider shadow-[0_4px_20px_rgba(229,9,20,0.25)]"
              >
                Secure Payment {formatCurrency(totalDue)}
              </button>

              <p className="text-center text-[10px] text-zinc-600 mt-4">
                🔒 Secure sandbox payment • Filmee Escrow
              </p>
            </>
          )}

          {step === "account" && renderAccountStep()}
          {step === "payment-method" && renderPaymentMethod()}
          {step === "review" && renderReview()}
          {step === "created" && renderCreated()}
          {step === "dashboard" && renderDashboard()}
        </div>
      </div>
    </div>
  );
}

function StepHeader({ icon, title, subtitle, onBack }) {
  return (
    <div>
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-white text-xs font-semibold mb-5"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      )}

      <div className="flex items-start gap-3 pr-8">
        <div className="w-10 h-10 rounded-xl bg-[#E50914]/10 text-[#E50914] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-zinc-500 text-xs leading-relaxed mt-1">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

function InvestmentSummary({ film, amount, fee, total, formatCurrency }) {
  return (
    <div className="mt-5 bg-[#181818] border border-[#2A2A2A] rounded-2xl p-5">
      <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-4">
        Investment Summary
      </p>

      <SummaryRow label="Project" value={film.title} />
      <SummaryRow label="Investment Amount" value={formatCurrency(amount)} />
      <SummaryRow label="Platform Fee (2.5%)" value={formatCurrency(fee)} />

      <div className="border-t border-[#303030] mt-3 pt-4">
        <SummaryRow
          label="Total Due Today"
          value={formatCurrency(total)}
          highlight
        />
      </div>
    </div>
  );
}

function SummaryRow({ label, value, highlight = false }) {
  return (
    <div className="flex justify-between gap-4 py-1.5">
      <span className="text-zinc-500 text-sm">{label}</span>
      <span
        className={`text-sm font-semibold text-right ${
          highlight ? "text-[#FF3B45]" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function Field({ label, icon, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-[#0D0D0D] border border-[#303030] focus:border-[#E50914] rounded-xl py-3 ${
            icon ? "pl-11" : "px-4"
          } text-white outline-none`}
        />
      </div>
    </div>
  );
}

function PaymentOption({ active, icon, title, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
        active
          ? "border-[#E50914] bg-[#E50914]/5"
          : "border-[#303030] bg-[#151515] hover:border-zinc-600"
      }`}
    >
      <div className="text-zinc-300">{icon}</div>
      <div className="flex-1">
        <p className="text-white font-semibold text-sm">{title}</p>
        <p className="text-zinc-500 text-xs mt-1">{subtitle}</p>
      </div>
      <div
        className={`w-4 h-4 rounded-full border ${
          active
            ? "border-[#E50914] bg-[#E50914]"
            : "border-zinc-600"
        }`}
      />
    </button>
  );
}

function ProgressSteps({ current }) {
  const steps = ["Login", "Payment", "Review", "Confirm"];

  return (
    <div className="grid grid-cols-4 gap-2 mt-6">
      {steps.map((label, index) => {
        const number = index + 1;
        const active = number <= current;

        return (
          <div key={label} className="text-center">
            <div
              className={`mx-auto w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                active
                  ? "bg-[#E50914] text-white"
                  : "bg-[#242424] text-zinc-600"
              }`}
            >
              {number}
            </div>
            <p
              className={`text-[9px] mt-1 uppercase tracking-wider ${
                active ? "text-white" : "text-zinc-600"
              }`}
            >
              {label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-[#181818] border border-[#2A2A2A] rounded-xl p-4 text-center">
      <p className="text-[9px] uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="text-sm font-bold text-white mt-1">{value}</p>
    </div>
  );
}

function SecurityNotice() {
  return (
    <div className="bg-[#141414] border border-[#252525] rounded-xl p-4 flex gap-3">
      <ShieldCheck size={17} className="text-[#E50914] shrink-0" />
      <p className="text-[11px] text-zinc-500 leading-relaxed">
        Your Filmee investment flow is protected by the escrow sandbox. Real
        money is not handled in this stage.
      </p>
    </div>
  );
}
