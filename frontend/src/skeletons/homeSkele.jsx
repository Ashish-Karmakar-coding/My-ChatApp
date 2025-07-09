export default function HomeSkele() {
    return (
        <div className="flex-1 flex items-center justify-center bg-gray-900 h-[92dvh]">
            <div className="w-full max-w-xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-10 flex flex-col items-center">
                {/* Cartoon person holding a phone and messaging animation */}
                <div className="flex flex-col items-center mb-8 mt-4">
                    <div className="relative">
                        <svg
                            width="120"
                            height="160"
                            viewBox="0 0 120 160"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Head */}
                            <ellipse cx="60" cy="40" rx="28" ry="28" fill="#a78bfa" />
                            {/* Face */}
                            <ellipse cx="60" cy="48" rx="18" ry="15" fill="#f3e8ff" />
                            {/* Smile */}
                            <path d="M52 54 Q60 62 68 54" stroke="#7c3aed" strokeWidth="2" fill="none" />
                            {/* Body */}
                            <rect x="38" y="68" width="44" height="50" rx="22" fill="#7c3aed" />
                            {/* Left Arm */}
                            <rect
                                x="18"
                                y="80"
                                width="18"
                                height="10"
                                rx="5"
                                fill="#a78bfa"
                                transform="rotate(-15 18 80)"
                            />
                            {/* Right Arm (holding phone) */}
                            <g className="animate-arm">
                                <rect
                                    x="84"
                                    y="80"
                                    width="18"
                                    height="10"
                                    rx="5"
                                    fill="#a78bfa"
                                    transform="rotate(15 84 80)"
                                />
                                {/* Phone */}
                                <rect
                                    x="97"
                                    y="85"
                                    width="7"
                                    height="14"
                                    rx="2"
                                    fill="#22223b"
                                    stroke="#fff"
                                    strokeWidth="1"
                                    className="animate-phone"
                                />
                            </g>
                            {/* Eyes */}
                            <ellipse cx="54" cy="46" rx="2" ry="3" fill="#22223b" />
                            <ellipse cx="66" cy="46" rx="2" ry="3" fill="#22223b" />
                        </svg>
                        {/* Message bubble animation */}
                        <div className="absolute left-[90px] top-[60px] animate-bubble">
                            <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl rounded-bl-none shadow text-sm">
                                Hey! 👋
                            </div>
                        </div>
                    </div>
                    <style>
                        {`
                        @keyframes arm-move {
                            0%,100% { transform: translateY(0);}
                            50% { transform: translateY(6px);}
                        }
                        .animate-arm {
                            animation: arm-move 1.2s infinite;
                        }
                        @keyframes phone-glow {
                            0%,100% { filter: brightness(1);}
                            50% { filter: brightness(1.5);}
                        }
                        .animate-phone {
                            animation: phone-glow 1.2s infinite;
                        }
                        @keyframes bubble-pop {
                            0% { opacity: 0; transform: scale(0.8) translateY(10px);}
                            20% { opacity: 1; transform: scale(1.05) translateY(-2px);}
                            40%,100% { opacity: 1; transform: scale(1) translateY(0);}
                        }
                        .animate-bubble {
                            animation: bubble-pop 1.2s cubic-bezier(.4,2,.6,1) both;
                        }
                        `}
                    </style>
                </div>
                <p className="text-gray-500 mt-10 text-center">
                    Select a user from the sidebar to start chatting!
                </p>
            </div>
        </div>
    );
}