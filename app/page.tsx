"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Cpu,
  ExternalLink,
  Layers,
  Mail,
  Send,
  Sparkles,
  Terminal,
  CheckCircle2,
  ArrowUpRight,
  User,
  MessageCircle,
  Palette,
  Check,
  Sun,
  Moon,
  GraduationCap,
  Download,
  FileText,
  Printer,
  X,
  Eye,
  ImageIcon,
  Wrench,
  Zap,
  Menu,
} from "lucide-react";

// ==========================================
// DAFTAR TEMA LIQUID GLASS
// ==========================================
const THEMES = [
  {
    id: "ocean",
    name: "Ocean Sapphire",
    swatch: "linear-gradient(135deg, #22d3ee, #6366f1)",
  },
  {
    id: "lavender",
    name: "Blush Lavender",
    swatch: "linear-gradient(135deg, #e879f9, #f472b6)",
  },
  {
    id: "emerald",
    name: "Emerald Sage",
    swatch: "linear-gradient(135deg, #34d399, #14b8a6)",
  },
  {
    id: "ruby",
    name: "Velvet Ruby",
    swatch: "linear-gradient(135deg, #fb7185, #f97316)",
  },
  {
    id: "champagne",
    name: "Champagne Gold",
    swatch: "linear-gradient(135deg, #fcd34d, #d97706)",
  },
] as const;

type ThemeId = (typeof THEMES)[number]["id"];
type ModeType = "dark" | "light";

interface ProjectSpec {
  label: string;
  value: string;
}

interface ProjectItem {
  id: number;
  title: string;
  category: string;
  status?: string;
  image: string;
  description: string;
  specs: ProjectSpec[];
  highlights: string[];
  tech: string[];
  demoUrl: string;
  repoUrl: string;
}

// ==========================================
// KOMPONEN ANIMASI MENGETIK NAMA (HURUF SATU PER SATU)
// ==========================================
function TypewriterName({
  text,
  speed = 85,
  delay = 250,
}: {
  text: string;
  speed?: number;
  delay?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setStarted(false);

    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!started) return;
    if (displayedText.length >= text.length) return;

    const typingTimer = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1));
    }, speed);

    return () => clearTimeout(typingTimer);
  }, [started, displayedText, text, speed]);

  const isDone = displayedText.length >= text.length;

  return (
    <span className="inline-flex items-center flex-wrap">
      <span
        className="bg-clip-text text-transparent transition-all duration-500"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))",
        }}
      >
        {displayedText}
      </span>
      {!isDone && (
        <span
          aria-hidden="true"
          className="inline-block w-[3px] sm:w-[4px] h-[0.95em] ml-1.5 rounded-full"
          style={{
            backgroundColor: "var(--accent-primary)",
          }}
        />
      )}
    </span>
  );
}

