"use client";

import { useState, useCallback, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Info,
  MessageSquare,
  Download,
  Home,
  BookOpen,
  BarChart3,
  Users,
  Video as VideoIcon,
  Lock,
  ExternalLink,
  Clock,
  Star,
  Award,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import CourseSidebar from "@/components/CourseSidebar";
import VideoPlayer from "@/components/VideoPlayer";
import {
  courseData,
  ContentItem,
  getAllItems,
  getAdjacentItems,
} from "@/data/courseData";

type TabKey = "informasi" | "forum" | "unduhan";

export default function CoursePage() {
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItemId, setActiveItemId] = useState("item-2-1");
  const [activeTab, setActiveTab] = useState<TabKey>("informasi");
  const [isComplete, setIsComplete] = useState(false);

  // Sync dark mode with class on html element
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  // Find active item
  const allItems = getAllItems(courseData);
  const activeItem =
    allItems.find((item) => item.id === activeItemId) || allItems[0];
  const { prev, next } = getAdjacentItems(courseData, activeItemId);

  const handleItemSelect = useCallback((item: ContentItem) => {
    setActiveItemId(item.id);
    setIsComplete(item.status === "completed");
    setActiveTab("informasi");
    // Scroll to top on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handlePrev = () => {
    if (prev) handleItemSelect(prev);
  };

  const handleNext = () => {
    if (next) handleItemSelect(next);
  };

  const toggleComplete = () => {
    setIsComplete(!isComplete);
  };

  const activeSection = courseData.sections.find((section) =>
    section.items.some((item) => item.id === activeItemId)
  );

  const tabs = [
    { key: "informasi" as TabKey, label: "Informasi", icon: Info },
    { key: "forum" as TabKey, label: "Forum Diskusi", icon: MessageSquare },
    { key: "unduhan" as TabKey, label: "Unduhan", icon: Download },
  ];

  return (
    <div className={`min-h-screen bg-white dark:bg-slate-900 ${isDark ? "dark" : ""}`}>
      {/* Top Navbar */}
      <Navbar
        courseTitle={courseData.title}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
      />

      {/* Course Sidebar (right) */}
      <CourseSidebar
        courseData={courseData}
        activeItemId={activeItemId}
        onItemSelect={handleItemSelect}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main content area */}
      <div
        className={`min-h-screen pt-12 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "md:mr-[400px]" : "mr-0"
        }`}
      >
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
          <div className="px-4 sm:px-6 lg:px-8 xl:px-12">
            {/* Main content section */}
            <section className="md:flex md:h-[calc(100dvh-3rem)] md:flex-col">
              {/* Breadcrumb */}
              <div className="pt-4 pb-2">
                <nav aria-label="Breadcrumb" className="hidden md:block">
                  <ol className="flex items-center text-sm flex-wrap gap-1">
                    <li>
                      <a
                        href="https://gojags-classroom.bps.go.id/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        <Home className="w-3.5 h-3.5" />
                        Beranda
                      </a>
                    </li>
                    <li className="text-gray-400 dark:text-gray-600">/</li>
                    <li>
                      <a
                        href="https://gojags-classroom.bps.go.id/my-course"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        Kursus Saya
                      </a>
                    </li>
                    <li className="text-gray-400 dark:text-gray-600">/</li>
                    <li className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
                      {courseData.title}
                    </li>
                  </ol>
                </nav>
              </div>

              {/* Video player + nav */}
              <div className="md:flex md:min-h-0 md:flex-1 md:flex-col">
                <div className="md:flex md:min-h-0 md:flex-1 md:flex-col md:overflow-hidden">
                  <div className="w-full md:flex md:min-h-0 md:flex-1 md:flex-col">
                    {/* Video container */}
                    <div className="relative w-full rounded-xl overflow-hidden bg-black aspect-video md:aspect-auto md:h-full md:min-h-0 shadow-lg">
                      <VideoPlayer item={activeItem} />
                    </div>
                  </div>
                </div>

                {/* Navigation bar */}
                <div className="sticky bottom-0 z-20 flex flex-shrink-0 flex-nowrap items-stretch gap-2 justify-between bg-gray-50/95 dark:bg-slate-900/95 py-3 backdrop-blur md:gap-3 md:py-4">
                  {/* Previous button */}
                  <button
                    onClick={handlePrev}
                    disabled={!prev}
                    className="flex min-w-12 flex-[1_1_3rem] items-center justify-center py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:flex-[1_1_8rem] md:max-w-40 px-2 md:px-4 border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Sebelumnya"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="ml-1 hidden lg:inline">Sebelumnya</span>
                  </button>

                  {/* Mark complete button */}
                  <button
                    onClick={toggleComplete}
                    className={`flex min-w-28 sm:min-w-48 flex-[999_1_16rem] items-center justify-center py-3 rounded-xl font-semibold transition-all duration-300 text-sm px-4 border ${
                      isComplete
                        ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                        : "bg-brand-50 text-brand-700 border-brand-200 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400 dark:border-brand-500/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex items-center justify-center w-5 h-5 rounded-full text-white ${
                          isComplete ? "bg-green-500" : "bg-brand-500"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>
                        <span className="hidden sm:inline">Tandai </span>
                        {isComplete ? "Selesai" : "Belum Selesai"}
                      </span>
                    </div>
                  </button>

                  {/* Next button */}
                  <button
                    onClick={handleNext}
                    disabled={!next}
                    className="flex min-w-12 flex-[1_1_3rem] items-center justify-center py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:flex-[1_1_8rem] md:max-w-40 px-2 md:px-4 border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Berikutnya"
                  >
                    <span className="mr-1 hidden lg:inline">Berikutnya</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </section>

            {/* Course info area (below video) */}
            <div className="pt-4 pb-12 space-y-6">
              {/* Course title and section */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {activeSection && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                      <BookOpen className="w-3 h-3" />
                      Bagian {activeSection.number}: {activeSection.title}
                    </span>
                  )}
                </div>
                <h1 className="font-bold text-xl lg:text-2xl text-zinc-900 dark:text-zinc-100 tracking-tight">
                  {activeItem.title}
                </h1>
              </div>

              {/* Tabs */}
              <div>
                {/* Tab navigation */}
                <div className="flex bg-gray-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeTab === tab.key
                            ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab content */}
                <div className="mt-6">
                  {activeTab === "informasi" && (
                    <InformasiTab item={activeItem} courseData={courseData} />
                  )}
                  {activeTab === "forum" && <ForumTab />}
                  {activeTab === "unduhan" && <UnduhanTab />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========== Tab Components ===========

function InformasiTab({
  item,
  courseData: data,
}: {
  item: ContentItem;
  courseData: typeof courseData;
}) {
  return (
    <div className="space-y-6">
      {/* About this content */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Info className="w-4 h-4 text-brand-600" />
          Tentang Materi Ini
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
          {item.description ||
            "Materi pelatihan dalam rangka Sensus Ekonomi 2026 yang diselenggarakan oleh BPS Kabupaten Kepulauan Sangihe."}
        </p>

        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <VideoIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Jenis</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                {item.type === "video"
                  ? "Video"
                  : item.type === "link"
                  ? "Dokumen"
                  : item.type === "quiz"
                  ? "Kuis"
                  : "Sertifikat"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
            <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Lock className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {item.status === "completed"
                  ? "Selesai"
                  : item.status === "locked"
                  ? "Terkunci"
                  : item.status === "current"
                  ? "Sedang Berjalan"
                  : "Tersedia"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
              <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Durasi</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                ±15 menit
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Course overview */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-600" />
          Ringkasan Kursus
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div className="text-center p-4 bg-brand-50 dark:bg-brand-900/20 rounded-xl">
            <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">
              {data.progress}%
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Progres</p>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {data.totalSections}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Bagian</p>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {data.sections.reduce((acc, s) => acc + s.items.length, 0)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Materi</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progress keseluruhan</span>
            <span className="font-bold text-brand-600 dark:text-brand-400">{data.progress}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
            <div
              className="progress-bar-brand h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${data.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Course objectives */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Star className="w-4 h-4 text-brand-600" />
          Tujuan Pembelajaran
        </h2>
        <ul className="space-y-3">
          {[
            "Memahami metodologi dan konsep dasar Sensus Ekonomi 2026",
            "Menguasai teknik wawancara dan probing yang efektif",
            "Mampu menggunakan aplikasi FASIH Mobile untuk pendataan",
            "Memahami instrumen dan cara pengisian kuesioner SE2026",
            "Mendeteksi dan menangani ketidakwajaran data",
          ].map((objective, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-brand-600 dark:text-brand-400 stroke-[3]" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {objective}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructor info */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-brand-600" />
          Penyelenggara
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg flex-shrink-0">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              BPS Kabupaten Kepulauan Sangihe
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Badan Pusat Statistik
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Jl. Pemuda No.1, Tahuna, Kepulauan Sangihe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForumTab() {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-100 dark:border-slate-700 shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-blue-500 dark:text-blue-400" />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
          Forum Diskusi
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6 leading-relaxed">
          Sampaikan pertanyaan dan diskusikan materi bersama peserta lain dan instruktur.
        </p>
        <button className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
          Mulai Diskusi
        </button>
      </div>

      {/* Sample discussions */}
      {[
        {
          user: "Peserta SE2026",
          time: "2 jam lalu",
          message:
            "Apakah ada panduan lebih detail untuk pengisian rincian 13 KBLI?",
          replies: 3,
        },
        {
          user: "Koordinator BPS",
          time: "5 jam lalu",
          message:
            "Untuk kendala penggunaan FASIH Mobile, silakan hubungi helpdesk teknis.",
          replies: 7,
        },
      ].map((discussion, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {discussion.user[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {discussion.user}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {discussion.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                {discussion.message}
              </p>
              <button className="mt-2 text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium">
                {discussion.replies} balasan
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function UnduhanTab() {
  const downloads = [
    {
      name: "Bahan Ajar SE2026",
      type: "PDF",
      size: "4.2 MB",
      icon: "📄",
      color: "bg-red-50 dark:bg-red-900/20",
      iconColor: "text-red-600",
    },
    {
      name: "Buku Pedoman SE2026",
      type: "PDF",
      size: "8.7 MB",
      icon: "📚",
      color: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600",
    },
    {
      name: "Kuesioner SE2026",
      type: "PDF",
      size: "2.1 MB",
      icon: "📋",
      color: "bg-green-50 dark:bg-green-900/20",
      iconColor: "text-green-600",
    },
    {
      name: "Panduan FASIH Mobile",
      type: "PDF",
      size: "5.5 MB",
      icon: "📱",
      color: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
          Materi Unduhan
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Unduh materi berikut sebagai referensi belajar Anda.
        </p>
      </div>

      {downloads.map((file, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-slate-700 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
        >
          <div
            className={`w-12 h-12 rounded-xl ${file.color} flex items-center justify-center text-2xl flex-shrink-0`}
          >
            {file.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {file.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {file.type} • {file.size}
            </p>
          </div>
          <a
            href="https://gojags-classroom.bps.go.id/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-xs font-semibold rounded-lg hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors flex-shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unduh</span>
          </a>
        </div>
      ))}

      <div className="mt-6 p-4 bg-brand-50 dark:bg-brand-900/20 rounded-xl border border-brand-100 dark:border-brand-800/30">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center flex-shrink-0">
            <Award className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Tip Belajar
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
              Unduh semua materi referensi dan baca sebelum menonton video untuk pemahaman yang lebih baik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
