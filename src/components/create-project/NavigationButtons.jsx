export default function NavigationButtons({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isLastStep = false,
}) {
  return (
    <div className="mt-10 flex items-center justify-between">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={currentStep === 1}
        className={`rounded-full border px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-all
          ${
            currentStep === 1
              ? "cursor-not-allowed border-[#2A2A2A] text-[#555]"
              : "border-[#E50914] text-[#E50914] hover:bg-[#E50914] hover:text-white"
          }`}
      >
        Previous
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="rounded-full bg-gradient-to-r from-[#E50914] to-[#FF2E2E] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(229,9,20,0.35)] transition hover:brightness-110"
      >
        {isLastStep ? "Create Project" : "Next Step"}
      </button>
    </div>
  );
}