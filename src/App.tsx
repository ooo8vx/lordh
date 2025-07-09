import React, { useState, useEffect } from 'react';
import { MessageCircle, Instagram, Crown, User, Mail, ExternalLink, MapPin, Calendar, Clock, Globe, Star, Heart, Gamepad2, ChevronDown, ChevronUp, Rocket, Zap, Code, Palette } from 'lucide-react';

function App() {
  const [currentSection, setCurrentSection] = useState(0); // 0 = About Me, 1 = Contact
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  
  const avatarUrl = "/e9c4e804b0c546262bd2bc03f593648d.jpg";

  // Handle scroll navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;
      
      e.preventDefault();
      
      if (e.deltaY > 0 && currentSection < 1) {
        // Scroll down
        navigateToSection(currentSection + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        // Scroll up
        navigateToSection(currentSection - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowDown' && currentSection < 1) {
        navigateToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        navigateToSection(currentSection - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, isTransitioning]);

  const navigateToSection = (sectionIndex: number) => {
    if (sectionIndex === currentSection || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSection(sectionIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const socialLinks = [
    { 
      name: 'Discord', 
      icon: MessageCircle, 
      url: 'https://discord.com/users/1c.2', 
      color: 'from-purple-500 to-blue-500',
      username: '1c.2'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://www.instagram.com/lordx679', 
      color: 'from-pink-500 to-purple-500',
      username: '@lordx679'
    },
    { 
      name: 'Roblox', 
      icon: Gamepad2, 
      url: 'https://www.roblox.com/users/profile?username=aoufabok', 
      color: 'from-green-500 to-blue-500',
      username: 'aoufabok'
    },
  ];

  const skills = [
    { name: 'Gaming', icon: Gamepad2, level: 95, color: 'from-purple-400 to-pink-400' },
    { name: 'Social Media', icon: Instagram, level: 90, color: 'from-blue-400 to-purple-400' },
    { name: 'Creative Design', icon: Palette, level: 85, color: 'from-green-400 to-blue-400' },
    { name: 'Tech Enthusiast', icon: Zap, level: 88, color: 'from-yellow-400 to-orange-400' },
  ];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Space Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-in-out"
        style={{
          backgroundImage: 'url(/space-background.png)',
          transform: `translateY(${currentSection * -50}vh) scale(${1 + currentSection * 0.1})`
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Floating Stars Animation */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => navigateToSection(index)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              currentSection === index
                ? 'bg-white border-white shadow-lg shadow-white/50'
                : 'bg-transparent border-white/50 hover:border-white hover:bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Section Container */}
      <div 
        className="relative h-[200vh] transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(${-currentSection * 100}vh)` }}
      >
        {/* About Me Section */}
        <section className="h-screen flex items-center justify-center relative">
          <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
            {/* Hero Content */}
            <div className="mb-12">
              {/* Avatar */}
              <div className="w-40 h-40 mx-auto mb-8 relative">
                <div className="w-full h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-full p-1 animate-pulse">
                  <div className="w-full h-full bg-black/20 rounded-full flex items-center justify-center overflow-hidden relative backdrop-blur-sm">
                    {!avatarError ? (
                      <img 
                        src={avatarUrl} 
                        alt="LORDX679 Profile Avatar"
                        className="w-full h-full object-cover rounded-full"
                        onError={() => setAvatarError(true)}
                      />
                    ) : (
                      <Crown className="h-20 w-20 text-purple-400" />
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center animate-bounce">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
              </div>
              
              {/* Title */}
              <h1 className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 mb-6 drop-shadow-2xl animate-pulse">
                LORDX679
              </h1>
              
              <div className="space-y-4 mb-8">
                <p className="text-2xl lg:text-3xl text-blue-300 font-bold">
                  Digital Space Explorer 🚀
                </p>
                <p className="text-lg text-purple-300 max-w-3xl mx-auto leading-relaxed">
                  18-year-old Moroccan living in Italy, navigating the digital cosmos with passion for gaming, 
                  creativity, and connecting with amazing people across the universe.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-white font-bold">18</div>
                  <div className="text-blue-300 text-sm">Years Old</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <MapPin className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-white font-bold">Italy</div>
                  <div className="text-purple-300 text-sm">Current Base</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <Globe className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-white font-bold">Morocco</div>
                  <div className="text-green-300 text-sm">Origin</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <Gamepad2 className="h-8 w-8 text-pink-400 mx-auto mb-2" />
                  <div className="text-white font-bold">Gamer</div>
                  <div className="text-pink-300 text-sm">Passion</div>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
                <Star className="h-8 w-8 text-yellow-400 mr-3" />
                My Universe
              </h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 group">
                    <div className="flex items-center mb-4">
                      <skill.icon className="h-8 w-8 text-purple-400 mr-3 group-hover:scale-110 transition-transform" />
                      <span className="text-white font-bold text-lg">{skill.name}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <div className="text-right text-purple-300 text-sm">{skill.level}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll Down Button */}
            <button
              onClick={() => navigateToSection(1)}
              className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 flex items-center mx-auto"
            >
              <span className="mr-2">Let's Connect</span>
              <ChevronDown className="h-5 w-5 group-hover:animate-bounce" />
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section className="h-screen flex items-center justify-center relative">
          <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
            {/* Header */}
            <div className="mb-12">
              <h2 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 mb-6 drop-shadow-2xl">
                Contact Mission
              </h2>
              <p className="text-xl text-blue-300 max-w-3xl mx-auto mb-8">
                Ready to explore the digital universe together? Launch a message my way through any of these cosmic channels!
              </p>
              
              {/* Current Time & Status */}
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Italy Time: {new Date().toLocaleString('en-US', {
                    timeZone: 'Europe/Rome',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-white">Online & Ready!</span>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 block"
                >
                  <div className="text-center">
                    <div className={`w-20 h-20 bg-gradient-to-r ${link.color} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                      <link.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{link.name}</h3>
                    <p className="text-purple-300 font-mono text-lg mb-3">{link.username}</p>
                    <div className="flex items-center justify-center text-blue-300 group-hover:text-white transition-colors">
                      <span className="mr-2">Connect</span>
                      <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Email Contact */}
            <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-md rounded-xl p-8 border border-purple-400/30 mb-12 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-purple-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Direct Message</h3>
              </div>
              <p className="text-purple-300 mb-4">For serious inquiries and collaborations</p>
              <a 
                href="mailto:ibraff739@gmail.com"
                className="inline-flex items-center bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105"
              >
                <Mail className="h-5 w-5 mr-2" />
                ibraff739@gmail.com
              </a>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={() => navigateToSection(0)}
              className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center mx-auto"
            >
              <ChevronUp className="h-5 w-5 group-hover:animate-bounce mr-2" />
              <span>Back to About</span>
            </button>
          </div>
        </section>
      </div>

      {/* Loading Overlay during transitions */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Navigating through space...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;