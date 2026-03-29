import { useState, useEffect, useRef } from "react";
import "./App.css";

// ─── 50 Paragraphs ──────────────────────────────────────────────────────────
const RAW_PARAGRAPHS = [
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. The five boxing wizards jump quickly over the ancient fence near the river.",
  "Technology has transformed the way we communicate, work, and learn. With smartphones and the internet, information is available at our fingertips anytime and anywhere we need it.",
  "Programming is the art of instructing computers to solve problems. It requires logical thinking, patience, and creativity to write code that is efficient and easy to understand.",
  "Reading books regularly improves vocabulary, concentration, and analytical thinking. It opens new worlds and perspectives, helping us understand ourselves and the people around us better.",
  "The sun rises in the east and sets in the west. Every morning brings new opportunities to learn, grow, and make a positive difference in the world around us.",
  "Music has the power to move emotions, bring people together, and tell stories without words. From classical symphonies to modern pop, every genre reflects the culture of its time.",
  "Exercise is essential for maintaining good health. Regular physical activity strengthens muscles, improves cardiovascular health, boosts mood, and reduces the risk of many chronic diseases over time.",
  "Cooking is both a science and an art. Understanding ingredients, techniques, and flavors allows you to create delicious meals that nourish the body and bring joy to others.",
  "Climate change is one of the most pressing challenges of our time. Rising temperatures, melting ice caps, and extreme weather events demand urgent action from governments and individuals alike.",
  "Space exploration has expanded our understanding of the universe. Missions to the Moon, Mars, and beyond reveal secrets about the origins of our solar system and life itself.",
  "The human brain is an extraordinary organ capable of learning, creativity, and complex reasoning. Scientists are still discovering how memory, emotion, and consciousness are formed and stored within it.",
  "Artificial intelligence is reshaping industries from healthcare to transportation. Machine learning algorithms can detect diseases, drive vehicles, and predict weather patterns with remarkable speed and accuracy.",
  "Kindness costs nothing but means everything. A simple smile, a helping hand, or a few encouraging words can change someone's entire day and inspire them to pass it forward.",
  "Water covers more than seventy percent of the Earth's surface, yet freshwater is scarce. Conservation efforts and smart usage are critical to ensuring clean water for future generations.",
  "History teaches us lessons from the past so we can build a better future. Understanding how civilizations rose and fell helps us avoid repeating mistakes and appreciate progress made.",
  "Dogs are loyal companions that have lived alongside humans for thousands of years. They provide love, security, and emotional support, making them one of our most cherished animals.",
  "Photography captures moments in time, preserving memories that would otherwise fade. A single photograph can convey emotions, tell stories, and preserve history for generations yet to come.",
  "Mathematics is the foundation of science and engineering. From basic arithmetic to advanced calculus, numbers help us model the world and solve complex real-world problems with precision.",
  "Traveling expands your horizons and challenges your assumptions. Experiencing new cultures, cuisines, and landscapes teaches empathy and gives you a deeper appreciation for life's incredible diversity.",
  "Sleep is vital for physical and mental recovery. During deep sleep, the brain consolidates memories, the body repairs tissues, and the immune system strengthens its defenses against illness.",
  "The internet has revolutionized commerce, communication, and education. Within seconds, we can connect with anyone on the planet, access vast libraries of knowledge, and conduct global business.",
  "Forests are the lungs of the Earth. They absorb carbon dioxide, release oxygen, regulate climate, and provide habitat for millions of species of plants and animals worldwide.",
  "Patience is a virtue that takes time to develop. Learning to wait, stay calm under pressure, and persist through difficulties is essential for long-term success in any endeavor.",
  "A healthy diet rich in fruits, vegetables, and whole grains provides essential nutrients. Good nutrition supports brain function, energy levels, immunity, and overall quality of daily life.",
  "Friendship is one of life's greatest gifts. True friends support each other through hardships, celebrate achievements, share laughter, and offer honest advice when it is needed the most.",
  "The ocean is home to millions of species, many of which are yet to be discovered. Marine ecosystems play a crucial role in regulating Earth's climate and oxygen supply.",
  "Writing clearly and concisely is a skill worth developing. Whether crafting an email, a report, or a story, effective communication helps convey ideas with precision and lasting impact.",
  "Microprocessors are the brains of modern computers and electronic devices. They execute billions of instructions per second, enabling everything from smartphone apps to satellite navigation and medical equipment.",
  "Teamwork makes the dream work. When individuals combine their unique skills and perspectives toward a shared goal, they accomplish far more than any one person could achieve alone.",
  "Languages shape how we think and experience reality. Learning a second language not only opens new career opportunities but also enhances cognitive flexibility and deep cultural understanding.",
  "Renewable energy sources like solar and wind power are key to a sustainable future. As technology improves, clean energy is becoming more affordable and widely accessible around the world.",
  "The invention of the printing press revolutionized human civilization. By making books affordable and widely available, it spread knowledge, fueled the Renaissance, and enabled scientific revolutions globally.",
  "Children learn best through play, exploration, and curiosity. A nurturing environment that encourages questions and experimentation builds confidence and instills a lifelong love of learning in young minds.",
  "Gravity is the force that keeps planets in orbit and objects falling toward Earth. Isaac Newton described it mathematically, and Albert Einstein later deepened our understanding through relativity.",
  "Architecture reflects the values and aspirations of a society. From ancient temples to modern skyscrapers, buildings tell the story of human ingenuity, culture, and ambition through the centuries.",
  "Meditation and mindfulness reduce stress and improve mental focus. By training the mind to stay present, these practices enhance emotional well-being and help manage anxiety more effectively.",
  "Vaccines have saved hundreds of millions of lives by training the immune system to fight disease. They are among the greatest achievements of modern medicine and global public health.",
  "Economies grow when innovation flourishes. Entrepreneurs who identify problems and develop creative solutions drive progress, create employment opportunities, and raise living standards for communities around the world.",
  "A library is a treasure house of human knowledge. Every book on its shelves represents years of thought, research, and experience waiting to be discovered by any curious reader.",
  "The speed of light is approximately three hundred thousand kilometers per second in a vacuum. It is the ultimate speed limit of the universe, as described by Einstein's famous theory.",
  "Cycling is an eco-friendly, healthy, and affordable mode of transportation. It reduces traffic congestion, lowers carbon emissions, and provides excellent cardiovascular exercise for daily commuters everywhere.",
  "Democracy depends on an informed and engaged citizenry. When people participate in elections, debates, and civic duties, they help shape the policies that govern their communities and nations.",
  "Genetic engineering is opening new frontiers in medicine and agriculture. Scientists can edit DNA to treat inherited diseases, develop drought-resistant crops, and create life-saving pharmaceutical drugs.",
  "A positive attitude transforms how we face challenges. Believing in your ability to grow and improve helps you persist through failure and turn setbacks into stepping stones for success.",
  "The stock market reflects the collective expectations and fears of millions of investors. Economic data, company earnings, and world events all influence price movements throughout each trading day.",
  "Robots and automation are changing the nature of work across many industries. While some jobs are displaced, new roles emerge that require creativity, critical thinking, and technical expertise.",
  "Understanding algorithms is fundamental to computer science. An algorithm is a step-by-step procedure to solve a problem, and designing efficient ones can make programs run dramatically faster.",
  "Volcanoes are powerful forces of nature that shape landscapes and influence climate. Their eruptions release gases and ash that can affect global temperatures for years after the event.",
  "Time management is the key to productivity. By setting clear priorities, eliminating distractions, and working in focused intervals, you can accomplish more in less time with less stress.",
  "The human genome contains approximately three billion base pairs of DNA. Sequencing it has unlocked insights into evolution, disease, ancestry, and the fundamental biological blueprint of human life.",
];

