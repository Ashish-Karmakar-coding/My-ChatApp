import { useState } from "react";

export default function HomeSkele() {
    const [currentAnimation, setCurrentAnimation] = useState("floating");

    const FloatingDots = () => (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-spin-slow"></div>
            <div className="absolute inset-4 rounded-full border border-purple-400/30 animate-spin-reverse"></div>
            <div className="relative flex space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-float-1"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-float-2"></div>
                <div className="w-3 h-3 bg-purple-600 rounded-full animate-float-3"></div>
            </div>
        </div>
    );

    const TypingIndicator = () => (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="bg-gray-700 rounded-3xl p-6 shadow-2xl border border-gray-600">
                <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-typing-1"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-typing-2"></div>
                    <div className="w-2 h-2 bg-purple-600 rounded-full animate-typing-3"></div>
                </div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
        </div>
    );

    const MessageWave = () => (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="flex space-x-1">
                {[...Array(7)].map((_, i) => (
                    <div
                        key={i}
                        className="w-2 bg-gradient-to-t from-purple-600 to-purple-400 rounded-full animate-wave"
                        style={{
                            height: `${20 + Math.sin(i * 0.5) * 15}px`,
                            animationDelay: `${i * 0.1}s`
                        }}
                    ></div>
                ))}
            </div>
            <div className="absolute inset-0 bg-purple-500/10 rounded-full animate-pulse-slow"></div>
        </div>
    );

    const GlowingOrb = () => (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full animate-gradient blur-sm"></div>
            <div className="relative w-20 h-20 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 rounded-full animate-pulse-glow shadow-2xl shadow-purple-500/50">
                <div className="absolute inset-2 bg-white/20 rounded-full animate-float-slow"></div>
                <div className="absolute top-4 left-4 w-2 h-2 bg-white/60 rounded-full animate-twinkle"></div>
                <div className="absolute bottom-6 right-6 w-1 h-1 bg-white/40 rounded-full animate-twinkle-delayed"></div>
            </div>
        </div>
    );

    const animations = {
        floating: { component: <FloatingDots />, name: "Floating Dots" },
        typing: { component: <TypingIndicator />, name: "Typing Indicator" },
        wave: { component: <MessageWave />, name: "Message Wave" },
        orb: { component: <GlowingOrb />, name: "Glowing Orb" }
    };

    return (
        <div className="flex-1 flex items-center justify-center bg-gray-900 h-[92dvh]">
            <div className="w-full max-w-xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-10 flex flex-col items-center">
                
                {/* Animation Selector */}
                <div className="mb-6 flex space-x-2 bg-gray-700 rounded-xl p-1">
                    {Object.entries(animations).map(([key, { name }]) => (
                        <button
                            key={key}
                            onClick={() => setCurrentAnimation(key)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                currentAnimation === key
                                    ? 'bg-purple-600 text-white shadow-lg'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-600'
                            }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>

                {/* Current Animation */}
                <div className="flex flex-col items-center mb-8">
                    {animations[currentAnimation].component}
                    
                    {/* Message bubble */}
                    <div className="mt-6 animate-slide-up">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                            <span className="text-sm font-medium">Ready to chat! ✨</span>
                        </div>
                    </div>
                </div>

                <p className="text-gray-400 text-center text-lg font-medium">
                    Select a user from the sidebar to start chatting!
                </p>

                <style jsx>{`
                    @keyframes spin-slow {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes spin-reverse {
                        0% { transform: rotate(360deg); }
                        100% { transform: rotate(0deg); }
                    }
                    @keyframes float-1 {
                        0%, 100% { transform: translateY(0px); }
                        33% { transform: translateY(-12px); }
                        66% { transform: translateY(6px); }
                    }
                    @keyframes float-2 {
                        0%, 100% { transform: translateY(0px); }
                        33% { transform: translateY(8px); }
                        66% { transform: translateY(-10px); }
                    }
                    @keyframes float-3 {
                        0%, 100% { transform: translateY(0px); }
                        33% { transform: translateY(-6px); }
                        66% { transform: translateY(12px); }
                    }
                    @keyframes typing-1 {
                        0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
                        30% { opacity: 1; transform: scale(1.2); }
                    }
                    @keyframes typing-2 {
                        0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
                        30% { opacity: 1; transform: scale(1.2); }
                    }
                    @keyframes typing-3 {
                        0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
                        30% { opacity: 1; transform: scale(1.2); }
                    }
                    @keyframes wave {
                        0%, 100% { transform: scaleY(0.5); opacity: 0.7; }
                        50% { transform: scaleY(1.5); opacity: 1; }
                    }
                    @keyframes pulse-slow {
                        0%, 100% { opacity: 0.1; transform: scale(1); }
                        50% { opacity: 0.3; transform: scale(1.1); }
                    }
                    @keyframes gradient {
                        0%, 100% { transform: rotate(0deg) scale(1); }
                        50% { transform: rotate(180deg) scale(1.1); }
                    }
                    @keyframes pulse-glow {
                        0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.5); }
                        50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.8), 0 0 60px rgba(236, 72, 153, 0.3); }
                    }
                    @keyframes float-slow {
                        0%, 100% { transform: translate(0, 0) rotate(0deg); }
                        25% { transform: translate(2px, -2px) rotate(1deg); }
                        50% { transform: translate(-1px, -4px) rotate(-1deg); }
                        75% { transform: translate(-2px, -1px) rotate(0.5deg); }
                    }
                    @keyframes twinkle {
                        0%, 100% { opacity: 0.4; transform: scale(0.8); }
                        50% { opacity: 1; transform: scale(1.2); }
                    }
                    @keyframes twinkle-delayed {
                        0%, 100% { opacity: 0.6; transform: scale(0.9); }
                        50% { opacity: 1; transform: scale(1.3); }
                    }
                    @keyframes slide-up {
                        0% { opacity: 0; transform: translateY(20px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    
                    .animate-spin-slow { animation: spin-slow 8s linear infinite; }
                    .animate-spin-reverse { animation: spin-reverse 6s linear infinite; }
                    .animate-float-1 { animation: float-1 2s ease-in-out infinite; }
                    .animate-float-2 { animation: float-2 2s ease-in-out infinite 0.3s; }
                    .animate-float-3 { animation: float-3 2s ease-in-out infinite 0.6s; }
                    .animate-typing-1 { animation: typing-1 1.4s ease-in-out infinite; }
                    .animate-typing-2 { animation: typing-2 1.4s ease-in-out infinite 0.2s; }
                    .animate-typing-3 { animation: typing-3 1.4s ease-in-out infinite 0.4s; }
                    .animate-wave { animation: wave 1.5s ease-in-out infinite; }
                    .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
                    .animate-gradient { animation: gradient 4s ease-in-out infinite; }
                    .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
                    .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
                    .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
                    .animate-twinkle-delayed { animation: twinkle-delayed 2s ease-in-out infinite 1s; }
                    .animate-slide-up { animation: slide-up 0.6s ease-out; }
                `}</style>
            </div>
        </div>
    );
}