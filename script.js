<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Frixsave - Aplikasi Budgeting Cerdas</title>

    <!-- Security Headers -->
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self'; 
        script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com; 
        style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; 
        font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com; 
        img-src 'self' data: https://images.unsplash.com https://i.pravatar.cc; 
        object-src 'none'; 
        base-uri 'self'; 
        form-action 'self';">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">

    <!-- SEO & Social Media Meta Tags -->
    <meta name="description" content="Kendalikan keuangan Anda dengan Frixsave. Lacak pengeluaran, buat anggaran, dan capai target finansial dengan mudah. Aplikasi budgeting all-in-one yang cerdas dan aman.">
    <meta name="keywords" content="budgeting, anggaran, keuangan, hemat, frixsave, lacak pengeluaran, manajer keuangan, aplikasi finansial">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://your-app-url.com/"> <!-- ❗ Ganti dengan URL aplikasi Anda -->
    <meta property="og:title" content="Frixsave - Aplikasi Budgeting Cerdas untuk Keuangan Anda">
    <meta property="og:description" content="Kendalikan keuangan Anda dengan Frixsave. Lacak pengeluaran, buat anggaran, dan capai target finansial dengan mudah.">
    <meta property="og:image" content="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop"> <!-- ❗ Ganti dengan URL gambar promosi Anda (misal: screenshot aplikasi) -->

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://your-app-url.com/"> <!-- ❗ Ganti dengan URL aplikasi Anda -->
    <meta property="twitter:title" content="Frixsave - Aplikasi Budgeting Cerdas untuk Keuangan Anda">
    <meta property="twitter:description" content="Kendalikan keuangan Anda dengan Frixsave. Lacak pengeluaran, buat anggaran, dan capai target finansial dengan mudah.">
    <meta property="twitter:image" content="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop"> <!-- ❗ Ganti dengan URL gambar promosi Anda -->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.165.0/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
    <style>
        details > summary {
            list-style: none;
        }
        details[open] .accordion-icon {
            transform: rotate(180deg);
        }
    </style>
    <!-- Favicon -->
    <link rel="icon" href="img/icon.png" type="image/png">
