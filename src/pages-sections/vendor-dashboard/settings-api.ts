"use client";

export async function fetchSiteSettings() {
  const res = await fetch("/api/vendor/site-settings");
  if (!res.ok) throw new Error("Failed to fetch site settings");
  return res.json();
}

export async function saveSiteSettings(section: string, data: unknown) {
  const res = await fetch("/api/vendor/site-settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section, data })
  });
  if (!res.ok) throw new Error("Failed to save site settings");
  return res.json();
}

export async function fetchPayoutSettings() {
  const res = await fetch("/api/vendor/payout-settings");
  if (!res.ok) throw new Error("Failed to fetch payout settings");
  return res.json();
}

export async function savePayoutSettings(section: string, data: unknown) {
  const res = await fetch("/api/vendor/payout-settings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ section, data })
  });
  if (!res.ok) throw new Error("Failed to save payout settings");
  return res.json();
}
