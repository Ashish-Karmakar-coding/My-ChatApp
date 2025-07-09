export default function HomeSkele() {
    return (
        <div className="flex-1 flex items-center justify-center bg-gray-900 h-[92dvh]">
            <div className="w-full max-w-xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-700 animate-pulse mb-6" />
                <div className="h-6 w-40 bg-gray-700 rounded mb-4 animate-pulse" />
                <div className="h-4 w-64 bg-gray-700 rounded mb-2 animate-pulse" />
                <div className="h-4 w-56 bg-gray-700 rounded mb-2 animate-pulse" />
                <div className="h-4 w-48 bg-gray-700 rounded mb-2 animate-pulse" />
                <div className="h-4 w-32 bg-gray-700 rounded mb-2 animate-pulse" />
                <div className="h-4 w-24 bg-gray-700 rounded mb-2 animate-pulse" />
                <div className="mt-8 w-full flex justify-center">
                    <div className="h-10 w-32 bg-gray-700 rounded-lg animate-pulse" />
                </div>
                <p className="text-gray-500 mt-10 text-center">
                    Select a user from the sidebar to start chatting!
                </p>
            </div>
        </div>
    );
}