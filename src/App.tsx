import { useState, useEffect, type FormEvent } from 'react';
import { motion, easeOut, easeInOut } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Bot,
  BarChart2,
  Smartphone,
  Download,
  ArrowRight,
  Book,
  PenTool,
} from 'lucide-react';
import { collection, addDoc, doc, onSnapshot, runTransaction, increment, getDocs } from 'firebase/firestore';
import { db } from './lib/firebase';
import logo from './assets/log.png';
import hello from './assets/hello.png';
import subjectImg from './assets/subject.jpg';
import taskImg from './assets/task.jpg';
import calendarImg from './assets/calendar.jpg';
import notesImg from './assets/notes.jpg';
import timerImg from './assets/timer.jpg';
import analyticsImg from './assets/analytics.jpg';
import acadexImg from './assets/acadex.jpg';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const features = [
  {
    title: 'Subject Management',
    description: 'Organize all your classes, schedules, instructors, and study materials in one place.',
    icon: <Book className="w-6 h-6 text-[#FF6500]" />,
    image: subjectImg,
  },
  {
    title: 'Task Planner',
    description: 'Never miss deadlines with intelligent task organization and progress tracking.',
    icon: <PenTool className="w-6 h-6 text-[#FF6500]" />,
    image: taskImg,
  },
  {
    title: 'Exam Countdown',
    description: 'Stay prepared with real-time exam countdowns and personalized reminders.',
    icon: <Clock className="w-6 h-6 text-[#FF6500]" />,
    image: calendarImg,
  },
  {
    title: 'Smart Notes',
    description: 'Capture ideas, lecture notes, and study materials in a structured workspace.',
    icon: <BookOpen className="w-6 h-6 text-[#FF6500]" />,
    image: notesImg,
  },
  {
    title: 'Study Timer',
    description: 'Improve focus and productivity with built-in study sessions and Pomodoro tracking.',
    icon: <Calendar className="w-6 h-6 text-[#FF6500]" />,
    image: timerImg,
  },
  {
    title: 'Technique Trends Analytics',
    description: 'Monitor your progress through insightful study and trends statistics',
    icon: <BarChart2 className="w-6 h-6 text-[#FF6500]" />,
    image: analyticsImg,
  },
  {
    title: 'Adex Assistant',
    description: 'Your intelligent academic companion that helps you stay organized and productive.',
    icon: <Bot className="w-6 h-6 text-[#FF6500]" />,
    image: acadexImg,
  },
];

type Page = 'home' | 'login' | 'dashboard';

