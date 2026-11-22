import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";

// UI gate only — every admin write is also enforced by database policies.
export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async () => {
    const { data: isStaff, error } = await supabase.rpc("is_staff");
    if (!error && isStaff) return;

    const { data: adminExists } = await supabase.rpc("admin_exists");
    if (!adminExists) {
      throw redirect({ to: "/admin-setup" });
    }
    throw redirect({ to: "/" });
  },
  component: () => (
    <AdminShell>
      <Outlet />
    </AdminShell>
  ),
});
