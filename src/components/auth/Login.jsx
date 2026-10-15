import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import BaseLogo from '../common/BaseLogo';

export default function Login({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState('example@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F5F9] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Form Column matching Screenshot 19 */}
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-6">
            {/* Logo */}
            <div className="flex justify-center mb-2">
              <BaseLogo size="lg" showText={false} />
            </div>

            <h2 className="text-2xl font-extrabold text-center text-[#1E1B3A]">
              Log in
            </h2>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F8F9FD] hover:bg-gray-100 rounded-xl text-xs font-semibold text-[#1E1B3A] border border-gray-200/80 transition-colors"
              >
                <span className="font-bold text-red-500">G</span>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#F8F9FD] hover:bg-gray-100 rounded-xl text-xs font-semibold text-[#1E1B3A] border border-gray-200/80 transition-colors"
              >
                <span className="font-bold text-blue-600">f</span>
                <span>Facebook</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full" />
              <span className="bg-white px-3 text-xs text-[#8E8EA1] uppercase">Or</span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#5B52F9] accent-[#5B52F9]"
                  />
                  <span className="text-[#8E8EA1] font-medium">Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => onNavigate('recover')}
                  className="text-[#5B52F9] font-semibold hover:underline"
                >
                  Reset Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#5B52F9] hover:bg-[#4a42db] text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 transition-all active:scale-98"
              >
                Log in
              </button>
            </form>

            <p className="text-xs text-center text-[#8E8EA1]">
              Don't have account yet?{' '}
              <button
                onClick={() => onNavigate('signup')}
                className="text-[#5B52F9] font-bold hover:underline"
              >
                New Account
              </button>
            </p>
          </div>
        </div>

        {/* Right Illustration Column matching Screenshot 19 */}
        <div className="hidden lg:flex bg-[#F8F9FD] items-center justify-center p-12 border-l border-gray-100">
          <div className="text-center max-w-sm space-y-6">
            <svg viewBox="0 0 400 350" className="w-full h-auto drop-shadow-sm">
              {/* Clock on wall */}
              <circle cx="200" cy="80" r="30" fill="none" stroke="#FF5722" strokeWidth="6" />
              <line x1="200" y1="80" x2="200" y2="65" stroke="#1E1B3A" strokeWidth="3" strokeLinecap="round" />
              <line x1="200" y1="80" x2="215" y2="80" stroke="#1E1B3A" strokeWidth="3" strokeLinecap="round" />

              {/* Desk */}
              <rect x="70" y="210" width="260" height="8" rx="4" fill="#FF7A50" />
              <line x1="100" y1="218" x2="100" y2="300" stroke="#FF7A50" strokeWidth="6" />
              <line x1="300" y1="218" x2="300" y2="300" stroke="#FF7A50" strokeWidth="6" />

              {/* PC Tower */}
              <rect x="75" y="235" width="45" height="65" rx="4" fill="#00BCD4" />
              <circle cx="85" cy="245" r="2" fill="white" />
              <circle cx="85" cy="255" r="2" fill="white" />

              {/* Monitor */}
              <rect x="150" y="165" width="60" height="42" rx="4" fill="#00E5FF" />
              <rect x="175" y="207" width="10" height="7" fill="#1E1B3A" />

              {/* Character */}
              {/* Chair */}
              <path d="M220 200 Q260 200 270 230 L260 275 L220 275 Z" fill="#FFEB3B" opacity="0.6" />
              {/* Head */}
              <circle cx="240" cy="140" r="18" fill="#FBC02D" />
              {/* Hair */}
              <path d="M225 135 C230 120, 255 120, 258 135 Z" fill="#1E1B3A" />
              {/* Torso */}
              <rect x="225" y="160" width="30" height="40" rx="8" fill="#5B52F9" />
              {/* Legs */}
              <line x1="230" y1="200" x2="200" y2="260" stroke="#1E1B3A" strokeWidth="12" strokeLinecap="round" />
              <line x1="245" y1="200" x2="225" y2="260" stroke="#1E1B3A" strokeWidth="12" strokeLinecap="round" />
              {/* Shoes */}
              <rect x="180" y="260" width="30" height="12" rx="6" fill="#E91E63" />
              <rect x="210" y="260" width="30" height="12" rx="6" fill="#E91E63" />

              {/* Plant */}
              <path d="M330 250 L345 285 L315 285 Z" fill="#FDD835" />
              <path d="M330 250 C320 220, 310 230, 315 210 C325 215, 330 235, 330 250" fill="#4CAF50" />
              <path d="M330 250 C340 220, 350 230, 345 210 C335 215, 330 235, 330 250" fill="#388E3C" />
            </svg>
            <p className="text-xs font-semibold text-[#8E8EA1]">
              Manage your SaaS products, clients and invoices in one intuitive dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
