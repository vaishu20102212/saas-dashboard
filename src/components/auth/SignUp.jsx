import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import BaseLogo from '../common/BaseLogo';

export default function SignUp({ onNavigate, onSignUpSuccess }) {
  const [fullName, setFullName] = useState('Jiangyu');
  const [email, setEmail] = useState('example@gmail.com');
  const [username, setUsername] = useState('johnkevine4362');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignUpSuccess) {
      onSignUpSuccess();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F5F9] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Form Column matching Screenshot 18 */}
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full space-y-5">
            {/* Logo */}
            <div className="flex justify-center mb-1">
              <BaseLogo size="lg" showText={false} />
            </div>

            <h2 className="text-2xl font-extrabold text-center text-[#1E1B3A]">
              Sign Up
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
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox matching screenshot 18 */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer select-none text-[11px] text-[#8E8EA1] leading-tight">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-[#5B52F9] accent-[#5B52F9] mt-0.5"
                    required
                  />
                  <span>
                    By creating an account you agree to the{' '}
                    <span className="text-[#5B52F9] underline">terms of use</span> and our{' '}
                    <span className="text-[#5B52F9] underline">privacy policy</span>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#5B52F9] hover:bg-[#4a42db] text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 transition-all active:scale-98 mt-2"
              >
                Create account
              </button>
            </form>

            <p className="text-xs text-center text-[#8E8EA1]">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="text-[#5B52F9] font-bold hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>

        {/* Right Illustration Column matching Screenshot 18 */}
        <div className="hidden lg:flex bg-[#F8F9FD] items-center justify-center p-12 border-l border-gray-100">
          <div className="text-center max-w-sm space-y-6">
            <svg viewBox="0 0 400 350" className="w-full h-auto drop-shadow-sm">
              {/* Lamp & Nightstand */}
              <rect x="40" y="170" width="60" height="90" rx="4" fill="#FFA000" />
              <rect x="45" y="180" width="50" height="20" rx="2" fill="#FFB300" />
              <rect x="45" y="205" width="50" height="20" rx="2" fill="#FFB300" />
              <rect x="45" y="230" width="50" height="20" rx="2" fill="#FFB300" />
              {/* Lamp */}
              <line x1="70" y1="170" x2="70" y2="140" stroke="#1E1B3A" strokeWidth="3" />
              <path d="M55 140 L85 140 L95 160 L45 160 Z" fill="#2196F3" />

              {/* Working Desk */}
              <rect x="110" y="180" width="180" height="8" rx="4" fill="#5C6BC0" />
              <line x1="130" y1="188" x2="110" y2="280" stroke="#5C6BC0" strokeWidth="6" />
              <line x1="270" y1="188" x2="290" y2="280" stroke="#5C6BC0" strokeWidth="6" />

              {/* Laptop Magenta */}
              <rect x="150" y="145" width="45" height="35" rx="3" fill="#E91E63" />
              <rect x="145" y="177" width="55" height="4" rx="2" fill="#C2185B" />

              {/* Character */}
              {/* Head with glasses */}
              <circle cx="230" cy="115" r="16" fill="#FBC02D" />
              <path d="M218 110 C222 95, 240 95, 245 110 Z" fill="#1E1B3A" />
              <circle cx="225" cy="115" r="4" fill="none" stroke="#1E1B3A" strokeWidth="2" />
              <circle cx="235" cy="115" r="4" fill="none" stroke="#1E1B3A" strokeWidth="2" />
              {/* Torso blue shirt */}
              <rect x="215" y="132" width="28" height="40" rx="6" fill="#536DFE" />
              {/* Arm reaching for laptop */}
              <path d="M220 145 Q190 155 175 168" stroke="#FBC02D" strokeWidth="6" strokeLinecap="round" fill="none" />
              {/* Legs */}
              <line x1="225" y1="172" x2="185" y2="240" stroke="#1E1B3A" strokeWidth="12" strokeLinecap="round" />
              <rect x="165" y="235" width="28" height="12" rx="6" fill="#E91E63" />

              {/* Potted plants on right */}
              <rect x="300" y="200" width="50" height="60" rx="4" fill="#C62828" />
              <ellipse cx="325" cy="190" rx="25" ry="8" fill="#FDD835" />
              <path d="M325 190 Q300 140 320 130 Q335 150 325 190" fill="#43A047" />
              <path d="M325 190 Q355 140 340 130 Q325 150 325 190" fill="#2E7D32" />
            </svg>
            <p className="text-xs font-semibold text-[#8E8EA1]">
              Join thousands of businesses managing their sales with Base.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