// ─── Shuffle utility ─────────────────────────────────────────────────────────
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SHUFFLED = shuffleArray(RAW_PARAGRAPHS);

// ─── Main Component ──────────────────────────────────────────────────────────
export default function App() {
  const [paraIndex, setParaIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [finalStats, setFinalStats] = useState(null);
  const [bestWPM, setBestWPM] = useState(
    () => parseInt(localStorage.getItem("typingBestWPM") || "0")
  );

  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const textBoxRef = useRef(null);

  const current = SHUFFLED[paraIndex % SHUFFLED.length];

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, [paraIndex]);

  // Live timer
  useEffect(() => {
    if (startTime && !finished) {
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime, finished]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const calcWPM = (timeMs) => {
    if (!timeMs || timeMs < 500) return 0;
    const wordCount = current.trim().split(/\s+/).length;
    return Math.round(wordCount / (timeMs / 60000));
  };

  const calcAccuracy = (typedStr) => {
    if (typedStr.length === 0) return 100;
    let correct = 0;
    for (let i = 0; i < typedStr.length; i++) {
      if (typedStr[i] === current[i]) correct++;
    }
    return Math.round((correct / typedStr.length) * 100);
  };

  const formatTime = (ms) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
  };

  // ── Input handler ─────────────────────────────────────────────────────────
  const handleInput = (e) => {
    const val = e.target.value;
    if (finished || val.length > current.length) return;

    if (!startTime && val.length > 0) setStartTime(Date.now());

    setTyped(val);

    if (val.length === current.length) {
      const timeMs = Date.now() - startTime;
      clearInterval(timerRef.current);
      const wpm = calcWPM(timeMs);
      const accuracy = calcAccuracy(val);
      const stats = { wpm, accuracy, timeMs };
      setFinalStats(stats);
      setFinished(true);
      // Save best WPM
      if (wpm > bestWPM) {
        localStorage.setItem("typingBestWPM", String(wpm));
        setBestWPM(wpm);
      }
    }
  };

  // ── Navigation ────────────────────────────────────────────────────────────
  const resetTest = () => {
    setTyped("");
    setStartTime(null);
    setElapsed(0);
    setFinished(false);
    setFinalStats(null);
    clearInterval(timerRef.current);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const nextParagraph = () => {
    setParaIndex((i) => i + 1);
    resetTest();
  };

  // ── Derived stats ──────────────────────────────────────────────────────────
  const liveWPM = startTime && !finished ? calcWPM(elapsed) : 0;
  const liveAccuracy = calcAccuracy(typed);
  const progress = Math.round((typed.length / current.length) * 100);
  const timeDisplay = finished
    ? formatTime(finalStats?.timeMs || 0)
    : formatTime(elapsed);

  // ── Character rendering ───────────────────────────────────────────────────
  const renderChars = () =>
    current.split("").map((ch, i) => {
      let cls = "char";
      if (i < typed.length) {
        cls += typed[i] === current[i] ? " correct" : " wrong";
      } else if (i === typed.length) {
        cls += " cursor";
      }
      return (
        <span key={i} className={cls}>
          {ch}
        </span>
      );
    });

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="app" onClick={() => inputRef.current?.focus()}>
      {/* ── Header ── */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">⌨</span>
          <span className="logo-text">TypeRacer</span>
        </div>
        <div className="best-badge">
          🏆 Best: <strong>{bestWPM > 0 ? `${bestWPM} WPM` : "—"}</strong>
        </div>
      </header>

      {/* ── Stats Bar ── */}
      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-label">WPM</span>
          <span className="stat-value wpm-value">
            {finished ? finalStats.wpm : liveWPM}
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Accuracy</span>
          <span
            className={`stat-value ${
              liveAccuracy < 80 ? "danger" : liveAccuracy < 95 ? "warn" : "good"
            }`}
          >
            {liveAccuracy}%
          </span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Time</span>
          <span className="stat-value">{timeDisplay || "0s"}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Paragraph</span>
          <span className="stat-value">
            {(paraIndex % SHUFFLED.length) + 1} / {SHUFFLED.length}
          </span>
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* ── Typing Area ── */}
      <div className="typing-card" ref={textBoxRef}>
        <div className="paragraph-display">{renderChars()}</div>

        {/* Hidden input */}
        <input
          ref={inputRef}
          className="hidden-input"
          value={typed}
          onChange={handleInput}
          onPaste={(e) => e.preventDefault()}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          disabled={finished}
        />

        {/* Click-to-focus hint */}
        {typed.length === 0 && !finished && (
          <p className="click-hint">Click here and start typing...</p>
        )}
      </div>

      {/* ── Result Overlay ── */}
      {finished && finalStats && (
        <div className="result-overlay">
          <div className="result-card">
            <h2 className="result-title">
              {finalStats.wpm >= bestWPM && bestWPM > 0
                ? "🎉 New Best!"
                : "Test Complete!"}
            </h2>

            <div className="result-stats">
              <div className="result-stat">
                <span className="result-stat-label">Speed</span>
                <span className="result-stat-value">{finalStats.wpm}</span>
                <span className="result-stat-unit">WPM</span>
              </div>
              <div className="result-stat">
                <span className="result-stat-label">Accuracy</span>
                <span
                  className={`result-stat-value ${
                    finalStats.accuracy < 80
                      ? "danger"
                      : finalStats.accuracy < 95
                      ? "warn"
                      : "good"
                  }`}
                >
                  {finalStats.accuracy}
                </span>
                <span className="result-stat-unit">%</span>
              </div>
              <div className="result-stat">
                <span className="result-stat-label">Time</span>
                <span className="result-stat-value">
                  {formatTime(finalStats.timeMs)}
                </span>
                <span className="result-stat-unit">total</span>
              </div>
            </div>

            {finalStats.wpm > bestWPM - 1 && bestWPM > 0 && (
              <p className="result-sub">
                Previous best: <strong>{bestWPM} WPM</strong>
              </p>
            )}

            <div className="result-actions">
              <button className="btn btn-secondary" onClick={resetTest}>
                ↺ Retry
              </button>
              <button className="btn btn-primary" onClick={nextParagraph}>
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
