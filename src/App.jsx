import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PreviewPage from "./PreviewPage";

const TARGET_DATE = new Date("2026-01-22T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();


  
  if (diff <= 0) {
    return {
      completed: true,
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n) => String(n).padStart(2, "0");

  return {
    completed: false,
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

const FlipUnit = ({ label, value }) => {
  return (
    <div className="time-unit">
      <div className="time-unit-inner">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ y: 20, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: -20, opacity: 0, rotateX: 90 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="time-value"
          >
            {value}
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="time-label">{label}</span>
    </div>
  );
};

const FloatingHeart = ({ delay, size, x, duration }) => {
  return (
    <motion.div
      className="floating-heart"
      initial={{ opacity: 0, y: 40, x }}
      animate={{
        opacity: [0, 1, 0],
        y: [-10, -80, -140],
        x: [x, x + 10, x - 10],
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeOut",
      }}
      style={{ fontSize: size }}
    >
      ♥
    </motion.div>
  );
};

const FireworkParticle = ({ angle, distance, color, delay, index }) => {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  const particleDelay = delay + (index * 0.01);
  const duration = 0.9 + Math.random() * 0.5;
  
  return (
    <motion.div
      className="firework-particle"
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{
        x: x,
        y: y,
        opacity: [0, 1, 1, 0.8, 0],
        scale: [0, 1.2, 1, 0.6, 0],
      }}
      transition={{
        delay: particleDelay,
        duration: duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        backgroundColor: color,
        boxShadow: `0 0 8px ${color}, 0 0 16px ${color}, 0 0 24px ${color}`,
      }}
    />
  );
};

const Firework = ({ delay, x, explodeHeight }) => {
  const colors = [
    "#FFD700", // Gold
    "#FF6B9D", // Pink
    "#C77DFF", // Purple
    "#4ECDC4", // Cyan
    "#FFB347", // Orange
    "#FF69B4", // Hot Pink
    "#FF1493", // Deep Pink
    "#FFD700", // Gold
  ];
  
  const particleCount = 25 + Math.floor(Math.random() * 20);
  const particles = Array.from({ length: particleCount }).map((_, i) => {
    const angle = (i / particleCount) * Math.PI * 2;
    const distance = 100 + Math.random() * 80;
    const color = colors[Math.floor(Math.random() * colors.length)];
    return { angle, distance, color };
  });

  return (
    <div className="firework-container" style={{ left: `${x}%` }}>
      {/* Rocket trail shooting up */}
      <motion.div
        className="firework-rocket"
        initial={{ y: "110vh", opacity: 0 }}
        animate={{
          y: `${explodeHeight}vh`,
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          delay: delay,
          duration: 0.8,
          ease: "easeOut",
        }}
      />
      
      {/* Explosion particles */}
      <motion.div
        className="firework-explosion"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.5, 1],
          opacity: [0, 1, 0],
        }}
        transition={{
          delay: delay + 0.8,
          duration: 0.6,
          ease: "easeOut",
        }}
        style={{ top: `${explodeHeight}vh` }}
      >
        {particles.map((particle, i) => (
          <FireworkParticle
            key={i}
            angle={particle.angle}
            distance={particle.distance}
            color={particle.color}
            delay={delay + 0.8}
            index={i}
          />
        ))}
      </motion.div>
    </div>
  );
};

const FallingEmoji = ({ delay, x, emoji, size }) => {
  return (
    <motion.div
      className="falling-emoji"
      initial={{ y: -30, opacity: 0, rotate: 0 }}
      animate={{
        y: "110vh",
        opacity: [0, 1, 1, 0],
        rotate: [0, 15, -15, 0],
      }}
      transition={{
        delay,
        duration: 2.5,
        ease: "easeIn",
      }}
      style={{ left: `${x}%`, fontSize: `${size}px` }}
    >
      {emoji}
    </motion.div>
  );
};

