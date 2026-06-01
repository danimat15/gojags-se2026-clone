"use client";

import { Lock, Video, Play, ExternalLink, Link, Award, HelpCircle } from "lucide-react";
import { ContentItem } from "@/data/courseData";

interface VideoPlayerProps {
  item: ContentItem;
}

function LockedContent({ item }: { item: ContentItem }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="text-center px-8 z-10">
        <div className="w-20 h-20 rounded-full bg-gray-700/80 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 shadow-xl">
          <Lock className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">
          Konten Terkunci
        </h3>
        <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
          Selesaikan materi sebelumnya untuk membuka konten ini.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Lock className="w-3 h-3" />
          <span>{item.title}</span>
        </div>
      </div>
    </div>
  );
}

function LinkContent({ item }: { item: ContentItem }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-slate-800 dark:to-slate-900">
      <div className="text-center px-8">
        <div className="w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Link className="w-10 h-10 text-orange-600 dark:text-orange-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs mx-auto leading-relaxed mb-6">
          {item.description}
        </p>
        <a
          href={item.url || "#"}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
        >
          <ExternalLink className="w-4 h-4" />
          Buka Materi
        </a>
      </div>
    </div>
  );
}

function AwardContent({ item }: { item: ContentItem }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-slate-800 dark:to-slate-900">
      <div className="text-center px-8">
        <div className="w-24 h-24 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Award className="w-12 h-12 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Sertifikat Kelulusan
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm mx-auto leading-relaxed mb-2">
          MOOC Pelatihan Petugas Sensus Ekonomi 2026
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-xs max-w-xs mx-auto">
          Selesaikan semua materi terlebih dahulu untuk mendapatkan sertifikat ini.
        </p>
        <div className="mt-8 px-6 py-4 border-2 border-dashed border-yellow-300 dark:border-yellow-700 rounded-xl max-w-xs mx-auto">
          <Lock className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
          <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium">
            Belum tersedia
          </p>
        </div>
      </div>
    </div>
  );
}

function QuizContent({ item }: { item: ContentItem }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-violet-50 dark:from-slate-800 dark:to-slate-900">
      <div className="text-center px-8">
        <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <HelpCircle className="w-10 h-10 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs mx-auto leading-relaxed mb-6">
          {item.description}
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <Lock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
            Selesaikan video sebelumnya
          </span>
        </div>
      </div>
    </div>
  );
}

export default function VideoPlayer({ item }: VideoPlayerProps) {
  if (item.status === "locked") {
    if (item.type === "quiz") return <QuizContent item={item} />;
    if (item.type === "award") return <AwardContent item={item} />;
    return <LockedContent item={item} />;
  }

  if (item.type === "link") {
    return <LinkContent item={item} />;
  }

  if (item.type === "award") {
    return <AwardContent item={item} />;
  }

  if (item.type === "quiz") {
    return <QuizContent item={item} />;
  }

  if (item.type === "video" && item.youtubeId) {
    return (
      <div className="w-full h-full bg-black relative">
        <iframe
          key={item.youtubeId}
          src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?rel=0&modestbranding=1&autoplay=0`}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
        />
      </div>
    );
  }

  // Fallback for accessible video without youtubeId
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="text-center px-8">
        <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-6">
          <Video className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
        <p className="text-gray-400 text-sm">
          Video tidak tersedia saat ini.
        </p>
      </div>
    </div>
  );
}
