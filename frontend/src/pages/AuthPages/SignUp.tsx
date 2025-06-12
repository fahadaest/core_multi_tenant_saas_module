import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="Multi Tenant Saas Module"
        description="This is a Multi Tenant Saas Module"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
