export default function HomeSkele() {
    return (
        <div className="flex-1 flex items-center justify-center bg-gray-900 h-[92dvh]">
            <div className="w-full max-w-xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-10 flex flex-col items-center">
                
                {/* WhatsApp Style Chat Animation */}
                <div className="relative w-80 h-64 mb-8">
                    
                    {/* Character 1 - Left side */}
                    <div className="absolute left-0 top-0 flex flex-col items-center">
                        {/* Person 1 */}
                        <div className="relative mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <div className="text-green-700 text-xl font-bold">A</div>
                                </div>
                            </div>
                            {/* Phone */}
                            <div className="absolute -bottom-2 -right-1 animate-phone-tilt-1">
                                <div className="w-6 h-10 bg-gray-800 rounded-md border border-gray-600 shadow-lg">
                                    <div className="w-full h-1 bg-green-500 rounded-t-md animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Person 1's Messages */}
                        <div className="space-y-2">
                            <div className="animate-message-1 opacity-0">
                                <div className="bg-green-500 text-white px-3 py-2 rounded-2xl rounded-bl-sm shadow-md max-w-32 text-sm">
                                    Hey there! 👋
                                </div>
                                <div className="text-xs text-gray-400 mt-1">2:30 PM</div>
                            </div>
                            
                            <div className="animate-message-3 opacity-0">
                                <div className="bg-green-500 text-white px-3 py-2 rounded-2xl rounded-bl-sm shadow-md max-w-32 text-sm">
                                    How are you doing?
                                </div>
                                <div className="text-xs text-gray-400 mt-1">2:31 PM</div>
                            </div>
                            
                            <div className="animate-message-5 opacity-0">
                                <div className="bg-green-500 text-white px-3 py-2 rounded-2xl rounded-bl-sm shadow-md max-w-32 text-sm">
                                    Great! See you then 😊
                                </div>
                                <div className="text-xs text-gray-400 mt-1">2:33 PM</div>
                            </div>
                        </div>
                    </div>

                    {/* Character 2 - Right side */}
                    <div className="absolute right-0 top-0 flex flex-col items-center">
                        {/* Person 2 */}
                        <div className="relative mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <div className="text-blue-700 text-xl font-bold">B</div>
                                </div>
                            </div>
                            {/* Phone */}
                            <div className="absolute -bottom-2 -left-1 animate-phone-tilt-2">
                                <div className="w-6 h-10 bg-gray-800 rounded-md border border-gray-600 shadow-lg">
                                    <div className="w-full h-1 bg-blue-500 rounded-t-md animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Person 2's Messages */}
                        <div className="space-y-2 flex flex-col items-end">
                            <div className="animate-message-2 opacity-0">
                                <div className="bg-gray-700 text-white px-3 py-2 rounded-2xl rounded-br-sm shadow-md max-w-32 text-sm">
                                    Hi! I'm good 😄
                                </div>
                                <div className="text-xs text-gray-400 mt-1 text-right">2:30 PM</div>
                            </div>
                            
                            <div className="animate-message-4 opacity-0">
                                <div className="bg-gray-700 text-white px-3 py-2 rounded-2xl rounded-br-sm shadow-md max-w-32 text-sm">
                                    Want to meet later?
                                </div>
                                <div className="text-xs text-gray-400 mt-1 text-right">2:32 PM</div>
                            </div>
                        </div>
                    </div>

                    {/* Typing indicators */}
                    <div className="absolute left-0 bottom-8 animate-typing-indicator-1">
                        <div className="bg-gray-700 px-3 py-2 rounded-2xl rounded-bl-sm flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-dot-1"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-dot-2"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-dot-3"></div>
                        </div>
                    </div>

                    {/* Connection lines */}
                    <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
                        <div className="flex items-center space-x-2 animate-pulse">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                            <div className="w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-500 animate-flow"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                        </div>
                    </div>
                </div>

                <div className="text-center animate-slide-up">
                    <h3 className="text-white text-lg font-semibold mb-2">Start Chatting!</h3>
                    <p className="text-gray-400 text-sm">
                        Select a user from the sidebar to begin your conversation
                    </p>
                </div>

                <style jsx>{`
                    @keyframes phone-tilt-1 {
                        0%, 100% { transform: rotate(-5deg) translateY(0px); }
                        50% { transform: rotate(-8deg) translateY(-2px); }
                    }
                    @keyframes phone-tilt-2 {
                        0%, 100% { transform: rotate(5deg) translateY(0px); }
                        50% { transform: rotate(8deg) translateY(-2px); }
                    }
                    @keyframes message-appear {
                        0% { opacity: 0; transform: translateY(10px) scale(0.9); }
                        100% { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    @keyframes typing-appear {
                        0%, 70% { opacity: 0; transform: translateY(10px); }
                        80%, 90% { opacity: 1; transform: translateY(0); }
                        100% { opacity: 0; transform: translateY(-10px); }
                    }
                    @keyframes dot-bounce {
                        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                        30% { transform: translateY(-8px); opacity: 1; }
                    }
                    @keyframes flow {
                        0% { transform: scaleX(0); }
                        50% { transform: scaleX(1); }
                        100% { transform: scaleX(0); }
                    }
                    @keyframes slide-up {
                        0% { opacity: 0; transform: translateY(20px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    
                    .animate-phone-tilt-1 { animation: phone-tilt-1 2s ease-in-out infinite; }
                    .animate-phone-tilt-2 { animation: phone-tilt-2 2s ease-in-out infinite 0.5s; }
                    
                    .animate-message-1 { animation: message-appear 0.5s ease-out 1s forwards; }
                    .animate-message-2 { animation: message-appear 0.5s ease-out 2s forwards; }
                    .animate-message-3 { animation: message-appear 0.5s ease-out 3s forwards; }
                    .animate-message-4 { animation: message-appear 0.5s ease-out 4s forwards; }
                    .animate-message-5 { animation: message-appear 0.5s ease-out 5s forwards; }
                    
                    .animate-typing-indicator-1 { animation: typing-appear 6s ease-in-out 2.5s infinite; }
                    
                    .animate-dot-1 { animation: dot-bounce 1.4s ease-in-out infinite; }
                    .animate-dot-2 { animation: dot-bounce 1.4s ease-in-out infinite 0.2s; }
                    .animate-dot-3 { animation: dot-bounce 1.4s ease-in-out infinite 0.4s; }
                    
                    .animate-flow { animation: flow 2s ease-in-out infinite; }
                    .animate-slide-up { animation: slide-up 0.8s ease-out 6s forwards; opacity: 0; }
                `}</style>
            </div>
        </div>
    );
}