export type ContentType = "video" | "link" | "quiz" | "award" | "scorm";
export type ContentStatus = "completed" | "current" | "locked" | "accessible";

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  youtubeId?: string;
  url?: string;
  description?: string;
}

export interface Section {
  id: string;
  number: number;
  title: string;
  items: ContentItem[];
}

export interface CourseData {
  id: string;
  title: string;
  progress: number;
  totalSections: number;
  sections: Section[];
}

export const courseData: CourseData = {
  id: "se2026-mooc",
  title: "MOOC Pelatihan Petugas SE2026",
  progress: 14,
  totalSections: 9,
  sections: [
    {
      id: "section-1",
      number: 1,
      title: "SE 2026 - Bahan Pembelajaran",
      items: [
        {
          id: "item-1-1",
          title: "Bahan Ajar SE2026",
          type: "link",
          status: "completed",
          url: "https://gojags-classroom.bps.go.id",
          description: "Bahan ajar lengkap untuk Sensus Ekonomi 2026",
        },
        {
          id: "item-1-2",
          title: "Buku Pedoman SE2026",
          type: "link",
          status: "completed",
          url: "https://gojags-classroom.bps.go.id",
          description: "Buku pedoman resmi SE2026",
        },
        {
          id: "item-1-3",
          title: "Kuesioner SE2026",
          type: "link",
          status: "completed",
          url: "https://gojags-classroom.bps.go.id",
          description: "Kuesioner yang digunakan dalam SE2026",
        },
      ],
    },
    {
      id: "section-2",
      number: 2,
      title: "SE 2026 - Penjelasan Umum",
      items: [
        {
          id: "item-2-1",
          title: "Penjelasan Umum",
          type: "video",
          status: "completed",
          youtubeId: "8w4sGWyblOI",
          description:
            "Video penjelasan umum tentang Sensus Ekonomi 2026, mencakup latar belakang, tujuan, dan ruang lingkup sensus.",
        },
      ],
    },
    {
      id: "section-3",
      number: 3,
      title: "SE 2026 - Metodologi",
      items: [
        {
          id: "item-3-1",
          title: "Video Pendahuluan Metodologi Sensus Ekonomi 2026",
          type: "video",
          status: "accessible",
          youtubeId: "8w4sGWyblOI",
          description:
            "Pendahuluan metodologi yang digunakan dalam Sensus Ekonomi 2026.",
        },
        {
          id: "item-3-2",
          title: "Video Konsep Definisi Usaha",
          type: "video",
          status: "locked",
          description:
            "Penjelasan konsep dan definisi usaha dalam konteks SE2026.",
        },
        {
          id: "item-3-3",
          title: "Video Tata Cara Pemutakhiran",
          type: "video",
          status: "locked",
          description:
            "Tata cara pemutakhiran data dalam pelaksanaan SE2026.",
        },
      ],
    },
    {
      id: "section-4",
      number: 4,
      title: "SE2026 - Manajemen Lapangan",
      items: [
        {
          id: "item-4-1",
          title:
            "Video Pembelajaran Struktur Organisasi Lapangan Lengkap SE2026",
          type: "video",
          status: "locked",
          description:
            "Struktur organisasi lapangan lengkap untuk pelaksanaan SE2026.",
        },
        {
          id: "item-4-2",
          title: "Video Pembelajaran Mekanisme Pendataan Usaha Besar (UB)",
          type: "video",
          status: "locked",
          description:
            "Mekanisme pendataan khusus untuk usaha besar dalam SE2026.",
        },
        {
          id: "item-4-3",
          title: "Video Pembelajaran Mekanisme Pendataan Door to Door",
          type: "video",
          status: "locked",
          description:
            "Mekanisme pendataan door to door untuk usaha kecil dan menengah.",
        },
        {
          id: "item-4-4",
          title: "Kuis Manajemen Lapangan",
          type: "quiz",
          status: "locked",
          description:
            "Uji pemahaman materi manajemen lapangan SE2026.",
        },
      ],
    },
    {
      id: "section-5",
      number: 5,
      title: "SE 2026 - Fasih Mobile dan Pengolahan",
      items: [
        {
          id: "item-5-1",
          title: "Pengenalan FASIH SE2026",
          type: "video",
          status: "locked",
          description:
            "Pengenalan aplikasi FASIH yang digunakan dalam SE2026.",
        },
        {
          id: "item-5-2",
          title: "Penggunaan FASIH Mobile SE2026",
          type: "video",
          status: "locked",
          description:
            "Panduan penggunaan FASIH Mobile untuk pendataan SE2026.",
        },
      ],
    },
    {
      id: "section-6",
      number: 6,
      title: "SE 2026 - Instrumen",
      items: [
        {
          id: "item-6-1",
          title: "Video Rincian 13 - KBLI",
          type: "video",
          status: "locked",
          description:
            "Penjelasan rincian 13 terkait Klasifikasi Baku Lapangan Usaha Indonesia (KBLI).",
        },
        {
          id: "item-6-2",
          title: "Video Rincian 16 - Ekonomi Digital",
          type: "video",
          status: "locked",
          description:
            "Penjelasan rincian 16 terkait ekonomi digital dalam SE2026.",
        },
        {
          id: "item-6-3",
          title: "Video Rincian 17 - Ekonomi Hijau",
          type: "video",
          status: "locked",
          description:
            "Penjelasan rincian 17 terkait ekonomi hijau dan berkelanjutan.",
        },
        {
          id: "item-6-4",
          title: "Video Rincian 24 - Jumlah Pekerja",
          type: "video",
          status: "locked",
          description:
            "Penjelasan rincian 24 mengenai pendataan jumlah pekerja.",
        },
        {
          id: "item-6-5",
          title: "Video Rincian 26 - Nilai Pengeluaran",
          type: "video",
          status: "locked",
          description:
            "Penjelasan rincian 26 mengenai nilai pengeluaran usaha.",
        },
        {
          id: "item-6-6",
          title: "Video Rincian 27 - Pendapatan",
          type: "video",
          status: "locked",
          description:
            "Penjelasan rincian 27 mengenai pendapatan usaha.",
        },
        {
          id: "item-6-7",
          title: "Video Rincian 28 - Aset dan Luas Lahan",
          type: "video",
          status: "locked",
          description:
            "Penjelasan rincian 28 mengenai aset dan luas lahan usaha.",
        },
      ],
    },
    {
      id: "section-7",
      number: 7,
      title: "SE 2026 - Wawancara Probing",
      items: [
        {
          id: "item-7-1",
          title: "Video Pembelajaran 4S",
          type: "video",
          status: "locked",
          description:
            "Teknik wawancara 4S untuk meningkatkan kualitas pendataan SE2026.",
        },
        {
          id: "item-7-2",
          title: "Video Pembelajaran Teknik Probing",
          type: "video",
          status: "locked",
          description:
            "Teknik probing dalam wawancara untuk mendapatkan data yang akurat.",
        },
      ],
    },
    {
      id: "section-8",
      number: 8,
      title: "SE 2026 - Ketidakwajaran Data",
      items: [
        {
          id: "item-8-1",
          title: "Ketidakwajaran Data",
          type: "video",
          status: "locked",
          description:
            "Pengenalan dan penanganan ketidakwajaran data dalam SE2026.",
        },
        {
          id: "item-8-2",
          title: "Kuis Ketidakwajaran Data",
          type: "quiz",
          status: "locked",
          description:
            "Uji pemahaman materi ketidakwajaran data SE2026.",
        },
      ],
    },
    {
      id: "section-9",
      number: 9,
      title: "Sertifikat",
      items: [
        {
          id: "item-9-1",
          title: "Sertifikat Kelulusan",
          type: "award",
          status: "locked",
          description:
            "Sertifikat kelulusan MOOC Pelatihan Petugas SE2026 dari BPS.",
        },
      ],
    },
  ],
};

export function getAllItems(data: CourseData): ContentItem[] {
  return data.sections.flatMap((section) => section.items);
}

export function getAdjacentItems(
  data: CourseData,
  currentItemId: string
): { prev: ContentItem | null; next: ContentItem | null } {
  const allItems = getAllItems(data);
  const currentIndex = allItems.findIndex((item) => item.id === currentItemId);

  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const next =
    currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return { prev, next };
}
