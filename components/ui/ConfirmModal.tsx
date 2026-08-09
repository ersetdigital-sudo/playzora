"use client";

import { useEffect, useRef } from "react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = "Ya, Hapus",
  cancelLabel = "Batal",
  danger = false,
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      className="backdrop:bg-black/60 bg-transparent p-0 rounded-2xl"
    >
      <div className="bg-[#161618] border border-white/[0.06] rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/50 leading-relaxed">{message}</p>

        <div className="mt-6 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] rounded-xl transition disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2.5 text-sm font-semibold rounded-xl transition disabled:opacity-50 ${
              danger
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/20"
                : "text-[#0a0a0b]"
            }`}
            style={danger ? undefined : { backgroundColor: "#d4af6a" }}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Menghapus…
              </span>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
}
