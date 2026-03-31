import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#0F1B27] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(242,242,242,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(242,242,242,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/dashboard"
      />
    </div>
  );
}
