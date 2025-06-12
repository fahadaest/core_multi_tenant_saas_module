import React from "react";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";

type AuthLayoutProps = {
  children: React.ReactNode;
  page?: string;
  company?: string;
};

export default function AuthLayout({ children, page, company }: AuthLayoutProps) {
  const navigate = useNavigate();
  const isRegisterCompany = page === "registerCompany";
  const isSignInWithAdmin = page === "signInWithAdmin";

  console.log(company)

  const handleRegisterClick = () => {
    navigate("/registerYourCompany");
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const RightPanel = (
    <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
      <div className="relative flex items-center justify-center z-1">
        <div className="flex flex-col items-center max-w-xs text-white dark:text-white">
          {company ? (
            <p className="text-xl font-semibold">Hello from {company}</p>
          ) : (
            <>
              {isSignInWithAdmin && (
                <Button className="w-full" size="sm" onClick={handleRegisterClick}>
                  Register Your Company?
                </Button>
              )}
              {isRegisterCompany && (
                <Button className="w-full" size="sm" onClick={handleSignInClick}>
                  Sign in as Admin
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {isRegisterCompany ? (
          <>
            {RightPanel}
            {children}
          </>
        ) : (
          <>
            {children}
            {RightPanel}
          </>
        )}
      </div>
    </div>
  );
}