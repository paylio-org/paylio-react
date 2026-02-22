import React, { createContext, useContext, useMemo } from "react";

interface PaylioContextValue {
  publishableKey: string;
}

const PaylioContext = createContext<PaylioContextValue | null>(null);

export interface PaylioProviderProps {
  /** Publishable API key (pk_...) */
  publishableKey: string;
  children: React.ReactNode;
}

/**
 * Provides Paylio configuration to child components.
 *
 * @example
 * ```tsx
 * <PaylioProvider publishableKey="pk_live_xxx">
 *   <PricingGrid userId="user_123" />
 * </PaylioProvider>
 * ```
 */
export function PaylioProvider({
  publishableKey,
  children,
}: PaylioProviderProps): React.JSX.Element {
  const value = useMemo(() => ({ publishableKey }), [publishableKey]);

  return <PaylioContext.Provider value={value}>{children}</PaylioContext.Provider>;
}

/**
 * Access the Paylio context. Must be used inside a PaylioProvider.
 */
export function usePaylioContext(): PaylioContextValue {
  const ctx = useContext(PaylioContext);
  if (!ctx) {
    throw new Error(
      "usePaylioContext must be used within a <PaylioProvider>. " +
        'Wrap your component tree with <PaylioProvider publishableKey="pk_...">.',
    );
  }
  return ctx;
}
