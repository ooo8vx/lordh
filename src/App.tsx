import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Instagram, Crown, User, Mail, ExternalLink, MapPin, Calendar, Clock, Globe, Star, Heart, Gamepad2, ChevronDown, ArrowDown } from 'lucide-react';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [avatarError, setAvatarError] = useState(false);
  
  const sectionsRef = useRef<HTMLDivElement>(null);
  
  // Using the uploaded images for each section
  const sections = [
    {
      id: 'welcome',
      background: '/بداية دخول copy.png',
      title: 'WELCOME TO LORD WORLD'
    },
    {
      id: 'about', 
      background: '/about copy.png',
      title: 'ABOUT ME'
    },
    {
      id: 'connect',
      background: '/صفحه تحت copy.png', 
      title: 'LET\'S CONNECT'
    }
  ];

  const avatarUrl = "/e9c4e804b0c546262bd2bc03f593648d.jpg";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      setIsScrolling(true);
      
      if (e.deltaY > 0 && currentSection < sections.length - 1) {
        // Scroll down
        setCurrentSection(prev => prev + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        // Scroll up
        setCurrentSection(prev => prev - 1);
      }
      
      setTimeout(() => setIsScrolling(false), 1000);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        setIsScrolling(true);
        setCurrentSection(prev => prev + 1);
        setTimeout(() => setIsScrolling(false), 1000);
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        setIsScrolling(true);
        setCurrentSection(prev => prev - 1);
        setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, isScrolling, sections.length]);

  const goToSection = (index: number) => {
    if (isScrolling || index === currentSection) return;
    setIsScrolling(true);
    setCurrentSection(index);
    setTimeout(() => setIsScrolling(false), 1000);
  };

  const socialLinks = [
    { 
      name: 'Discord', 
      icon: MessageCircle, 
      url: 'https://discord.com/users/1c.2', 
      color: 'hover:text-[#8B7355]',
      description: 'Chat with me on Discord',
      username: '1c.2'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://www.instagram.com/lordx679', 
      color: 'hover:text-[#A0956B]',
      description: 'Follow my daily life',
      username: '@lordx679'
    },
    { 
      name: 'Roblox', 
      icon: Gamepad2, 
      url: 'https://www.roblox.com/users/profile?username=aoufabok', 
      color: 'hover:text-[#C4B896]',
      description: 'Play games with me',
      username: 'aoufabok'
    },
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Discord',
      value: '1c.2',
      description: 'Chat with me anytime',
      color: 'from-[#8B7355] to-[#A0956B]',
      url: 'https://discord.com/users/1c.2'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      value: '@lordx679',
      description: 'Follow my daily adventures',
      color: 'from-[#A0956B] to-[#C4B896]',
      url: 'https://www.instagram.com/lordx679'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'ibraff739@gmail.com',
      description: 'Send me a message',
      color: 'from-[#C4B896] to-[#D4C5A9]',
      url: 'mailto:ibraff739@gmail.com'
    },
    {
      icon: Gamepad2,
      title: 'Roblox',
      value: 'aoufabok',
      description: 'Let\'s play together',
      color: 'from-[#8B7355] to-[#C4B896]',
      url: 'https://www.roblox.com/users/profile?username=aoufabok'
    }
  ];

  const interests = [
    { 
      category: 'Gaming', 
      items: ['Roblox', 'Mobile Games', 'Strategy Games', 'Adventure Games', 'Multiplayer'], 
      icon: Gamepad2, 
      color: 'from-[#F5F5F5] to-[#E8E8E8]',
      accent: '#8B7355'
    },
    { 
      category: 'Social Media', 
      items: ['Instagram Stories', 'Discord Communities', 'Content Creation', 'Photography', 'Memes'], 
      icon: Instagram, 
      color: 'from-[#F5F5F5] to-[#E8E8E8]',
      accent: '#A0956B'
    },
    { 
      category: 'Hobbies', 
      items: ['Music', 'Movies', 'Anime', 'Travel', 'Food'], 
      icon: Heart, 
      color: 'from-[#F5F5F5] to-[#E8E8E8]',
      accent: '#C4B896'
    },
  ];

  // Get current time in Italy
  const italyTime = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Rome',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const isOnline = () => {
    const now = new Date();
    const italyHour = parseInt(new Date().toLocaleString('en-US', {
      timeZone: 'Europe/Rome',
      hour: '2-digit',
      hour12: false
    }));
    const day = now.getDay();
    
    if (day === 0) return italyHour >= 12 && italyHour < 23;
    if (day === 6) return italyHour >= 10 && italyHour < 24;
    return italyHour >= 8 && italyHour < 23;
  };

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Background Images Container */}
      <div className="fixed inset-0">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSection 
                ? 'opacity-100 scale-100' 
                : index < currentSection 
                  ? 'opacity-0 scale-110 translate-y-[-10%]'
                  : 'opacity-0 scale-90 translate-y-[10%]'
            }`}
          >
            <img
              src={section.background}
              alt={`Background for ${section.title}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.warn(`Background image failed to load: ${section.background}`);
              }}
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSection 
                ? 'bg-white scale-125 shadow-[0_0_20px_rgba(255,255,255,0.5)]' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Sections Container */}
      <div 
        ref={sectionsRef}
        className="relative z-10 h-full"
        style={{
          transform: `translateY(-${currentSection * 100}vh)`,
          transition: 'transform 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      >
        {/* Welcome Section */}
        <section className="h-screen flex items-center justify-center relative">
          <div className="text-center">
            {/* Epic Crown Icon */}
            <div className="mb-8 relative">
              <div className="w-32 h-32 mx-auto mb-8 relative animate-bounce">
                <Crown className="w-full h-full text-white drop-shadow-2xl animate-pulse" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#A0956B] to-[#8B7355] rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-[#C4B896] to-[#A0956B] rounded-full animate-pulse delay-500"></div>
              </div>
            </div>

            {/* Epic Welcome Text */}
            <div className="space-y-8">
              <h1 className="text-6xl lg:text-8xl font-black text-white animate-pulse drop-shadow-2xl">
                WELCOME
              </h1>
              <div className="flex items-center justify-center space-x-6 text-4xl lg:text-6xl font-bold">
                <span className="text-white/90 animate-pulse delay-300">TO</span>
                <div className="relative">
                  <span className="text-white animate-pulse delay-500">
                    LORD
                  </span>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-ping"></div>
                </div>
              </div>
              <h2 className="text-5xl lg:text-7xl font-black text-white animate-pulse delay-700 drop-shadow-xl">
                WORLD
              </h2>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 animate-bounce">
              <button 
                onClick={() => goToSection(1)}
                className="text-white/80 hover:text-white transition-colors duration-300"
              >
                <ChevronDown className="w-8 h-8 mx-auto animate-pulse" />
                <p className="text-sm mt-2">Scroll Down</p>
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="h-screen flex items-center justify-center px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-8 relative">
                  <div className="w-full h-full bg-gradient-to-r from-[#8B7355] via-[#A0956B] to-[#C4B896] rounded-full p-1 animate-pulse">
                    <div className="w-full h-full bg-white/90 rounded-full flex items-center justify-center overflow-hidden relative">
                      {!avatarError ? (
                        <img 
                          src={avatarUrl} 
                          alt="LORDX679 Profile Avatar"
                          className="w-full h-full object-cover rounded-full"
                          onLoad={() => setAvatarError(false)}
                          onError={() => setAvatarError(true)}
                        />
                      ) : (
                        <Crown className="h-16 w-16 text-[#8B7355]" />
                      )}
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#A0956B] to-[#8B7355] rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black text-white mb-4 drop-shadow-2xl">
                  Hey, I'm <span className="text-[#C4B896]">LORD</span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 mb-6 drop-shadow-lg">
                  18 Years Old • Gamer • Content Creator
                </p>
              </div>

              {/* Personal Info */}
              <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-8 mb-8 shadow-2xl">
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                      <User className="h-6 w-6 mr-3 text-[#A0956B]" />
                      About Me
                    </h3>
                    <div className="space-y-3 text-white/90">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#A0956B] rounded-full mr-3"></div>
                        <span><strong className="text-white">Name:</strong> LORDX679</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-[#A0956B] mr-3" />
                        <span><strong className="text-white">Age:</strong> 18 years old</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-[#A0956B] mr-3" />
                        <span><strong className="text-white">Location:</strong> Italy</span>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 text-[#A0956B] mr-3" />
                        <span><strong className="text-white">Origin:</strong> Morocco</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">My Story</h3>
                    <p className="text-white/90 leading-relaxed text-sm">
                      Hey there! I'm LORD, an 18-year-old guy originally from Morocco but living in Italy. I love gaming, especially on Roblox where you can find me as aoufabok. When I'm not gaming, I'm probably scrolling through Instagram, chatting with friends on Discord, or just chilling and enjoying life.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {interests.map((interest, index) => (
                  <div key={index} className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-6 hover:border-[#A0956B] transition-all duration-300 shadow-2xl group">
                    <div className="flex items-center mb-4">
                      <interest.icon className="h-8 w-8 text-[#A0956B] mr-3" />
                      <h4 className="text-lg font-bold text-white">{interest.category}</h4>
                    </div>
                    <div className="space-y-2">
                      {interest.items.map((item, idx) => (
                        <div key={idx} className="text-white/90 text-sm flex items-center">
                          <div className="w-2 h-2 bg-[#C4B896] rounded-full mr-3"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll Indicator */}
              <div className="mt-12 animate-bounce">
                <button 
                  onClick={() => goToSection(2)}
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  <ChevronDown className="w-6 h-6 mx-auto animate-pulse" />
                  <p className="text-sm mt-2">Let's Connect</p>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <section className="h-screen px-6 py-20 flex items-center justify-center relative">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 drop-shadow-xl">
                Let's Be Friends!
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-lg">
                I'm always excited to meet new people and make friends from around the world! 
                Hit me up on any of these platforms - I'm pretty active and love chatting.
              </p>
              
              {/* Current Time & Status */}
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-[#A0956B]" />
                  <span className="text-white/90">Italy Time: {italyTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isOnline() ? 'bg-[#A0956B] animate-pulse' : 'bg-[#C4B896]'}`}></div>
                  <span className="text-white/90">
                    {isOnline() ? 'Online & Ready to Chat!' : 'Probably Sleeping 😴'}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Methods Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-6 hover:border-[#A0956B] transition-all duration-300 shadow-2xl group hover:scale-105 block"
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}>
                      <method.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                    <p className="text-white/90 font-mono text-sm mb-2">{method.value}</p>
                    <p className="text-white/70 text-xs">{method.description}</p>
                    <div className="mt-3 flex items-center justify-center">
                      <ExternalLink className="h-4 w-4 text-[#A0956B] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <div className="text-center">
              <button 
                onClick={() => goToSection(0)}
                className="text-white/80 hover:text-white transition-colors duration-300 animate-bounce"
              >
                <ArrowDown className="w-6 h-6 mx-auto rotate-180 animate-pulse" />
                <p className="text-sm mt-2">Back to Top</p>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;