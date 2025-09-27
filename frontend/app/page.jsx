'use client'

import { Button } from "@/components/ui/button"
import { Calendar, Users, Mic, Zap, CheckCircle, ArrowRight, Sparkles } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">StageSync</span>
        </div>
        <div className="flex items-center space-x-2 text-purple-300">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Vibe-Coded</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Hero Section */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-purple-200 border border-white/20">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Complete Event Management Solution</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                StageSync
              </span>
              <br />
              <span className="text-white">Event Platform</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Streamline session management, speaker engagement, and event coordination with the power of AI. 
              Perfect for SIT, Vibeathon, and all your event needs.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 my-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <Calendar className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">Event Creation</h3>
              <p className="text-gray-300 text-sm">Admins can easily create and manage events with AI assistance</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <Users className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">Speaker Management</h3>
              <p className="text-gray-300 text-sm">Speakers can submit proposals and manage their sessions seamlessly</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <CheckCircle className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-white font-semibold mb-2">AI-Powered Reviews</h3>
              <p className="text-gray-300 text-sm">Intelligent proposal review and event logistics optimization</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <a href="/login?role=admin" className="group">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group-hover:shadow-xl"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Login as Admin
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              
              <a href="/login?role=speaker" className="group">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 group-hover:shadow-xl"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Login as Speaker
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
            
            <p className="text-gray-400 text-sm">
              New to StageSync? Choose your role above to get started with our AI-powered event management platform
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/10">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">AI-Powered</div>
              <div className="text-gray-400 text-sm">Smart Automation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">Dual Access</div>
              <div className="text-gray-400 text-sm">Admin & Speaker</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">Complete</div>
              <div className="text-gray-400 text-sm">End-to-End Solution</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-gray-400 text-sm py-6 border-t border-white/10">
        <p>© 2025 StageSync. Revolutionizing event management with AI.</p>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}