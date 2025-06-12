import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

interface SignInProps {
  page: string;
  company?: string;
}

export default function SignIn({ page, company }: SignInProps) {
  console.log(company)
  return (
    <>
      <AuthLayout page={page} company={company} >
        <SignInForm company={company} />
      </AuthLayout>
    </>
  );
}