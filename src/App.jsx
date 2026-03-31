import { useState, useEffect, useRef } from "react";
import "./App.css";

const PARAGRAPHS = {
  easy: [
    "The sun rises in the east and sets in the west. Every morning brings new chances to learn and grow.",
    "Dogs are loyal companions that have lived with humans for thousands of years. They provide love and support.",
    "Reading books improves vocabulary and concentration. It opens new worlds and helps us understand people better.",
    "Kindness costs nothing but means everything. A simple smile can change someone's entire day for the better.",
    "Music has the power to move emotions and bring people together. Every genre reflects the culture of its time.",
    "Exercise is essential for good health. Physical activity strengthens muscles, boosts mood, and reduces disease risk.",
    "Water covers most of the Earth's surface. Conservation is critical to ensuring clean water for future generations.",
    "Friendship is one of life's greatest gifts. True friends support each other through hardships and celebrate victories.",
    "Sleep is vital for physical and mental recovery. During deep sleep the brain consolidates memories and repairs itself.",
    "Patience is a virtue that takes time to develop. Learning to stay calm under pressure is key to success.",
    "A healthy diet rich in fruits and vegetables provides essential nutrients. Good nutrition supports energy and immunity.",
    "Photography captures moments in time, preserving memories that would otherwise fade away from our daily lives.",
    "Traveling expands your horizons and challenges assumptions. New cultures and landscapes teach empathy and appreciation.",
    "Languages shape how we think and experience reality. Learning a second language opens new career opportunities.",
    "Teamwork makes the dream work. Combining unique skills toward a shared goal achieves far more than working alone.",
    "Time management is the key to productivity. Setting priorities and working in focused intervals helps you accomplish more.",
    "Cycling is eco-friendly and healthy. It reduces traffic, lowers emissions, and provides excellent cardiovascular exercise.",
    "A positive attitude transforms how we face challenges. Believing in growth helps you turn setbacks into stepping stones.",
  ],
  medium: [
    "Technology has transformed the way we communicate, work, and learn. With smartphones and the internet, information is available at our fingertips anytime and anywhere we need it.",
    "Programming is the art of instructing computers to solve problems. It requires logical thinking, patience, and creativity to write code that is efficient and easy to understand.",
    "Climate change is one of the most pressing challenges of our time. Rising temperatures and extreme weather events demand urgent action from governments and individuals across the globe.",
    "The human brain is an extraordinary organ capable of learning, creativity, and complex reasoning. Scientists are still discovering how memory, emotion, and consciousness are formed and stored.",
    "Artificial intelligence is reshaping industries from healthcare to transportation. Machine learning algorithms can detect diseases, drive vehicles, and predict weather patterns with remarkable speed and accuracy.",
    "The internet has revolutionized commerce, communication, and education. Within seconds, we can connect with anyone on the planet, access vast libraries of knowledge, and conduct global business.",
    "Forests are the lungs of the Earth. They absorb carbon dioxide, release oxygen, regulate climate, and provide habitat for millions of species of plants and animals worldwide.",
    "Writing clearly and concisely is a skill worth developing. Whether crafting an email, a report, or a story, effective communication helps convey ideas with precision and lasting impact.",
    "Renewable energy sources like solar and wind power are key to a sustainable future. As technology improves, clean energy is becoming more affordable and widely accessible around the world.",
    "Meditation and mindfulness reduce stress and improve mental focus. By training the mind to stay present, these practices enhance emotional well-being and help manage anxiety more effectively.",
    "Vaccines have saved hundreds of millions of lives by training the immune system to fight disease. They are among the greatest achievements of modern medicine and global public health.",
    "Democracy depends on an informed and engaged citizenry. When people participate in elections, debates, and civic duties, they help shape the policies that govern their communities and nations.",
    "Understanding algorithms is fundamental to computer science. An algorithm is a step-by-step procedure to solve a problem, and designing efficient ones can make programs run dramatically faster.",
    "Children learn best through play, exploration, and curiosity. A nurturing environment that encourages questions and experimentation builds confidence and instills a lifelong love of learning.",
    "A library is a treasure house of human knowledge. Every book on its shelves represents years of thought, research, and experience waiting to be discovered by any curious reader.",
    "The stock market reflects the collective expectations and fears of millions of investors. Economic data, company earnings, and world events all influence price movements throughout each trading day.",
  ],
  hard: [
    "Space exploration has expanded our understanding of the universe. Missions to the Moon, Mars, and beyond reveal secrets about the origins of our solar system and the possibility of life itself on other planets.",
    "The invention of the printing press revolutionized human civilization. By making books affordable and widely available, it spread knowledge, fueled the Renaissance, and enabled scientific revolutions that shaped the modern world.",
    "Microprocessors are the brains of modern computers and electronic devices. They execute billions of instructions per second, enabling everything from smartphone apps to satellite navigation and life-saving medical equipment used daily.",
    "Genetic engineering is opening new frontiers in medicine and agriculture. Scientists can edit DNA to treat inherited diseases, develop drought-resistant crops, and create life-saving pharmaceutical drugs with unprecedented precision and speed.",
    "Robots and automation are changing the nature of work across many industries. While some jobs are displaced by machines, entirely new roles emerge that require creativity, critical thinking, and advanced technical expertise.",
    "The human genome contains approximately three billion base pairs of DNA. Sequencing it has unlocked insights into evolution, disease, ancestry, and the fundamental biological blueprint that underlies all of human life.",
    "Architecture reflects the values and aspirations of a society. From ancient temples to modern glass skyscrapers, buildings tell the story of human ingenuity, cultural identity, and ambition across many centuries of civilization.",
    "Economies grow when innovation flourishes. Entrepreneurs who identify real problems and develop creative solutions drive progress, create employment opportunities, and consistently raise living standards for communities and nations around the world.",
    "Volcanoes are powerful forces of nature that shape landscapes and influence climate. Their eruptions release enormous quantities of gases and ash that can dramatically affect global temperatures for years after each event.",
    "The speed of light is approximately three hundred thousand kilometers per second in a vacuum. It is the ultimate speed limit of the universe, as elegantly described by Albert Einstein's famous theory of special relativity.",
    "Gravity is the force that keeps planets in orbit and objects falling toward Earth. Isaac Newton described it mathematically centuries ago, and Albert Einstein later deepened our understanding through his general theory of relativity.",
    "The ocean is home to millions of species, many of which are yet to be discovered by scientists. Marine ecosystems play a crucial role in regulating Earth's climate, oxygen supply, and the global water cycle.",
    "Quantum computing harnesses the principles of quantum mechanics to process information in fundamentally new ways. Unlike classical bits, quantum bits can exist in superposition, enabling computations that are impossible for traditional computers to perform efficiently.",
    "Epidemiology studies how diseases spread through populations and what factors influence their frequency and distribution. During pandemics, epidemiological models guide public health decisions, vaccine distribution strategies, and containment measures across affected regions.",
    "The carbon cycle describes how carbon moves between the atmosphere, oceans, soil, and living organisms. Human activities have disrupted this cycle by releasing stored carbon, driving atmospheric concentrations to levels unseen in millions of years.",
    "Neuroplasticity refers to the brain remarkable ability to reorganize itself by forming new neural connections throughout life. This property underlies learning, memory formation, recovery from injury, and adaptation to new experiences and environments.",
  ],
};

