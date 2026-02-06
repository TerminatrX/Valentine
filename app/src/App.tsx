import { useState, useEffect, useCallback } from 'react';
import { Heart, Sparkles } from 'lucide-react';

// Edit these to change the messages on the page
const MESSAGES = {
  titleLine1: 'Will You Be My',
  titleLine2: 'Valentine, Kathy Ly Dang? 💕',
  yesButton: 'Yes! ❤️',
  noButtonTexts: [
    'No',
    'Are you sure?',
    'Really?',
    'Think again!',
    'Last chance!',
    'Pretty please?',
    "Don't do this!",
    'My heart! 💔',
    'Nooo!',
    'Please? 🥺',
  ],
  hint: {
    default: 'Try clicking "No"... if you can! 😏',
    gettingHarder: "Getting harder, isn't it? 😄",
    persistent: "You're persistent! But... 🤭",
    justSayYes: 'Just say Yes already! 💝',
  },
  success: {
    heading: 'Yaaay! 🎉',
    subheading: 'You said YES! 💕',
    paragraph1: "You've made me the happiest person in the world!",
    paragraph2: "I can't wait to spend Valentine's Day with you! 💖",
    footer: 'Love you to the moon and back! 🌙✨',
  },
};

interface HeartParticle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  color: string;
  rotation: number;
}

function App() {
  const [saidYes, setSaidYes] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  // Generate floating hearts on mount
  useEffect(() => {
    const generatedHearts: HeartParticle[] = [];
    const colors = ['#ff6b6b', '#ff8e8e', '#ffb4b4', '#ff4757', '#ff3838'];
    
    for (let i = 0; i < 25; i++) {
      generatedHearts.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: 15 + Math.random() * 30,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setHearts(generatedHearts);
  }, []);

  // Generate confetti when she says yes
  useEffect(() => {
    if (saidYes) {
      const generatedConfetti: ConfettiPiece[] = [];
      const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff6b9d', '#c44569'];
      
      for (let i = 0; i < 50; i++) {
        generatedConfetti.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
        });
      }
      setConfetti(generatedConfetti);
      
      setTimeout(() => setShowMessage(true), 500);
    }
  }, [saidYes]);

  const moveNoButton = useCallback(() => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 80;
    
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    
    setNoButtonPosition({ x: newX, y: newY });
    setHoverCount((prev) => prev + 1);
  }, []);

  const handleYesClick = () => {
    setSaidYes(true);
  };

  const getNoButtonText = () => {
    return MESSAGES.noButtonTexts[Math.min(hoverCount, MESSAGES.noButtonTexts.length - 1)];
  };

  return (
    <div className="min-h-screen valentine-gradient relative overflow-hidden flex items-center justify-center">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute heart-float"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            <Heart
              size={heart.size}
              fill={heart.color}
              color={heart.color}
              style={{ opacity: 0.4 }}
            />
          </div>
        ))}
      </div>

      {/* Confetti Celebration */}
      {saidYes && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className="absolute confetti"
              style={{
                left: `${piece.left}%`,
                animationDelay: `${piece.delay}s`,
                transform: `rotate(${piece.rotation}deg)`,
              }}
            >
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: piece.color }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Main Card */}
      <div className="relative z-10">
        {!saidYes ? (
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-md mx-4 shadow-2xl bounce-in">
            {/* Header with floating hearts */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Heart
                  size={80}
                  className="text-red-500 heart-pulse"
                  fill="#ff6b6b"
                />
                <Sparkles
                  size={24}
                  className="absolute -top-2 -right-2 text-yellow-400 sparkle"
                  style={{ animationDelay: '0.3s' }}
                />
                <Sparkles
                  size={18}
                  className="absolute -bottom-1 -left-3 text-pink-400 sparkle"
                  style={{ animationDelay: '0.6s' }}
                />
              </div>
            </div>

            {/* Question */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {MESSAGES.titleLine1}
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-red-500 mb-8">
              {MESSAGES.titleLine2}
            </h2>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center min-h-[120px]">
              {/* Yes Button */}
              <button
                onClick={handleYesClick}
                className="yes-button px-10 py-4 rounded-full text-white font-bold text-xl min-w-[140px]"
              >
                {MESSAGES.yesButton}
              </button>

              {/* No Button - The runaway button! */}
              <button
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="no-button px-8 py-4 rounded-full text-white font-semibold text-lg min-w-[120px] relative"
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                }}
              >
                {getNoButtonText()}
              </button>
            </div>

            {/* Playful hint */}
            <p className="text-gray-500 text-sm mt-6 italic">
              {hoverCount === 0 
                ? MESSAGES.hint.default 
                : hoverCount < 3 
                ? MESSAGES.hint.gettingHarder 
                : hoverCount < 6 
                ? MESSAGES.hint.persistent 
                : MESSAGES.hint.justSayYes}
            </p>
          </div>
        ) : (
          /* Success Screen */
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-lg mx-4 shadow-2xl bounce-in">
            {/* Big Heart */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Heart
                  size={100}
                  className="text-red-500 heart-pulse"
                  fill="#ff3838"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl">❤️</span>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {showMessage && (
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                  {MESSAGES.success.heading}
                </h1>
                <p className="text-2xl text-red-500 font-semibold">
                  {MESSAGES.success.subheading}
                </p>
                <div className="py-4">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {MESSAGES.success.paragraph1}
                  </p>
                  <p className="text-gray-600 text-lg mt-2">
                    {MESSAGES.success.paragraph2}
                  </p>
                </div>
                
                {/* Cute footer */}
                <div className="pt-4 border-t border-pink-200">
                  <p className="text-pink-500 font-medium">
                    {MESSAGES.success.footer}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 pointer-events-none">
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              size={16}
              fill="#ff6b6b"
              color="#ff6b6b"
              className="sparkle"
              style={{ 
                animationDelay: `${i * 0.2}s`,
                opacity: 0.5 
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
