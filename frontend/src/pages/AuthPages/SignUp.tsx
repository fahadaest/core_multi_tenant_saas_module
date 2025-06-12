import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

interface SignUnProps {
  company?: string;
}

export default function SignUp({ company }: SignUnProps) {
  return (
    <>
      <AuthLayout company={company} >
        <SignUpForm company={company} />
      </AuthLayout>
    </>
  );
}