const TRICKY = [
  "Their there they're — three words that sound alike but mean completely different things. It's easy to loose track when you loose your focus, but remember: you lose things, not loose them.",
  "She could not bare the bear that sat near the bare tree. The weather changed whether she liked it or not. The whole hole was wholly filled. He knew the new gnu flew.",
  "Accept everything except exceptions. The council gave counsel to the counselor. The capital of the country sits in a capitol building. Stationary trains stand still; stationery is paper you write on.",
  "It's its own problem when you mix it's with its. The desert is dry, but the dessert is sweet. A herd heard the herd. The site cited a sight. He led with lead pipes.",
  "Fewer people use less sugar. Lie down and lay the book aside. Raise the curtain and let the sun rise. Who's at the door? Whose jacket is that on the floor near the chair?",
  "The dependent was dependent on dependence. She was adverse to the adverse conditions. To elicit a response, avoid illicit comparisons. The device devised a very clever and elegant solution.",
  "Breath deeply and breathe slowly. Clothe yourself in clothes that fit. Bath in the bathtub or bathe in the river. Teeth are what you use to teethe. Life lives where living is lively.",
  "He practised his practice every day. The adviser advised with good advice. License the licensee to practise. The device devised a solution. The prophecy prophesied what the prophet had already foreseen.",
  "Pore over a book; pour your coffee; a poor decision makes you pore over it again. A rein reins in a horse; rain falls from clouds; a reign lasts years. Right, rite, write, wright.",
  "The canvas canvassed the area. A complement completes; a compliment flatters. Discreet behavior keeps discrete items separate. The eminent arrival was imminent. The historic event was considered highly historical in nature.",
  "They flout rules they flaunt proudly. He was loath to loathe his work. A marshal marshalled the troops. The medal was metal. The moral of the story had surprisingly good morale throughout.",
  "The principle held firm to his principal belief. He accepted the complement as a compliment. The affect of the effect was profound. They're going to their house over there by the river bend.",
];

