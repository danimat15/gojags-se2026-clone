"use client";

import { useState } from "react";

import {
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  Award,
  ArrowRight,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Play,
} from "lucide-react";
import { courseData } from "@/data/courseData";

const stats = [
  { label: "Bagian Kursus", value: "9", icon: BookOpen, color: "bg-blue-500" },
  {
    label: "Total Materi",
    value: String(
      courseData.sections.reduce((a, s) => a + s.items.length, 0)
    ),
    icon: Video,
    color: "bg-orange-500",
  },
  { label: "Gratis", value: "100%", icon: CheckCircle2, color: "bg-green-500" },
  { label: "Bersertifikat", value: "Ya", icon: Award, color: "bg-purple-500" },
];

const typeIcon = (type: string) => {
  if (type === "video") return <Play className="w-3.5 h-3.5" />;
  if (type === "link") return <FileText className="w-3.5 h-3.5" />;
  if (type === "quiz") return <HelpCircle className="w-3.5 h-3.5" />;
  if (type === "award") return <Award className="w-3.5 h-3.5" />;
  return null;
};

const typeBadge = (type: string) => {
  if (type === "video")
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300";
  if (type === "link")
    return "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300";
  if (type === "quiz")
    return "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300";
  if (type === "award")
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300";
  return "";
};

