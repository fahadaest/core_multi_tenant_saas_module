import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useRegisterUserMutation, useGoogleSignupMutation } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/userSlice";
import { useAppDispatch } from "../../redux/hooks";
interface SignInFormProps {
  company?: string;
}
declare global {
  interface Window {
    google: any;
  }
}

export default function SignUpForm({ company }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const [registerUser] = useRegisterUserMutation();
  const [googleSignup] = useGoogleSignupMutation();
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  console.log("Google Client ID:", import.meta.env.VITE_GOOGLE_CLIENT_ID);

  useEffect(() => {
    if (window.google && googleButtonRef.current) {
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
      const fullName = `${firstName} ${lastName}`;
      const response = await registerUser({
        name: fullName,
        email,
        password,
        domain: company || '',
      }).unwrap();

      alert('Registration successful!');
      navigate(`/${company?.toLowerCase()}/signin`);

    } catch (err) {
      console.error('Failed to register user:', err);
      alert('Registration failed, please try again.');
    }
  };
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
              <div ref={googleButtonRef} />
              <button className="whitespace-nowrap inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <svg width="20" height="20" enable-background="new 0 0 2499.6 2500" viewBox="0 0 2499.6 2500" xmlns="http://www.w3.org/2000/svg">
                  <path d="m1187.9 1187.9h-1187.9v-1187.9h1187.9z" fill="#f1511b" />
                  <path d="m2499.6 1187.9h-1188v-1187.9h1187.9v1187.9z" fill="#80cc28" />
                  <path d="m1187.9 2500h-1187.9v-1187.9h1187.9z" fill="#00adef" />
                  <path d="m2499.6 2500h-1188v-1187.9h1187.9v1187.9z" fill="#fbbc09" />
                </svg>
                Sign up with Microsoft
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
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <Label>
                      First Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Enter your first name"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <Label>
                      Last Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    Company Domain<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    value={company}
                    type="text"
                    id="domain"
                    name="domain"
                    placeholder="Enter your domain (e.g., example.com)"
                    readOnly
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
                  <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account? {""}
                <Link
                  to={`/${(company || "").toLowerCase().replace(/\/+$/, "")}/signin`}
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
