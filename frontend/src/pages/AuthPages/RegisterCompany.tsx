import AuthLayout from "./AuthPageLayout";
import RegisterYourCompany from "../../components/auth/RegisterYourCompany";

export default function RegisterCompany({ page }: { page: string }) {
  return (
    <>
      <AuthLayout page={page}>
        <RegisterYourCompany />
      </AuthLayout>
    </>
  );
}