export default function LandingPage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "section-1": true,
    "section-2": true,
  });

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* ── Navbar ── */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://gojags-classroom.bps.go.id/logo/06%20gojags.png"
              alt="GoJAGS"
              className="h-8 w-8 object-contain rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="leading-tight">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                Gojags Classroom
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 hidden sm:block">
                BPS Kab. Kepulauan Sangihe
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://gojags-classroom.bps.go.id/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Situs Resmi
            </a>
            <a
              href="#kurikulum"
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              <Play className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mulai Belajar</span>
              <span className="sm:hidden">Belajar</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pt-14">
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500">
          {/* decorative circles */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute bottom-0 -left-16 w-64 h-64 rounded-full bg-black/10 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
            {/* badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-6 border border-white/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bps-logo.png" alt="BPS Logo" className="w-3.5 h-3.5 object-contain" />
              BPS Kabupaten Kepulauan Sangihe
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              <a href="#kurikulum" className="hover:text-orange-100 transition-colors">
                MOOC Pelatihan Petugas
                <br className="hidden sm:block" />
                <span className="text-white/90"> Sensus Ekonomi 2026</span>
              </a>
            </h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              Platform belajar mandiri untuk petugas SE2026 BPS Kabupaten
              Kepulauan Sangihe. Akses semua materi video, buku pedoman, dan
              kuesioner secara gratis.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href="#kurikulum"
                className="group flex items-center gap-2 px-7 py-3.5 bg-white text-orange-700 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:bg-orange-50 transition-all duration-200 w-full sm:w-auto justify-center"
              >
                <Play className="w-5 h-5" />
                Mulai Belajar Sekarang
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://gojags-classroom.bps.go.id/my-course"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-7 py-3.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-2xl border border-white/40 transition-all duration-200 w-full sm:w-auto justify-center"
              >
                <ExternalLink className="w-4 h-4" />
                GoJAGS Classroom Resmi
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 shadow-md border border-gray-100 dark:border-slate-700 flex items-center gap-3 sm:gap-4"
              >
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${s.color} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                    {s.value}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {s.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Quiz Warning ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm sm:text-base">
              Perhatian: Kuis Harus Dikerjakan di Website Resmi
            </h3>
            <p className="text-amber-800 dark:text-amber-300 text-xs sm:text-sm mt-1 leading-relaxed">
              Platform ini adalah <strong>mirror</strong> untuk memudahkan
              akses materi video. Untuk mengerjakan <strong>kuis</strong> dan
              mendapatkan <strong>sertifikat kelulusan</strong>, Anda wajib
              mengakses website resmi GoJAGS Classroom BPS.
            </p>
          </div>
          <a
            href="https://gojags-classroom.bps.go.id/my-course"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-colors flex-shrink-0 whitespace-nowrap"
          >
            Buka Kuis
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* ── About Clone ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bps-logo.png"
              alt="BPS Logo"
              className="w-16 h-16 object-contain flex-shrink-0 animate-bounce-subtle"
            />
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                Tentang Platform Ini
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                Platform ini merupakan <strong>mirror (clone)</strong> dari{" "}
                <a
                  href="https://gojags-classroom.bps.go.id/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-orange-600 dark:text-orange-400 hover:underline font-semibold"
                >
                  GoJAGS Classroom BPS
                </a>{" "}
                yang dibuat oleh{" "}
                <strong>BPS Kabupaten Kepulauan Sangihe</strong> untuk
                mempermudah akses materi pelatihan Sensus Ekonomi 2026 bagi
                petugas di wilayah Kabupaten Kepulauan Sangihe.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["9 Bagian Kursus", "Video YouTube", "Buku Pedoman", "Kuesioner SE2026"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs font-semibold rounded-full border border-orange-200 dark:border-orange-700/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Course Curriculum ── */}
      <section id="kurikulum" className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 mb-16 scroll-mt-20">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Kurikulum Kursus
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {courseData.sections.map((section) => {
            const isExpanded = !!expandedSections[section.id];
            return (
              <div
                key={section.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden transition-all duration-300"
              >
                {/* Section header */}
                <div
                  onClick={() => toggleSection(section.id)}
                  className="group/sec flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-700 bg-gradient-to-r from-orange-50 to-white dark:from-orange-900/10 dark:to-slate-800 hover:from-orange-100/50 hover:to-orange-50/10 dark:hover:from-orange-900/20 dark:hover:to-slate-800/80 transition-all cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 group-hover/sec:scale-105 transition-transform">
                      <span className="text-orange-700 dark:text-orange-400 font-bold text-sm">
                        {section.number}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white flex-1 min-w-0 truncate group-hover/sec:text-orange-600 dark:group-hover/sec:text-orange-400 transition-colors">
                      {section.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {section.items.length} materi
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Items */}
                {isExpanded && (
                  <ul className="divide-y divide-gray-50 dark:divide-slate-700/50">
                    {section.items.map((item) => (
                      <li
                        key={item.id}
                        className="group/item flex items-center gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                      >
                        <div className="flex items-center gap-3 w-full min-w-0">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold flex-shrink-0 ${typeBadge(item.type)}`}
                          >
                            {typeIcon(item.type)}
                            {item.type === "video"
                              ? "Video"
                              : item.type === "link"
                              ? "Dokumen"
                              : item.type === "quiz"
                              ? "Kuis"
                              : "Sertifikat"}
                          </span>
                          <span className="text-xs text-gray-700 dark:text-gray-300 flex-1 min-w-0 truncate">
                            {item.title}
                          </span>
                          {item.isExternal && (
                            <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/bps-logo.png"
                alt="BPS Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">
                  BPS Kabupaten Kepulauan Sangihe
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Badan Pusat Statistik
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
              <a
                href="https://gojags-classroom.bps.go.id/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" /> GoJAGS Classroom
              </a>
              <a
                href="https://www.bps.go.id/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" /> BPS Indonesia
              </a>
              <a
                href="#kurikulum"
                className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                Belajar Sekarang
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800 text-center">
            <p className="text-xs text-gray-400 dark:text-gray-600">
              Mirror dari{" "}
              <a
                href="https://gojags-classroom.bps.go.id/"
                target="_blank"
                rel="noreferrer"
                className="text-orange-500 hover:underline"
              >
                gojags-classroom.bps.go.id
              </a>{" "}
              • Dibuat untuk BPS Kab. Kepulauan Sangihe • SE2026 • Dikembangkan oleh <a href="https://hamdani-portfolio.vercel.app/" target="_blank" rel="noreferrer" className="text-orange-500 hover:underline font-semibold">Hamdani</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
