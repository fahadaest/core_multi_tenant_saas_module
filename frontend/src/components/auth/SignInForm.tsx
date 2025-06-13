import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useLoginMutation, useGoogleSignupMutation } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { setUser, setLoading, setError } from "../../redux/slices/userSlice";
import { useNavigate } from 'react-router-dom';

interface SignInFormProps {
  company?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function SignInForm({ company }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [googleSignup] = useGoogleSignupMutation();
  const [login, { isLoading, error }] = useLoginMutation();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.google && googleButtonRef.current) {
      console.log('Google SDK loaded, initializing button');
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        { theme: "outline", size: "large" }
      );
    } else {
      console.log('Google SDK or button ref not ready yet');
    }
  }, []);

  const handleGoogleResponse = async (response: any) => {
    try {
      const tokenId = response.credential;
      const result = await googleSignup({ tokenId, domain: company || '' }).unwrap();

      const userWithIdFix = {
        ...result.user,
        _id: result.user.id,
      };

      dispatch(setUser(userWithIdFix));
      navigate(`/${company?.toLowerCase()}/`);
    } catch (error) {
      console.error('Google signup failed:', error);
      alert('Google signup failed, please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setUser(result.user));
      if (company) {
        navigate(`/${company.toLowerCase()}/`);
      } else {
        navigate('/');
      }
      console.log("Login success:", result);
    } catch (err: any) {
      dispatch(setError(err?.data?.message || 'Login failed'));
      console.error("Login failed:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              {company ? "Sign In" : "Sign In as Super Admin"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          {company && (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
                <div ref={googleButtonRef} />
                <button className="whitespace-nowrap inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                  <svg width="20" height="20" enableBackground="new 0 0 2499.6 2500" viewBox="0 0 2499.6 2500" xmlns="http://www.w3.org/2000/svg">
                    <path d="m1187.9 1187.9h-1187.9v-1187.9h1187.9z" fill="#f1511b" />
                    <path d="m2499.6 1187.9h-1188v-1187.9h1187.9v1187.9z" fill="#80cc28" />
                    <path d="m1187.9 2500h-1187.9v-1187.9h1187.9z" fill="#00adef" />
                    <path d="m2499.6 2500h-1188v-1187.9h1187.9v1187.9z" fill="#fbbc09" />
                  </svg>
                  Sign in with Microsoft
                </button>
              </div>
              <div className="relative py-3 sm:py-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                    Or
                  </span>
                </div>
              </div>
            </>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>{" "}
                </Label>
                <Input
                  placeholder="info@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
              <div>
                <Label>
                  Password <span className="text-error-500">*</span>{" "}
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                    Keep me logged in
                  </span>
                </div>
                <Link
                  to="/reset-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Forgot password?
                </Link>
              </div>
              <div>
                <Button className="w-full" size="sm" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
              {error && (
                <p className="text-red-600 mt-2">
                  {(error as any).data?.message || "Login failed"}
                </p>
              )}
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Don't have an account? {""}
              <Link
                to={`/${(company || "").toLowerCase().replace(/\/+$/, "")}/signup`}
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}