"use client";

// Reusable, app-wide toast/sonner-style notifications rendered in the
// top-right corner. Trigger them from anywhere with `useToast()`:
//
//   const toast = useToast();
//   toast.success("Profil diperbarui");
//   toast.error("Gagal menyimpan", { description: err.message });

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastOptions {
  /** Secondary line rendered under the title. */
  description?: string;
  /** Auto-dismiss delay in ms. Use `0` (or `Infinity`) to keep it until closed. */
  duration?: number;
}

interface ToastRecord {
  id: number;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration: number;
  leaving: boolean;
}

interface ToastApi {
  show: (variant: ToastVariant, title: string, options?: ToastOptions) => number;
  success: (title: string, options?: ToastOptions) => number;
  error: (title: string, options?: ToastOptions) => number;
  warning: (title: string, options?: ToastOptions) => number;
  info: (title: string, options?: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const DEFAULT_DURATION = 4000;
const LEAVE_ANIMATION_MS = 200;

const ToastContext = createContext<ToastApi | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const [mounted, setMounted] = useState(false);
  const idRef = useRef(0);
  const timersRef = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  // Portals need `document`, which only exists after the client mounts.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const dismiss = useCallback((id: number) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    // Mark as leaving to play the exit animation, then remove.
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, leaving: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, LEAVE_ANIMATION_MS);
  }, []);

  const show = useCallback(
    (variant: ToastVariant, title: string, options?: ToastOptions) => {
      const id = (idRef.current += 1);
      const duration = options?.duration ?? DEFAULT_DURATION;

      setToasts((prev) => [
        ...prev,
        {
          id,
          variant,
          title,
          description: options?.description,
          duration,
          leaving: false,
        },
      ]);

      if (duration > 0 && Number.isFinite(duration)) {
        timersRef.current.set(
          id,
          setTimeout(() => dismiss(id), duration)
        );
      }

      return id;
    },
    [dismiss]
  );

  const api = useMemo<ToastApi>(
    () => ({
      show,
      success: (title, options) => show("success", title, options),
      error: (title, options) => show("error", title, options),
      warning: (title, options) => show("warning", title, options),
      info: (title, options) => show("info", title, options),
      dismiss,
    }),
    [show, dismiss]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      {mounted &&
        createPortal(
          <div
            className="fixed top-4 right-4 z-9999 flex flex-col gap-3 w-90 max-w-[calc(100vw-2rem)] pointer-events-none"
            role="region"
            aria-label="Notifikasi"
            aria-live="polite"
          >
            {toasts.map((toast) => (
              <ToastCard
                key={toast.id}
                toast={toast}
                onClose={() => dismiss(toast.id)}
              />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast harus dipakai di dalam <ToastProvider>");
  }
  return ctx;
}

const VARIANT_STYLES: Record<
  ToastVariant,
  { accent: string; iconWrap: string; icon: React.ReactNode }
> = {
  success: {
    accent: "border-l-success",
    iconWrap: "bg-success-bg text-success",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  error: {
    accent: "border-l-danger",
    iconWrap: "bg-danger-bg text-danger",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  warning: {
    accent: "border-l-warning",
    iconWrap: "bg-warning-bg text-warning",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 9v4m0 4h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  info: {
    accent: "border-l-brand",
    iconWrap: "bg-brand-bg text-brand",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.9" />
        <path d="M12 11v5m0-8h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

function ToastCard({
  toast,
  onClose,
}: {
  toast: ToastRecord;
  onClose: () => void;
}) {
  const styles = VARIANT_STYLES[toast.variant];

  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-start gap-3 bg-white border border-neutral-border border-l-4 ${styles.accent} rounded-3 shadow-[0_8px_30px_rgba(17,24,39,0.12)] py-3.5 px-4 ${toast.leaving ? "toast-leave" : "toast-enter"}`}
    >
      <span className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 ${styles.iconWrap}`}>
        {styles.icon}
      </span>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-3.5 font-bold text-neutral-text wrap-break-word">{toast.title}</p>
        {toast.description && (
          <p className="text-[13px] text-neutral-muted mt-0.5 wrap-break-word">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup notifikasi"
        className="shrink-0 text-neutral-muted hover:text-neutral-text transition-colors cursor-pointer p-0.5 -mr-1 -mt-1"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
