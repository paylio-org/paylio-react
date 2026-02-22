import React, { useEffect, useRef } from "react";
import { createPaylioEmbed } from "@paylio/embed-js";
import type { PaylioEmbedInstance } from "@paylio/embed-js";
import { usePaylioContext } from "./PaylioProvider";

export interface PricingGridProps {
  /** External user ID from your system */
  userId: string;

  /**
   * ISO 3166-1 alpha-2 country code for region-specific pricing.
   * Auto-detected from IP if not provided.
   */
  country?: string;
}

/**
 * Renders a Paylio pricing grid inside a managed container.
 * Must be used within a <PaylioProvider>.
 *
 * @example
 * ```tsx
 * <PaylioProvider publishableKey="pk_live_xxx">
 *   <PricingGrid userId="user_123" country="US" />
 * </PaylioProvider>
 * ```
 */
export function PricingGrid({ userId, country }: PricingGridProps): React.JSX.Element {
  const { publishableKey } = usePaylioContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<PaylioEmbedInstance | null>(null);

  useEffect(() => {
    // SSR guard
    /* istanbul ignore next -- @preserve */
    if (typeof window === "undefined") return;
    /* istanbul ignore next -- @preserve */
    if (!containerRef.current) return;

    // Destroy previous instance if exists (defensive; React cleanup normally handles this)
    /* istanbul ignore next -- @preserve */
    if (instanceRef.current) {
      instanceRef.current.destroy();
      instanceRef.current = null;
    }

    instanceRef.current = createPaylioEmbed({
      publishableKey,
      userId,
      country,
      container: containerRef.current,
    });

    return () => {
      /* istanbul ignore next -- @preserve */
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }
    };
  }, [publishableKey, userId, country]);

  return <div ref={containerRef} data-paylio-grid="" />;
}
