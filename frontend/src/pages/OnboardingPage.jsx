import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import {
  Smartphone,
  MessageSquare,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Zap,
  ChevronRight,
  X,
  ChevronLeft,
} from "lucide-react";

const OnboardingPage = () => {
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(null);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const steps = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Register with your WhatsApp number",
      description:
        "Create your account using the phone number you'll use for WhatsApp",
      detailedContent: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Start by creating your account with the same phone number you use
            for WhatsApp. This ensures seamless integration between our platform
            and your messaging app.
          </p>
          <div className="bg-[#FFFBF5] p-4 rounded-lg border border-[#F7EFE5]">
            <h4 className="font-semibold text-[#7743DB] mb-2">
              What you'll need:
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Your active WhatsApp phone number</li>
              <li>• A valid email address</li>
              <li>• A secure password</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Join our WhatsApp sandbox",
      description:
        "Send 'join local-carry' to +1 415 523 8886 to connect your WhatsApp",
      detailedContent: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Connect your WhatsApp to our secure sandbox environment. This allows
            our AI to receive and process your expense messages.
          </p>
          <div className="bg-[#FFFBF5] p-4 rounded-lg border border-[#F7EFE5]">
            <h4 className="font-semibold text-[#7743DB] mb-2">
              Steps to connect:
            </h4>
            <ol className="text-sm text-gray-600 space-y-2">
              <li>1. Open WhatsApp on your phone</li>
              <li>
                2. Send a message to:{" "}
                <span className="font-mono bg-[#F7EFE5] px-2 py-1 rounded">
                  +1 415 523 8886
                </span>
              </li>
              <li>
                3. Type:{" "}
                <span className="font-mono bg-[#F7EFE5] px-2 py-1 rounded">
                  join local-carry
                </span>
              </li>
              <li>4. Wait for confirmation message</li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Start tracking expenses",
      description:
        "Send messages like 'Spent ₹25 on lunch' or 'Uber ride ₹15' via WhatsApp",
      detailedContent: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Once connected, simply send your expenses as natural language
            messages. Our AI will automatically parse and categorize them.
          </p>
          <div className="bg-[#FFFBF5] p-4 rounded-lg border border-[#F7EFE5]">
            <h4 className="font-semibold text-[#7743DB] mb-3">
              Example messages:
            </h4>
            <div className="space-y-2">
              {[
                "Spent ₹120 on groceries at Walmart",
                "Coffee ₹4.50",
                "Gas station ₹45",
                "Dinner with friends ₹85",
              ].map((msg, i) => (
                <div
                  key={i}
                  className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-[#F7EFE5]"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C3ACD0] flex items-center justify-center mr-3">
                    <MessageSquare className="w-4 h-4 text-[#7743DB]" />
                  </div>
                  <span className="text-sm text-gray-600">{msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "View your insights",
      description:
        "Check your dashboard for spending analytics and expense history",
      detailedContent: (
        <div className="space-y-4">
          <p className="text-gray-600">
            Access your personalized dashboard to view detailed analytics,
            spending patterns, and comprehensive expense history.
          </p>
          <div className="bg-[#FFFBF5] p-4 rounded-lg border border-[#F7EFE5]">
            <h4 className="font-semibold text-[#7743DB] mb-2">
              Dashboard features:
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Monthly spending overview</li>
              <li>• Category-wise expense breakdown</li>
              <li>• Spending trends and patterns</li>
              <li>• Export data to CSV/PDF</li>
              <li>• Set budget alerts and limits</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const openStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const closeStep = () => {
    setCurrentStep(null);
  };

  const nextStep = () => {
    if (currentStep !== null && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep !== null && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <div className="max-w-5xl mx-auto px-4 py-24 sm:px-6 lg:px-8 relative">
        {/* Decorative elements */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-[#C3ACD0] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-0 w-64 h-64 bg-[#7743DB] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-[#F7EFE5] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#7743DB] to-[#C3ACD0] rounded-2xl flex items-center justify-center shadow-lg transform transition-transform hover:scale-105 hover:rotate-3">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-6xl mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-[#7743DB]">
              AI-Powered
            </span>{" "}
            Daily Expense Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Track your expenses effortlessly using natural language via
            WhatsApp. <br></br>Our AI understands your spending and categorizes
            it automatically.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            {/* <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-[#7743DB] hover:from-[#6B3BC7] hover:to-[#B89BC4] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link> */}
            <button
              onClick={() => setCurrentStep(0)}
              className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-[#7743DB] hover:from-[#6B3BC7] hover:to-[#B89BC4] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>

            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 border border-[#C3ACD0] text-base font-medium rounded-xl text-[#7743DB] bg-[#FFFBF5] hover:bg-[#F7EFE5] transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-[#FFFBF5] rounded-xl p-6 shadow-md border border-[#F7EFE5] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
                onClick={() => openStep(index)}
              >
                <div className="relative mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#C3ACD0] to-[#F7EFE5] rounded-xl flex items-center justify-center text-[#7743DB] group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-[#7743DB] to-[#C3ACD0] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <div className="flex items-center text-[#7743DB] text-sm font-medium">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-[#C3ACD0]">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Integration */}
        <div className="bg-[#FFFBF5] rounded-2xl shadow-xl border border-[#F7EFE5] p-8 mb-24 transform transition-all hover:shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#F7EFE5] border border-[#7743DB] text-[#7743DB] text-sm font-medium mb-6">
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp Integration
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Send expenses via chat, we'll handle the rest
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Simply send your expenses via WhatsApp and our AI will
                automatically parse, categorize, and track them for you. No need
                to open the web app every time!
              </p>
              <div className="bg-gradient-to-r from-[#F7EFE5] to-[#FFFBF5] p-6 rounded-xl border border-[#C3ACD0]">
                <p className="text-sm font-medium text-gray-900 mb-3">
                  Example messages:
                </p>
                <ul className="text-sm text-gray-600 space-y-3">
                  {[
                    "Spent ₹120 on groceries at Walmart",
                    "Coffee ₹4.50",
                    "Gas station ₹45",
                    "Dinner with friends ₹85",
                  ].map((msg, i) => (
                    <li
                      key={i}
                      className="flex items-center bg-[#FFFBF5] p-3 rounded-lg shadow-sm border border-[#F7EFE5]"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#C3ACD0] flex items-center justify-center mr-3">
                        <MessageSquare className="w-4 h-4 text-[#7743DB]" />
                      </div>
                      {msg}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-72 h-72 bg-gradient-to-br from-green-400 to-green-100 rounded-3xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
                  <Smartphone className="w-32 h-32 text-white" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#C3ACD0] to-[#F7EFE5] rounded-2xl flex items-center justify-center shadow-lg border-4 border-[#FFFBF5]">
                  <MessageSquare className="w-12 h-12 text-[#7743DB]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: "AI-Powered",
              description:
                "Advanced AI understands natural language and automatically categorizes your expenses",
            },
            {
              icon: <MessageSquare className="w-6 h-6" />,
              title: "WhatsApp Ready",
              description:
                "Track expenses directly from WhatsApp without opening any additional apps",
            },
            {
              icon: <BarChart3 className="w-6 h-6" />,
              title: "Smart Analytics",
              description:
                "Get insights into your spending patterns with beautiful charts and reports",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-[#FFFBF5] rounded-xl p-8 shadow-md border border-[#F7EFE5] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-[#C3ACD0] rounded-xl flex items-center justify-center mb-6">
                <div className="text-[#7743DB]">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-[#7743DB] to-[#C3ACD0] rounded-2xl p-12 shadow-xl text-white">
          <h2 className="text-3xl font-bold mb-6">
            Ready to take control of your expenses?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Join thousands of users who are already tracking their expenses
            smarter.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-xl text-[#7743DB] bg-[#FFFBF5] hover:bg-[#F7EFE5] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Start Tracking Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Step Modal */}
        {currentStep !== null && (
          <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#FFFBF5] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#F7EFE5]">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#7743DB] to-[#C3ACD0] rounded-xl flex items-center justify-center text-white mr-4">
                      {steps[currentStep].icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#7743DB]">
                        Step {currentStep + 1} of {steps.length}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {steps[currentStep].title}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={closeStep}
                    className="w-8 h-8 rounded-full bg-[#F7EFE5] flex items-center justify-center text-gray-500 hover:bg-[#C3ACD0] hover:text-[#7743DB] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-8">{steps[currentStep].detailedContent}</div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-[#7743DB] bg-[#F7EFE5] rounded-lg hover:bg-[#C3ACD0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>

                  <div className="flex space-x-2">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ₹{
                          index === currentStep ? "bg-[#7743DB]" : "bg-[#C3ACD0]"
                        }`}
                      />
                    ))}
                  </div>

                  {currentStep < steps.length - 1 ? (
                    <button
                      onClick={nextStep}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#7743DB] to-[#C3ACD0] rounded-lg hover:from-[#6B3BC7] hover:to-[#B89BC4] transition-all"
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  ) : (
                    <Link
                      to="/register"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#7743DB] to-[#C3ACD0] rounded-lg hover:from-[#6B3BC7] hover:to-[#B89BC4] transition-all"
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
