import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/ai-writer")({
  beforeLoad: () => {
    throw redirect({ to: "/admin/products" });
  },
});
