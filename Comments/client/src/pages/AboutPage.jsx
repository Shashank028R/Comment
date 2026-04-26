import { useState, useEffect } from "react";
import { Zap, Lock, Code, Scale, ChevronDown, UserCircle, Globe } from "lucide-react";

// 🔥 CUSTOM GITHUB ICON (Since Lucide removed brand icons)
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const AboutPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeLegal, setActiveLegal] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleLegal = (index) => {
    setActiveLegal(activeLegal === index ? null : index);
  };

  const uses = [
    { icon: <Zap size={24} />, title: "Real-time Engagement", desc: "Experience lightning-fast comment threading and instant like updates without refreshing." },
    { icon: <Lock size={24} />, title: "Secure & Private", desc: "Your data is encrypted using industry-standard JWT and bcrypt hashing algorithms." },
    { icon: <Globe size={24} />, title: "Community First", desc: "A borderless platform designed to let ideas flow freely and spark meaningful conversations." }
  ];

  const legalInfo = [
    { title: "Terms of Service", content: "By using this platform, you agree to engage respectfully. Spam, harassment, or malicious activity will result in immediate account termination. We reserve the right to moderate content to keep the community safe." },
    { title: "Privacy Policy", content: "We respect your privacy. We only collect the minimal data required (email, username) to maintain your account. We do not sell your personal data to third parties." },
    { title: "Data Deletion", content: "You have full control over your data. Deleting a comment removes it permanently from our database. If you wish to delete your entire account, please contact the administrator." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center py-20 px-6 relative overflow-hidden z-0">
      
      {/* 🔥 DYNAMIC BACKGROUND LIGHTING 🔥 */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-red-600/15 blur-[150px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-red-800/15 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className={`w-full max-w-4xl transition-all duration-1000 ease-out transform ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        
        {/* 🌟 1. INTERACTIVE INTRODUCTION */}
        <section className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-6 animate-fade-in-up">
            <Code size={16} /> Welcome to the System
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-sm">
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Expression</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            This platform is an advanced MERN stack experiment designed to push the boundaries of real-time web interaction, featuring deeply nested data structures, glass-morphism UI, and bulletproof authentication.
          </p>
        </section>

        {/* 🚀 2. PLATFORM USES */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {uses.map((use, i) => (
              <div 
                key={i} 
                className="group bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] hover:border-red-500/30 hover:shadow-[0_8px_30px_rgba(239,68,68,0.1)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2"
              >
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 group-hover:bg-red-500/20 transition-all duration-300">
                  {use.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-3">{use.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{use.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ⚖️ 3. LEGAL & INFO (Interactive Accordion) */}
        <section className="mb-24 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8">
            <Scale className="text-red-500" size={28} />
            <h2 className="text-3xl font-bold text-white">Legal & Guidelines</h2>
          </div>
          
          <div className="w-full max-w-2xl space-y-4">
            {legalInfo.map((info, i) => (
              <div 
                key={i} 
                className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button 
                  onClick={() => toggleLegal(i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-gray-200">{info.title}</span>
                  <ChevronDown 
                    className={`text-red-500 transition-transform duration-500 ${activeLegal === i ? "rotate-180" : "rotate-0"}`} 
                    size={20} 
                  />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${activeLegal === i ? "max-h-40 opacity-100 pb-5" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-gray-400 font-light text-sm leading-relaxed border-t border-white/5 pt-4">
                    {info.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 👨‍💻 4. CREATOR INFO */}
        <section className="flex justify-center">
          <div className="relative group w-full max-w-md">
            {/* Glowing border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 backdrop-blur-2xl flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-red-500 rounded-full blur opacity-30 animate-pulse"></div>
                <img 
                  src="https://github.com/identicons/shashank.png" 
                  alt="Shashank Kumar"
                  className="relative w-24 h-24 rounded-full border-2 border-red-500/50 object-cover shadow-xl"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-1">Shashank Kumar</h3>
              <p className="text-red-400 text-sm font-medium mb-4 uppercase tracking-widest">Full-Stack Developer</p>
              
              <p className="text-gray-400 text-sm font-light leading-relaxed mb-6">
                Architected and developed this entire MERN stack platform. Passionate about creating seamless user experiences, deeply nested data models, and high-performance backend architectures.
              </p>
              
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <GithubIcon size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <Globe size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <UserCircle size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;