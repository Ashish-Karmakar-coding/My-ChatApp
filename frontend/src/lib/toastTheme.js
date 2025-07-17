import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle, Star, Gift, Trophy, Zap, Heart, Sparkles } from 'lucide-react';

const ToastSuccessDemo = () => {
  // Classic success toast with custom styling
  const showClassicSuccess = (message) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '400px',
      },
      iconTheme: {
        primary: 'white',
        secondary: '#10b981',
      },
    });
  };

  // Animated success toast with pulse effect
  const showAnimatedSuccess = (message) => {
    toast.success(message, {
      duration: 5000,
      position: 'top-center',
      style: {
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        color: '#166534',
        padding: '20px 24px',
        borderRadius: '16px',
        border: '2px solid #bbf7d0',
        boxShadow: '0 20px 40px rgba(34, 197, 94, 0.2)',
        fontSize: '15px',
        fontWeight: '600',
        maxWidth: '450px',
        animation: 'pulse 0.5s ease-in-out',
      },
      iconTheme: {
        primary: '#16a34a',
        secondary: '#dcfce7',
      },
    });
  };

  // Minimal dark success toast
  const showMinimalSuccess = (message) => {
    toast.success(message, {
      duration: 3000,
      position: 'bottom-center',
      style: {
        background: '#1f2937',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        border: '1px solid #374151',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '350px',
      },
      iconTheme: {
        primary: '#10b981',
        secondary: '#1f2937',
      },
    });
  };

  // Celebration success toast with vibrant colors
  const showCelebrationSuccess = (message) => {
    toast.success(message, {
      duration: 6000,
      position: 'top-center',
      style: {
        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%)',
        color: 'white',
        padding: '20px 24px',
        borderRadius: '20px',
        boxShadow: '0 15px 35px rgba(139, 92, 246, 0.4)',
        fontSize: '16px',
        fontWeight: '700',
        maxWidth: '500px',
        textAlign: 'center',
      },
      iconTheme: {
        primary: 'white',
        secondary: '#8b5cf6',
      },
    });
  };

  // Glassmorphism success toast
  const showGlassmorphismSuccess = (message) => {
    toast.success(message, {
      duration: 4000,
      position: 'top-right',
      style: {
        background: 'rgba(16, 185, 129, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(16, 185, 129, 0.2)',
        color: '#065f46',
        padding: '18px 22px',
        borderRadius: '14px',
        boxShadow: '0 8px 32px rgba(16, 185, 129, 0.2)',
        fontSize: '14px',
        fontWeight: '600',
        maxWidth: '400px',
      },
      iconTheme: {
        primary: '#10b981',
        secondary: 'rgba(16, 185, 129, 0.1)',
      },
    });
  };

  // Neon glow success toast
  const showNeonSuccess = (message) => {
    toast.success(message, {
      duration: 4000,
      position: 'bottom-right',
      style: {
        background: '#000000',
        color: '#00ff88',
        padding: '16px 20px',
        borderRadius: '10px',
        border: '2px solid #00ff88',
        boxShadow: '0 0 20px rgba(0, 255, 136, 0.5), inset 0 0 20px rgba(0, 255, 136, 0.1)',
        fontSize: '14px',
        fontWeight: '600',
        maxWidth: '380px',
        textShadow: '0 0 10px rgba(0, 255, 136, 0.8)',
      },
      iconTheme: {
        primary: '#00ff88',
        secondary: '#000000',
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Beautiful toast.success() Messages
          </h1>
          <p className="text-gray-600 text-lg">
            Styled using the built-in toast.success() method with custom options
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Classic Green</h3>
              <p className="text-gray-600 text-sm mb-4">Beautiful gradient with shadow</p>
              <button
                onClick={() => showClassicSuccess("Profile updated successfully!")}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg transition-colors font-medium"
              >
                Show Toast
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Animated Style</h3>
              <p className="text-gray-600 text-sm mb-4">Subtle animation with borders</p>
              <button
                onClick={() => showAnimatedSuccess("Payment processed successfully!")}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-2.5 px-4 rounded-lg transition-all font-medium"
              >
                Show Toast
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Minimal Dark</h3>
              <p className="text-gray-600 text-sm mb-4">Clean dark theme approach</p>
              <button
                onClick={() => showMinimalSuccess("File uploaded successfully!")}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2.5 px-4 rounded-lg transition-colors font-medium"
              >
                Show Toast
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Celebration</h3>
              <p className="text-gray-600 text-sm mb-4">Vibrant colors for achievements</p>
              <button
                onClick={() => showCelebrationSuccess("🎉 Congratulations! You've leveled up!")}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2.5 px-4 rounded-lg transition-all font-medium"
              >
                Show Toast
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform backdrop-blur-sm">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Glassmorphism</h3>
              <p className="text-gray-600 text-sm mb-4">Modern glass effect with blur</p>
              <button
                onClick={() => showGlassmorphismSuccess("Settings saved successfully!")}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white py-2.5 px-4 rounded-lg transition-all font-medium"
              >
                Show Toast
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border-2 border-green-400">
                <Zap className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Neon Glow</h3>
              <p className="text-gray-600 text-sm mb-4">Cyberpunk-inspired design</p>
              <button
                onClick={() => showNeonSuccess("System activated successfully!")}
                className="w-full bg-black hover:bg-gray-900 text-green-400 py-2.5 px-4 rounded-lg transition-colors font-medium border border-green-400"
              >
                Show Toast
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Test Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => showClassicSuccess("Data saved successfully!")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              💾 Save Data
            </button>
            <button
              onClick={() => showAnimatedSuccess("Email sent successfully!")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              📧 Send Email
            </button>
            <button
              onClick={() => showMinimalSuccess("User created successfully!")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              👤 Create User
            </button>
            <button
              onClick={() => showCelebrationSuccess("🏆 Achievement unlocked!")}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg transition-all font-medium"
            >
              🎯 Achievement
            </button>
            <button
              onClick={() => showGlassmorphismSuccess("Backup completed successfully!")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all font-medium"
            >
              🔄 Backup
            </button>
            <button
              onClick={() => showNeonSuccess("Connection established!")}
              className="bg-black hover:bg-gray-900 text-green-400 px-6 py-3 rounded-lg transition-colors font-medium border border-green-400"
            >
              🔗 Connect
            </button>
          </div>
        </div>
      </div>

      {/* Toaster with custom styling */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
};

export default ToastSuccessDemo;