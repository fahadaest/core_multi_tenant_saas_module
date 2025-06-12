import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useRegisterTenantMutation } from "../../redux/slices/authSlice";

export default function RegisterYourCompany() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [industry, setIndustry] = useState("");
  const [registerTenant] = useRegisterTenantMutation();

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-10">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Register Your Company
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Please fill in the form to register!
            </p>
          </div>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (password !== confirmPassword) return;

                await registerTenant({
                  companyName,
                  companyEmail,
                  domain,
                  industry,
                  password,
                });
              }}
            >
              <div className="space-y-5">
                <div >
                  <Label>
                    Company Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Enter your Company Name"
                  />
                </div>
                <div>
                  <Label>
                    Company Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your company email"
                  />
                </div>
                <div>
                  <Label>
                    Company Domain<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    id="email"
                    name="email"
                    placeholder="Enter company domain"
                  />
                </div>
                <div >
                  <Label>
                    Industry<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Enter Industry"
                  />
                </div>
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                <div>
                  <Label>
                    Confirm Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Confirm your password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                  {confirmPassword && confirmPassword !== password && (
                    <p className="mt-1 text-sm text-error-500">Passwords do not match</p>
                  )}
                </div>

                <div>
                  <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
