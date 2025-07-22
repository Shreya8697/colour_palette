import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Palette, Code, Sparkles, ArrowRight, Zap, Eye } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate(); // Use React Router's navigate function

  const tools = [
    {
      title: "Skin Tone Palette",
      description: "Generate beautiful, inclusive color palettes based on diverse skin tones for authentic representation in your designs.",
      icon: <Eye className="h-8 w-8" />,
      link: "/skin-tone-palette",
      gradient: "from-amber-400 to-orange-500",
      features: ["Diverse skin tone samples", "Accessible color combinations", "Export ready palettes"]
    },
    {
      title: "HEX Palette Creator",
      description: "Create stunning color palettes from HEX codes with intelligent color theory and harmony suggestions.",
      icon: <Palette className="h-8 w-8" />,
      link: "/hex-palette",
      gradient: "from-purple-500 to-pink-500",
      features: ["Color harmony analysis", "HEX code generator", "Palette variations"]
    },
    {
      title: "Code Compiler",
      description: "Test and compile your code snippets instantly with our integrated development environment.",
      icon: <Code className="h-8 w-8" />,
      link: "/code-compiler",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Multi-language support", "Real-time compilation", "Error detection"]
    }
  ];

  const navigateToTool = (link) => {
    navigate(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <Sparkles className="relative h-16 w-16 text-blue-600" style={{
                  animation: 'bounce 2s infinite'
                }} />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              DesignDev Toolkit
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Empower your creative workflow with professional-grade tools for 
              <span className="text-blue-600 font-semibold"> color palette generation</span>, 
              <span className="text-purple-600 font-semibold"> skin tone inclusivity</span>, and 
              <span className="text-pink-600 font-semibold"> code compilation</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigateToTool('/skin-tone-palette')}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Creating</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium">Free • No signup required</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Color Circles */}
        <div 
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-60"
          style={{
            animation: 'float 6s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-60"
          style={{
            animation: 'float 6s ease-in-out infinite',
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-60"
          style={{
            animation: 'float 6s ease-in-out infinite',
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute bottom-32 right-1/3 w-24 h-24 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-40"
          style={{
            animation: 'float 6s ease-in-out infinite',
            animationDelay: '0.5s'
          }}
        ></div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Tools for Designers & Developers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your creative process with our suite of specialized tools designed for modern workflows
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <button 
              key={index}
              onClick={() => navigateToTool(tool.link)}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 overflow-hidden text-left w-full"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {tool.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {tool.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {tool.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Arrow */}
              <div className="flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors">
                <span className="mr-2">Explore Tool</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          ))}
        </div>
      </div>

      {/* Features Highlight */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-8">
              Why Choose DesignDev Toolkit?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-blue-100">Instant results with optimized performance for seamless creativity</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibility First</h3>
                <p className="text-blue-100">Built with inclusive design principles and WCAG compliance</p>
              </div>
              
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Quality</h3>
                <p className="text-blue-100">Industry-standard tools trusted by designers worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Elevate Your Design Process?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of designers and developers who trust DesignDev Toolkit for their creative projects
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigateToTool('/skin-tone-palette')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
            >
              Start with Skin Tones
            </button>
            <button 
              onClick={() => navigateToTool('/hex-palette')}
              className="bg-white text-gray-700 border-2 border-gray-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
            >
              Explore HEX Creator
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          25% { 
            transform: translateY(-10px) rotate(5deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(0deg); 
          }
          75% { 
            transform: translateY(-10px) rotate(-5deg); 
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -10px, 0);
          }
          70% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -5px, 0);
          }
          90% {
            transform: translate3d(0,-1px,0);
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;