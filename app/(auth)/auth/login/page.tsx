import { LoginForm } from "@/modules/Employees";
import RedirectIfAuthenticated from "@/components/RedirectIfAuthenticated";

export default function page() {
  return (
    <RedirectIfAuthenticated>
      <LoginForm />;
    </RedirectIfAuthenticated>
  );
}
