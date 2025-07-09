import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Instagram, Crown, User, Mail, ExternalLink, MapPin, Calendar, Clock, Globe, Star, Heart, Gamepad2 } from 'lucide-react';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSection, setActiveSection] = useState('welcome');
  const [showWelcome, setShowWelcome] = useState(true);
  const [avatarError, setAvatarError] = useState(false);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  // Video and image sources for background layers
  const backgroundSources = [
    {
      type: 'video',
      src: '/17270763732c982a1836532b7914e140.mp4',
      fallback: '/024f845f1dbf248621a433dce06ea430.jpg'
    },
    {
      type: 'image',
      src: '/3ea924d3393e0659d73e9a979ba41cc6.jpg'
    },
    {
      type: 'image', 
      src: '/89979609050524570116e185df099b71.jpg'
    },
    {
      type: 'image',
      src: '/e9c4e804b0c546262bd2bc03f593648d.jpg'
    }
  ];

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  
  // Using the uploaded avatar image
  const avatarUrl = "/e9c4e804b0c546262bd2bc03f593648d.jpg";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Auto transition from welcome screen after 4 seconds
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
      setActiveSection('about');
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  // Background transition effect
  useEffect(() => {
    if (!showWelcome) {
      const backgroundTimer = setInterval(() => {
        setCurrentBackgroundIndex((prevIndex) => 
          (prevIndex + 1) % backgroundSources.length
        );
      }, 8000); // Change background every 8 seconds

      return () => clearInterval(backgroundTimer);
    }
  }, [showWelcome, backgroundSources.length]);

  // Video playback management
  useEffect(() => {
    backgroundSources.forEach((source, index) => {
      if (source.type === 'video' && videoRefs.current[index]) {
        const video = videoRefs.current[index];
        if (video) {
          if (index === currentBackgroundIndex && !videoError) {
            video.play().catch((error) => {
              console.warn('Video playback failed:', error);
              setVideoError(true);
            });
          } else {
            video.pause();
          }
        }
      }
    });
  }, [currentBackgroundIndex, videoError]);

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
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // More relaxed online hours for personal site
    if (day === 0) return italyHour >= 12 && italyHour < 23; // Sunday
    if (day === 6) return italyHour >= 10 && italyHour < 24; // Saturday
    return italyHour >= 8 && italyHour < 23; // Monday-Friday
  };

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-[#D4C5A9] flex items-center justify-center relative overflow-hidden">
        {/* Epic Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4C5A9] via-[#F5F5F5] to-[#D4C5A9]"></div>
          
          {/* Floating Particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#8B7355] rounded-full animate-ping opacity-70"></div>
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-[#A0956B] rounded-full animate-pulse opacity-60"></div>
          <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-[#C4B896] rounded-full animate-bounce opacity-50"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-[#8B7355] rounded-full animate-ping opacity-80"></div>
          
          {/* Epic Glow Effects */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B7355]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#A0956B]/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-[#C4B896]/5 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        {/* Welcome Content */}
        <div className="relative z-10 text-center">
          {/* Legendary Crown Icon */}
          <div className="mb-8 relative">
            <div className="w-24 h-24 mx-auto mb-6 relative animate-bounce">
              <Crown className="w-full h-full text-[#8B7355] drop-shadow-2xl animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#A0956B] to-[#8B7355] rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-[#C4B896] to-[#A0956B] rounded-full animate-pulse delay-500"></div>
            </div>
          </div>

          {/* Epic Welcome Text */}
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8B7355] via-[#A0956B] to-[#8B7355] animate-pulse drop-shadow-2xl">
              WELCOME
            </h1>
            <div className="flex items-center justify-center space-x-4 text-4xl lg:text-6xl font-bold">
              <span className="text-[#C4B896] animate-pulse delay-300">TO</span>
              <div className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A0956B] via-[#8B7355] to-[#A0956B] animate-pulse delay-500">
                  LORD
                </span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#8B7355] rounded-full animate-ping"></div>
              </div>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C4B896] via-[#8B7355] to-[#C4B896] animate-pulse delay-700 drop-shadow-xl">
              WORLD
            </h2>
          </div>

          {/* Loading Animation */}
          <div className="mt-12">
            <div className="w-64 h-1 bg-[#C4B896] rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#8B7355] via-[#A0956B] to-[#C4B896] rounded-full animate-pulse transform origin-left scale-x-0 animate-[scaleX_4s_ease-in-out_forwards]"></div>
            </div>
            <p className="text-[#8B7355] text-sm mt-4 animate-pulse delay-1000">Entering my personal space...</p>
          </div>
        </div>

        {/* Epic Border Effects */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B7355] to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#A0956B] to-transparent animate-pulse delay-500"></div>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#C4B896] to-transparent animate-pulse delay-1000"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#8B7355] to-transparent animate-pulse delay-1500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#8B7355] relative overflow-hidden">
      {/* Multi-layered Background System */}
      <div className="fixed inset-0">
        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F5F5] via-[#D4C5A9] to-[#F5F5F5] z-0"></div>
        
        {/* Background layers (videos and images) */}
        {backgroundSources.map((source, index) => (
          <div key={index} className="absolute inset-0">
            {source.type === 'video' ? (
              <>
                {/* Video element */}
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentBackgroundIndex && !videoError ? 'opacity-100 z-10' : 'opacity-0 z-5'
                  }`}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedData={() => {
                    setIsVideoLoaded(true);
                    console.log('Video loaded successfully');
                  }}
                  onError={(e) => {
                    console.warn('Video failed to load:', e);
                    setVideoError(true);
                  }}
                >
                  <source src={source.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Fallback image for video */}
                {(videoError || !isVideoLoaded) && source.fallback && (
                  <img
                    src={source.fallback}
                    alt="Background"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentBackgroundIndex ? 'opacity-100 z-10' : 'opacity-0 z-5'
                    }`}
                    onError={(e) => {
                      console.warn('Fallback image failed to load:', e);
                    }}
                  />
                )}
              </>
            ) : (
              /* Image element */
              <img
                ref={(el) => (imageRefs.current[index] = el)}
                src={source.src}
                alt="Background"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentBackgroundIndex ? 'opacity-100 z-10' : 'opacity-0 z-5'
                }`}
                onError={(e) => {
                  console.warn('Background image failed to load:', e);
                }}
              />
            )}
          </div>
        ))}

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 z-20"></div>
        
        {/* Atmospheric effects */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#8B7355]/10 rounded-full blur-3xl animate-pulse z-25"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#A0956B]/15 rounded-full blur-2xl z-25"></div>
        <div className="absolute top-1/4 left-1/2 w-32 h-32 bg-[#C4B896]/10 rounded-full blur-xl animate-bounce z-25"></div>
      </div>

      {/* Loading indicator */}
      {!isVideoLoaded && !videoError && (
        <div className="fixed top-4 right-4 z-50 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
          Loading background...
        </div>
      )}

      {/* Legendary Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#8B7355] to-[#A0956B] rounded-lg flex items-center justify-center relative">
                <Crown className="h-6 w-6 text-[#F5F5F5]" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#C4B896] rounded-full animate-ping"></div>
              </div>
              <span className="text-2xl font-black text-white drop-shadow-lg">LORDX679</span>
            </div>
            <div className="flex items-center space-x-8">
              {['about', 'connect'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-sm font-bold transition-all duration-300 capitalize relative ${
                    activeSection === section 
                      ? 'text-white border-b-2 border-[#A0956B]' 
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {section}
                  {activeSection === section && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#A0956B] rounded-full animate-ping"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 relative z-30">
        {/* About Section */}
        {activeSection === 'about' && (
          <div className="min-h-screen flex items-center justify-center px-6 py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="mb-8">
                  <div className="w-32 h-32 mx-auto mb-8 relative">
                    <div className="w-full h-full bg-gradient-to-r from-[#8B7355] via-[#A0956B] to-[#C4B896] rounded-full p-1 animate-pulse">
                      <div className="w-full h-full bg-white/90 rounded-full flex items-center justify-center overflow-hidden relative">
                        {/* Avatar Image */}
                        {!avatarError ? (
                          <img 
                            src={avatarUrl} 
                            alt="LORDX679 Profile Avatar"
                            className="w-full h-full object-cover rounded-full"
                            onLoad={() => {
                              console.log('Avatar loaded successfully');
                              setAvatarError(false);
                            }}
                            onError={(e) => {
                              console.log('Avatar failed to load, showing crown fallback');
                              setAvatarError(true);
                            }}
                          />
                        ) : (
                          /* Crown Fallback */
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
                  
                  {/* Quick Contact Info */}
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80 mb-4">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>Discord: 1c.2</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Instagram className="h-4 w-4" />
                      <span>Instagram: @lordx679</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Gamepad2 className="h-4 w-4" />
                      <span>Roblox: aoufabok</span>
                    </div>
                  </div>
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
                        Hey there! I'm LORD, an 18-year-old guy originally from Morocco but living in Italy. I love gaming, especially on Roblox where you can find me as aoufabok. When I'm not gaming, I'm probably scrolling through Instagram, chatting with friends on Discord, or just chilling and enjoying life. I'm always up for meeting new people and having fun conversations. Feel free to hit me up on any of my socials - I'm pretty active and love connecting with new friends from around the world!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <button 
                    onClick={() => setActiveSection('connect')}
                    className="px-8 py-3 border border-[#A0956B] text-white font-bold rounded-lg hover:bg-gradient-to-r hover:from-[#A0956B] hover:to-[#C4B896] hover:border-transparent transition-all duration-300 shadow-xl backdrop-blur-sm"
                  >
                    Let's Connect!
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {interests.map((interest, index) => (
                  <div key={index} className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-6 hover:border-[#A0956B] hover:shadow-[0_0_30px_rgba(139,115,85,0.2)] transition-all duration-300 shadow-2xl group relative overflow-hidden">
                    {/* Accent glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300`} style={{background: `linear-gradient(135deg, ${interest.accent}20, transparent)`}}></div>
                    <div className="flex items-center mb-4">
                      <interest.icon className={`h-8 w-8 text-[#A0956B] mr-3 group-hover:transition-colors relative z-10`} style={{color: `var(--hover-color, #A0956B)`}} onMouseEnter={(e) => e.currentTarget.style.setProperty('--hover-color', interest.accent)} onMouseLeave={(e) => e.currentTarget.style.setProperty('--hover-color', '#A0956B')} />
                      <h4 className="text-lg font-bold text-white relative z-10">{interest.category}</h4>
                    </div>
                    <div className="space-y-2 relative z-10">
                      {interest.items.map((item, idx) => (
                        <div key={idx} className="text-white/90 text-sm flex items-center">
                          <div className={`w-2 h-2 bg-[#C4B896] group-hover:transition-colors rounded-full mr-3`} style={{backgroundColor: `var(--dot-color, #C4B896)`}} onMouseEnter={(e) => e.currentTarget.style.setProperty('--dot-color', interest.accent)} onMouseLeave={(e) => e.currentTarget.style.setProperty('--dot-color', '#C4B896')}></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Connect Section */}
        {activeSection === 'connect' && (
          <div className="min-h-screen px-6 py-20">
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
                    <div className={`w-3 h-3 rounded-full ${isOnline() ? 'bg-[#A0956B] animate-pulse shadow-[0_0_10px_rgba(160,149,107,0.5)]' : 'bg-[#C4B896] shadow-[0_0_10px_rgba(196,184,150,0.3)]'}`}></div>
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
                      <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,115,85,0.3)] transition-all duration-300`}>
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

              {/* Main Content Grid */}
              <div className="max-w-4xl mx-auto">
                {/* Social Media Links */}
                <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-2xl">
                  <div className="flex items-center mb-4">
                    <Globe className="h-6 w-6 text-[#A0956B] mr-3" />
                    <h3 className="text-xl font-bold text-white">Find Me Online</h3>
                  </div>
                  <div className="space-y-4">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 group"
                      >
                        <div className="flex items-center space-x-3">
                          <link.icon className={`h-5 w-5 text-[#A0956B] transition-colors`} style={{color: `var(--icon-color, #A0956B)`}} onMouseEnter={(e) => {
                            const color = link.name === 'Discord' ? '#8B7355' : link.name === 'Instagram' ? '#A0956B' : '#C4B896';
                            e.currentTarget.style.setProperty('--icon-color', color);
                          }} onMouseLeave={(e) => e.currentTarget.style.setProperty('--icon-color', '#A0956B')} />
                          <div>
                            <span className="text-white font-medium">{link.name}</span>
                            <p className="text-white/70 text-xs">{link.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white text-sm font-bold">{link.username}</span>
                          <ExternalLink className="h-4 w-4 text-[#A0956B] group-hover:text-white transition-colors" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;