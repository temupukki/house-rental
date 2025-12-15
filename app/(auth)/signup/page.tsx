"use client";
import { useState } from "react";
import {
  Home,
  Shield,
  Search,
  MessageSquare,
  Eye,
  EyeOff,
  Check,
  Building,
  Star,
  Mail,
  User,
  Phone,
  Lock,
  ArrowRight,
  Sparkles,
  BadgeCheck,
  Award,
  TrendingUp,
  Building2,
  MapPin,
  Heart,
  Calendar,
  Key,
  CheckCircle,
  Link,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";


export default function ProfessionalSignUpPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
const route = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    newsletter: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


  const premiumFeatures = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Verified Listings",
      description: "Every property is personally verified by our team",
    },
    {
      icon: <Building className="w-5 h-5" />,
      title: "Premium Properties",
      description: "Exclusive access to luxury rentals and apartments",
    },
    {
      icon: <BadgeCheck className="w-5 h-5" />,
      title: "Trust & Safety",
      description: "Secure transactions and verified landlords",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Direct Communication",
      description: "Chat directly with property owners in real-time",
    },
  ];

  const stats = [
    { value: "25,000+", label: "Active Listings" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "50+", label: "Cities Covered" },
    { value: "24/7", label: "Support Available" },
  ];

  const calculatePasswordStrength = (password: string) => {
    if (password.length === 0)
      return {
        level: 0,
        color: "from-gray-300 to-gray-300",
        text: "",
        width: "0%",
      };
    if (password.length < 6)
      return {
        level: 1,
        color: "from-red-400 to-red-500",
        text: "Weak",
        width: "25%",
      };
    if (password.length < 8)
      return {
        level: 2,
        color: "from-yellow-400 to-yellow-500",
        text: "Fair",
        width: "50%",
      };

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    const strength = [hasUpper, hasLower, hasNumber, hasSpecial].filter(
      Boolean
    ).length;

    if (strength < 2)
      return {
        level: 2,
        color: "from-yellow-400 to-yellow-500",
        text: "Fair",
        width: "50%",
      };
    if (strength < 4)
      return {
        level: 3,
        color: "from-blue-400 to-blue-500",
        text: "Good",
        width: "75%",
      };
    return {
      level: 4,
      color: "from-emerald-400 to-emerald-500",
      text: "Strong",
      width: "100%",
    };
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^[\+]?[0-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ""))
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    const { data, error } = await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.fullName,
        image: undefined,
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
         const toastID= toast.loading("Creating Account...");
         toast.dismiss(toastID);
        },
        onSuccess: async (ctx) => {
        toast.success("You have registered successfully")
          await sleep(300);
          route.push("/login")

        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

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
            Welcome to ValLiving!
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            Your account has been created successfully. Start exploring premium
            properties now.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="group w-full bg-linear-to-r from-emerald-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                Go to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <p className="text-gray-500 text-sm mt-6">
              We've sent a verification email to{" "}
              <span className="font-semibold text-gray-700">
                {formData.email}
              </span>
            </p>
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
          <div className="flex items-center gap-3 group">
            <div className="p-2.5 bg-linear-to-br from-emerald-500 to-blue-500 rounded-xl shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ValLiving</h1>
              <p className="text-xs text-gray-500 font-medium">
                Premium Living Spaces
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm hidden md:block">
              Already a member?
            </span>
            <a
              href="/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors px-4 py-2 rounded-lg hover:bg-emerald-50"
            >
              Sign In
            </a>
          </div>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="lg:w-2/5">
              <div className="sticky top-8 space-y-8">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Find Your Perfect
                    <span className="block bg-linear-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                      Luxury Home
                    </span>
                  </h2>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    Join the leading platform for premium rental properties.
                    Experience seamless browsing, verified listings, and
                    exclusive access to luxury homes.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {premiumFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-emerald-200 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="inline-flex p-3 bg-linear-to-br from-emerald-50 to-blue-50 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                        <div className="text-emerald-600">{feature.icon}</div>
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
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
                <div className="mb-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Create Account
                      </h1>
                      <p className="text-gray-500">
                        Join our premium community of homeowners and renters
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name
                        </div>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3.5 bg-white border ${
                            errors.fullName
                              ? "border-red-300"
                              : "border-gray-200"
                          } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 placeholder:text-gray-400`}
                          placeholder="John Smith"
                        />
                        {!errors.fullName && formData.fullName && (
                          <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
                        )}
                      </div>
                      {errors.fullName && (
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
                          {errors.fullName}
                        </p>
                      )}
                    </div>

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
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3.5 bg-white border ${
                            errors.email ? "border-red-300" : "border-gray-200"
                          } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 placeholder:text-gray-400`}
                          placeholder="john@example.com"
                        />
                        {!errors.email && formData.email && (
                          <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </div>
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3.5 bg-white border ${
                            errors.phone ? "border-red-300" : "border-gray-200"
                          } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 placeholder:text-gray-400`}
                          placeholder="09********"
                        />
                        {!errors.phone && formData.phone && (
                          <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-500" />
                        )}
                      </div>
                      {errors.phone && (
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
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Password
                        </div>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full px-4 py-3.5 bg-white border ${
                            errors.password
                              ? "border-red-300"
                              : "border-gray-200"
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

                      {formData.password && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-medium text-gray-500">
                              Password strength
                            </span>
                            <span className="text-xs font-semibold">
                              {passwordStrength.text}
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-linear-to-r ${passwordStrength.color} transition-all duration-500`}
                              style={{ width: passwordStrength.width }}
                            />
                          </div>
                        </div>
                      )}

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
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 bg-white border ${
                          errors.confirmPassword
                            ? "border-red-300"
                            : "border-gray-200"
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 placeholder:text-gray-400 pr-12`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
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
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center h-5 mt-0.5">
                        <input
                          id="agreeToTerms"
                          name="agreeToTerms"
                          type="checkbox"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500/20"
                        />
                      </div>
                      <label
                        htmlFor="agreeToTerms"
                        className="text-sm text-gray-600"
                      >
                        I agree to the{" "}
                        <a
                          href="#"
                          className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                        >
                          Privacy Policy
                        </a>
                        {errors.agreeToTerms && (
                          <p className="mt-1 text-red-500 flex items-center gap-1">
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
                            {errors.agreeToTerms}
                          </p>
                        )}
                      </label>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex items-center h-5 mt-0.5">
                        <input
                          id="newsletter"
                          name="newsletter"
                          type="checkbox"
                          checked={formData.newsletter}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-500/20"
                        />
                      </div>
                      <label
                        htmlFor="newsletter"
                        className="text-sm text-gray-600"
                      >
                        Send me updates about new premium properties, exclusive
                        offers, and market insights
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
                        Creating Your Account...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Create Premium Account
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                  <div className="text-center">
                    <p className="text-gray-600">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        Sign in here
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
