import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type LeadPrefill = {
  service?: string;
  packageId?: string;
};

type LeadContextValue = {
  open: boolean;
  prefill: LeadPrefill;
  openLead: (prefill?: LeadPrefill) => void;
  closeLead: () => void;
};

const LeadContext = createContext<LeadContextValue | null>(null);

export function LeadProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<LeadPrefill>({});

  const value = useMemo(
    () => ({
      open,
      prefill,
      openLead: (next?: LeadPrefill) => {
        setPrefill(next ?? {});
        setOpen(true);
      },
      closeLead: () => setOpen(false),
    }),
    [open, prefill],
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be used inside LeadProvider");
  return ctx;
}
