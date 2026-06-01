export type ContentType = "video" | "link" | "quiz" | "award";
export type ContentStatus = "completed" | "accessible";

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  status: ContentStatus;
  youtubeId?: string;
  url?: string;
  description?: string;
  isExternal?: boolean;
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
  totalSections: number;
  sections: Section[];
}

const QUIZ_URL = "https://gojags-classroom.bps.go.id/my-course";

export const courseData: CourseData = {
  id: "se2026-mooc",
  title: "MOOC Pelatihan Petugas SE2026",
  totalSections: 9,
  sections: [
    {
      id: "section-1",
      number: 1,
      title: "SE 2026 - Bahan Pembelajaran",
      items: [
        {
          id: "item-1-1",
          title: "Bahan Ajar",
          type: "link",
          status: "accessible",
          url: "https://drive.google.com/drive/folders/1ok4nqFSHIuSts33LooUbogjy5SVtOH9G?usp=drive_link",
          description: "Bahan ajar lengkap untuk Sensus Ekonomi 2026. Klik tombol di bawah untuk mengakses dokumen.",
        },
        {
          id: "item-1-2",
          title: "Panduan",
          type: "link",
          status: "accessible",
          url: "https://drive.google.com/drive/folders/1MifWV2tW0MKPe-05Lz3h1CLqxbgcJQ0U?usp=drive_link",
          description: "Buku pedoman resmi pelaksanaan Sensus Ekonomi 2026.",
        },
        {
          id: "item-1-3",
          title: "Kuesioner",
          type: "link",
          status: "accessible",
          url: "https://drive.google.com/drive/folders/1_HbzTVrFoyEy0xAJITJy-oxD6xpaKvYu?usp=drive_link",
          description: "Kuesioner yang digunakan dalam pendataan SE2026.",
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
          status: "accessible",
          youtubeId: "8w4sGWyblOI",
          description: "Video penjelasan umum Sensus Ekonomi 2026, mencakup latar belakang, tujuan, dan ruang lingkup sensus.",
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
          youtubeId: "_oMH8WUxWGI",
          description: "Pendahuluan metodologi yang digunakan dalam Sensus Ekonomi 2026.",
        },
        {
          id: "item-3-2",
          title: "Video Konsep Definisi Usaha",
          type: "video",
          status: "accessible",
          youtubeId: "C5H4ZeXcCTU",
          description: "Penjelasan konsep dan definisi usaha dalam konteks SE2026.",
        },
        {
          id: "item-3-3",
          title: "Video Tata Cara Pemutakhiran",
          type: "video",
          status: "accessible",
          youtubeId: "6KnI6dU3HSo",
          description: "Tata cara pemutakhiran data dalam pelaksanaan SE2026.",
        },
        {
          id: "item-3-4",
          title: "Kuis",
          type: "quiz",
          status: "accessible",
          url: QUIZ_URL,
          isExternal: true,
          description: "Uji pemahaman materi metodologi SE2026. Kuis dilakukan di website resmi GoJAGS Classroom.",
        },
      ],
    },
    {
      id: "section-4",
      number: 4,
      title: "SE 2026 - Manajemen Lapangan",
      items: [
        {
          id: "item-4-1",
          title: "Video Pembelajaran Struktur Organisasi Lapangan Lengkap SE2026",
          type: "video",
          status: "accessible",
          youtubeId: "yI4ASMLo9Lw",
          description: "Struktur organisasi lapangan lengkap untuk pelaksanaan SE2026.",
        },
        {
          id: "item-4-2",
          title: "Video Pembelajaran Mekanisme Pendataan Usaha Besar (UB)",
          type: "video",
          status: "accessible",
          youtubeId: "jcMZPFBjmBg",
          description: "Mekanisme pendataan khusus untuk usaha besar dalam SE2026.",
        },
        {
          id: "item-4-3",
          title: "Video Pembelajaran Mekanisme Pendataan Door to Door",
          type: "video",
          status: "accessible",
          youtubeId: "1lEqDRtvNto",
          description: "Mekanisme pendataan door to door untuk usaha kecil dan menengah.",
        },
        {
          id: "item-4-4",
          title: "Kuis",
          type: "quiz",
          status: "accessible",
          url: QUIZ_URL,
          isExternal: true,
          description: "Uji pemahaman materi manajemen lapangan SE2026. Kuis dilakukan di website resmi GoJAGS Classroom.",
        },
      ],
    },
    {
      id: "section-5",
      number: 5,
      title: "SE 2026 - FASIH Mobile dan Pengolahan",
      items: [
        {
          id: "item-5-1",
          title: "Pengenalan FASIH SE2026",
          type: "video",
          status: "accessible",
          youtubeId: "pQklFwBDRmI",
          description: "Pengenalan aplikasi FASIH yang digunakan dalam SE2026.",
        },
        {
          id: "item-5-2",
          title: "Penggunaan FASIH Mobile SE2026",
          type: "video",
          status: "accessible",
          youtubeId: "WEIdyC_VTlA",
          description: "Panduan penggunaan FASIH Mobile untuk pendataan SE2026.",
        },
        {
          id: "item-5-3",
          title: "Kuis",
          type: "quiz",
          status: "accessible",
          url: QUIZ_URL,
          isExternal: true,
          description: "Uji pemahaman FASIH Mobile SE2026. Kuis dilakukan di website resmi GoJAGS Classroom.",
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
          status: "accessible",
          youtubeId: "QZdsVL-Rt2c",
          description: "Penjelasan rincian 13 terkait Klasifikasi Baku Lapangan Usaha Indonesia (KBLI).",
        },
        {
          id: "item-6-2",
          title: "Video Rincian 16 - Ekonomi Digital",
          type: "video",
          status: "accessible",
          youtubeId: "l3aRARSySow",
          description: "Penjelasan rincian 16 terkait ekonomi digital dalam SE2026.",
        },
        {
          id: "item-6-3",
          title: "Video Rincian 17 - Ekonomi Hijau",
          type: "video",
          status: "accessible",
          youtubeId: "B8f9sTAl8lI",
          description: "Penjelasan rincian 17 terkait ekonomi hijau dan berkelanjutan.",
        },
        {
          id: "item-6-4",
          title: "Video Rincian 24 - Jumlah Pekerja",
          type: "video",
          status: "accessible",
          youtubeId: "k1EPRwS5LBM",
          description: "Penjelasan rincian 24 mengenai pendataan jumlah pekerja.",
        },
        {
          id: "item-6-5",
          title: "Video Rincian 26 - Nilai Pengeluaran",
          type: "video",
          status: "accessible",
          youtubeId: "8nJN_AgbTX4",
          description: "Penjelasan rincian 26 mengenai nilai pengeluaran usaha.",
        },
        {
          id: "item-6-6",
          title: "Video Rincian 27 - Pendapatan",
          type: "video",
          status: "accessible",
          youtubeId: "8nJN_AgbTX4",
          description: "Penjelasan rincian 27 mengenai pendapatan usaha.",
        },
        {
          id: "item-6-7",
          title: "Video Rincian 28 - Aset dan Luas Lahan",
          type: "video",
          status: "accessible",
          youtubeId: "taX3_J4A7zE",
          description: "Penjelasan rincian 28 mengenai aset dan luas lahan usaha.",
        },
        {
          id: "item-6-8",
          title: "Kuis",
          type: "quiz",
          status: "accessible",
          url: QUIZ_URL,
          isExternal: true,
          description: "Uji pemahaman materi instrumen SE2026. Kuis dilakukan di website resmi GoJAGS Classroom.",
        },
      ],
    },
    {
      id: "section-7",
      number: 7,
      title: "SE 2026 - Wawancara dan Probing",
      items: [
        {
          id: "item-7-1",
          title: "Video Pembelajaran 4S",
          type: "video",
          status: "accessible",
          youtubeId: "zR5rfN2th_I",
          description: "Teknik wawancara 4S untuk meningkatkan kualitas pendataan SE2026.",
        },
        {
          id: "item-7-2",
          title: "Video Pembelajaran Teknik Probing",
          type: "video",
          status: "accessible",
          youtubeId: "429SXuIghAs",
          description: "Teknik probing dalam wawancara untuk mendapatkan data yang akurat.",
        },
        {
          id: "item-7-3",
          title: "Kuis",
          type: "quiz",
          status: "accessible",
          url: QUIZ_URL,
          isExternal: true,
          description: "Uji pemahaman teknik wawancara dan probing. Kuis dilakukan di website resmi GoJAGS Classroom.",
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
          status: "accessible",
          youtubeId: "429SXuIghAs",
          description: "Pengenalan dan penanganan ketidakwajaran data dalam SE2026.",
        },
        {
          id: "item-8-2",
          title: "Kuis",
          type: "quiz",
          status: "accessible",
          url: QUIZ_URL,
          isExternal: true,
          description: "Uji pemahaman materi ketidakwajaran data. Kuis dilakukan di website resmi GoJAGS Classroom.",
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
          status: "accessible",
          url: QUIZ_URL,
          isExternal: true,
          description: "Sertifikat kelulusan MOOC Pelatihan Petugas SE2026. Unduh sertifikat di website resmi GoJAGS Classroom setelah menyelesaikan semua kuis.",
        },
      ],
    },
  ],
};

export function getAllItems(data: CourseData): ContentItem[] {
  return data.sections.flatMap((s) => s.items);
}

export function getVideoItems(data: CourseData): ContentItem[] {
  return getAllItems(data).filter((i) => i.type === "video" || i.type === "link");
}

export function getAdjacentItems(
  data: CourseData,
  currentItemId: string
): { prev: ContentItem | null; next: ContentItem | null } {
  const allItems = getAllItems(data);
  const idx = allItems.findIndex((i) => i.id === currentItemId);
  return {
    prev: idx > 0 ? allItems[idx - 1] : null,
    next: idx < allItems.length - 1 ? allItems[idx + 1] : null,
  };
}

export function calculateProgress(completedIds: string[], data: CourseData): number {
  const trackable = getAllItems(data).filter((i) => i.type !== "award");
  if (trackable.length === 0) return 0;
  const done = completedIds.filter((id) => trackable.some((i) => i.id === id)).length;
  return Math.round((done / trackable.length) * 100);
}
