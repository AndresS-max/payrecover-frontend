import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function ConfiguracionPage() {
  return (
    <div className="flex justify-center items-center w-full mt-8">
      <UserProfile
        appearance={{ baseTheme: dark }}
        routing="hash"
      />
    </div>
  );
}