const STORIES = [
  {
    title: "The Lost Key",
    emoji: "🗝️",
    description: "A mystery about a forgotten treasure",
    chapters: [
      "Maya found an old key in her grandmother's attic. It was made of dark iron, cold to the touch, with strange symbols etched along its spine. She had never seen it before.",
      "She asked her mother about the key, but her mother shook her head and looked away. There was something she was not telling Maya. The mystery deepened with every passing hour.",
      "That night Maya crept back to the attic with a flashlight. She searched every dusty corner until she found a small wooden box tucked behind a cracked mirror near the chimney.",
      "The key fit perfectly. Inside the box lay a folded letter, a photograph, and a small compass. The letter was dated 1943 and addressed to someone named Elara, her grandmother's true name.",
      "The photograph showed two young women standing in front of a lighthouse on a rocky coast. On the back were the words: Find the light and you will find the way back home to me.",
      "Maya packed the compass and the photograph into her bag. She did not know where the lighthouse was, but she knew one thing — she was going to find it no matter how long it took.",
    ],
  },
  {
    title: "The Robot Friend",
    emoji: "🤖",
    description: "A tale of friendship between a boy and a robot",
    chapters: [
      "Leo built his first robot from spare parts he found in the garage. It was small, lopsided, and its left eye blinked faster than its right. He named it Bolt and loved it immediately.",
      "Bolt could not speak in words, but it communicated through a series of beeps and light flashes. Leo learned to understand every signal. Two fast beeps meant danger. Three slow ones meant hello.",
      "One afternoon Bolt rolled out of the house and down the street. Leo chased after it, calling its name. The robot stopped at an old woman's garden where her cat was stuck in a tree.",
      "Bolt extended a small mechanical arm, and the cat climbed down without hesitation. The old woman clasped her hands together and smiled. She said the robot had the kindest eyes she had ever seen.",
      "After that day, Bolt became known in the neighborhood. Children would leave small offerings outside Leo's house — batteries, copper wire, tiny gears — as gifts for the lopsided little robot.",
      "Years later, when Leo became an engineer, he kept Bolt on his desk. Whenever he faced a difficult problem, he looked at those mismatched blinking eyes and remembered that kindness always finds a way.",
    ],
  },
  {
    title: "The Last Forest",
    emoji: "🌲",
    description: "A journey to save the final wild forest",
    chapters: [
      "In the year 2087 only one forest remained on Earth. It covered a small valley between two mountains and was protected by an old treaty that few people remembered and even fewer respected.",
      "Zara was twelve when she first entered the forest alone. The air smelled of wet soil and pine. Insects hummed in patterns she had never heard in the city. She felt immediately at home.",
      "She discovered that the trees could communicate through vibrations in the ground. When she pressed her palms to the roots of an ancient oak, she could feel something that was almost like memory.",
      "A construction company had filed a permit to clear the valley for a new data center. Zara had thirty days to stop them. She started by collecting soil samples, photographs, and witness statements.",
      "She stood before the environmental council with shaking hands but a steady voice. She showed them maps, data, and photographs. She spoke not just about ecology but about what it meant to lose something irreplaceable.",
      "The council ruled in her favor by a single vote. As Zara walked back into the forest that evening, the ground hummed beneath her feet. She smiled, pressed her palm to the oak, and listened.",
    ],
  },
  {
    title: "Midnight Bakery",
    emoji: "🥐",
    description: "A magical bakery that opens only at night",
    chapters: [
      "The bakery had no sign, no hours posted on the door, and no listing in any directory. It appeared at the end of Maple Lane only after midnight and vanished before the first light of dawn.",
      "Sam discovered it by accident one sleepless Tuesday. The smell of warm cinnamon pulled him down the street like a thread. Through the fogged window he could see a woman kneading golden dough.",
      "He pushed the door open. Shelves lined every wall, filled with pastries in shapes he had never seen. Stars, spirals, tiny bridges, and little doors no bigger than his thumb. Everything smelled perfect.",
      "The woman behind the counter had silver hair and flour on her cheek. She looked at Sam as if she had been expecting him. She handed him a small loaf without a word and refused payment.",
      "He bit into it on the walk home. It tasted like the morning his father taught him to ride a bicycle. He did not know how that was possible, but he felt it completely and unmistakably.",
      "He returned the next night, and the next. Each pastry held a different memory, a different feeling. On the last night she gave him a recipe card and said it was time for him to bake for others.",
    ],
  },
  {
    title: "Stars and Sand",
    emoji: "✨",
    description: "An astronaut who returns to her desert hometown",
    chapters: [
      "Commander Nadia had traveled to Mars and back, but nothing prepared her for the strangeness of coming home to the small desert town where she had grown up forty years earlier.",
      "The diner was still there, still serving the same black coffee in the same chipped mugs. Her old teacher Mr. Vasquez sat in the same corner booth, reading the same kind of battered paperback novel.",
      "She walked out to the dunes at night the way she had as a child. The stars looked different now. She knew their distances, their temperatures, their chemical compositions. And yet they still felt magical.",
      "A young girl followed her out to the dunes. She said her name was Pip and that she wanted to be an astronaut too. She had read every article about Nadia she could find on the internet.",
      "Nadia sat beside her in the sand and pointed out constellations. She talked about the silence of space and the deafening noise of re-entry. She talked about missing Earth and then missing the stars.",
      "Before she left town Nadia gave Pip her old star chart, worn soft at the folds. She told her to learn everything she could and then go beyond it. Pip held the chart like it was made of light.",
    ],
  },
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function calcCountdown(text, difficulty) {
  const words = text.trim().split(/\s+/).length;
  const wpm = { easy: 35, medium: 28, hard: 22, story: 25, tricky: 20 }[difficulty] || 25;
  return Math.ceil((words / wpm) * 60);
}

const DIFF_META = {
  easy:   { label: "Easy",   cls: "diff-easy" },
  medium: { label: "Medium", cls: "diff-medium" },
  hard:   { label: "Hard",   cls: "diff-hard" },
  story:  { label: "Story",  cls: "diff-story" },
  tricky: { label: "Tricky", cls: "diff-tricky" },
};

export default function App() {
  const [theme, setTheme]           = useState(() => localStorage.getItem("typingTheme") || "dark");
  const [openFaq, setOpenFaq]       = useState(null);
  const [mode, setMode]             = useState("stopwatch");
  const [view, setView]             = useState("test");
  const [difficulty, setDifficulty] = useState("medium");
  const [storyPickerOpen, setStoryPickerOpen] = useState(false);
  const [selectedStory, setSelectedStory]     = useState(null);
  const [chapterIndex, setChapterIndex]       = useState(0);
  const [queue, setQueue]           = useState(() => shuffleArray(PARAGRAPHS.medium));
  const [paraIndex, setParaIndex]   = useState(0);
  const [typed, setTyped]           = useState("");
  const [startTime, setStartTime]   = useState(null);
  const [elapsed, setElapsed]       = useState(0);
  const [finished, setFinished]     = useState(false);
  const [finalStats, setFinalStats] = useState(null);
  const [timeUp, setTimeUp]         = useState(false);
  const [bestWPM, setBestWPM]       = useState(() => parseInt(localStorage.getItem("typingBestWPM") || "0"));
  const [history, setHistory]       = useState(() => {
    try { return JSON.parse(localStorage.getItem("typingHistory") || "[]"); } catch { return []; }
  });

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const currentText = (() => {
    if (difficulty === "story" && selectedStory !== null)
      return STORIES[selectedStory].chapters[chapterIndex % STORIES[selectedStory].chapters.length];
    return queue[paraIndex % queue.length];
  })();

  const countdown = calcCountdown(currentText, difficulty);
  const remaining = Math.max(0, countdown - Math.floor(elapsed / 1000));

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("typingTheme", theme);
  }, [theme]);

  useEffect(() => {
    if (difficulty === "tricky") setQueue(shuffleArray(TRICKY));
    else if (difficulty !== "story") setQueue(shuffleArray(PARAGRAPHS[difficulty]));
    setParaIndex(0);
    hardReset();
  }, [difficulty]);

  useEffect(() => {
    if (view === "test" && !storyPickerOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [paraIndex, view, storyPickerOpen, selectedStory, chapterIndex]);

  useEffect(() => {
    if (startTime && !finished) {
      timerRef.current = setInterval(() => {
        const e = Date.now() - startTime;
        setElapsed(e);
        if (mode === "countdown" && e >= countdown * 1000) {
          clearInterval(timerRef.current);
          const wpm = calcWPM(e); const accuracy = calcAccuracy(typed);
          setFinished(true); setTimeUp(true);
          const stats = { wpm, accuracy, timeMs: e, difficulty, mode, completed: false };
          setFinalStats(stats); doSaveResult(stats);
        }
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [startTime, finished, mode, countdown, typed]);

  const calcWPM = (timeMs) => {
    if (!timeMs || timeMs < 500) return 0;
    return Math.round(currentText.trim().split(/\s+/).length / (timeMs / 60000));
  };

  const calcAccuracy = (typedStr) => {
    if (!typedStr.length) return 100;
    let c = 0;
    for (let i = 0; i < typedStr.length; i++) if (typedStr[i] === currentText[i]) c++;
    return Math.round((c / typedStr.length) * 100);
  };

  const formatTime = (ms) => {
    const s = Math.floor(ms / 1000), m = Math.floor(s / 60);
    return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
  };

  const doSaveResult = (stats) => {
    const entry = {
      ...stats, date: new Date().toLocaleString(),
      para: currentText.substring(0, 45) + "...",
      ...(difficulty === "story" && selectedStory !== null
        ? { storyTitle: STORIES[selectedStory].title, chapter: chapterIndex + 1 } : {}),
    };
    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, 30);
      localStorage.setItem("typingHistory", JSON.stringify(updated));
      return updated;
    });
    if (stats.wpm > bestWPM) { setBestWPM(stats.wpm); localStorage.setItem("typingBestWPM", String(stats.wpm)); }
  };

  const handleInput = (e) => {
    const val = e.target.value;
    if (finished || val.length > currentText.length) return;
    if (!startTime && val.length > 0) setStartTime(Date.now());
    setTyped(val);
    if (val.length === currentText.length) {
      const timeMs = Date.now() - startTime;
      const wpm = calcWPM(timeMs), accuracy = calcAccuracy(val);
      clearInterval(timerRef.current);
      setFinished(true); setTimeUp(false);
      const stats = { wpm, accuracy, timeMs, difficulty, mode, completed: true };
      setFinalStats(stats); doSaveResult(stats);
    }
  };

  const hardReset = () => {
    setTyped(""); setStartTime(null); setElapsed(0);
    setFinished(false); setFinalStats(null); setTimeUp(false);
    clearInterval(timerRef.current);
  };

  const resetTest = () => { hardReset(); setTimeout(() => inputRef.current?.focus(), 50); };

  const nextParagraph = () => {
    if (difficulty === "story" && selectedStory !== null) setChapterIndex((i) => i + 1);
    else setParaIndex((i) => i + 1);
    hardReset(); setTimeout(() => inputRef.current?.focus(), 50);
  };

  const liveWPM = startTime && !finished ? calcWPM(elapsed) : 0;
  const liveAccuracy = calcAccuracy(typed);
  const progress = Math.round((typed.length / currentText.length) * 100);
  const countdownPct = mode === "countdown" ? Math.round((remaining / countdown) * 100) : 0;
  const totalParas = difficulty === "story" && selectedStory !== null ? STORIES[selectedStory].chapters.length : queue.length;
  const currentParaNum = difficulty === "story" && selectedStory !== null ? (chapterIndex % totalParas) + 1 : (paraIndex % totalParas) + 1;
  const showTypingArea = difficulty !== "story" || selectedStory !== null;

  const renderChars = () => currentText.split("").map((ch, i) => {
    let cls = "char";
    if (i < typed.length) cls += typed[i] === currentText[i] ? " correct" : " wrong";
    else if (i === typed.length) cls += " cursor";
    return <span key={i} className={cls}>{ch}</span>;
  });

  return (
    <div className="app" data-theme={theme} onClick={() => view === "test" && !storyPickerOpen && inputRef.current?.focus()}>

      <header className="header">
        <div className="logo">
          <span className="logo-icon">⌨</span>
          <span className="logo-text">TypeRacer</span>
        </div>
        <div className="header-right">
          <div className="best-badge">🏆 {bestWPM > 0 ? `${bestWPM} WPM` : "—"}</div>
          <button className="theme-toggle" onClick={(e) => { e.stopPropagation(); setTheme(t => { const next = t === "dark" ? "light" : "dark"; localStorage.setItem("typingTheme", next); return next; }); }}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <div className="nav-tabs">
            <button className={`nav-btn ${view === "test" ? "active" : ""}`} onClick={(e) => { e.stopPropagation(); setView("test"); }}>Test</button>
            <button className={`nav-btn ${view === "history" ? "active" : ""}`} onClick={(e) => { e.stopPropagation(); setView("history"); }}>
              History {history.length > 0 && <span className="nav-count">{history.length}</span>}
            </button>
          </div>
        </div>
      </header>

      {view === "history" ? (
        <div className="history-view">
          <div className="history-header">
            <h2 className="section-title">Results History</h2>
            {history.length > 0 && <button className="btn btn-ghost" onClick={() => { setHistory([]); localStorage.removeItem("typingHistory"); }}>Clear All</button>}
          </div>
          {history.length === 0 ? (
            <div className="empty-state">No results yet. Complete a test to see history!</div>
          ) : (
            <div className="history-list">
              {history.map((h, i) => (
                <div key={i} className="history-item">
                  <div className="history-top">
                    <div className="history-badges">
                      <span className={`diff-badge ${DIFF_META[h.difficulty]?.cls}`}>{DIFF_META[h.difficulty]?.label}</span>
                      <span className="mode-badge">{h.mode === "countdown" ? "⏳ Countdown" : "⏱ Stopwatch"}</span>
                      {h.storyTitle && <span className="story-badge">📖 {h.storyTitle} Ch.{h.chapter}</span>}
                      <span className={`status-badge ${h.completed ? "s-done" : "s-fail"}`}>{h.completed ? "✓ Done" : "✗ Time Up"}</span>
                    </div>
                    <span className="history-date">{h.date}</span>
                  </div>
                  <div className="history-stats">
                    <div className="h-stat-box"><span className="h-val wpm-val">{h.wpm}</span><span className="h-unit">WPM</span></div>
                    <div className="h-stat-box"><span className={`h-val ${h.accuracy < 80 ? "danger" : h.accuracy < 95 ? "warn" : "good"}`}>{h.accuracy}%</span><span className="h-unit">Accuracy</span></div>
                    <div className="h-stat-box"><span className="h-val">{formatTime(h.timeMs)}</span><span className="h-unit">Time</span></div>
                  </div>
                  <div className="history-para">"{h.para}"</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="controls">
            <div className="control-group">
              <span className="control-label">Type</span>
              <div className="toggle-group">
                {["easy","medium","hard","story","tricky"].map((d) => (
                  <button key={d} className={`toggle-btn diff-btn-${d} ${difficulty === d ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation(); setDifficulty(d);
                      if (d === "story") { setStoryPickerOpen(true); setSelectedStory(null); setChapterIndex(0); }
                      else setStoryPickerOpen(false);
                    }}>
                    {d === "story" ? "📖 Story" : d === "tricky" ? "🧠 Tricky" : DIFF_META[d].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="control-group">
              <span className="control-label">Mode</span>
              <div className="toggle-group">
                {[["stopwatch","⏱ Stopwatch"],["countdown","⏳ Countdown"]].map(([m,label]) => (
                  <button key={m} className={`toggle-btn ${mode === m ? "active" : ""}`}
                    onClick={(e) => { e.stopPropagation(); setMode(m); resetTest(); }}>{label}</button>
                ))}
              </div>
            </div>
            {mode === "countdown" && showTypingArea && (
              <div className="countdown-info">Time limit: <strong>{countdown}s</strong></div>
            )}
          </div>

          {difficulty === "story" && storyPickerOpen && (
            <div className="story-picker">
              <p className="story-picker-title">Choose a Story</p>
              <div className="story-grid">
                {STORIES.map((s, i) => (
                  <button key={i} className={`story-card ${selectedStory === i ? "selected" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation(); setSelectedStory(i); setChapterIndex(0);
                      setStoryPickerOpen(false); hardReset();
                      setTimeout(() => inputRef.current?.focus(), 100);
                    }}>
                    <span className="story-emoji">{s.emoji}</span>
                    <span className="story-name">{s.title}</span>
                    <span className="story-desc">{s.description}</span>
                    <span className="story-chapters">{s.chapters.length} chapters</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {difficulty === "story" && selectedStory !== null && (
            <div className="story-bar">
              <span className="story-bar-title">{STORIES[selectedStory].emoji} {STORIES[selectedStory].title}</span>
              <span className="story-bar-chapter">Chapter {(chapterIndex % STORIES[selectedStory].chapters.length) + 1} of {STORIES[selectedStory].chapters.length}</span>
              <button className="story-change-btn" onClick={(e) => { e.stopPropagation(); setStoryPickerOpen(true); }}>Change Story</button>
            </div>
          )}

          {showTypingArea && (
            <>
              <div className="stats-bar">
                <div className="stat-card"><span className="stat-label">WPM</span><span className="stat-value wpm-value">{finished ? finalStats?.wpm : liveWPM}</span></div>
                <div className="stat-card"><span className="stat-label">Accuracy</span><span className={`stat-value ${liveAccuracy < 80 ? "danger" : liveAccuracy < 95 ? "warn" : "good"}`}>{liveAccuracy}%</span></div>
                <div className="stat-card">
                  <span className="stat-label">{mode === "countdown" ? "Remaining" : "Time"}</span>
                  <span className={`stat-value ${mode === "countdown" && remaining <= 5 && startTime ? "danger" : ""}`}>
                    {mode === "countdown" ? (startTime ? `${remaining}s` : `${countdown}s`) : (formatTime(elapsed) || "0s")}
                  </span>
                </div>
                <div className="stat-card"><span className="stat-label">{difficulty === "story" ? "Chapter" : "Para"}</span><span className="stat-value">{currentParaNum}/{totalParas}</span></div>
              </div>

              <div className="progress-track">
                {mode === "countdown" && startTime
                  ? <div className={`progress-fill countdown-fill ${remaining <= 5 ? "danger-fill" : ""}`} style={{ width: `${countdownPct}%` }} />
                  : <div className="progress-fill" style={{ width: `${progress}%` }} />}
              </div>

              <div className="typing-card">
                <div className="paragraph-display">{renderChars()}</div>
                <input ref={inputRef} className="hidden-input" value={typed} onChange={handleInput}
                  onPaste={(e) => e.preventDefault()} autoComplete="off" autoCorrect="off"
                  autoCapitalize="off" spellCheck="false" disabled={finished} />
                {typed.length === 0 && !finished && <p className="click-hint">Click here and start typing...</p>}
              </div>

              {finished && finalStats && (
                <div className="result-overlay">
                  <div className="result-card">
                    <h2 className="result-title">
                      {timeUp ? "⏰ Time's Up!" : finalStats.wpm >= bestWPM && bestWPM > 0 ? "🎉 New Best!" : "✅ Complete!"}
                    </h2>
                    <div className="result-stats">
                      <div className="result-stat"><span className="result-stat-label">Speed</span><span className="result-stat-value wpm-value">{finalStats.wpm}</span><span className="result-stat-unit">WPM</span></div>
                      <div className="result-stat"><span className="result-stat-label">Accuracy</span><span className={`result-stat-value ${finalStats.accuracy < 80 ? "danger" : finalStats.accuracy < 95 ? "warn" : "good"}`}>{finalStats.accuracy}</span><span className="result-stat-unit">%</span></div>
                      <div className="result-stat"><span className="result-stat-label">Time</span><span className="result-stat-value">{formatTime(finalStats.timeMs)}</span></div>
                    </div>
                    <div className="result-badges">
                      <span className={`diff-badge ${DIFF_META[difficulty].cls}`}>{DIFF_META[difficulty].label}</span>
                      <span className="mode-badge">{mode === "countdown" ? "⏳ Countdown" : "⏱ Stopwatch"}</span>
                    </div>
                    <div className="result-actions">
                      <button className="btn btn-secondary" onClick={resetTest}>↺ Retry</button>
                      <button className="btn btn-primary" onClick={nextParagraph}>{difficulty === "story" ? "Next Chapter →" : "Next →"}</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      <section className="faq-section">
        <h2 className="faq-heading">Frequently Asked Questions</h2>
        <div className="faq-list">
          {[
            { q: "What is a good typing speed?", a: "For most people, 40–60 WPM is considered average. Touch typists typically reach 60–80 WPM, while professional typists often exceed 80 WPM. Competitive typists can surpass 120 WPM." },
            { q: "How is WPM calculated?", a: "WPM (Words Per Minute) is calculated by dividing the total number of characters typed by 5 (the average word length), then dividing by the number of minutes elapsed. Only correctly typed characters count." },
            { q: "What does accuracy mean?", a: "Accuracy is the percentage of characters you typed correctly out of all characters attempted. An accuracy above 95% is considered good. Aim for both speed and accuracy — rushing and making mistakes slows you down overall." },
            { q: "How do I improve my typing speed?", a: "Practice consistently every day, focus on accuracy before speed, use all ten fingers, and avoid looking at the keyboard. Start with easier texts and gradually move to harder ones as you improve." },
          ].map((item, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? "open" : ""}`}>
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {item.q}
                <span className="faq-icon">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <div className="faq-answer">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
