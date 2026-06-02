"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Check,
  Video,
  Link as LinkIcon,
  HelpCircle,
  Award,
  BookOpen,
  ExternalLink,
  X,
} from "lucide-react";
import { CourseData, ContentItem, Section } from "@/data/courseData";

interface CourseSidebarProps {
  courseData: CourseData;
  activeItemId: string;
  onItemSelect: (item: ContentItem) => void;
  isOpen: boolean;
  completedIds: string[];
  progress: number;
  onClose?: () => void;
}

function getItemIcon(type: ContentItem["type"]) {
  const base = "w-4 h-4";
  if (type === "video") return <Video className={`${base} text-blue-600 dark:text-blue-400`} />;
  if (type === "link") return <LinkIcon className={`${base} text-orange-600 dark:text-orange-400`} />;
  if (type === "quiz") return <HelpCircle className={`${base} text-purple-600 dark:text-purple-400`} />;
  if (type === "award") return <Award className={`${base} text-yellow-600 dark:text-yellow-400`} />;
  return null;
}

function getItemBg(type: ContentItem["type"], isActive: boolean) {
  if (isActive) return "bg-orange-100 dark:bg-orange-900/30";
  if (type === "video") return "bg-blue-100 dark:bg-blue-900/30";
  if (type === "link") return "bg-orange-100 dark:bg-orange-900/30";
  if (type === "quiz") return "bg-purple-100 dark:bg-purple-900/30";
  if (type === "award") return "bg-yellow-100 dark:bg-yellow-900/30";
  return "bg-gray-100 dark:bg-gray-800";
}

function SectionAccordion({
  section,
  activeItemId,
  onItemSelect,
  completedIds,
  defaultOpen,
}: {
  section: Section;
  activeItemId: string;
  onItemSelect: (item: ContentItem) => void;
  completedIds: string[];
  defaultOpen: boolean;
}) {
  const hasActive = section.items.some((i) => i.id === activeItemId);
  const [open, setOpen] = useState(defaultOpen || hasActive);

  useEffect(() => {
    if (hasActive) {
      setOpen(true);
    }
  }, [hasActive]);

  const completedInSection = section.items.filter((i) =>
    completedIds.includes(i.id)
  ).length;

  const handleHeaderClick = () => {
    setOpen(!open);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-800">
      <button
        onClick={handleHeaderClick}
        className={`w-full flex items-center justify-between px-3.5 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/60 cursor-pointer`}
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div
            className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
              hasActive
                ? "border-orange-600 bg-orange-50 text-orange-600 dark:border-orange-400 dark:bg-orange-900/20 dark:text-orange-400"
                : "border-gray-300 text-gray-400 dark:border-slate-700 dark:text-gray-500"
            }`}
          >
            {section.number}
          </div>
          <div className="text-left flex-1 min-w-0">
            <h4 className={`text-xs font-semibold truncate leading-tight ${
              hasActive ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
            }`}>
              {section.title}
            </h4>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
              {completedInSection}/{section.items.length} selesai
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-gray-100 dark:border-slate-800">
          {section.items.map((item) => {
            const isActive = item.id === activeItemId;
            const isDone = completedIds.includes(item.id);

            return (
              <Link
                key={item.id}
                href={`/course/${item.id}`}
                onClick={() => onItemSelect(item)}
                className={`w-full flex items-center gap-2.5 text-left transition-all rounded-none px-3.5 py-2.5 group
                  ${isActive ? "bg-orange-50 dark:bg-orange-900/25" : "hover:bg-gray-50 dark:hover:bg-slate-800/60 cursor-pointer"}
                `}
              >
                {/* icon */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${getItemBg(
                    item.type,
                    isActive
                  )}`}
                >
                  {getItemIcon(item.type)}
                </div>

                {/* title */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-medium leading-snug line-clamp-2 ${
                      isActive
                        ? "text-orange-800 dark:text-orange-200"
                        : "text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {item.title}
                  </p>
                  {item.isExternal && (
                    <span className="flex items-center gap-0.5 text-[10px] text-gray-400 mt-0.5">
                      <ExternalLink className="w-2.5 h-2.5" /> Site resmi
                    </span>
                  )}
                </div>

                {/* status */}
                <div className="flex-shrink-0">
                  {isDone ? (
                    <div className="w-4 h-4 rounded-full bg-green-200 dark:bg-green-900/40 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-green-600 dark:text-green-400 stroke-[3]" />
                    </div>
                  ) : isActive ? (
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                  ) : (
                    <div className="w-4 h-4" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CourseSidebar({
  courseData,
  activeItemId,
  onItemSelect,
  isOpen,
  completedIds,
  progress,
  onClose,
}: CourseSidebarProps) {
  const totalItems = courseData.sections.reduce(
    (a, s) => a + s.items.length,
    0
  );

  return (
    <aside
      className={`fixed top-12 right-0 bottom-0 z-40 flex flex-col bg-white dark:bg-slate-950 border-l border-gray-200 dark:border-slate-800 shadow-xl transition-transform duration-300 ease-in-out
        w-full sm:w-80 lg:w-[380px]
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {/* Header */}
      <div className="flex-shrink-0 h-11 border-b border-gray-200 dark:border-slate-800 px-4 flex items-center bg-white dark:bg-slate-950">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-orange-600" />
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
            Konten Kursus
          </h3>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {totalItems} materi
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md text-gray-500 hover:text-orange-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-orange-400 dark:hover:bg-slate-800 transition-colors"
              title="Tutup sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable sections */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-3 space-y-2">
          {/* Curriculum card */}
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 dark:from-slate-800 dark:to-slate-900 border border-orange-100 dark:border-slate-700">
            <div className="flex items-center gap-3 px-3.5 py-3">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-xs text-gray-900 dark:text-white">
                  Kurikulum Kursus
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                  {courseData.totalSections} bagian · {totalItems} materi
                </p>
              </div>
            </div>
          </div>

          {/* Sections */}
          {courseData.sections.map((section, idx) => (
            <SectionAccordion
              key={section.id}
              section={section}
              activeItemId={activeItemId}
              onItemSelect={onItemSelect}
              completedIds={completedIds}
              defaultOpen={idx < 2}
            />
          ))}
        </div>
      </div>

      {/* Progress footer */}
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-slate-800 px-4 py-3 bg-gray-50 dark:bg-slate-950">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-medium text-gray-600 dark:text-gray-400">
            Progres Anda
          </span>
          <span className="font-extrabold text-orange-600 dark:text-orange-400">
            {progress}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="progress-bar-brand h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2">
          Selesaikan semua materi untuk mendapat sertifikat
        </p>
      </div>
    </aside>
  );
}
