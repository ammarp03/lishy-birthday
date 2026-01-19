import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const App = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const { completed, days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="page">
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />
      <div className="bg-glow bg-glow-3" />

      <FloatingHeart delay={0} size={18} x={-100} duration={7} />
      <FloatingHeart delay={2} size={22} x={-40} duration={8} />
      <FloatingHeart delay={1.5} size={16} x={60} duration={6} />
      <FloatingHeart delay={3} size={20} x={120} duration={7.5} />

      <motion.main
        className="card"
        initial={{ y: 40, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="badge"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 180, damping: 12 }}
        >
          For my beautiful fiancé, Lishyy
        </motion.div>

        <motion.h1
          className="title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Birthday Countdown
        </motion.h1>

        <p className="subtitle">
          I can&apos;t wait to celebrate you,{" "}
          <span className="highlight">Lishyy</span>, on{" "}
          <span className="highlight">22 January 2026</span>.
        </p>

        <div className="timer-wrapper">
          {completed ? (
            <motion.div
              className="completed-message"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 170, damping: 14 }}
            >
              <div className="completed-emoji">🎉</div>
              <div className="completed-text">
                Happy Birthday, my dearest Lishyy!
              </div>
              <div className="completed-sub">
                Let&apos;s make every second unforgettable. 💖
              </div>
            </motion.div>
          ) : (
            <div className="timer-grid">
              <FlipUnit label="Days" value={days} />
              <FlipUnit label="Hours" value={hours} />
              <FlipUnit label="Minutes" value={minutes} />
              <FlipUnit label="Seconds" value={seconds} />
            </div>
          )}
        </div>

        <motion.p
          className="footer-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          With every tick, my love for you grows a little more. 💗
        </motion.p>
      </motion.main>
    </div>
  );
};

export default App;