// ==========================================
// KOMPONEN TRANSISI TEKS (KANAN KE KIRI)
// ==========================================
function RevealText({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ==========================================
// IKON SOSIAL MEDIA (SVG BAWAAN)
// ==========================================
function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// ==========================================
// 1. EDIT DATA PROFIL, CV & KONTAK DI SINI
// ==========================================
const PROFILE = {
  brand: "Home",
  name: "Nyoman Sastrawan",
  role: "Electrical Engineer, Full-Stack Web & IoT Developer",
  tagline: "Membangun Sistem Energi Mandiri, Otomasi IoT & Aplikasi Web Terukur",
  bio: "Lulusan Teknik Elektro dan pengembang perangkat lunak yang berfokus pada instalasi sistem energi surya off-grid, otomasi berbasis mikrokontroler ESP32, serta pengembangan aplikasi web modern.",
  avatar: "/profile.jpeg",
  cvUrl: "/cv.pdf",
  cvFileName: "CV_Nyoman_Sastrawan.pdf",
  email: "nyomsas1234@gmail.com",
  whatsappNumber: "6287895310357",
  web3formsKey: "",
  socials: {
    github: "https://github.com/nyomsas99",
    linkedin: "https://linkedin.com/in/username-anda",
    instagram: "https://instagram.com/nyoman_sastrawan",
    whatsapp: "https://wa.me/6287895310357",
  },
};

// ==========================================
// KARTU SOROTAN ANGKA (QUICK METRICS)
// ==========================================
const QUICK_METRICS = [
  {
    id: 1,
    value: "1.300 Wp",
    label: "PLTS Off-Grid Mandiri",
    sublabel: "Aktif Beroperasi 24/7",
    type: "zap",
  },
  {
    id: 2,
    value: "6+ Proyek",
    label: "Sistem Terimplementasi",
    sublabel: "Energi, Web & IoT",
    type: "layers",
  },
  {
    id: 3,
    value: "S1 Elektro",
    label: "Teknik Elektro",
    sublabel: "Univ. Teknokrat Indonesia",
    type: "grad",
  },
  {
    id: 4,
    value: "IoT & Web",
    label: "Integrasi Full-Stack",
    sublabel: "ESP32, PHP & MySQL",
    type: "cpu",
  },
];

const MARQUEE_ITEMS = [
  "PLTS Off-Grid 1300 Wp",
  "Next.js & React",
  "PHP Native & MySQL",
  "ESP32 & Arduino IoT",
  "MPPT & Solar Power System",
  "RFID & Smart Home Automation",
];

// ==========================================
// 2. RIWAYAT PENDIDIKAN
// ==========================================
const EDUCATION = [
  {
    id: 1,
    level: "Perguruan Tinggi (S1)",
    institution: "Universitas Teknokrat Indonesia",
    major: "S1 Electrical Engineering (Teknik Elektro)",
    location: "Bandar Lampung",
  },
  {
    id: 2,
    level: "Sekolah Menengah Atas",
    institution: "SMAS YADIKA Bandar Lampung",
    major: "Jurusan Ilmu Pengetahuan Alam (IPA)",
    location: "Bandar Lampung",
  },
  {
    id: 3,
    level: "Sekolah Menengah Pertama",
    institution: "SMP PGRI 5 B. Mataram",
    major: "Pendidikan Menengah Pertama",
    location: "Bandar Mataram",
  },
  {
    id: 4,
    level: "Sekolah Dasar",
    institution: "SDN 3 Way Terusan Sp3",
    major: "Pendidikan Dasar",
    location: "Way Terusan SP3",
  },
];

// ==========================================
// 3. DAFTAR PROYEK PILIHAN (LENGKAP DENGAN FOTO & SPESIFIKASI)
// ==========================================
const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: "PLTS Off-Grid 1300 Wp (Sumber Listrik Utama Rumah)",
    category: "Energy & Electrical",
    status: "Aktif Beroperasi",
    image: "/projects/plts-1300wp.jpeg",
    description:
      "Perancangan, perakitan panel distribusi, dan instalasi Pembangkit Listrik Tenaga Surya (PLTS) mandiri berkapasitas 1300 Wp untuk menyuplai seluruh kebutuhan listrik rumah tangga sehari-hari, yang hingga saat ini masih beroperasi aktif sebagai sumber kelistrikan utama.",
    specs: [
      { label: "Kapasitas Array", value: "1.300 Wp Solar PV" },
      { label: "Topologi Sistem", value: "Off-Grid Mandiri (24/7)" },
      { label: "Beban Utama", value: "Kelistrikan Rumah Tangga" },
      { label: "Status Operasional", value: "Aktif Beroperasi" },
    ],
    highlights: [
      "Menyuplai beban harian rumah tangga secara mandiri tanpa ketergantungan penuh pada jaringan listrik luar.",
      "Dilengkapi proteksi arus lebih (MCB DC/AC), surge arrester, dan monitoring tegangan baterai real-time.",
      "Manajemen pengisian daya MPPT untuk memaksimalkan panen energi matahari sepanjang hari.",
    ],
    tech: ["Solar PV 1300 Wp", "MPPT Charge Controller", "Pure Sine Wave Inverter", "Battery Bank", "AC/DC Protection"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 2,
    title: "Portal Akademik & E-Learning SMP PGRI 5 Bandar Mataram",
    category: "Web App",
    image: "/projects/smp-pgri5..png",
    description:
      "Sistem informasi sekolah multi-role (Admin, Kepala Sekolah, Guru, Murid) yang mencakup PPDB online, e-learning, presensi, penilaian, cetak rapor PDF berkop resmi, serta ekspor laporan ke Excel.",
    specs: [
      { label: "Hak Akses", value: "4 Role (Admin, Kepsek, Guru, Murid)" },
      { label: "Database", value: "MySQL Relasional" },
      { label: "Output Dokumen", value: "Cetak Rapor PDF & Ekspor Excel" },
      { label: "Antarmuka", value: "Bootstrap 5.3 & SB Admin 2" },
    ],
    highlights: [
      "Pendaftaran Peserta Didik Baru (PPDB) online lengkap dengan pengecekan status dan verifikasi 1-klik.",
      "Modul e-learning terintegrasi untuk distribusi materi, pengumpulan tugas, jadwal pelajaran, dan presensi.",
      "Pencetakan rapor otomatis berkop resmi sekolah serta rekapitulasi nilai ke format Excel.",
    ],
    tech: ["PHP Native", "MySQL", "Bootstrap 5.3", "SB Admin 2", "SweetAlert2"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 3,
    title: "Sistem Absensi Karyawan RFID Real-Time",
    category: "IoT & Hardware",
    image: "/projects/rfid-esp32.png",
    description:
      "Perangkat absensi kartu RFID berbasis ESP32, reader MFRC522, LCD I2C 16x2, dan buzzer yang terhubung langsung ke dashboard web untuk pencatatan log harian, validasi tap ganda, dan kalkulasi lembur.",
    specs: [
      { label: "Mikrokontroler", value: "ESP32 Wi-Fi Dual-Core" },
      { label: "Modul Periferal", value: "MFRC522 RFID, LCD 16x2 I2C, Buzzer" },
      { label: "Backend Server", value: "PHP Native & MySQL REST API" },
      { label: "Analitik Web", value: "Chart.js & Ekspor Excel" },
    ],
    highlights: [
      "Registrasi UID kartu RFID baru secara otomatis dari tap perangkat keras langsung ke form tambah karyawan.",
      "Validasi status presensi otomatis (Tepat Waktu, Terlambat, Pulang Awal, Lembur) serta pembatasan tap ganda.",
      "Dashboard admin real-time dengan grafik kehadiran bulanan dan laporan terfilter berdasarkan jabatan.",
    ],
    tech: ["ESP32", "MFRC522", "C++", "PHP & MySQL", "REST API"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 4,
    title: "Smart Home Lighting & Relay Controller",
    category: "IoT & Hardware",
    image: "/projects/smart-home.jpeg",
    description:
      "Sistem kendali 3 jalur lampu rumah berbasis web server lokal (lampu.local) menggunakan LittleFS dan ESPAsyncWebServer, dilengkapi penjadwalan otomatis berbasis RTC DS3231 dan modul relay optocoupler.",
    specs: [
      { label: "Kontroler", value: "ESP32 & Arduino Uno" },
      { label: "Akses Lokal", value: "mDNS (http://lampu.local)" },
      { label: "Pewaktuan", value: "RTC DS3231 Presisi Tinggi" },
      { label: "Aktuator", value: "4-Channel Optocoupler Relay" },
    ],
    highlights: [
      "Antarmuka web responsif yang disimpan di memori internal LittleFS ESP32 untuk kendali lampu instan.",
      "Otomatisasi jadwal menyala (17:50) dan padam (05:45) secara mandiri menggunakan modul RTC DS3231.",
      "Isolasi optocoupler pada jalur relay untuk menjaga kestabilan mikrokontroler dari gangguan beban AC.",
    ],
    tech: ["ESP32", "ESPAsyncWebServer", "LittleFS", "RTC DS3231", "HTML/JS"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 5,
    title: "ESP32 4WD RC Robot & Blynk Telemetry",
    category: "IoT & Hardware",
    image: "/projects/robot-4wd.jpeg",
    description:
      "Kendali robot 4WD berbasis ESP32 dan driver motor L298N dengan integrasi aplikasi Blynk IoT, sensor ultrasonik HC-SR04 pada servo SG90, serta mode manuver responsif dan pengaman motor saat boot.",
    specs: [
      { label: "Penggerak", value: "4WD DC Motor + Driver L298N" },
      { label: "Sensor & Aktuator", value: "HC-SR04 Ultrasonik & Servo SG90" },
      { label: "Kontrol Nirkabel", value: "Blynk IoT Cloud & Wi-Fi" },
      { label: "Fitur Keamanan", value: "Startup Motor Safety Lock" },
    ],
    highlights: [
      "Pengunci keamanan motor saat boot mencegah roda berputar liar ketika mikrokontroler baru dinyalakan.",
      "Kalibrasi servo SG90 dan penyaringan pembacaan sensor HC-SR04 untuk menghindari lonjakan jarak palsu.",
      "Kontrol manuver responsif jarak jauh melalui antarmuka mobile Blynk IoT.",
    ],
    tech: ["ESP32", "Blynk IoT", "L298N", "HC-SR04 & SG90", "C++"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: 6,
    title: "Alat Pemberi Pakan Ikan Otomatis Berbasis IoT",
    category: "IoT & Hardware",
    image: "/projects/pakan-ikan.jpeg",
    description:
      "Rancang bangun perangkat pemberi pakan ikan otomatis menggunakan mikrokontroler ESP32, modul RTC sebagai pengatur jadwal pakan, motor servo sebagai katup keluaran, serta sensor load cell untuk mengukur berat pakan yang terintegrasi dengan dashboard web PHP & MySQL (proyek kolaborasi skripsi).",
    specs: [
      { label: "Mikrokontroler", value: "ESP32 Wi-Fi" },
      { label: "Pewaktu & Aktuator", value: "Modul RTC & Motor Servo" },
      { label: "Sensor Berat", value: "Sensor Load Cell (Penghitung Berat Pakan)" },
      { label: "UI & Database", value: "Web Dashboard PHP & DBMS MySQL" },
    ],
    highlights: [
      "Penjadwalan pemberian pakan otomatis berbasis modul RTC agar waktu pemberian pakan berjalan akurat dan konsisten.",
      "Pengaturan bukaan katup keluaran pakan menggunakan motor servo yang dipantau langsung oleh sensor load cell untuk mengukur berat pakan.",
      "Pengiriman data berat pakan dan riwayat pemberian pakan dari ESP32 ke database MySQL untuk ditampilkan pada antarmuka web PHP.",
    ],
    tech: ["ESP32", "Modul RTC", "Motor Servo", "Sensor Load Cell", "PHP & MySQL"],
    demoUrl: "#",
    repoUrl: "#",
  },
];

const SKILLS = [
  {
    title: "Frontend & UI Architecture",
    items: ["Next.js & React", "Tailwind CSS", "Bootstrap 5.3", "HTML5 / CSS3 / JS", "Responsive Dashboard"],
    type: "layers",
  },
  {
    title: "Backend & Database",
    items: ["PHP Native","Laravel", "MySQL", "Multi-Role Auth", "RESTful API", "PDF & Excel Reporting"],
    type: "terminal",
  },
  {
    title: "Electrical, Embedded & IoT",
    items: ["PLTS Off-Grid & MPPT", "ESP32 & Arduino Uno", "C / C++ Firmware", "RFID,Load Cell & RTC", "Servo & Relay Isolation","Python","PLC"],
    type: "cpu",
  },
];

export default function Home() {
  const [theme, setTheme] = useState<ThemeId>("ocean");
  const [mode, setMode] = useState<ModeType>("dark");
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [imgError, setImgError] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sendingEmail, setSendingEmail] = useState(false);
  const [sentStatus, setSentStatus] = useState<string | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [downloadingCv, setDownloadingCv] = useState(false);

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalImgError, setModalImgError] = useState(false);
  const [cardImgErrors, setCardImgErrors] = useState<Record<number, boolean>>({});

  const switcherRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const validIds = THEMES.map((t) => t.id) as string[];
    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get("theme");
    const urlMode = params.get("mode");
    const savedTheme = localStorage.getItem("portfolio-liquid-theme");
    const savedMode = localStorage.getItem("portfolio-liquid-mode");

    const initialTheme: ThemeId =
      urlTheme && validIds.includes(urlTheme)
        ? (urlTheme as ThemeId)
        : savedTheme && validIds.includes(savedTheme)
        ? (savedTheme as ThemeId)
        : "ocean";

    const initialMode: ModeType =
      urlMode === "light" || urlMode === "dark"
        ? urlMode
        : savedMode === "light" || savedMode === "dark"
        ? savedMode
        : "dark";

    setTheme(initialTheme);
    setMode(initialMode);
    document.documentElement.setAttribute("data-theme", initialTheme);
    document.documentElement.setAttribute("data-mode", initialMode);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        setCvModalOpen(false);
        setThemeMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  // Hapus otomatis floating badge "Powered by Netlify" (termasuk Shadow DOM)
  useEffect(() => {
    const removeNetlifyBadge = () => {
      document.querySelectorAll("body > div, html > div, aside").forEach((el) => {
        if (el.id === "__next" || el.contains(document.querySelector("main"))) return;
        const text = (el.textContent || "") + (el.shadowRoot?.textContent || "");
        if (
          text.includes("Powered by Netlify") ||
          text.includes("Hide this badge") ||
          el.innerHTML.includes("netlify.com")
        ) {
          el.remove();
        }
      });
    };

    removeNetlifyBadge();
    const observer = new MutationObserver(removeNetlifyBadge);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setThemeMenuOpen(false);
      }
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const syncUrlParams = (newTheme: ThemeId, newMode: ModeType) => {
    window.history.replaceState(null, "", `?theme=${newTheme}&mode=${newMode}`);
  };
  

  const handleSelectTheme = (newTheme: ThemeId) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-liquid-theme", newTheme);
    syncUrlParams(newTheme, mode);
    setThemeMenuOpen(false);
  };

  const toggleDarkMode = () => {
    const nextMode: ModeType = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
    document.documentElement.setAttribute("data-mode", nextMode);
    localStorage.setItem("portfolio-liquid-mode", nextMode);
    syncUrlParams(theme, nextMode);
  };

  const openProjectModal = (project: ProjectItem) => {
    setModalImgError(false);
    setSelectedProject(project);
  };

  const handleDownloadCV = async () => {
    setDownloadingCv(true);
    try {
      const response = await fetch(PROFILE.cvUrl, { method: "HEAD" });
      if (response.ok) {
        const link = document.createElement("a");
        link.href = PROFILE.cvUrl;
        link.download = PROFILE.cvFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setCvModalOpen(true);
      }
    } catch {
      setCvModalOpen(true);
    } finally {
      setDownloadingCv(false);
    }
  };

  const handlePrintGeneratedCV = () => {
    const printWindow = window.open("", "_blank", "width=850,height=1000");
    if (!printWindow) return;

    const educationHtml = EDUCATION.map(
      (e) =>
        `<div style="margin-bottom:8px;">
          <strong>${e.institution}</strong> — ${e.major} <span style="color:#555;">(${e.location})</span>
        </div>`
    ).join("");

    const projectsHtml = PROJECTS.map(
      (p) =>
        `<div style="margin-bottom:10px;">
          <strong>${p.title}</strong> <span style="font-size:12px;color:#0284c7;">[${p.category}]</span>
          <p style="margin:3px 0;font-size:13px;color:#334155;">${p.description}</p>
        </div>`
    ).join("");

    const skillsHtml = SKILLS.map(
      (s) =>
        `<div style="margin-bottom:6px;">
          <strong>${s.title}:</strong> <span style="font-size:13px;color:#334155;">${s.items.join(", ")}</span>
        </div>`
    ).join("");

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>CV - ${PROFILE.name}</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; color: #0f172a; padding: 36px 44px; line-height: 1.5; }
            h1 { margin: 0; font-size: 26px; }
            h2 { font-size: 15px; text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 4px; margin-top: 22px; color: #0f172a; }
            .sub { color: #0284c7; font-weight: 600; margin-top: 4px; }
            .contact { font-size: 13px; color: #475569; margin-top: 6px; }
            @media print { body { padding: 16px 24px; } }
          </style>
        </head>
        <body>
          <h1>${PROFILE.name}</h1>
          <div class="sub">${PROFILE.role}</div>
          <div class="contact">Email: ${PROFILE.email} | WhatsApp: +${PROFILE.whatsappNumber}</div>
          <p style="font-size:14px;color:#334155;margin-top:12px;">${PROFILE.bio}</p>
          <h2>Riwayat Pendidikan</h2>
          ${educationHtml}
          <h2>Pengalaman & Proyek Utama</h2>
          ${projectsHtml}
          <h2>Keahlian Teknis</h2>
          ${skillsHtml}
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const validateContactForm = () => {
    if (formRef.current && !formRef.current.reportValidity()) {
      return false;
    }
    return Boolean(formData.name.trim() && formData.email.trim() && formData.message.trim());
  };

  const handleSendWhatsApp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateContactForm()) return;

    const cleanNumber = PROFILE.whatsappNumber.replace(/\D/g, "");
    const formattedText = [
      `Halo *${PROFILE.name}*, saya menghubungi melalui website portfolio Anda.`,
      ``,
      `*Nama:* ${formData.name}`,
      `*Email:* ${formData.email}`,
      `*Pesan:*`,
      formData.message,
    ].join("\n");

    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(formattedText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setSentStatus("Mengarahkan ke WhatsApp...");
    setTimeout(() => {
      setSentStatus(null);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  const handleSendEmail = async () => {
    if (!validateContactForm()) return;

    const mailtoFallback = () => {
      const subject = `Kolaborasi Proyek - ${formData.name}`;
      const body = `Nama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`;
      window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    };

    if (PROFILE.web3formsKey.trim()) {
      setSendingEmail(true);
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: PROFILE.web3formsKey.trim(),
            subject: `Pesan Portfolio dari ${formData.name}`,
            from_name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });
        const data = await res.json();
        if (data.success) {
          setSentStatus("Pesan berhasil terkirim ke Email!");
          setFormData({ name: "", email: "", message: "" });
        } else {
          mailtoFallback();
          setSentStatus("Membuka aplikasi Email...");
        }
      } catch {
        mailtoFallback();
        setSentStatus("Membuka aplikasi Email...");
      } finally {
        setSendingEmail(false);
        setTimeout(() => setSentStatus(null), 4000);
      }
    } else {
      mailtoFallback();
      setSentStatus("Membuka aplikasi Email...");
      setTimeout(() => {
        setSentStatus(null);
        setFormData({ name: "", email: "", message: "" });
      }, 4000);
    }
  };

  const currentThemeObj = THEMES.find((t) => t.id === theme) || THEMES[0];
  const categories = ["Semua", "Energy & Electrical", "Web App", "IoT & Hardware"];
  const cleanWaDirect = PROFILE.whatsappNumber.replace(/\D/g, "");

  const filteredProjects =
    activeFilter === "Semua"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  return (
    <div
      data-theme={theme}
      data-mode={mode}
      className="relative min-h-screen overflow-x-hidden transition-colors duration-500"
      style={{ color: "var(--text-primary)" }}
    >
      {/* Latar Belakang Fluid Liquid Blobs */}
      {/* Latar Belakang Fluid Liquid Blobs (Halus & Bebas Kedip di Mobile) */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-24 -left-20 w-[460px] h-[460px] rounded-full animate-liquid transition-colors duration-700"
          style={{ background: `radial-gradient(circle, var(--blob-1) 0%, transparent 70%)` }}
        />
        <div
          className="absolute top-1/3 -right-24 w-[520px] h-[520px] rounded-full animate-liquid-slow transition-colors duration-700"
          style={{ background: `radial-gradient(circle, var(--blob-2) 0%, transparent 70%)` }}
        />
        <div
          className="absolute -bottom-32 left-1/4 w-[480px] h-[480px] rounded-full animate-liquid transition-colors duration-700"
          style={{ background: `radial-gradient(circle, var(--blob-3) 0%, transparent 70%)` }}
        />
      </div>

      {/* Floating Glass Pill Navbar (Responsif Mobile & Desktop) */}
      <header
        ref={navRef}
        className="fixed top-4 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-4"
      >
        <nav className="liquid-nav rounded-full w-full md:w-auto max-w-full px-4 sm:px-6 py-2.5 flex items-center justify-between md:justify-center gap-3 sm:gap-5 text-xs sm:text-sm font-medium">
          {/* Brand */}
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="font-semibold tracking-tight flex items-center gap-2 shrink-0"
            style={{ color: "var(--text-primary)" }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full transition-all duration-500 shrink-0"
              style={{
                backgroundColor: "var(--accent-primary)",
                boxShadow: "0 0 12px var(--accent-primary)",
              }}
            />
            <span>{PROFILE.brand}</span>
          </a>

          {/* Menu Navigasi Desktop */}
          <div
            className="hidden md:flex items-center gap-5"
            style={{ color: "var(--text-secondary)" }}
          >
            <a href="#projects" className="hover:opacity-75 transition-opacity">
              Proyek
            </a>
            <a href="#education" className="hover:opacity-75 transition-opacity">
              Pendidikan
            </a>
            <a href="#skills" className="hover:opacity-75 transition-opacity">
              Keahlian
            </a>
            <a href="#contact" className="hover:opacity-75 transition-opacity">
              Kontak
            </a>
          </div>

          {/* Tombol Aksi Kanan (CV, Dark/Light & Hamburger Mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadCV}
              disabled={downloadingCv}
              title="Download CV"
              className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "var(--accent-soft)",
                border: "1px solid var(--glass-border)",
                color: "var(--accent-primary)",
              }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV</span>
            </button>

            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={mode === "dark" ? "Aktifkan Light Mode" : "Aktifkan Dark Mode"}
              title={mode === "dark" ? "Ganti ke Light Mode" : "Ganti ke Dark Mode"}
              className="p-2 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "var(--accent-soft)",
                border: "1px solid var(--glass-border)",
                color: "var(--accent-primary)",
              }}
            >
              {mode === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Tombol Hamburger khusus Layar Ponsel */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Tutup Menu Navigasi" : "Buka Menu Navigasi"}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95"
              style={{
                backgroundColor: "var(--accent-soft)",
                border: "1px solid var(--glass-border)",
                color: "var(--accent-primary)",
              }}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Dropdown Menu Navigasi Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden liquid-nav rounded-3xl w-full mt-2.5 p-3 shadow-2xl flex flex-col gap-1.5 text-sm font-medium">
            {[
              { href: "#projects", label: "Proyek" },
              { href: "#education", label: "Pendidikan" },
              { href: "#skills", label: "Keahlian" },
              { href: "#contact", label: "Kontak" },
            ].map((navItem) => (
              <a
                key={navItem.href}
                href={navItem.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-2xl transition-colors flex items-center justify-between hover:opacity-80"
                style={{
                  color: "var(--text-primary)",
                  backgroundColor: "var(--glass-bg-2)",
                }}
              >
                <span>{navItem.label}</span>
                <ArrowUpRight className="w-3.5 h-3.5" style={{ color: "var(--accent-primary)" }} />
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Modal Detail & Foto Dokumentasi Proyek */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="liquid-nav rounded-[2rem] max-w-3xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--accent-soft)",
                      border: "1px solid var(--glass-border)",
                      color: "var(--accent-primary)",
                    }}
                  >
                    {selectedProject.category}
                  </span>

                  {selectedProject.status && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {selectedProject.status}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold leading-snug">
                  {selectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Tutup Detail Proyek"
                className="liquid-pill p-2.5 rounded-full cursor-pointer hover:opacity-80 shrink-0"
                style={{ color: "var(--text-primary)" }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden relative flex items-center justify-center"
              style={{
                backgroundColor: "var(--glass-bg-2)",
                border: "1px solid var(--glass-border)",
              }}
            >
              {!modalImgError ? (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  onError={() => setModalImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-6 max-w-md">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                    style={{
                      backgroundColor: "var(--accent-soft)",
                      color: "var(--accent-primary)",
                    }}
                  >
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold">Slot Foto Dokumentasi Proyek</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    Simpan foto asli proyek ini ke folder{" "}
                    <code
                      className="px-1.5 py-0.5 rounded font-mono"
                      style={{
                        backgroundColor: "var(--accent-soft)",
                        color: "var(--accent-primary)",
                      }}
                    >
                      public{selectedProject.image}
                    </code>{" "}
                    agar otomatis tampil di sini.
                  </p>
                </div>
              )}
            </div>

            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {selectedProject.description}
            </p>

            <div className="space-y-3">
              <h4
                className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                style={{ color: "var(--accent-primary)" }}
              >
                <Wrench className="w-3.5 h-3.5" />
                Spesifikasi Teknis
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedProject.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-2xl p-3.5"
                    style={{
                      backgroundColor: "var(--glass-bg-2)",
                      border: "1px solid var(--glass-border)",
                    }}
                  >
                    <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                      {spec.label}
                    </div>
                    <div className="text-sm font-semibold mt-0.5">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2.5">
              <h4
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "var(--accent-primary)" }}
              >
                Sorotan Implementasi
              </h4>
              <ul className="space-y-2">
                {selectedProject.highlights.map((point, idx) => (
                  <li
                    key={idx}
                    className="text-sm flex items-start gap-2.5 leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <CheckCircle2
                      className="w-4 h-4 shrink-0 mt-0.5"
                      style={{ color: "var(--accent-primary)" }}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{ borderTop: "1px solid var(--glass-border)" }}
            >
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-lg"
                    style={{
                      backgroundColor: "var(--glass-bg-2)",
                      border: "1px solid var(--glass-border)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {selectedProject.repoUrl !== "#" && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-pill px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-1.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    Source Code
                  </a>
                )}
                {selectedProject.demoUrl !== "#" && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-1.5"
                    style={{
                      backgroundColor: "var(--btn-bg)",
                      color: "var(--btn-text)",
                    }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Pratinjau CV Otomatis */}
      {cvModalOpen && (
        <div
          onClick={() => setCvModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="liquid-nav rounded-[2rem] max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-2"
                  style={{
                    backgroundColor: "var(--accent-soft)",
                    color: "var(--accent-primary)",
                  }}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Pratinjau CV Otomatis
                </span>
                <h3 className="text-xl sm:text-2xl font-bold">{PROFILE.name}</h3>
                <p className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  {PROFILE.role}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCvModalOpen(false)}
                aria-label="Tutup Pratinjau CV"
                className="liquid-pill p-2 rounded-full cursor-pointer hover:opacity-80"
                style={{ color: "var(--text-primary)" }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              className="rounded-2xl p-4 text-xs leading-relaxed"
              style={{
                backgroundColor: "var(--accent-soft)",
                border: "1px solid var(--glass-border)",
                color: "var(--text-secondary)",
              }}
            >
              File <strong>public/cv.pdf</strong> belum ditemukan. Anda tetap bisa langsung menyimpan CV versi ringkas di bawah ini sebagai <strong>PDF</strong>, atau letakkan file CV asli Anda di <strong>portfolio-liquid-glass/public/cv.pdf</strong> agar otomatis terunduh.
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h4
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: "var(--accent-primary)" }}
                >
                  Riwayat Pendidikan
                </h4>
                <ul className="space-y-1.5" style={{ color: "var(--text-secondary)" }}>
                  {EDUCATION.map((edu) => (
                    <li key={edu.id}>
                      <strong style={{ color: "var(--text-primary)" }}>{edu.institution}</strong> —{" "}
                      {edu.major}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: "var(--accent-primary)" }}
                >
                  Proyek Utama
                </h4>
                <ul className="space-y-1.5" style={{ color: "var(--text-secondary)" }}>
                  {PROJECTS.map((proj) => (
                    <li key={proj.id}>
                      <strong style={{ color: "var(--text-primary)" }}>{proj.title}</strong> (
                      {proj.category})
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCvModalOpen(false)}
                className="liquid-pill px-5 py-2.5 rounded-full text-xs font-semibold cursor-pointer"
                style={{ color: "var(--text-primary)" }}
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={handlePrintGeneratedCV}
                className="px-5 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
                style={{
                  backgroundColor: "var(--btn-bg)",
                  color: "var(--btn-text)",
                  boxShadow: "0 0 20px var(--btn-glow)",
                }}
              >
                <Printer className="w-4 h-4" />
                Simpan / Cetak PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Liquid Glass Theme Switcher */}
      <div ref={switcherRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {themeMenuOpen && (
          <div className="liquid-nav rounded-3xl p-3 mb-3 w-56 shadow-2xl">
            <div className="flex items-center justify-between px-3 py-1.5">
              <p
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                Warna Kaca
              </p>
              <button
                type="button"
                onClick={toggleDarkMode}
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 cursor-pointer"
                style={{
                  backgroundColor: "var(--accent-soft)",
                  color: "var(--accent-primary)",
                }}
              >
                {mode === "dark" ? (
                  <>
                    <Moon className="w-3 h-3" /> Dark
                  </>
                ) : (
                  <>
                    <Sun className="w-3 h-3" /> Light
                  </>
                )}
              </button>
            </div>

            <div className="space-y-1 mt-1">
              {THEMES.map((item) => {
                const isActive = item.id === theme;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectTheme(item.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-medium transition-all cursor-pointer"
                    style={{
                      backgroundColor: isActive ? "var(--accent-soft)" : "transparent",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full border border-white/40 shrink-0 shadow-sm"
                        style={{ background: item.swatch }}
                      />
                      {item.name}
                    </span>
                    {isActive && (
                      <Check className="w-3.5 h-3.5" style={{ color: "var(--accent-primary)" }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setThemeMenuOpen((prev) => !prev)}
          aria-label="Ganti Tema Liquid Glass"
          className="liquid-nav rounded-full px-4 py-3 flex items-center gap-2.5 text-xs font-semibold cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          style={{ color: "var(--text-primary)" }}
        >
          <span
            className="w-3.5 h-3.5 rounded-full border border-white/50 shrink-0"
            style={{ background: currentThemeObj.swatch }}
          />
          <Palette className="w-4 h-4" style={{ color: "var(--accent-primary)" }} />
          <span className="hidden sm:inline">{currentThemeObj.name}</span>
        </button>
      </div>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 sm:pt-32 pb-28 space-y-24">
        {/* Hero Section */}
        <section id="home" className="pt-4 space-y-6">
          <div className="liquid-glass rounded-[2.25rem] p-7 sm:p-14 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-10">
              <div className="flex-1 overflow-hidden">
                <RevealText delay={0}>
                  <div
                    className="inline-flex items-center gap-2 liquid-pill rounded-full px-4 py-1.5 text-xs font-medium mb-5"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    {PROFILE.role}
                  </div>
                </RevealText>

                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.2]">
                  Halo, saya{" "}
                  <TypewriterName text={PROFILE.name} speed={85} delay={250} />
                </h1>

                <RevealText delay={240}>
                  <p
                    className="mt-3 text-lg sm:text-xl font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {PROFILE.tagline}
                  </p>
                </RevealText>

                <RevealText delay={360}>
                  <p
                    className="mt-4 text-sm sm:text-base max-w-2xl leading-relaxed opacity-90"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {PROFILE.bio}
                  </p>
                </RevealText>

                <RevealText delay={480}>
                  <div className="mt-8 flex flex-wrap items-center gap-3.5">
                    <a
                      href="#projects"
                      className="px-6 py-3.5 rounded-full font-semibold text-sm transition-all flex items-center gap-2 hover:opacity-90"
                      style={{
                        backgroundColor: "var(--btn-bg)",
                        color: "var(--btn-text)",
                        boxShadow: "0 0 25px var(--btn-glow)",
                      }}
                    >
                      Lihat Proyek
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={handleDownloadCV}
                      disabled={downloadingCv}
                      className="liquid-pill px-6 py-3.5 rounded-full font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <Download
                        className="w-4 h-4"
                        style={{ color: "var(--accent-primary)" }}
                      />
                      {downloadingCv ? "Menyiapkan CV..." : "Download CV"}
                    </button>

                    <div className="flex items-center gap-2.5">
                      <a
                        href={PROFILE.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="liquid-pill p-3 rounded-full hover:scale-105 transition-transform"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      <a
                        href={PROFILE.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="liquid-pill p-3 rounded-full hover:scale-105 transition-transform"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                      <a
                        href={PROFILE.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="liquid-pill p-3 rounded-full hover:scale-105 transition-transform"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                      <a
                        href={`https://wa.me/${cleanWaDirect}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="liquid-pill p-3 rounded-full hover:scale-105 transition-transform"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </RevealText>
              </div>

              {/* Bingkai Foto Profil Liquid Glass */}
              <div className="shrink-0 self-center lg:self-auto">
                <div className="liquid-glass p-3 rounded-[2rem] relative">
                  <div
                    className="w-44 h-44 sm:w-56 sm:h-56 rounded-[1.5rem] overflow-hidden flex items-center justify-center"
                    style={{
                      border: "1px solid var(--glass-border)",
                      background: "var(--accent-soft)",
                    }}
                  >
                    {!imgError ? (
                      <img
                        src={PROFILE.avatar}
                        alt={PROFILE.name}
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-4">
                        <User
                          className="w-14 h-14 mb-2 opacity-85"
                          style={{ color: "var(--accent-primary)" }}
                        />
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                          Simpan foto di public/profile.jpg
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kartu Sorotan Angka (Quick Metrics) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {QUICK_METRICS.map((metric, index) => (
              <RevealText key={metric.id} delay={index * 90}>
                <div className="liquid-glass rounded-[1.5rem] p-4 sm:p-5 h-full flex flex-col sm:flex-row items-start gap-3 sm:gap-3.5 hover:-translate-y-1">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "var(--accent-soft)",
                      border: "1px solid var(--glass-border)",
                      color: "var(--accent-primary)",
                    }}
                  >
                    {metric.type === "zap" && <Zap className="w-5 h-5" />}
                    {metric.type === "layers" && <Layers className="w-5 h-5" />}
                    {metric.type === "grad" && <GraduationCap className="w-5 h-5" />}
                    {metric.type === "cpu" && <Cpu className="w-5 h-5" />}
                  </div>

                  <div className="w-full min-w-0">
                    <div className="text-base sm:text-xl font-bold tracking-tight leading-tight">
                      {metric.value}
                    </div>
                    <div
                      className="text-xs font-semibold mt-1 leading-snug break-words"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {metric.label}
                    </div>
                    <div
                      className="text-[11px] mt-0.5 leading-snug break-words"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {metric.sublabel}
                    </div>
                  </div>
                </div>
              </RevealText>
            ))}
          </div>

          {/* Pita Running Text Liquid Glass */}
          <div className="liquid-pill rounded-full py-3.5 px-4 overflow-hidden">
            <div className="flex flex-row flex-nowrap items-center w-max whitespace-nowrap animate-marquee-rtl">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
                <div key={idx} className="inline-flex items-center shrink-0 whitespace-nowrap">
                  <span
                    className="text-xs sm:text-sm font-medium tracking-wide px-5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: "var(--accent-primary)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <RevealText>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Proyek Pilihan</h2>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                Klik kartu proyek untuk melihat foto dokumentasi dan spesifikasi teknis lengkap.
              </p>
            </RevealText>

            {/* Filter Tabs (Grid 2x2 rapi di HP, Pill sebaris di Desktop) */}
            <div className="liquid-pill rounded-2xl sm:rounded-full p-1.5 grid grid-cols-2 sm:inline-flex items-center gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => {
                const active = activeFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className="px-3.5 py-2 sm:py-1.5 rounded-xl sm:rounded-full text-xs font-medium text-center transition-all cursor-pointer truncate"
                    style={{
                      backgroundColor: active ? "var(--btn-bg)" : "transparent",
                      color: active ? "var(--btn-text)" : "var(--text-secondary)",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <RevealText key={project.id} delay={index * 100}>
                <article
                  onClick={() => openProjectModal(project)}
                  className="liquid-glass rounded-[1.75rem] p-5 sm:p-7 h-full flex flex-col justify-between group hover:-translate-y-1.5 cursor-pointer"
                >
                  <div>
                    {!cardImgErrors[project.id] && (
                      <div
                        className="w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-4"
                        style={{ border: "1px solid var(--glass-border)" }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          onError={() =>
                            setCardImgErrors((prev) => ({ ...prev, [project.id]: true }))
                          }
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Baris Badge & Ikon Aksi */}
                    <div className="flex items-start justify-between gap-2 mb-3.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className="text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor: "var(--accent-soft)",
                            border: "1px solid var(--glass-border)",
                            color: "var(--accent-primary)",
                          }}
                        >
                          {project.category}
                        </span>

                        {project.status && (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {project.status}
                          </span>
                        )}
                      </div>

                      <div
                        className="flex items-center gap-1 shrink-0"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openProjectModal(project);
                          }}
                          aria-label="Lihat Detail & Foto"
                          title="Lihat Detail & Foto"
                          className="p-2 rounded-full hover:opacity-75 transition-opacity cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {project.repoUrl !== "#" && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Source Code"
                            className="p-2 rounded-full hover:opacity-75 transition-opacity"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.demoUrl !== "#" && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Live Demo"
                            className="p-2 rounded-full hover:opacity-75 transition-opacity"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold leading-snug transition-colors">
                      {project.title}
                    </h3>
                    <p
                      className="text-sm mt-2.5 leading-relaxed opacity-90"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div
                      className="pt-4 flex flex-wrap gap-1.5 sm:gap-2"
                      style={{ borderTop: "1px solid var(--glass-border)" }}
                    >
                      {project.tech.map((item) => (
                        <span
                          key={item}
                          className="text-[11px] sm:text-xs px-2.5 py-1 rounded-lg"
                          style={{
                            backgroundColor: "var(--glass-bg-2)",
                            border: "1px solid var(--glass-border)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div
                      className="inline-flex items-center gap-1.5 text-xs font-semibold group-hover:translate-x-1 transition-transform"
                      style={{ color: "var(--accent-primary)" }}
                    >
                      <span>Lihat Foto & Spesifikasi</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </article>
              </RevealText>
            ))}
          </div>
        </section>
        

        {/* Section Riwayat Pendidikan */}
        <section id="education" className="space-y-8">
          <RevealText>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Riwayat Pendidikan</h2>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Latar belakang pendidikan formal dari jenjang sekolah dasar hingga perguruan tinggi.
            </p>
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION.map((edu, index) => (
              <RevealText key={edu.id} delay={index * 110}>
                <div className="liquid-glass rounded-[1.75rem] p-7 h-full flex items-start gap-4 hover:-translate-y-1">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      backgroundColor: "var(--accent-soft)",
                      border: "1px solid var(--glass-border)",
                      color: "var(--accent-primary)",
                    }}
                  >
                    <GraduationCap className="w-6 h-6" />
                  </div>

                  <div className="space-y-1.5">
                    <span
                      className="inline-block text-[11px] font-semibold px-3 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "var(--accent-soft)",
                        border: "1px solid var(--glass-border)",
                        color: "var(--accent-primary)",
                      }}
                    >
                      {edu.level}
                    </span>

                    <h3 className="text-lg sm:text-xl font-semibold leading-snug">
                      {edu.institution}
                    </h3>

                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {edu.major}
                    </p>

                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {edu.location}
                    </p>
                  </div>
                </div>
              </RevealText>
            ))}
          </div>
        </section>

        {/* Skills Bento Grid */}
        <section id="skills" className="space-y-8">
          <RevealText>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Stack Teknologi</h2>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Teknologi utama dari antarmuka web hingga pemrograman mikrokontroler dan sistem kelistrikan.
            </p>
          </RevealText>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILLS.map((skill, index) => (
              <RevealText key={skill.title} delay={index * 120}>
                <div className="liquid-glass rounded-[1.75rem] p-7 h-full">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: "var(--accent-soft)",
                      border: "1px solid var(--glass-border)",
                      color: "var(--accent-primary)",
                    }}
                  >
                    {skill.type === "layers" && <Layers className="w-5 h-5" />}
                    {skill.type === "terminal" && <Terminal className="w-5 h-5" />}
                    {skill.type === "cpu" && <Cpu className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg font-semibold mb-4">{skill.title}</h3>
                  <ul className="space-y-2.5">
                    {skill.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm flex items-center gap-2.5"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <Code2
                          className="w-3.5 h-3.5 shrink-0"
                          style={{ color: "var(--accent-primary)" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealText>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <div className="liquid-glass rounded-[2.25rem] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
            <RevealText className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Mari Berkolaborasi</h2>
              <p
                className="text-sm leading-relaxed opacity-90"
                style={{ color: "var(--text-secondary)" }}
              >
                Tertarik berdiskusi mengenai sistem PLTS off-grid, aplikasi web, atau proyek otomasi IoT? Tulis pesan di formulir lalu kirim langsung ke WhatsApp atau Email saya.
              </p>

              <div className="pt-2 space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                <a
                  href={`https://wa.me/${cleanWaDirect}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" style={{ color: "var(--accent-primary)" }} />
                  <span>+{cleanWaDirect} (WhatsApp)</span>
                </a>

                <a
                  href={`mailto:${PROFILE.email}`}
                  className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                >
                  <Mail className="w-4 h-4" style={{ color: "var(--accent-primary)" }} />
                  <span>{PROFILE.email}</span>
                </a>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={handleDownloadCV}
                    className="liquid-pill px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <Download className="w-3.5 h-3.5" style={{ color: "var(--accent-primary)" }} />
                    Unduh CV Lengkap (PDF)
                  </button>
                </div>
              </div>
            </RevealText>

            <form ref={formRef} onSubmit={handleSendWhatsApp} className="lg:col-span-3 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-2xl px-4 py-3 text-sm focus:outline-none transition-all"
                  style={{
                    backgroundColor: "var(--glass-bg-2)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-primary)",
                  }}
                />
                <input
                  type="email"
                  required
                  placeholder="Email Anda"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-2xl px-4 py-3 text-sm focus:outline-none transition-all"
                  style={{
                    backgroundColor: "var(--glass-bg-2)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              <textarea
                rows={4}
                required
                placeholder="Ceritakan kebutuhan proyek atau pesan Anda..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full rounded-2xl px-4 py-3 text-sm focus:outline-none transition-all resize-none"
                style={{
                  backgroundColor: "var(--glass-bg-2)",
                  border: "1px solid var(--glass-border)",
                  color: "var(--text-primary)",
                }}
              />

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full font-semibold text-sm transition-all inline-flex items-center gap-2 cursor-pointer hover:opacity-90"
                  style={{
                    backgroundColor: "var(--btn-bg)",
                    color: "var(--btn-text)",
                    boxShadow: "0 0 20px var(--btn-glow)",
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Kirim via WhatsApp
                </button>

                <button
                  type="button"
                  onClick={handleSendEmail}
                  disabled={sendingEmail}
                  className="liquid-pill px-6 py-3.5 rounded-full font-semibold text-sm transition-all inline-flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                  style={{ color: "var(--text-primary)" }}
                >
                  <Send className="w-4 h-4" style={{ color: "var(--accent-primary)" }} />
                  {sendingEmail ? "Mengirim..." : "Kirim via Email"}
                </button>
              </div>

              {sentStatus && (
                <div
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: "var(--accent-soft)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--accent-primary)",
                  }}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{sentStatus}</span>
                </div>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}