import { describe, expect, it } from "vitest";

import { canTransitionLeadStatus, requireLeadTransition } from "@/lib/domain/lead-status";

describe("lead status transitions", () => {
  it("allows draft review promotion after contact path found", () => {
    expect(canTransitionLeadStatus("contact_path_found", "draft_ready")).toBe(true);
  });

  it("blocks direct autosend from draft_ready", () => {
    expect(canTransitionLeadStatus("draft_ready", "sent")).toBe(false);
  });

  it("throws on invalid review bypass", () => {
    expect(() => requireLeadTransition("draft_ready", "sent")).toThrow(
      "Lead transition not allowed: draft_ready -> sent"
    );
  });

  it("allows send after draft creation", () => {
    expect(() => requireLeadTransition("draft_created", "sent")).not.toThrow();
  });
});
