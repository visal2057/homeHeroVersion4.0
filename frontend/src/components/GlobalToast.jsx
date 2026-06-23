import 'react';

// --- ONE PLACE DECLARATION & DESIGN ---
export function GlobalToast({ toast }) {
  if (!toast.show) return null;

  return (
    <div 
      style={{ left: '50%', transform: 'translateX(-50%)' }}
      className={`fixed top-20 z-[9999] flex items-start gap-3 px-6 py-3.5 rounded-xl shadow-xl border transition-all duration-300 ease-out w-full max-w-[90vw] min-w-0 ${
        toast.isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
      } ${
        toast.type === 'success' 
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
          : 'bg-rose-50 border-rose-200 text-rose-900'
      }`}
    >
      {/* Animated pulsing status indicator dot */}
      <span className={`w-2.5 h-2.5 rounded-full animate-pulse mt-0.5 shrink-0 ${
        toast.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
      }`}></span>
      
      {/* Output Message Context */}
      <p className="text-sm font-semibold tracking-wide m-0 whitespace-normal break-words flex-1 min-w-0 leading-snug">
        {toast.message}
      </p>

      {/* CSS Loading Spinner (Shows on green success toast during redirection delay) */}
      {toast.type === 'success' && (
        <div className="w-4 h-4 border-2 border-emerald-800/20 border-t-emerald-600 rounded-full animate-spin shrink-0 ml-1"></div>
      )}
    </div>
  );
}