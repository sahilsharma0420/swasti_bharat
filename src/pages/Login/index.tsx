import { FormCheck, FormInput, FormLabel } from "@/components/Base/Form";
import Tippy from "@/components/Base/Tippy";
import users from "@/fakers/users";
import Button from "@/components/Base/Button";
import Alert from "@/components/Base/Alert";
import Lucide from "@/components/Base/Lucide";
import clsx from "clsx";
import _ from "lodash";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "@/stores/authSlice";
import { AppDispatch, RootState } from "@/stores/store";
function Main() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [success, setSuccess] = useState("");

  const { isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  // Check for remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("remember_email");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
    }
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to intended page or dashboard
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }
    
    try {
      setSuccess("");

      // Get remember me checkbox value
      const rememberCheckbox = document.getElementById("remember") as HTMLInputElement;
      if (rememberCheckbox && rememberCheckbox.checked) {
        localStorage.setItem("remember_email", email);
      } else {
        localStorage.removeItem("remember_email");
      }
      setSuccess("Login successful! Redirecting...");

      // Dispatch login action
      await dispatch(login({ email, password })).unwrap();
      // Navigation is handled by the useEffect
    } catch (err) {
      // Error is handled in the slice
      console.error("Login failed", err);
    }
  };

  return (
    <>
      <div className="container grid lg:h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] py-10 px-5 sm:py-14 sm:px-10 md:px-36 lg:py-0 lg:pl-14 lg:pr-12 xl:px-24">
        <div
          className={clsx([
            "relative z-50 h-full col-span-12 p-7 sm:p-14 bg-white rounded-2xl lg:bg-transparent lg:pr-10 lg:col-span-5 xl:pr-24 2xl:col-span-4 lg:p-0 dark:bg-darkmode-600",
            "before:content-[''] before:absolute before:inset-0 before:-mb-3.5 before:bg-white/40 before:rounded-2xl before:mx-5 dark:before:hidden",
          ])}
        >
          <div className="relative z-10 flex flex-col justify-center w-full h-full py-2 lg:py-32">
            <div className="rounded-[0.8rem] w-[55px] h-[55px] border border-primary/30 flex items-center justify-center">
              <div className="relative flex items-center justify-center w-[50px] rounded-[0.6rem] h-[50px] bg-gradient-to-b from-theme-1/90 to-theme-2/90 bg-white">
                <div className="w-[26px] h-[26px] relative -rotate-45 [&_div]:bg-white">
                  <div className="absolute w-[20%] left-0 inset-y-0 my-auto rounded-full opacity-50 h-[75%]"></div>
                  <div className="absolute w-[20%] inset-0 m-auto h-[120%] rounded-full"></div>
                  <div className="absolute w-[20%] right-0 inset-y-0 my-auto rounded-full opacity-50 h-[75%]"></div>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <div className="text-2xl font-medium">Sign In</div>
              <div className="mt-2.5 text-slate-600 dark:text-slate-400">
                Don't have an account?{" "}
                <a className="font-medium text-primary" href="">
                  Sign Up
                </a>
              </div>
              
              {/* Success Alert */}
              {success && (
                <Alert
                  variant="success"
                  className="flex items-center px-4 py-3 my-7 bg-success/20 border-success/20 text-success rounded-[0.6rem] leading-[1.7]"
                >
                  {({ dismiss }) => (
                    <>
                      <div className="">
                        <Lucide
                          icon="CheckCircle"
                          className="stroke-[0.8] w-7 h-7 mr-2"
                        />
                      </div>
                      <div className="ml-1 mr-8">{success}</div>
                      <Alert.DismissButton
                        type="button"
                        className="btn-close text-success"
                        onClick={dismiss}
                        aria-label="Close"
                      >
                        <Lucide icon="X" className="w-5 h-5" />
                      </Alert.DismissButton>
                    </>
                  )}
                </Alert>
              )}
              
              {/* Error Alert */}
              {error && (
                <Alert
                  variant="danger"
                  className="flex items-center px-4 py-3 my-7 bg-danger/20 border-danger/20 text-danger rounded-[0.6rem] leading-[1.7]"
                >
                  {({ dismiss }) => (
                    <>
                      <div className="">
                        <Lucide
                          icon="AlertCircle"
                          className="stroke-[0.8] w-7 h-7 mr-2"
                        />
                      </div>
                      <div className="ml-1 mr-8">{error}</div>
                      <Alert.DismissButton
                        type="button"
                        className="btn-close text-danger"
                        onClick={dismiss}
                        aria-label="Close"
                      >
                        <Lucide icon="X" className="w-5 h-5" />
                      </Alert.DismissButton>
                    </>
                  )}
                </Alert>
              )}
              
              {/* Default Welcome Alert */}
              {!error && !success && (
                <Alert
                  variant="outline-primary"
                  className="flex items-center px-4 py-3 my-7 bg-primary/5 border-primary/20 rounded-[0.6rem] leading-[1.7]"
                >
                  {({ dismiss }) => (
                    <>
                      <div className="">
                        <Lucide
                          icon="Lightbulb"
                          className="stroke-[0.8] w-7 h-7 mr-2 fill-primary/10"
                        />
                      </div>
                      <div className="ml-1 mr-8">
                        Welcome to <span className="font-medium">Tailwise</span>{" "}
                        demo! Simply click{" "}
                        <span className="font-medium">Sign In</span> to explore
                        and access our documentation.
                      </div>
                      <Alert.DismissButton
                        type="button"
                        className="btn-close text-primary"
                        onClick={dismiss}
                        aria-label="Close"
                      >
                        <Lucide icon="X" className="w-5 h-5" />
                      </Alert.DismissButton>
                    </>
                  )}
                </Alert>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mt-6">
                  <FormLabel htmlFor="email">Email*</FormLabel>
                  <FormInput
                    id="email"
                    name="email"
                    type="email"
                    className="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80"
                    placeholder="example@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <FormLabel className="mt-4" htmlFor="password">Password*</FormLabel>
                  <FormInput
                    id="password"
                    name="password"
                    type="password"
                    className="block px-4 py-3.5 rounded-[0.6rem] border-slate-300/80"
                    placeholder="************"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                     <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
                  <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 text-blue-600" />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
                  <div className="mt-5 text-center xl:mt-8 xl:text-left">
                    <Button
                      variant="primary"
                      rounded
                      type="submit"
                      className="bg-gradient-to-r from-theme-1/70 to-theme-2/70 w-full py-3.5 xl:mr-3 dark:border-darkmode-400"
                      disabled={loading}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      rounded
                      className="bg-white/70 w-full py-3.5 mt-3 dark:bg-darkmode-400"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/signup");
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Rest of your component remains the same */}
      <div className="fixed container grid w-screen inset-0 h-screen grid-cols-12 lg:max-w-[1550px] 2xl:max-w-[1750px] pl-14 pr-12 xl:px-24">
        {/* This section remains unchanged */}
        <div
          className={clsx([
            "relative h-screen col-span-12 lg:col-span-5 2xl:col-span-4 z-20",
            "after:bg-white after:hidden after:lg:block after:content-[''] after:absolute after:right-0 after:inset-y-0 after:bg-gradient-to-b after:from-white after:to-slate-100/80 after:w-[800%] after:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0] dark:after:bg-darkmode-600 dark:after:from-darkmode-600 dark:after:to-darkmode-600",
            "before:content-[''] before:hidden before:lg:block before:absolute before:right-0 before:inset-y-0 before:my-6 before:bg-gradient-to-b before:from-white/10 before:to-slate-50/10 before:bg-white/50 before:w-[800%] before:-mr-4 before:rounded-[0_1.2rem_1.2rem_0/0_1.7rem_1.7rem_0] dark:before:from-darkmode-300 dark:before:to-darkmode-300",
          ])}
        ></div>
        <div
          className={clsx([
            "h-full col-span-7 2xl:col-span-8 lg:relative",
            "before:content-[''] before:absolute before:lg:-ml-10 before:left-0 before:inset-y-0 before:bg-gradient-to-b before:from-theme-1 before:to-theme-2 before:w-screen before:lg:w-[800%]",
            "after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-screen after:lg:w-[800%] after:bg-texture-white after:bg-fixed after:bg-center after:lg:bg-[25rem_-25rem] after:bg-no-repeat",
          ])}
        >
          {/* Content remains unchanged */}
          <div className="sticky top-0 z-10 flex-col justify-center hidden h-screen ml-16 lg:flex xl:ml-28 2xl:ml-36">
            <div className="leading-[1.4] text-[2.6rem] xl:text-5xl font-medium xl:leading-[1.2] text-white">
              Embrace Excellence <br /> in Dashboard Development
            </div>
            <div className="mt-5 text-base leading-relaxed xl:text-lg text-white/70">
              Unlock the potential of Tailwise, where developers craft
              meticulously structured, visually stunning dashboards with
              feature-rich modules. Join us today to shape the future of your
              application development.
            </div>
            <div className="flex flex-col gap-3 mt-10 xl:items-center xl:flex-row">
              {/* Content remains unchanged */}
              <div className="flex items-center">
                <div className="w-9 h-9 2xl:w-11 2xl:h-11 image-fit zoom-in">
                  <Tippy
                    as="img"
                    alt="Tailwise - Admin Dashboard Template"
                    className="rounded-full border-[3px] border-white/50"
                    src={users.fakeUsers()[0].photo}
                    content={users.fakeUsers()[0].name}
                  />
                </div>
                {/* Other profile images remain unchanged */}
              </div>
              <div className="text-base xl:ml-2 2xl:ml-3 text-white/70">
                Over 7k+ strong and growing! Your journey begins here.
              </div>
            </div>
          </div>
        </div>
      </div>
      <ThemeSwitcher />
    </>
  );
}

export default Main;