</head>
<body class="gradient-bg-landing text-gray-800">

    <!-- Container for 3D Background -->
    <div id="three-bg" class="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"></div>

    <!-- Header -->
    <header id="main-header" class="absolute top-0 left-0 w-full z-30 py-6 px-4 sm:px-6 lg:px-8 transition-all duration-300">
        <div class="container mx-auto flex justify-between items-center">
            <div class="flex items-center">
                <!-- Logo -->
                <img src="img/logo.png" alt="Frixsave Logo" class="h-10 w-auto object-contain drop-shadow-lg logo-transparent-bg flex-shrink-0">
            </div>
            <a href="app.html" class="animated-gradient-btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Masuk Aplikasi
            </a>
        </div>
    </header>

    <!-- Hero Section -->
    <main class="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <h2 class="text-4xl md:text-6xl font-extrabold mb-4 leading-tight opacity-0">
                Kelola Keuangan dengan <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animated-text-breathe">Cerdas</span>
            </h2>
            <p id="typing-effect" class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 opacity-0 min-h-[12rem] md:min-h-[8rem]">
                <!-- Text will be typed here by JS -->
            </p>
            <a href="#pricing" class="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-8 text-base md:py-4 md:px-10 md:text-lg rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 opacity-0">
                Lihat Penawaran <i class="fas fa-tags ml-2"></i>
            </a>
        </div>
        <!-- Floating decorative elements -->
        <div class="absolute -top-20 -left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 float-animation"></div>
        <div class="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 float-animation" style="animation-delay: 2s;"></div>
    </main>

    <!-- Features Section -->
    <section id="features" class="py-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 fade-in-section">
                <h3 class="text-3xl font-bold mb-2">Fitur Unggulan</h3>
                <p class="text-gray-600">Semua yang Anda butuhkan untuk keuangan yang lebih baik.</p>
                <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-4"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Feature 1 -->
                <div class="bg-white/50 backdrop-blur-lg rounded-2xl p-8 text-center shadow-lg border border-white/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 fade-in-section group">
                    <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                        <i class="fas fa-receipt text-white text-2xl"></i>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">Pencatatan Transaksi</h4>
                    <p class="text-gray-600 text-sm">Catat pemasukan dan pengeluaran dengan cepat dan mudah.</p>
                </div>

                <!-- Feature 2 -->
                <div class="bg-white/50 backdrop-blur-lg rounded-2xl p-8 text-center shadow-lg border border-white/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 fade-in-section group" style="transition-delay: 100ms;">
                    <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                        <i class="fas fa-chart-pie text-white text-2xl"></i>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">Manajemen Anggaran</h4>
                    <p class="text-gray-600 text-sm">Buat anggaran mingguan, bulanan, atau tahunan untuk setiap kategori.</p>
                </div>

                <!-- Feature 3 -->
                <div class="bg-white/50 backdrop-blur-lg rounded-2xl p-8 text-center shadow-lg border border-white/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 fade-in-section group" style="transition-delay: 200ms;">
                    <div class="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                        <i class="fas fa-bullseye text-white text-2xl"></i>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">Target Keuangan</h4>
                    <p class="text-gray-600 text-sm">Atur dan lacak progres tabungan untuk semua impian finansial Anda.</p>
                </div>

                <!-- Feature 4 -->
                <div class="bg-white/50 backdrop-blur-lg rounded-2xl p-8 text-center shadow-lg border border-white/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 fade-in-section group" style="transition-delay: 300ms;">
                    <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                        <i class="fas fa-chart-bar text-white text-2xl"></i>
                    </div>
                    <h4 class="text-xl font-semibold mb-2">Laporan Analitis</h4>
                    <p class="text-gray-600 text-sm">Dapatkan wawasan mendalam dari laporan dan grafik yang interaktif.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Slogans Section -->
    <section id="slogans" class="py-20 bg-gray-50/50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 fade-in-section">
                <h3 class="text-3xl font-bold mb-2">Revolusi Keuangan Anda</h3>
                <p class="text-gray-600">Lebih dari sekadar aplikasi, ini adalah mindset baru.</p>
                <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-4"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Slogan 1 & 2 -->
                <div class="space-y-8">
                    <div class="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/30 fade-in-section group" style="transition-delay: 100ms;">
                        <div class="flex items-start">
                            <div class="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                                <i class="fas fa-rocket text-white text-xl"></i>
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold mb-2">Bukan sekadar menabung. Ini revolusi keuangan Anda.</h4>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/30 fade-in-section group" style="transition-delay: 200ms;">
                        <div class="flex items-start">
                            <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                                <i class="fas fa-wallet text-white text-xl"></i>
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold mb-2">Inovasi di saku Anda, simpanan ekstra di rekening Anda.</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Slogan 3 & 4 -->
                <div class="space-y-8">
                    <div class="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/30 fade-in-section group" style="transition-delay: 300ms;">
                        <div class="flex items-start">
                            <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                                <i class="fas fa-search-dollar text-white text-xl"></i>
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold mb-2">Frixsave: Ambil alih kendali, temukan dana tersembunyi.</h4>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/30 fade-in-section group" style="transition-delay: 400ms;">
                        <div class="flex items-start">
                            <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                                <i class="fas fa-flag text-white text-xl"></i>
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold mb-2">Stop managing money. Start a financial revolution.</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center fade-in-section">
                <h3 class="text-3xl font-bold mb-2">Penawaran Spesial Terbatas!</h3>
                <p class="text-gray-600">Dapatkan akses penuh ke semua fitur Frixsave selamanya.</p>
                <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-4"></div>
            </div>

            <div class="mt-12 flex justify-center">
                <div class="bg-white/70 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30 max-w-lg w-full text-center fade-in-section relative overflow-hidden" style="transition-delay: 200ms;">
                    <span class="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold px-4 py-1 rounded-full mb-6">AKSES LIFETIME</span>
                    <div class="mb-6 relative">
                        <div class="flex items-end justify-center gap-3">
                            <span class="text-5xl md:text-6xl font-extrabold text-indigo-600">Rp 50.000</span>
                        </div>
                        <span class="text-gray-500 mt-1 block">/sekali bayar</span>
                    </div>
                    <ul class="space-y-4 text-gray-600 mb-8">
                        <li class="flex items-center justify-center"><i class="fas fa-check-circle text-green-500 mr-3"></i>Akses Selamanya (Lifetime)</li>
                        <li class="flex items-center justify-center"><i class="fas fa-check-circle text-green-500 mr-3"></i>Update Fitur Gratis</li>
                        <li class="flex items-center justify-center"><i class="fas fa-check-circle text-green-500 mr-3"></i>Tanpa Biaya Bulanan</li>
                        <li class="flex items-center justify-center"><i class="fas fa-check-circle text-green-500 mr-3"></i>Dukungan Penuh</li>
                    </ul>
                    <a href="https://wa.me/6289674135929?text=Halo%2C%20saya%20tertarik%20dengan%20penawaran%20lifetime%20Rp%2050.000%20untuk%20aplikasi%20Frixsave." target="_blank" class="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-8 text-base md:py-4 md:px-10 md:text-lg rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                        Pesan Sekarang <i class="fab fa-whatsapp ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-20 bg-gray-50/50">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 fade-in-section">
                <h3 class="text-3xl font-bold mb-2">Apa Kata Mereka?</h3>
                <p class="text-gray-600">Lihat bagaimana Frixsave membantu pengguna kami.</p>
                <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-4"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Testimonial 1 -->
                <div class="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/30 fade-in-section group">
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 rounded-full mr-4 border-2 border-indigo-200 shadow-md bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center">
                            <i class="fas fa-user text-3xl text-indigo-500"></i>
                        </div>
                        <div>
                            <h4 class="font-bold">Sarah L.</h4>
                            <p class="text-sm text-gray-500">Digital Marketer</p>
                        </div>
                    </div>
                    <p class="text-gray-600 italic mb-4">"Aplikasi ini benar-benar mengubah cara saya melihat uang. Fitur anggarannya sangat intuitif dan membantu saya menghemat lebih dari 20% setiap bulan!"</p>
                    <div class="text-yellow-400">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                </div>

                <!-- Testimonial 2 -->
                <div class="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/30 fade-in-section group" style="transition-delay: 150ms;">
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 rounded-full mr-4 border-2 border-indigo-200 shadow-md bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center">
                            <i class="fas fa-user text-3xl text-indigo-500"></i>
                        </div>
                        <div>
                            <h4 class="font-bold">Budi S.</h4>
                            <p class="text-sm text-gray-500">Freelancer</p>
                        </div>
                    </div>
                    <p class="text-gray-600 italic mb-4">"Sebagai freelancer, pendapatan saya tidak menentu. Frixsave membantu saya mengelola cash flow dan melacak piutang dengan sangat efektif. Highly recommended!"</p>
                    <div class="text-yellow-400">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                    </div>
                </div>

                <!-- Testimonial 3 -->
                <div class="bg-white/70 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/30 fade-in-section group" style="transition-delay: 300ms;">
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 rounded-full mr-4 border-2 border-indigo-200 shadow-md bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center">
                            <i class="fas fa-user text-3xl text-indigo-500"></i>
                        </div>
                        <div>
                            <h4 class="font-bold">Rina A.</h4>
                            <p class="text-sm text-gray-500">Mahasiswa</p>
                        </div>
                    </div>
                    <p class="text-gray-600 italic mb-4">"Fitur target keuangan sangat memotivasi! Akhirnya saya bisa menabung untuk laptop baru. Tampilannya juga modern dan mudah digunakan."</p>
                    <div class="text-yellow-400">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 fade-in-section">
                <h3 class="text-3xl font-bold mb-2">Pertanyaan Umum</h3>
                <p class="text-gray-600">Temukan jawaban untuk pertanyaan yang sering diajukan.</p>
                <div class="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-4"></div>
            </div>

            <div class="max-w-3xl mx-auto space-y-4">
                <!-- FAQ Item 1 -->
                <details class="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30 fade-in-section" style="transition-delay: 100ms;">
                    <summary class="flex justify-between items-center font-semibold cursor-pointer">
                        Bagaimana model pembayaran aplikasi ini?
                        <i class="fas fa-chevron-down accordion-icon transition-transform duration-300"></i>
                    </summary>
                    <p class="text-gray-600 mt-4 text-sm leading-relaxed">
                        Saat ini kami menawarkan akses lifetime dengan pembayaran satu kali. Dengan penawaran spesial ini, Anda mendapatkan semua fitur yang ada dan semua pembaruan di masa depan tanpa biaya langganan bulanan atau tahunan.
                    </p>
                </details>

                <!-- FAQ Item 2 -->
                <details class="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30 fade-in-section" style="transition-delay: 200ms;">
                    <summary class="flex justify-between items-center font-semibold cursor-pointer">
                        Apakah data saya aman?
                        <i class="fas fa-chevron-down accordion-icon transition-transform duration-300"></i>
                    </summary>
                    <p class="text-gray-600 mt-4 text-sm leading-relaxed">
                        Keamanan data Anda adalah prioritas utama kami. Aplikasi ini menggunakan Supabase, sebuah platform backend yang aman dengan fitur Row Level Security (RLS). Ini berarti hanya Anda yang dapat mengakses data keuangan Anda sendiri.
                    </p>
                </details>

                <!-- FAQ Item 3 -->
                <details class="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30 fade-in-section" style="transition-delay: 300ms;">
                    <summary class="flex justify-between items-center font-semibold cursor-pointer">
                        Bisakah saya mengakses data dari beberapa perangkat?
                        <i class="fas fa-chevron-down accordion-icon transition-transform duration-300"></i>
                    </summary>
                    <p class="text-gray-600 mt-4 text-sm leading-relaxed">
                        Tentu saja! Dengan integrasi Supabase, semua data Anda disimpan di cloud. Anda dapat login dan mengakses data keuangan Anda dari browser manapun, di perangkat manapun, selama Anda menggunakan email yang sama.
                    </p>
                </details>
                
                <!-- FAQ Item 4 -->
                <details class="bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/30 fade-in-section" style="transition-delay: 400ms;">
                    <summary class="flex justify-between items-center font-semibold cursor-pointer">
                        Apa itu Supabase dan mengapa aplikasi ini menggunakannya?
                        <i class="fas fa-chevron-down accordion-icon transition-transform duration-300"></i>
                    </summary>
                    <p class="text-gray-600 mt-4 text-sm leading-relaxed">
                        Supabase adalah platform open-source yang menyediakan database, autentikasi, dan penyimpanan cloud. Kami menggunakannya untuk memastikan data Anda tersimpan dengan aman, tersinkronisasi secara real-time, dan dapat diakses dari mana saja, memberikan Anda pengalaman terbaik tanpa harus khawatir kehilangan data.
                    </p>
                </details>
            </div>
        </div>
    </section>

    <!-- Call to Action Section -->
    <section id="cta" class="py-20">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-center shadow-2xl fade-in-section overflow-hidden">
                <div class="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 float-animation"></div>
                <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 float-animation" style="animation-delay: 1s;"></div>
                <div class="relative z-10">
                    <h3 class="text-3xl md:text-4xl font-extrabold text-white mb-4">Siap Mengambil Kendali Keuangan Anda?</h3>
                    <p class="text-indigo-100 max-w-2xl mx-auto mb-8">
                        Dapatkan akses lifetime hanya dengan sekali bayar. Mulai perjalanan finansial Anda yang lebih baik hari ini!
                    </p>
                    <a href="https://wa.me/6289674135929?text=Halo%2C%20saya%20tertarik%20dengan%20penawaran%20lifetime%20Rp%2050.000%20untuk%20aplikasi%20Frixsave." target="_blank" class="bg-white hover:bg-gray-100 text-indigo-600 font-bold py-3 px-8 text-base md:py-4 md:px-10 md:text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                        Amankan Penawaran <i class="fab fa-whatsapp ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="py-8">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-gray-600 dark:text-gray-400">
                &copy; 2025 Frixsave by <span class="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">HPUTRAX</span>.
            </p>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <a href="#" id="back-to-top" class="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all duration-300 opacity-0 pointer-events-none">
        <i class="fas fa-arrow-up"></i>
    </a>

    <script src="script.js"></script>

</body>
</html>
