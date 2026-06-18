import React from 'react';

const CenteredToast = ({ type = 'error', message = '', show = true, onClose }) => {
  if (!show || !message) return null;
  const isSuccess = type === 'success';

  return (
    <div className="fixed top-6 left-1/2 z-50 w-full max-w-[560px] -translate-x-1/2 px-4" role="status" aria-live="polite">
      <div className={`flex items-start gap-3 rounded-3xl border p-4 shadow-xl bg-white ${
        isSuccess ? 'border-emerald-200 text-emerald-900' : 'border-red-200 text-red-900'
      }`}>
        <span className={`material-symbols-outlined mt-0.5 shrink-0 text-2xl ${
          isSuccess ? 'text-emerald-500' : 'text-red-500'
        }`}>
          {isSuccess ? 'check_circle' : 'error'}
        </span>

        <div className="min-w-0 break-words whitespace-pre-wrap text-sm font-semibold leading-6">
          {message}
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="ml-auto shrink-0 rounded-full bg-slate-100 p-2 text-sm text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CenteredToast;
