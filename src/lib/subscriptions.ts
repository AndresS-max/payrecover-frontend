import { supabase } from "./supabase";

export async function getUserPlan(clerkUserId: string) {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("status, stripe_price_id")
      .eq("clerk_user_id", clerkUserId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No row found: user has no active subscription (Basic plan)
        return { isPro: false, status: null };
      }
      console.error("Error fetching user plan:", error);
      return { isPro: false, status: "error" };
    }

    // Check if the plan is active and matches the Pro Price ID
    // We use the environment variable for security and flexibility
    const isPro = 
      data.status === "active" && 
      data.stripe_price_id === process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID;

    return { isPro, status: data.status };
  } catch (err) {
    console.error("Unexpected error in getUserPlan:", err);
    return { isPro: false, status: "error" };
  }
}
