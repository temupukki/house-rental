"use client";

import { useState } from "react";
import {
  Home,
  Shield,
  Search,
  MessageSquare,
  Building,
  BadgeCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Sparkles,
  ArrowRight,
  UserPlus,
  Key,
  CheckCircle,
  Facebook,
  Github,
  Chrome as Google,
  Building2,
  MapPin,
  Star,
  TrendingUp,
  Award,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Properties",
      description: "Every listing is personally verified by our team",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Smart Filters",
      description: "Find exactly what you need with advanced search",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      title: "Secure Payments",
      description: "Safe and encrypted transaction system",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Direct Chat",
      description: "Communicate directly with property owners",
      color: "from-orange-500 to-amber-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Owner",
      content:
        "Found perfect tenants within days. The platform is incredibly efficient.",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Renter",
      content:
        "Found my dream apartment in the heart of the city. Highly recommended!",
      avatar: "MC",
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    });
  };

  const handleSocialLogin = (provider: string) => {
    alert(`Sign in with ${provider} would be implemented here`);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center animate-fade-in">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-400 to-blue-500 rounded-full blur-lg opacity-30"></div>
            <div className="relative w-full h-full bg-linear-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-white" strokeWidth={2} />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
          </div>

          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome Back!
          </h3>

          <p className="text-gray-600 mb-8 text-lg">
            You have successfully logged in. Redirecting to your dashboard...
          </p>

          <div className="space-y-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="group w-full bg-linear-to-r from-emerald-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-linear-to-r from-emerald-100 to-cyan-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-40 right-1/4 w-60 h-60 bg-linear-to-r from-amber-100 to-pink-100 rounded-full blur-3xl opacity-40"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2.5 bg-linear-to-br from-emerald-500 to-blue-500 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ValLiving
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Premium Living Spaces
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 hidden md:inline">
              New to ValLiving?
            </span>
            <a
              href="/signup"
              className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </a>
          </div>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/5">
              <div className="sticky top-8">
                <div className="mb-10">
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Find Your Perfect
                    <span className="block bg-linear-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                      Home Today
                    </span>
                  </h2>

                  <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                    Sign in to access your personalized dashboard, saved
                    properties, and continue your search for the perfect rental.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-12">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="group bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-5 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div
                        className={`inline-flex p-3 bg-linear-to-br ${feature.color} rounded-xl mb-3 group-hover:scale-110 transition-transform`}
                      >
                        <div className="text-white">{feature.icon}</div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1.5">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:w-3/5">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Sign In to Your Account
                      </h1>
                      <p className="text-gray-500">
                        Access your personalized dashboard and continue your
                        search
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </div>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: "" }));
                          }
                        }}
                        className={`w-full px-4 py-3.5 bg-white border ${
                          errors.email ? "border-red-300" : "border-gray-200"
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 placeholder:text-gray-400`}
                        placeholder="john@example.com"
                      />
                      {!errors.email && email && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="block text-sm font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Password
                        </div>
                      </label>
                      <a
                        href="/forgot-password"
                        className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        <div className="flex items-center gap-1">
                          <Key className="w-3 h-3" />
                          Forgot password?
                        </div>
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) {
                            setErrors((prev) => ({ ...prev, password: "" }));
                          }
                        }}
                        className={`w-full px-4 py-3.5 bg-white border ${
                          errors.password ? "border-red-300" : "border-gray-200"
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 placeholder:text-gray-400 pr-12`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center h-5">
                        <input
                          id="rememberMe"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500/20"
                        />
                      </div>
                      <label
                        htmlFor="rememberMe"
                        className="text-sm text-gray-600"
                      >
                        Remember me on this device
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full bg-linear-to-r from-emerald-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Sign In to Dashboard
                        <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin("google")}
                      className="group flex items-center justify-center gap-3 py-3.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    >
                      <Google className="w-5 h-5 text-red-500" />
                      <span className="font-medium text-gray-700">Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSocialLogin("github")}
                      className="group flex items-center justify-center gap-3 py-3.5 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    >
                      <Github className="w-5 h-5 text-gray-800" />
                      <span className="font-medium text-gray-700">GitHub</span>
                    </button>
                  </div>

                  <div className="text-center pt-4">
                    <p className="text-gray-600">
                      Don't have an account?{" "}
                      <a
                        href="/signup"
                        className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        Create one now
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