function LoginPage({ onBack, onLogin }: { onBack: () => void; onLogin: (email: string) => void }) {
  const loginEmail = 'acadex@gmail.com';
  const loginPassword = 'acadex_app1234';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === loginEmail && password === loginPassword) {
      setError('');
      onLogin(email);
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans text-slate-200 selection:bg-[#FF6500] selection:text-white">
      <nav className="absolute top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Acadex Logo" className="w-10 h-10 object-contain drop-shadow-lg" />
            <span className="text-2xl font-extrabold tracking-tight text-white">ACADEX</span>
          </div>
        </div>
      </nav>

      <section className="relative flex min-h-screen items-center py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/60 via-[#0F172A] to-[#FF6500]/10" />
        <div className="relative w-full max-w-4xl mx-auto px-6">
          <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-[#111827]/95 shadow-2xl shadow-black/30">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="p-10 space-y-6">
                <p className="text-sm uppercase tracking-[0.3em] text-[#FF6500]">Welcome Back</p>
                <h1 className="text-4xl font-extrabold text-white">Login to Acadex</h1>
                <p className="text-slate-400 leading-relaxed">
                  Sign in to continue managing your subjects, tracking assignments, and staying on top of your academic goals.
                </p>
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center justify-center rounded-full bg-[#FF6500] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#FF6500]/20 hover:bg-[#ff7f24] transition"
                >
                  Back to Landing
                </button>
              </div>

              <div className="bg-[#0F172A] p-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <label className="block text-sm font-medium text-slate-300">
                    Email
                    <input
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      type="email"
                      placeholder="you@example.com"
                      className="mt-3 w-full rounded-[1.5rem] border border-slate-700 bg-[#0F172A] px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-[#FF6500] focus:outline-none"
                    />
                  </label>
                  <label className="block text-sm font-medium text-slate-300">
                    Password
                    <input
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      type="password"
                      placeholder="••••••••"
                      className="mt-3 w-full rounded-[1.5rem] border border-slate-700 bg-[#0F172A] px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-[#FF6500] focus:outline-none"
                    />
                  </label>
                  {error ? <p className="text-sm text-red-400">{error}</p> : null}
                  <button type="submit" className="w-full rounded-[1.5rem] bg-[#FF6500] px-5 py-3 text-base font-semibold text-white hover:bg-[#ff7f24] transition">
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DashboardPage({ onLogout }: { onLogout: () => void }) {
  const [totalDownloads, setTotalDownloads] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [newSignups, setNewSignups] = useState<number>(0);
  const [totalLogins, setTotalLogins] = useState<number>(0);

  useEffect(() => {
    if (!db) return;

    const downloadsCollection = collection(db, 'downloads');
    const unsubscribeDownloads = onSnapshot(
      downloadsCollection,
      (snapshot) => {
        setTotalDownloads(snapshot.size);
      },
      (error) => {
        console.error('Failed to subscribe to Firestore downloads', error);
      }
    );

    const statsRef = doc(db, 'stats/summary');
    const unsubscribeStats = onSnapshot(
      statsRef,
      (snapshot) => {
        const data = snapshot.data();
        setActiveUsers(data?.activeUsers ?? 0);
        setNewSignups(data?.newSignups ?? 0);
        setTotalLogins(data?.totalLogins ?? 0);
      },
      (error) => {
        console.error('Failed to subscribe to Firestore stats', error);
      }
    );

    return () => {
      unsubscribeDownloads();
      unsubscribeStats();
    };
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans text-slate-200 selection:bg-[#FF6500] selection:text-white">
      <nav className="absolute top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Acadex Logo" className="w-10 h-10 object-contain drop-shadow-lg" />
            <span className="text-2xl font-extrabold tracking-tight text-white">ACADEX</span>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-full bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="relative pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-[2rem] border border-slate-800 bg-[#111827]/95 p-10 shadow-2xl shadow-black/30">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#FF6500]">Dashboard</p>
                <h1 className="mt-4 text-4xl font-extrabold text-white">App Analytics</h1>
                <p className="mt-3 max-w-2xl text-slate-400">
                  View the total downloads and core metrics for Acadex in a clean, student-friendly dashboard.
                </p>
              </div>
              <div className="rounded-3xl bg-[#0F172A] border border-slate-700 px-6 py-5 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Total Downloads</p>
                <p className="mt-4 text-5xl font-extrabold text-white">{totalDownloads.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-700 bg-[#0F172A]/80 p-6">
                <p className="text-sm text-slate-400">Active Users</p>
                <p className="mt-4 text-3xl font-bold text-white">{formatNumber(activeUsers)}</p>
              </div>
              <div className="rounded-3xl border border-slate-700 bg-[#0F172A]/80 p-6">
                <p className="text-sm text-slate-400">New Signups</p>
                <p className="mt-4 text-3xl font-bold text-white">{formatNumber(newSignups)}</p>
              </div>
              <div className="rounded-3xl border border-slate-700 bg-[#0F172A]/80 p-6">
                <p className="text-sm text-slate-400">Total Logins</p>
                <p className="mt-4 text-3xl font-bold text-white">{formatNumber(totalLogins)}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  const [page, setPage] = useState<Page>('home');
  const [userEmail, setUserEmail] = useState<string>('');

  const incrementDownloadCount = async () => {
    if (!db) {
      return;
    }

    try {
      await addDoc(collection(db, 'downloads'), {
        email: userEmail || 'anonymous',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        appVersion: '2.1.0',
        deviceType: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
          ? 'mobile'
          : 'desktop',
      });

      const statsRef = doc(db, 'stats/summary');
      await runTransaction(db, async (transaction) => {
        const statsDoc = await transaction.get(statsRef);
        if (!statsDoc.exists()) {
          transaction.set(statsRef, {
            totalDownloads: 1,
            totalLogins: 0,
            activeUsers: 0,
            newSignups: 0,
          });
        } else {
          transaction.update(statsRef, {
            totalDownloads: increment(1),
          });
        }
      });
    } catch (error) {
      console.error('Failed to log download event', error);
    }
  };

  const handleLogin = async (email?: string) => {
    if (email) {
      setUserEmail(email);
    }
    // Navigate immediately so a database connection issue doesn't block login
    setPage('dashboard');

    if (!db) {
      return;
    }

    const statsRef = doc(db, 'stats/summary');
    try {
      await runTransaction(db, async (transaction) => {
        const statsDoc = await transaction.get(statsRef);
        if (!statsDoc.exists()) {
          transaction.set(statsRef, {
            totalDownloads: 0,
            totalLogins: 1,
            activeUsers: 0,
            newSignups: 0,
          });
        } else {
          transaction.update(statsRef, {
            totalLogins: increment(1),
          });
        }
      });
    } catch (error) {
      console.error('Failed to update login count', error);
    }
  };

  if (page === 'login') {
    return <LoginPage onBack={() => setPage('home')} onLogin={handleLogin} />;
  }

  if (page === 'dashboard') {
    return <DashboardPage onLogout={() => setPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans text-slate-200 selection:bg-[#FF6500] selection:text-white">
      
      {/* Minimal Header */}
      <nav className="absolute top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Acadex Logo" className="w-10 h-10 object-contain drop-shadow-lg" />
            <span className="text-2xl font-extrabold tracking-tight text-white">
              ACADEX
            </span>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#FF6500]/10 z-0" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF6500]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Hero Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E293B] border border-slate-700 shadow-sm mb-6">
                <span className="flex h-2 w-2 rounded-full bg-[#FF6500]"></span>
                <span className="text-sm font-semibold text-slate-300">The Ultimate Offline Study Companion</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6 text-white">
                Your Academic Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6500] to-[#FF9845]">Starts Here.</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg lg:text-xl text-slate-300 mb-4 leading-relaxed">
                Acadex is the all-in-one offline study companion designed to help students organize subjects, manage assignments, prepare for exams, and achieve more every day.
              </motion.p>
              
              <motion.p variants={fadeInUp} className="text-base text-slate-400 mb-10">
                Built for students who want focus, productivity, and academic success without relying on an internet connection.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <a
                  href="./Acadex.apk"
                  download="Acadex.apk"
                  onClick={incrementDownloadCount}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6500] text-white rounded-xl font-bold text-lg hover:bg-[#e65a00] hover:shadow-lg hover:shadow-[#FF6500]/30 transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  Download Now
                </a>
                <button className="flex items-center justify-center gap-2 px-8 py-4 bg-[#1E293B] text-white border border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all duration-300 shadow-sm">
                  Explore Features
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>

            {/* Hero Visual / Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
              className="relative flex justify-center items-center h-[600px]"
            >
              {/* Premium 3D smartphone mockup (CSS representation) */}
              <div className="relative w-[280px] md:w-[320px] h-[600px] bg-[#1E293B] rounded-[3rem] border-[10px] border-slate-800 shadow-2xl overflow-hidden flex flex-col items-center z-10">
                <div className="absolute top-0 w-32 h-6 bg-slate-800 rounded-b-2xl z-20"></div>
                
                {/* Phone Screen Dashboard Preview */}
                <div className="w-full h-full bg-[#0F172A] p-5 pt-12 flex flex-col gap-4 relative">
                  <div className="flex justify-between items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#FF6500]/20 flex items-center justify-center">
                      <Bot className="w-6 h-6 text-[#FF6500]" />
                    </div>
                    <div className="h-3 w-16 bg-slate-800 rounded-full"></div>
                  </div>
                  
                  <div className="w-full h-28 bg-gradient-to-br from-[#1E293B] to-slate-800 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden border border-slate-700">
                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                    <div className="text-xs opacity-80 uppercase tracking-wider font-semibold">Next Exam</div>
                    <div className="text-xl font-bold mt-1">Mathematics</div>
                    <div className="text-sm mt-2 text-[#FF6500] font-semibold bg-[#FF6500]/10 inline-block px-2 py-1 rounded-md border border-[#FF6500]/20">In 3 days</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="bg-[#1E293B] p-3 rounded-xl shadow-sm border border-slate-800">
                      <div className="text-xs text-slate-400 font-medium mb-1">Tasks</div>
                      <div className="text-lg font-bold text-white">12 Pending</div>
                    </div>
                    <div className="bg-[#1E293B] p-3 rounded-xl shadow-sm border border-slate-800">
                      <div className="text-xs text-slate-400 font-medium mb-1">Study Score</div>
                      <div className="text-lg font-bold text-[#FF6500]">94%</div>
                    </div>
                  </div>
                  
                  <div className="w-full flex-1 bg-[#1E293B] rounded-2xl border border-slate-800 p-4 shadow-sm mt-2">
                    <div className="text-sm font-bold text-white mb-4">Today's Schedule</div>
                    <div className="w-full h-3 bg-slate-800 rounded-full mb-4"></div>
                    <div className="w-3/4 h-3 bg-slate-800 rounded-full mb-4"></div>
                    <div className="w-5/6 h-3 bg-slate-800 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Floating UI Widget 1: Timer */}
              <motion.div 
                animate={{ y: [0, -15, 0] }} 
                transition={{ repeat: Infinity, duration: 4, ease: easeInOut }}
                className="absolute -left-4 md:-left-12 top-24 bg-[#1E293B]/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-4 z-20"
              >
                <div className="p-3 bg-[#FF6500]/20 rounded-xl"><Clock className="w-6 h-6 text-[#FF6500]" /></div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Study Timer</div>
                  <div className="text-xl font-extrabold text-white">25:00</div>
                </div>
              </motion.div>

              {/* Floating UI Widget 2: Analytics */}
              <motion.div 
                animate={{ y: [0, 15, 0] }} 
                transition={{ repeat: Infinity, duration: 5, ease: easeInOut }}
                className="absolute -right-4 md:-right-16 bottom-32 bg-[#1E293B]/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-4 z-20"
              >
                <div className="p-3 bg-slate-800 rounded-xl"><BarChart2 className="w-6 h-6 text-[#FF6500]" /></div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Analytics</div>
                  <div className="text-base font-extrabold text-[#FF6500]">+12% Focus</div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-24 bg-[#1E293B]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="order-2 lg:order-1 relative">
              {/* Abstract Visual Composition */}
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6500]/10 to-[#FF6500]/20 rounded-full blur-3xl"></div>
                <div className="absolute inset-4 bg-[#0F172A] rounded-[3rem] rotate-3 shadow-inner border border-slate-800"></div>
                <div className="absolute inset-4 bg-[#1E293B] rounded-[3rem] -rotate-2 shadow-xl border border-slate-700 overflow-hidden flex items-center justify-center">
                  <img src={hello} alt="Acadex Mascot" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="order-1 lg:order-2">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">What is Acadex?</h2>
              <div className="w-20 h-2 bg-[#FF6500] rounded-full mb-8"></div>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                Acadex is an offline-first student productivity platform built to simplify academic life. Whether you're managing multiple subjects, preparing for exams, tracking assignments, or organizing notes, Acadex brings every essential study tool into one seamless experience.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Designed with students in mind, Acadex eliminates the need for multiple apps by combining planning, organization, and productivity into a single intelligent workspace. Study anytime, anywhere—even without internet access.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section id="features" className="py-24 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">Everything You Need to Stay Ahead</h2>
            <p className="text-lg text-slate-400">
              A powerful suite of tools meticulously crafted to enhance your focus, retention, and overall academic performance.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="relative bg-[#1E293B] rounded-2xl shadow-sm border border-slate-800 hover:shadow-xl hover:shadow-black/50 hover:border-slate-700 transition-all duration-300 group overflow-hidden flex flex-col min-h-[300px]"
              >
                <div className="absolute inset-0 z-0">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-[#1E293B]/80 to-transparent pointer-events-none"></div>
                </div>
                <div className="relative z-10 p-8 flex-1 flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-[#0F172A]/80 backdrop-blur-sm group-hover:bg-[#FF6500]/40 flex items-center justify-center mb-6 transition-colors duration-300 border border-slate-700/50">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed text-sm drop-shadow-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. DOWNLOAD CTA SECTION */}
      <section id="download" className="py-24 bg-[#1E293B] relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6500]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF6500]/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="bg-[#0F172A]/80 backdrop-blur-xl border border-slate-700 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to Transform the Way You Study?</h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Join students who want a smarter, simpler, and more organized academic experience. Start your journey with Acadex today.
            </p>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12">
              {[
                '100% Offline', 
                'Fast & Lightweight', 
                'Student-Friendly Design', 
                'Secure Local Storage', 
                'Built for Academic Success'
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-200">
                  <CheckCircle className="w-5 h-5 text-[#FF6500]" />
                  <span className="font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-6">
              <a 
                href="./Acadex.apk"
                download="Acadex.apk"
                onClick={incrementDownloadCount}
                className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-[#FF6500] text-white rounded-2xl font-bold text-xl hover:bg-[#e65a00] hover:shadow-[0_0_40px_rgba(255,101,0,0.4)] transition-all duration-300"
              >
                <Download className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                Download Acadex
              </a>
              
              <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 font-medium mt-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Available for Android</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-600 hidden sm:block"></div>
                <div>v2.1.0</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-[#0F172A] py-12 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <img src={logo} alt="Acadex Logo" className="w-8 h-8 object-contain" />
                <h3 className="text-2xl font-extrabold text-white tracking-tight">ACADEX</h3>
              </div>
              <p className="text-slate-400 font-semibold mt-1">Learn • Plan • Achieve</p>
              <p className="mt-4 text-sm text-slate-500 max-w-sm">
                Empowering students with a smarter way to learn, organize, and succeed.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex gap-6">
                <a href="#" className="text-base font-medium text-slate-400 hover:text-[#FF6500] transition-colors">Home</a>
                <a href="#features" className="text-base font-medium text-slate-400 hover:text-[#FF6500] transition-colors">Features</a>
                <a href="./Acadex.apk" download="Acadex.apk" onClick={incrementDownloadCount} className="text-base font-medium text-slate-400 hover:text-[#FF6500] transition-colors">Download</a>
                <a href="#" className="text-base font-medium text-slate-400 hover:text-[#FF6500] transition-colors">Privacy Policy</a>
              </div>
              <p className="text-base text-slate-300">
                Developed by <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setPage('login');
                  }}
                  className="text-[#FF6500] font-bold hover:text-[#ff7f24] transition-colors"
                >Atheo Jessar Caliao</a>
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Acadex. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://www.facebook.com/atheo.caliao.7/" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-[#FF6500] transition-colors">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H8.09v-2.89h2.35V9.84c0-2.33 1.39-3.62 3.52-3.62 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.17 0-1.54.73-1.54 1.48v1.78h2.62l-.42 2.89h-2.2v6.99C18.34 21.12 22 16.99 22 12z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/itsurboiyax/" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-slate-400 hover:text-[#FF6500] transition-colors">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7.75 2h8.5C18.55 2 20 3.45 20 5.75v8.5c0 2.3-1.45 3.75-3.75 3.75h-8.5C5.45 18 4 16.55 4 14.25v-8.5C4 3.45 5.45 2 7.75 2zm0 1.5C6.78 3.5 6 4.28 6 5.25v8.5c0 .97.78 1.75 1.75 1.75h8.5c.97 0 1.75-.78 1.75-1.75v-8.5c0-.97-.78-1.75-1.75-1.75h-8.5zM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zm4.75-.88a1.13 1.13 0 1 1 0 2.25 1.13 1.13 0 0 1 0-2.25z" />
                </svg>
              </a>
              <a href="https://github.com/AtheoJessarRCaliao" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-slate-400 hover:text-[#FF6500] transition-colors">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.45-1.1-1.45-.9-.62.07-.61.07-.61 1 0 1.64 1.06 1.64 1.06.89 1.54 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .85-.27 2.8 1.02A9.76 9.76 0 0 1 12 6.8c.86.01 1.73.12 2.54.35 1.95-1.29 2.8-1.02 2.8-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