const HelloKittyScene = () => {
  return (
    <div className="hk-wrapper">
      <div className="hk-container">
        <div className="hk-hello-kitty" />
        <div className="hk-eye-container">
          <div className="hk-eye hk-left-eye" />
          <div className="hk-eye hk-right-eye" />
        </div>
        <div className="hk-nose" />
        <div className="hk-whisker hk-w1" />
        <div className="hk-whisker hk-w2" />
        <div className="hk-whisker hk-w3" />
        <div className="hk-whisker hk-w4" />
        <div className="hk-whisker hk-w5" />
        <div className="hk-whisker hk-w6" />
        <div className="hk-ear hk-left-ear" />
        <div className="hk-ear hk-right-ear" />
        <div className="hk-bow hk-bow-center" />
        <div className="hk-bow hk-bow-left" />
        <div className="hk-bow hk-bow-right" />
        <div className="hk-bow hk-bow-detail-left" />
        <div className="hk-bow hk-bow-detail-right" />
        <div className="hk-ear-detail hk-ear-detail-left" />
        <div className="hk-ear-detail hk-ear-detail-right" />
        <div className="hk-ear-line" />
      </div>
    </div>
  );
};

const BirthdaySequence = () => {
  const [step, setStep] = useState(0);

  const advance = () => {
    setStep((prev) => (prev >= 4 ? 4 : prev + 1));
  };

  return (
    <motion.div
      className="birthday-sequence"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="birthday-flip"
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={advance}
        >
          {step === 0 && (
            <div className="birthday-card">
              <div className="birthday-card-header">Happy Birthday, Lishyy 💖</div>
              <div className="birthday-card-body">
                May your day and night sooooo sweeeets as you are. 
              </div>
              <div className="birthday-card-footer">
                I&apos;m so grateful for every moment with you.
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="birthday-cake-scene">
              <div className="cake">
                <div className="cake-top" />
                <div className="cake-body">
                  <div className="cake-drip cake-drip-1" />
                  <div className="cake-drip cake-drip-2" />
                  <div className="cake-drip cake-drip-3" />
                </div>
                <div className="cake-base" />
                <div className="candle candle-1">
                  <div className="candle-flame" />
                </div>
                <div className="candle candle-2">
                  <div className="candle-flame" />
                </div>
                <div className="candle candle-3">
                  <div className="candle-flame" />
                </div>
              </div>
              <p className="cake-text">Make a wish, my beautiful birthday girl 🎂</p>
            </div>
          )}

          {step === 2 && (
            <div className="hello-kitty-scene">
              <HelloKittyScene />
              <p className="kitty-caption">Hello Kitty wishes you the cutest year ever 💕</p>
            </div>
          )}

          {step === 3 && (
            <div className="mini-memory-lane">
              <h3 className="mini-memory-title">Tiny lane of our memories ✨</h3>
              <div className="mini-memory-grid">
                <div className="mini-memory-card mini-memory-1">
                  <div className="mini-memory-photo mini-memory-photo-1" />
                  <div className="mini-memory-caption">
                    Late–night talks and sleepy smiles.
                  </div>
                </div>
                <div className="mini-memory-card mini-memory-2">
                  <div className="mini-memory-photo mini-memory-photo-2" />
                  <div className="mini-memory-caption">
                    Your laugh that makes my whole day glow.
                  </div>
                </div>
                <div className="mini-memory-card mini-memory-3">
                  <div className="mini-memory-photo mini-memory-photo-3" />
                  <div className="mini-memory-caption">
                    All the little moments I never want to forget.
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="love-letter-scene">
              <div className="love-letter-card">
                <div className="love-letter-header">A tiny letter for you 💌</div>
                <p className="love-letter-body">
                  My sweetest Lishyy, thank you for being the softest part of my world.
                  You turn ordinary days into little pieces of magic just by being in them.
                  I&apos;m so proud of the person you are and so lucky I get to love you.
                </p>
                <p className="love-letter-footer">
                  Today, tomorrow, and all the years to come — I&apos;ll always choose you. 💗
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {step < 4 && (
        <p className="flip-hint">Tap the card to flip to the next surprise ✨</p>
      )}
      {step === 4 && (
        <p className="flip-hint">You reached the last page of your birthday book 💖</p>
      )}
    </motion.div>
  );
};

const App = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [showCounter, setShowCounter] = useState(false);
  const [fireworkRun, setFireworkRun] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Sequence: Fireworks + hearts first, then counter card fades in shortly after
    const timer = setTimeout(() => {
      setShowCounter(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // After the counter shows, keep launching fireworks in the background
  useEffect(() => {
    if (!showCounter) return;
    const interval = setInterval(() => {
      setFireworkRun((prev) => prev + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, [showCounter]);

  const { completed, days, hours, minutes, seconds } = timeLeft;
  const isCompleted = completed;

  const fireworkPositions = [
    // Heights set to explode at the top/header area (15-25vh is near the top of screen)
    { x: 15, height: 18 },
    { x: 35, height: 22 },
    { x: 55, height: 20 },
    { x: 75, height: 24 },
    { x: 25, height: 19 },
    { x: 45, height: 21 },
    { x: 65, height: 17 },
    { x: 85, height: 23 },
  ];
  const emojis = ["💖", "💗", "💕", "💓", "💝", "💞", "💟", "❤️", "🧡", "💛", "💚", "💙", "💜", "🤍", "🩷", "🩵"];

  return (
    <div className="page">
      {/* Night Sky Background - shows during fireworks */}
      <AnimatePresence>
        {!showCounter && (
          <motion.div
            className="night-sky"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Stars */}
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0.5, 1],
                  scale: [0.5, 1, 0.8, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pink Background - shows after fireworks, hidden when preview */}
      <AnimatePresence>
        {showCounter && !isCompleted && (
          <>
            <motion.div
              className="bg-glow bg-glow-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className="bg-glow bg-glow-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1 }}
            />
            <motion.div
              className="bg-glow bg-glow-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Intro Fireworks Phase (before counter shows) */}
      <AnimatePresence>
        {!showCounter && (
          <>
            {fireworkPositions.map((pos, i) => (
              <Firework
                key={`firework-${i}`}
                delay={i * 0.2}
                x={pos.x}
                explodeHeight={pos.height}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Continuous Fireworks Phase (after counter shows) - hidden when preview */}
      {showCounter && !isCompleted && (
        <>
          {fireworkPositions.map((pos, i) => (
            <Firework
              key={`firework-loop-${fireworkRun}-${i}`}
              delay={i * 0.18}
              x={pos.x}
              explodeHeight={pos.height}
            />
          ))}
        </>
      )}

      {/* Hearts/Emojis Phase (full-screen rain before counter) */}
      <AnimatePresence>
        {!showCounter && (
          <>
            {Array.from({ length: 50 }).map((_, i) => {
              const emoji = emojis[i % emojis.length];
              const x = 5 + Math.random() * 90; // spread across the width
              const delay = 2 + Math.random() * 0.7; // all around the same time
              const size = 22 + Math.random() * 18;

              return (
                <FallingEmoji
                  key={`emoji-${i}`}
                  delay={delay}
                  x={x}
                  emoji={emoji}
                  size={size}
                />
              );
            })}
          </>
        )}
      </AnimatePresence>

      {/* Soft decorative belt of hearts/sparkles above the card (only before counter appears) */}
      {!showCounter && (
        <div className="midline-decor">
          <motion.span
            className="midline-heart"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            💗
          </motion.span>
          <motion.span
            className="midline-sparkle"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.span>
          <motion.span
            className="midline-heart"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            🩷
          </motion.span>
          <motion.span
            className="midline-sparkle"
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.span>
          <motion.span
            className="midline-heart"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            💝
          </motion.span>
        </div>
      )}

      {/* Beautiful floating decorations above the card - hidden when preview */}
      {showCounter && !isCompleted && (
        <>
          {/* Floating hearts in upper area */}
          <motion.div
            className="upper-decor-heart"
            style={{ left: "10%", top: "15%" }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.6, 1, 0.6],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💖
          </motion.div>
          <motion.div
            className="upper-decor-heart"
            style={{ left: "25%", top: "12%" }}
            animate={{
              y: [0, 12, 0],
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            💗
          </motion.div>
          <motion.div
            className="upper-decor-sparkle"
            style={{ left: "40%", top: "18%" }}
            animate={{
              rotate: [0, 360],
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="upper-decor-heart"
            style={{ left: "55%", top: "14%" }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            💕
          </motion.div>
          <motion.div
            className="upper-decor-sparkle"
            style={{ left: "70%", top: "16%" }}
            animate={{
              rotate: [360, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "linear",
              delay: 0.8,
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="upper-decor-heart"
            style={{ left: "85%", top: "13%" }}
            animate={{
              y: [0, 14, 0],
              opacity: [0.7, 1, 0.7],
              scale: [0.95, 1.1, 0.95],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            💝
          </motion.div>
          <motion.div
            className="upper-decor-sparkle"
            style={{ left: "50%", top: "10%" }}
            animate={{
              rotate: [0, -360],
              opacity: [0.4, 1, 0.4],
              scale: [0.9, 1.4, 0.9],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "linear",
              delay: 2,
            }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="upper-decor-heart"
            style={{ left: "20%", top: "20%" }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.18, 1],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
          >
            🩷
          </motion.div>
          <motion.div
            className="upper-decor-heart"
            style={{ left: "75%", top: "19%" }}
            animate={{
              y: [0, 11, 0],
              opacity: [0.65, 1, 0.65],
              scale: [0.92, 1.12, 0.92],
            }}
            transition={{
              duration: 4.1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
          >
            💞
          </motion.div>
        </>
      )}

      {/* Continuous floating hearts (only after counter shows) - hidden when preview */}
      {showCounter && !isCompleted && (
        <>
          <FloatingHeart delay={0} size={18} x={-120} duration={7} />
          <FloatingHeart delay={1.2} size={24} x={-40} duration={8} />
          <FloatingHeart delay={2.1} size={16} x={40} duration={6.5} />
          <FloatingHeart delay={3} size={22} x={120} duration={7.8} />
          <FloatingHeart delay={4} size={14} x={0} duration={9} />
        </>
      )}

      {/* Beautiful Intro Message - shows before counter card */}
      <AnimatePresence>
        {!showCounter && (
          <motion.div
            className="intro-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="intro-sparkle intro-sparkle-1"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ✨
            </motion.div>
            <motion.div
              className="intro-sparkle intro-sparkle-2"
              animate={{
                rotate: [360, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Countdown card - hidden when countdown reaches 00 (PreviewPage shown) */}
      {!isCompleted && (
        <motion.main
          className="card"
          initial={{ y: 40, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: showCounter ? 0 : 2.5 }}
        >
          <div className="card-top-decor">
            <span className="card-top-heart card-top-heart-left">♥</span>
            <span className="card-top-gem" />
            <span className="card-top-heart card-top-heart-right">♥</span>
          </div>

          {showCounter && (
            <>
              <AnimatePresence>
                <motion.div
                  className="badge"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0, type: "spring", stiffness: 180, damping: 12 }}
                >
                  For my beautiful fiancé, Lishyy
                </motion.div>

                <motion.h1
                  className="title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Birthday Countdown
                </motion.h1>
              </AnimatePresence>

              <AnimatePresence>
                <motion.p
                  className="subtitle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  I can&apos;t wait to celebrate you,{" "}
                  <span className="highlight">Lishyy</span>, on{" "}
                  <span className="highlight">22 January 2026</span>.
                </motion.p>

                <motion.div
                  className="timer-wrapper"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="timer-grid">
                    <FlipUnit label="Days" value={days} />
                    <FlipUnit label="Hours" value={hours} />
                    <FlipUnit label="Minutes" value={minutes} />
                    <FlipUnit label="Seconds" value={seconds} />
                  </div>
                </motion.div>

                <motion.p
                  className="footer-text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  With every tick, my love for you grows a little more. 💗
                </motion.p>
              </AnimatePresence>
            </>
          )}
        </motion.main>
      )}

      {/* Full-screen preview page - after countdown reaches 00 or Preview clicked */}
      {isCompleted && <PreviewPage />}
    </div>
  );
};

export default App;

