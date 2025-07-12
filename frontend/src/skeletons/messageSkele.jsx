export default function MessageSkele() {
    return (
        <div className="flex-1 flex flex-col bg-gray-900 h-[92dvh]">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {/* Incoming message skeleton */}
                <div className="flex items-start gap-3 max-w-[70%]">
                    <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
                    <div className="flex flex-col gap-2">
                        <div className="bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3 w-48 h-12 animate-pulse"></div>
                        <div className="bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3 w-32 h-10 animate-pulse"></div>
                    </div>
                </div>

                {/* Outgoing message skeleton */}
                <div className="flex items-start gap-3 max-w-[70%] ml-auto">
                    <div className="flex flex-col gap-2">
                        <div className="bg-purple-600 rounded-2xl rounded-br-none px-4 py-3 w-40 h-12 animate-pulse"></div>
                        <div className="bg-purple-600 rounded-2xl rounded-br-none px-4 py-3 w-56 h-10 animate-pulse"></div>
                    </div>
                </div>

                {/* Another incoming message */}
                <div className="flex items-start gap-3 max-w-[70%]">
                    <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
                    <div className="bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3 w-36 h-10 animate-pulse"></div>
                </div>

                {/* Typing indicator */}
                <div className="flex items-start gap-3 max-w-[70%]">
                    <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
                    <div className="bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                    </div>
                </div>

                {/* More message skeletons for variety */}
                <div className="flex items-start gap-3 max-w-[70%] ml-auto">
                    <div className="bg-purple-600 rounded-2xl rounded-br-none px-4 py-3 w-28 h-10 animate-pulse"></div>
                </div>

                <div className="flex items-start gap-3 max-w-[70%]">
                    <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse"></div>
                    <div className="flex flex-col gap-2">
                        <div className="bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3 w-52 h-12 animate-pulse"></div>
                        <div className="bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3 w-44 h-10 animate-pulse"></div>
                    </div>
                </div>

                <div className="flex items-start gap-3 max-w-[70%] ml-auto">
                    <div className="bg-purple-600 rounded-2xl rounded-br-none px-4 py-3 w-64 h-12 animate-pulse"></div>
                </div>
            </div>

            {/* Input area skeleton */}
            <div className="border-t border-gray-700 p-4 bg-gray-800">
                <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-700 rounded-full h-12 animate-pulse"></div>
                    <div className="w-12 h-12 bg-purple-600 rounded-full animate-pulse"></div>
                </div>
            </div>

            <style>
                {`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                    background: #2d3748;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #2d3748;
                    border-radius: 8px;
                }
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #2d3748 #2d3748;
                }
                @keyframes bounce {
                    0%, 80%, 100% {
                        transform: scale(0);
                    }
                    40% {
                        transform: scale(1);
                    }
                }
                .animate-bounce {
                    animation: bounce 1.4s infinite ease-in-out both;
                }
                `}
            </style>
        </div>
    );
}
