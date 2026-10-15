import React, { useState } from 'react';
import BaseLogo from '../common/BaseLogo';

export default function RecoverPassword({ onNavigate }) {
  const [email, setEmail] = useState('example@gmail.com');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Reset instructions sent to: ${email}`);
    onNavigate('login');
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F5F9] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 sm:p-10 space-y-6 text-center">
        {/* Base Logo matching screenshot 20 */}
        <div className="flex justify-center">
          <BaseLogo size="lg" showText={false} />
        </div>

        <h2 className="text-2xl font-extrabold text-[#1E1B3A]">Recover</h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
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

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#5B52F9] hover:bg-[#4a42db] text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 transition-all active:scale-98"
          >
            Reset Your Password
          </button>
        </form>

        <button
          onClick={() => onNavigate('login')}
          className="text-xs text-[#5B52F9] font-semibold hover:underline"
        >
          Back to Log In
        </button>
      </div>
    </div>
  );
}
