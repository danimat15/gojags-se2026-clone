"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Lock,
  Check,
  Video,
  Link,
  HelpCircle,
  Award,
  BookOpen,
  Package,
} from "lucide-react";
import { CourseData, ContentItem, Section } from "@/data/courseData";

interface CourseSidebarProps {
  courseData: CourseData;
  activeItemId: string;
  onItemSelect: (item: ContentItem) => void;
  isOpen: boolean;
  onToggle: () => void;
}

function getItemIcon(type: ContentItem["type"], status: ContentItem["status"]) {
  const iconClass = "w-4 h-4";

  if (type === "video") {
    const colorClass =
      status === "locked"
        ? "text-blue-600 dark:text-blue-400"
        : "text-brand-600 dark:text-brand-400";
    return <Video className={`${iconClass} ${colorClass}`} />;
  }
  if (type === "link") {
    return (
      <Link className={`${iconClass} text-orange-600 dark:text-orange-400`} />
    );
  }
  if (type === "quiz") {
    return (
      <HelpCircle
        className={`${iconClass} text-purple-600 dark:text-purple-400`}
      />
    );
  }
  if (type === "award") {
    return (
      <Award
        className={`${iconClass} text-yellow-600 dark:text-yellow-400`}
      />
    );
  }
  return <Package className={`${iconClass} text-yellow-600`} />;
}

function getItemBgColor(type: ContentItem["type"]) {
  if (type === "video")
    return "bg-blue-100 dark:bg-blue-900/30";
  if (type === "link")
    return "bg-orange-100 dark:bg-orange-900/30";
  if (type === "quiz")
    return "bg-purple-100 dark:bg-purple-900/30";
  if (type === "award")
    return "bg-yellow-100 dark:bg-yellow-900/30";
  return "bg-gray-100 dark:bg-gray-800";
}

function StatusIndicator({ status }: { status: ContentItem["status"] }) {
  if (status === "completed") {
    return (
      <div className="w-4 h-4 rounded-full bg-green-200 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
        <Check className="w-3 h-3 text-green-600 dark:text-green-400 stroke-[3]" />
      </div>
    );
  }
  if (status === "locked") {
    return (
      <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0 stroke-[3]" />
    );
  }
  if (status === "current") {
    return (
      <div className="w-4 h-4 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
    );
  }
  return <div className="w-4 h-4 flex-shrink-0" />;
}

function SectionAccordion({
  section,
  activeItemId,
  onItemSelect,
  defaultOpen,
}: {
  section: Section;
  activeItemId: string;
  onItemSelect: (item: ContentItem) => void;
  defaultOpen: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const hasActiveItem = section.items.some((item) => item.id === activeItemId);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-800">
      {/* Section header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors duration-200"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className={`rounded-md border-2 flex items-center justify-center flex-shrink-0 w-8 h-8 ${
              hasActiveItem
                ? "border-brand-600 dark:border-brand-400 bg-brand-50 dark:bg-brand-900/20"
                : "border-brand-600 dark:border-brand-400"
            }`}
          >
            <span className="text-brand-600 dark:text-brand-400 font-semibold text-sm">
              {section.number}
            </span>
          </div>
          <div className="text-left flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 dark:text-white truncate text-sm">
              {section.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {section.items.length} materi
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Section items */}
      {isOpen && (
        <div className="border-t border-gray-100 dark:border-slate-800">
          {section.items.map((item) => {
            const isActive = item.id === activeItemId;
            const isLocked = item.status === "locked";

            return (
              <button
                key={item.id}
                onClick={() => !isLocked && onItemSelect(item)}
                disabled={isLocked}
                className={`w-full flex items-center gap-3 transition-all rounded-none pr-4 pl-8 py-3 text-left group
                  ${isActive ? "bg-brand-50 dark:bg-brand-900/30" : ""}
                  ${
                    isLocked
                      ? "cursor-not-allowed opacity-60"
                      : "hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                  }
                `}
              >
                {/* Item icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${
                      isActive
                        ? "bg-brand-100 dark:bg-brand-900/30"
                        : getItemBgColor(item.type)
                    }`}
                  >
                    {getItemIcon(
                      item.type,
                      isActive ? "current" : item.status
                    )}
                  </div>
                </div>

                {/* Item title */}
                <div className="flex-1 min-w-0">
                  <h4
                    className={`font-medium truncate text-sm ${
                      isActive
                        ? "text-brand-900 dark:text-brand-100"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {item.title}
                  </h4>
                </div>

                {/* Status indicator */}
                <div className="flex-shrink-0">
                  <StatusIndicator
                    status={isActive ? "current" : item.status}
                  />
                </div>
              </button>
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
  onToggle,
}: CourseSidebarProps) {
  return (
    <>
      {/* Sidebar toggle button */}
      <div
        className={`fixed top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          isOpen ? "right-[400px]" : "right-0"
        }`}
      >
        <button
          onClick={onToggle}
          className="w-5 h-24 bg-gradient-to-r from-brand-600 to-brand-700 border-0 rounded-l-xl shadow-[-4px_0_16px_rgba(234,88,12,0.3)] flex items-center justify-center transition-all duration-300 hover:w-6 hover:from-brand-700 hover:to-brand-800 active:scale-95"
          title={isOpen ? "Tutup sidebar" : "Buka sidebar"}
        >
          {isOpen ? (
            <ChevronRight className="w-4 h-4 text-white" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white -rotate-90" />
          )}
        </button>
      </div>

      {/* Sidebar panel */}
      <div
        className={`fixed top-12 right-0 bottom-0 w-full sm:w-[400px] bg-white dark:bg-slate-950 border-l border-gray-200 dark:border-slate-800 flex flex-col z-40 transition-transform duration-300 shadow-xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex-shrink-0 h-14 border-b border-gray-200 dark:border-slate-800 px-4 flex items-center justify-between bg-white dark:bg-slate-950">
          <h3 className="font-semibold text-base text-gray-900 dark:text-white px-2">
            Konten Kursus
          </h3>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors sm:hidden"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 space-y-3">
            {/* Curriculum overview card */}
            <div className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden bg-gradient-to-br from-brand-50 to-orange-50 dark:from-slate-800 dark:to-slate-900">
              <div className="flex items-center gap-3 px-4 py-4">
                <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                    Kurikulum Kursus
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    {courseData.totalSections} bagian •{" "}
                    {courseData.sections.reduce(
                      (acc, s) => acc + s.items.length,
                      0
                    )}{" "}
                    materi
                  </p>
                </div>
              </div>
            </div>

            {/* Section accordions */}
            {courseData.sections.map((section, index) => (
              <SectionAccordion
                key={section.id}
                section={section}
                activeItemId={activeItemId}
                onItemSelect={onItemSelect}
                defaultOpen={index < 3}
              />
            ))}
          </div>
        </div>

        {/* Progress footer */}
        <div className="flex-shrink-0 border-t border-gray-200 dark:border-slate-800 px-5 py-4 bg-gray-50 dark:bg-slate-950">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
            <span className="font-medium">Progres Anda</span>
            <span className="font-bold text-brand-600 dark:text-brand-400">
              {courseData.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="progress-bar-brand h-2 rounded-full transition-all duration-500"
              style={{ width: `${courseData.progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Selesaikan semua materi untuk mendapatkan sertifikat
          </p>
        </div>
      </div>
    </>
  );
}
