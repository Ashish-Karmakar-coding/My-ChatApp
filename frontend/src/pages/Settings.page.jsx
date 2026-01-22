import { THEMES, useThemeStore } from "../lib/themeStore";
import { Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PREVIEW_MESSAGES = [
    { id: 1, content: "Hey! How's it going?", isSent: false },
    { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

export default function SettingPage() {
    const { theme, setTheme } = useThemeStore();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] p-4 sm:p-8 pt-20">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header with Back Button */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors text-[var(--text-secondary)] hover:text-white"
                        title="Go Back"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Settings</h1>
                        <p className="text-sm text-[var(--text-secondary)]">Customize your experience</p>
                    </div>
                </div>

                <div className="bg-[var(--bg-secondary)] rounded-[2.5rem] p-6 sm:p-10 border border-white/5 shadow-2xl">
                    <section className="space-y-6">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold text-[var(--text-primary)] px-2">Appearance</h2>
                            <p className="text-sm text-[var(--text-secondary)] px-2">Choose your preferred theme</p>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                            {THEMES.map((t) => (
                                <button
                                    key={t}
                                    className={`
                                        group flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300
                                        ${theme === t
                                            ? "bg-[var(--color-accent)]/10 ring-2 ring-[var(--color-accent)]"
                                            : "hover:bg-white/5 bg-[var(--bg-primary)]/50"}
                                    `}
                                    onClick={() => setTheme(t)}
                                >
                                    <div className="relative h-10 w-full rounded-xl overflow-hidden shadow-inner" data-theme={t}>
                                        <div className="absolute inset-0 grid grid-cols-4 gap-px p-1.5">
                                            <div className="rounded-sm bg-primary"></div>
                                            <div className="rounded-sm bg-secondary"></div>
                                            <div className="rounded-sm bg-accent"></div>
                                            <div className="rounded-sm bg-neutral"></div>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-bold truncate w-full text-center uppercase tracking-tighter ${theme === t ? "text-[var(--color-accent)]" : "text-[var(--text-secondary)]"}`}>
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Preview Section */}
                    <section className="mt-12 space-y-6">
                        <h3 className="text-lg font-bold text-[var(--text-primary)] px-2">Live Preview</h3>
                        <div className="rounded-[2rem] border border-white/5 overflow-hidden bg-[var(--bg-primary)] shadow-2xl scale-95 sm:scale-100">
                            <div className="p-4 sm:p-6">
                                <div className="max-w-lg mx-auto">
                                    {/* Mock Chat UI */}
                                    <div className="bg-[var(--bg-secondary)] rounded-[1.5rem] shadow-xl overflow-hidden border border-white/5">
                                        {/* Chat Header */}
                                        <div className="px-4 py-3 bg-[var(--bg-secondary)] flex items-center gap-3 border-b border-white/5">
                                            <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-xs">
                                                JD
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-sm text-[var(--text-primary)]">John Doe</h3>
                                                <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Online</p>
                                            </div>
                                        </div>

                                        {/* Chat Messages */}
                                        <div className="p-4 space-y-4 min-h-[180px] bg-[var(--bg-primary)]/30">
                                            {PREVIEW_MESSAGES.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}
                                                >
                                                    <div
                                                        className={`
                                                            max-w-[85%] rounded-[1.25rem] px-4 py-2.5 shadow-md text-sm
                                                            ${msg.isSent
                                                                ? "bg-[var(--color-accent)] text-white"
                                                                : "bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-white/5"}
                                                        `}
                                                    >
                                                        <p>{msg.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Chat Input */}
                                        <div className="p-3 bg-[var(--bg-secondary)] border-t border-white/5">
                                            <div className="flex gap-2">
                                                <div className="flex-1 bg-[var(--bg-primary)] rounded-full px-4 py-1.5 flex items-center border border-white/5">
                                                    <span className="text-sm text-[var(--text-secondary)]">Type a message...</span>
                                                </div>
                                                <button className="vibrant-orange-btn w-10 h-10 flex items-center justify-center rounded-full">
                                                    <Send size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}