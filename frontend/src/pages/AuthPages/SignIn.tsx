import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn({ page }: { page: string }) {
  return (
    <>
      <AuthLayout page={page}>
        <SignInForm />
      </AuthLayout>
    </>
  );
}