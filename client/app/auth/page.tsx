"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AlertCircleIcon,
  ArrowRight01Icon,
  Loading03Icon,
  LockIcon,
  Mail01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent } from "react";
import { useAuth } from "../context/auth-context";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const formVariants: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const AuthPage = () => {
  const { user, login, signUp } = useAuth();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [state, setState] = useState<"login" | "register">("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (state === "login") {
        await login({ email: formData.email, password: formData.password });
      } else {
        await signUp(formData);
      }
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };
  const googleLogin = () => {
    const isDev = process.env.NODE_ENV === "development";
    const baseUrl = isDev
      ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      : "";
    window.location.href = `${baseUrl}/api/v1/googleOAuth/login`;
  };

  // Handle initial redirect for already-logged-in users
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? "visible" : "hidden"}
        animate="visible"
        className="w-full max-w-md z-10"
      >
        <Card className="border shadow-2xl bg-card/50 backdrop-blur-xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl font-bold tracking-tight">
              {state === "login" ? "Welcome back" : "Create an account"}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base">
              {state === "login"
                ? "Please enter your details to sign in"
                : "Sign up to start generating awesome thumbnails"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Google Login Button */}
            <Button
              variant="outline"
              type="button"
              onClick={googleLogin}
              className="w-full h-11 transition-all hover:bg-secondary/80 flex items-center justify-center gap-3 border-input/50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue using Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground font-medium backdrop-blur-none">
                  Or continue with email
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, height: 0, y: -10 }
                  }
                  animate={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, height: "auto", y: 0 }
                  }
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, height: 0, y: -10 }
                  }
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-3 text-destructive text-sm"
                >
                  <HugeiconsIcon
                    icon={AlertCircleIcon}
                    className="w-5 h-5 shrink-0"
                  />
                  <p className="font-medium tracking-tight">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={state}
                  variants={formVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {state === "register" && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>{" "}
                      <div className="relative group">
                        <HugeiconsIcon
                          icon={UserIcon}
                          className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-blue-500"
                        />
                        <Input
                          id="name"
                          name="name"
                          placeholder="John Doe"
                          className={cn(
                            "pl-10 h-11 bg-background/50 transition-all",
                            !shouldReduceMotion && "focus:scale-[1.01]",
                          )}
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative group">
                      <HugeiconsIcon
                        icon={Mail01Icon}
                        className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-blue-500"
                      />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        className={cn(
                          "pl-10 h-11 bg-background/50 transition-all",
                          !shouldReduceMotion && "focus:scale-[1.01]",
                        )}
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative group">
                      <HugeiconsIcon
                        icon={LockIcon}
                        className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-blue-500"
                      />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className={cn(
                          "pl-10 h-11 bg-background/50 transition-all",
                          !shouldReduceMotion && "focus:scale-[1.01]",
                        )}
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <Button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full h-11 text-base font-semibold transition-all bg-blue-600 hover:bg-blue-700 text-white gap-2",
                  !shouldReduceMotion && "hover:scale-[1.01] active:scale-95",
                )}
              >
                {isLoading ? (
                  <>
                    <HugeiconsIcon
                      icon={Loading03Icon}
                      className="h-5 w-5 animate-spin"
                    />
                    {state === "login"
                      ? "Signing In..."
                      : "Creating Account..."}
                  </>
                ) : (
                  <>
                    {state === "login" ? "Sign In" : "Create Account"}
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      className="h-4 w-4"
                    />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() =>
                  setState((prev) => (prev === "login" ? "register" : "login"))
                }
                className="text-muted-foreground hover:text-blue-500 transition-colors"
              >
                {state === "login"
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <span className="font-semibold text-blue-600 dark:text-blue-500 hover:underline underline-offset-4">
                  {state === "login" ? "Sign up" : "Log in"}
                </span>
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage;
