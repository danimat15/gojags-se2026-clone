"use client";

import { useState, useCallback, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Clock,
  Star,
  Award,
  AlignJustify,
  X,
  ExternalLink,
} from "lucide-react";

import CourseSidebar from "@/components/CourseSidebar";
import VideoPlayer from "@/components/VideoPlayer";
import {
  courseData,
  ContentItem,
  getAllItems,
  getAdjacentItems,
  calculateProgress,
} from "@/data/courseData";

const STORAGE_KEY = "se2026-completed-items";

type TabKey = "informasi" | "forum" | "unduhan";

function useCompletedItems() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCompletedIds(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback((id: string) => {
    setCompletedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { completedIds, toggle };
}

interface PageProps {
  params: Promise<{ itemId?: string[] }>;
}

export default function CoursePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const activeItemId = resolvedParams.itemId?.[0] || "item-1-1";
  const [activeTab, setActiveTab] = useState<TabKey>("informasi");
  const { completedIds, toggle } = useCompletedItems();

  /* sync dark mode */
  useEffect(() => {
    const html = document.documentElement;
    isDark ? html.classList.add("dark") : html.classList.remove("dark");
  }, [isDark]);

  /* close sidebar on small screens by default */
  useEffect(() => {
    const check = () => setSidebarOpen(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const allItems = getAllItems(courseData);
  const activeItem =
    allItems.find((i) => i.id === activeItemId) || allItems[0];
  const { prev, next } = getAdjacentItems(courseData, activeItemId);
  const isCompleted = completedIds.includes(activeItemId);
  const progress = calculateProgress(completedIds, courseData);

  const handleItemSelect = useCallback(
    (item: ContentItem) => {
      router.push(`/course/${item.id}`);
      setActiveTab("informasi");
      if (window.innerWidth < 1024) setSidebarOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router]
  );

  const activeSection = courseData.sections.find((s) =>
    s.items.some((i) => i.id === activeItemId)
  );

  const tabs = [
    { key: "informasi" as TabKey, label: "Informasi", icon: Info },
    { key: "forum" as TabKey, label: "Diskusi", icon: MessageSquare },
    { key: "unduhan" as TabKey, label: "Unduhan", icon: Download },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* ── Topbar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 h-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm flex items-center px-3 sm:px-4 gap-2 sm:gap-3">
        {/* left */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            <Home className="w-3.5 h-3.5" />
          </Link>
          <div className="hidden sm:block w-px h-5 bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate hidden sm:block max-w-[180px] md:max-w-xs">
            {activeItem.title}
          </span>
        </div>

        {/* center – logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://gojags-classroom.bps.go.id/logo/06%20gojags.png"
            alt="Gojags"
            className="h-6 w-6 object-contain rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="text-sm font-bold text-gray-900 dark:text-white hidden sm:block">
            Gojags Classroom
          </span>
        </Link>

        {/* right */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* dark toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            <span className="text-sm">{isDark ? "☀️" : "🌙"}</span>
          </button>

          {/* user badge */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bps-logo.png"
              alt="BPS Logo"
              className="w-5 h-5 object-contain"
            />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 max-w-[130px] truncate">
              BPS Kab. Kepulauan Sangihe
            </span>
          </div>

          {/* sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
            title={sidebarOpen ? "Sembunyikan sidebar" : "Tampilkan sidebar"}
          >
            {sidebarOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <AlignJustify className="w-4 h-4" />
            )}
            <span className="hidden sm:inline text-xs ml-0.5">
              {sidebarOpen ? "Tutup" : "Materi"}
            </span>
          </button>
        </div>
      </nav>

      {/* sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Course Sidebar ── */}
      <CourseSidebar
        courseData={courseData}
        activeItemId={activeItemId}
        onItemSelect={handleItemSelect}
        isOpen={sidebarOpen}
        completedIds={completedIds}
        progress={progress}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ── Main content ── */}
      <div
        className={`pt-12 min-h-screen transition-all duration-300 ease-in-out ${
          sidebarOpen ? "lg:mr-[380px]" : ""
        }`}
      >
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
          <div className="px-3 sm:px-5 lg:px-8 xl:px-10 max-w-full">
            {/* ── Video area ── */}
            <div className="flex flex-col md:h-[calc(100dvh-3rem)]">
              {/* breadcrumb */}
              <div className="pt-3 pb-2 hidden md:block flex-shrink-0">
                <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                  <Link href="/" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                    Beranda
                  </Link>
                  <ChevronRight className="w-3 h-3 flex-shrink-0" />
                  <span className="text-gray-900 dark:text-white font-medium truncate max-w-[300px]">
                    {courseData.title}
                  </span>
                  {activeSection && (
                    <>
                      <ChevronRight className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate max-w-[200px] text-orange-600 dark:text-orange-400">
                        {activeSection.title}
                      </span>
                    </>
                  )}
                </nav>
              </div>

              {/* video player */}
              <div className="flex-1 md:min-h-0 flex flex-col md:overflow-hidden">
                <div className="w-full aspect-video md:aspect-auto md:flex-1 md:min-h-0 bg-black rounded-xl overflow-hidden shadow-lg">
                  <VideoPlayer item={activeItem} />
                </div>
              </div>

              {/* nav bar */}
              <div className="flex-shrink-0 flex items-stretch gap-2 py-3 bg-gray-50/95 dark:bg-slate-900/95 backdrop-blur sticky bottom-0 z-20">
                <button
                  onClick={() => prev && handleItemSelect(prev)}
                  disabled={!prev}
                  className="flex-[1_1_3rem] min-w-10 flex items-center justify-center gap-1 py-2.5 rounded-xl border text-sm font-semibold bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 hover:shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden lg:inline text-xs">Sebelumnya</span>
                </button>

                <button
                  onClick={() => toggle(activeItemId)}
                  className={`flex-[999_1_14rem] min-w-0 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    isCompleted
                      ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                      : "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20 hover:bg-orange-100 dark:hover:bg-orange-500/20"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 ${
                      isCompleted ? "bg-green-500" : "bg-orange-500"
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="truncate">
                    {isCompleted ? "Tandai Belum Selesai" : "Tandai Selesai"}
                  </span>
                </button>

                <button
                  onClick={() => next && handleItemSelect(next)}
                  disabled={!next}
                  className="flex-[1_1_3rem] min-w-10 flex items-center justify-center gap-1 py-2.5 rounded-xl border text-sm font-semibold bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 hover:shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span className="hidden lg:inline text-xs">Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Info below video ── */}
            <div className="pt-3 pb-16 space-y-5">
              {/* title + section badge */}
              <div>
                {activeSection && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border border-orange-200 dark:border-orange-700/40 mb-2">
                    <BookOpen className="w-3 h-3" />
                    Bagian {activeSection.number}: {activeSection.title}
                  </span>
                )}
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                  {activeItem.title}
                </h1>
              </div>

              {/* tabs */}
              <div>
                <div className="flex bg-gray-100 dark:bg-slate-800 rounded-xl p-1 gap-0.5">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg text-sm font-medium transition-all ${
                          activeTab === tab.key
                            ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="hidden xs:inline sm:inline">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5">
                  {activeTab === "informasi" && (
                    <InformasiTab
                      item={activeItem}
                      progress={progress}
                      completedCount={completedIds.length}
                    />
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

/* ── Tab: Informasi ── */
function InformasiTab({
  item,
  progress,
  completedCount,
}: {
  item: ContentItem;
  progress: number;
  completedCount: number;
}) {
  const total = getAllItems(courseData).filter((i) => i.type !== "award").length;

  return (
    <div className="space-y-4">
      {/* description */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Info className="w-4 h-4 text-orange-600" />
          Tentang Materi Ini
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {item.description || "Materi pelatihan SE2026 dari GoJAGS Classroom BPS."}
        </p>

        {item.isExternal && (
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
          >
            <ExternalLink className="w-4 h-4" />
            Buka di GoJAGS Classroom
          </a>
        )}

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            {
              label: "Jenis",
              value:
                item.type === "video"
                  ? "Video"
                  : item.type === "link"
                  ? "Dokumen"
                  : item.type === "quiz"
                  ? "Kuis"
                  : "Sertifikat",
              icon: VideoIcon,
              color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
            },
            {
              label: "Durasi",
              value: item.type === "video" ? "±15 mnt" : "—",
              icon: Clock,
              color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
            },
            {
              label: "Status",
              value: item.isExternal ? "Eksternal" : "Tersedia",
              icon: ExternalLink,
              color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
            },
          ].map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.label}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${m.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{m.label}</p>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">{m.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* progress */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-orange-600" />
          Progres Belajar Anda
        </h2>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { v: `${progress}%`, l: "Selesai", c: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20" },
            { v: String(completedCount), l: "Ditandai", c: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" },
            { v: String(total - completedCount), l: "Tersisa", c: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20" },
          ].map((s) => (
            <div key={s.l} className={`text-center p-3 rounded-xl ${s.c}`}>
              <p className={`text-xl font-extrabold ${s.c.split(" ")[0]}`}>{s.v}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-gray-500 dark:text-gray-400">Total progres</span>
          <span className="font-bold text-orange-600 dark:text-orange-400">{progress}%</span>
        </div>
        <div className="h-2.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="progress-bar-brand h-full rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* learning objectives */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-orange-600" />
          Tujuan Pembelajaran
        </h2>
        <ul className="space-y-2.5">
          {[
            "Memahami metodologi dan konsep dasar Sensus Ekonomi 2026",
            "Menguasai teknik wawancara dan probing yang efektif",
            "Mampu menggunakan aplikasi FASIH Mobile SE2026",
            "Memahami instrumen dan cara pengisian kuesioner SE2026",
            "Mendeteksi dan menangani ketidakwajaran data",
          ].map((obj, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 text-orange-600 dark:text-orange-400 stroke-[3]" />
              </div>
              <span className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{obj}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* organizer */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-orange-600" />
          Penyelenggara
        </h2>
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bps-logo.png"
            alt="BPS Logo"
            className="w-12 h-12 object-contain flex-shrink-0"
          />
          <div>
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">
              BPS Kabupaten Kepulauan Sangihe
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Badan Pusat Statistik</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Tab: Forum ── */
function ForumTab() {
  const discussions = [
    { user: "Peserta SE2026", time: "2 jam lalu", message: "Apakah ada panduan lebih detail untuk pengisian rincian 13 KBLI?", replies: 3 },
    { user: "Koordinator BPS", time: "5 jam lalu", message: "Untuk kendala penggunaan FASIH Mobile, silakan hubungi helpdesk teknis.", replies: 7 },
  ];
  return (
    <div className="space-y-3">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm text-center">
        <MessageSquare className="w-10 h-10 text-blue-400 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Forum Diskusi</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-4">
          Sampaikan pertanyaan dan diskusikan materi bersama peserta lain.
        </p>
        <a
          href="https://gojags-classroom.bps.go.id/my-course"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" /> Buka Diskusi Resmi
        </a>
      </div>
      {discussions.map((d, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-gray-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {d.user[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-gray-900 dark:text-white">{d.user}</span>
                <span className="text-[11px] text-gray-400">{d.time}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{d.message}</p>
              <button className="mt-1.5 text-[11px] text-orange-600 dark:text-orange-400 hover:underline font-medium">
                {d.replies} balasan
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Tab: Unduhan ── */
function UnduhanTab() {
  const files = [
    { name: "Bahan Ajar", type: "Folder Drive", size: "—", emoji: "📄", url: "https://drive.google.com/drive/folders/1ok4nqFSHIuSts33LooUbogjy5SVtOH9G?usp=drive_link" },
    { name: "Panduan", type: "Folder Drive", size: "—", emoji: "📚", url: "https://drive.google.com/drive/folders/1MifWV2tW0MKPe-05Lz3h1CLqxbgcJQ0U?usp=drive_link" },
    { name: "Kuesioner", type: "Folder Drive", size: "—", emoji: "📋", url: "https://drive.google.com/drive/folders/1_HbzTVrFoyEy0xAJITJy-oxD6xpaKvYu?usp=drive_link" },
  ];
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 dark:text-gray-400">Unduh materi referensi berikut sebagai bahan belajar.</p>
      {files.map((f, i) => (
        <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-slate-700 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-xl flex-shrink-0">
            {f.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{f.name}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{f.type} • {f.size}</p>
          </div>
          <a
            href={f.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs font-semibold rounded-lg hover:bg-orange-100 transition-colors flex-shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unduh</span>
          </a>
        </div>
      ))}
      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/30">
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Baca materi referensi sebelum menonton video untuk pemahaman yang lebih baik.
          </p>
        </div>
      </div>
    </div>
  );
}
