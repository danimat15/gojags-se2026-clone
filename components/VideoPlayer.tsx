"use client";

import { ExternalLink, Link, Award, HelpCircle, AlertTriangle, FileText, Play } from "lucide-react";
import { ContentItem } from "@/data/courseData";

interface VideoPlayerProps {
  item: ContentItem;
}

/* ── Link / Dokumen ── */
function LinkContent({ item }: { item: ContentItem }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-900 p-6">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-5 shadow-md">
          <FileText className="w-8 h-8 text-orange-600 dark:text-orange-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          {item.description}
        </p>
        <a
          href={item.url || "#"}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-xl text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Buka Materi
        </a>
        <p className="text-xs text-gray-400 mt-3">
          Akan membuka tab baru
        </p>
      </div>
    </div>
  );
}

/* ── Quiz (eksternal) ── */
function QuizContent({ item }: { item: ContentItem }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-50 dark:from-slate-800 dark:to-slate-900 p-6">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-5 shadow-md">
          <HelpCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
          {item.description}
        </p>

        {/* warning box */}
        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl p-3.5 text-left mb-5">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            Kuis <strong>harus dikerjakan</strong> di website resmi GoJAGS Classroom BPS.
          </p>
        </div>

        <a
          href={item.url || "https://gojags-classroom.bps.go.id/my-course"}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-xl text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Kerjakan Kuis di GoJAGS
        </a>
      </div>
    </div>
  );
}

/* ── Sertifikat ── */
function AwardContent({ item }: { item: ContentItem }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-slate-800 dark:to-slate-900 p-6">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 rounded-2xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-5 shadow-md">
          <Award className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Sertifikat Kelulusan
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          MOOC Pelatihan Petugas SE2026
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-6">
          {item.description}
        </p>

        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl p-3.5 text-left mb-5">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            Sertifikat dapat diunduh di website resmi GoJAGS Classroom setelah menyelesaikan semua kuis.
          </p>
        </div>

        <a
          href={item.url || "https://gojags-classroom.bps.go.id/my-course"}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-xl text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Ambil Sertifikat di GoJAGS
        </a>
      </div>
    </div>
  );
}

/* ── YouTube Video ── */
function YouTubePlayer({ item }: { item: ContentItem }) {
  if (!item.youtubeId) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 p-6">
        <div className="text-center">
          <Play className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Video tidak tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <iframe
      key={item.youtubeId}
      src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?rel=0&modestbranding=1`}
      title={item.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="absolute inset-0 w-full h-full"
      frameBorder="0"
    />
  );
}

/* ── Main Export ── */
export default function VideoPlayer({ item }: VideoPlayerProps) {
  if (item.type === "link") return <LinkContent item={item} />;
  if (item.type === "quiz") return <QuizContent item={item} />;
  if (item.type === "award") return <AwardContent item={item} />;

  /* video */
  return (
    <div className="relative w-full h-full bg-black">
      <YouTubePlayer item={item} />
    </div>
  );
}
