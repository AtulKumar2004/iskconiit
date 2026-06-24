import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="min-h-screen bg-[#0F0A12] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-xl bg-[#D4AF37]/20 animate-pulse" />
        <Loader2 className="w-16 h-16 text-[#D4AF37] animate-spin relative z-10" />
      </div>
      <p className="mt-6 text-[#D4AF37] tracking-[0.2em] uppercase text-sm font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loader;
