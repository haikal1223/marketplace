import { NextRequest, NextResponse } from "next/server";
import { auth } from "lib/auth";

type Role = "CUSTOMER" | "VENDOR" | "ADMIN";

/**
 * Get current session user from a Route Handler.
 * Returns null if not authenticated.
 */
export async function getSessionUser() {
  const session = await auth();
  if (!session?.user) return null;
  return session.user as { id: string; email: string; name: string; role: Role };
}

/**
 * Guard: require authentication.
 * Returns 401 response if not logged in.
 */
export async function requireAuth() {
  const user = await getSessionUser();
  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    };
  }
  return { user, response: null };
}

/**
 * Guard: require specific role(s).
 * Returns 401 if not logged in, 403 if wrong role.
 */
export async function requireRole(...roles: Role[]) {
  const { user, response } = await requireAuth();
  if (response) return { user: null, response };

  if (!roles.includes(user!.role)) {
    return {
      user: null,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 })
    };
  }
  return { user, response: null };
}
