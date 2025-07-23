// Educational content data for Computational Thinking learning app
const ContentData = {
    grades: {
        'X': {
            'decomposition': {
                title: 'Dekomposisi',
                description: 'Memecah masalah kompleks menjadi bagian-bagian kecil',
                icon: 'layers',
                color: 'bg-red-500',
                questions: [
                    {
                        type: 'multiple-choice',
                        question: 'Apa yang dimaksud dengan dekomposisi dalam berpikir komputasional?',
                        context: 'Dekomposisi adalah salah satu konsep dasar dalam berpikir komputasional.',
                        options: [
                            { text: 'Memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah diselesaikan', correct: true },
                            { text: 'Menggabungkan beberapa masalah menjadi satu masalah besar', correct: false },
                            { text: 'Mengabaikan bagian-bagian yang tidak penting dalam masalah', correct: false },
                            { text: 'Membuat algoritma untuk menyelesaikan masalah', correct: false }
                        ],
                        explanation: 'Dekomposisi adalah proses memecah masalah kompleks menjadi sub-masalah yang lebih kecil dan mudah dikelola.',
                        hint: 'Pikirkan tentang bagaimana Anda membersihkan rumah - apakah Anda melakukannya sekaligus atau membaginya per ruangan?'
                    },
                    {
                        type: 'decomposition',
                        subtype: 'problem-breakdown',
                        question: 'Pecahkan masalah berikut menjadi bagian-bagian kecil',
                        context: 'Anda diminta untuk mengorganisir acara ulang tahun teman di sekolah.',
                        mainProblem: 'Mengorganisir pesta ulang tahun di sekolah',
                        options: [
                            { text: 'Menentukan tanggal dan waktu acara', correct: true },
                            { text: 'Membeli hadiah yang mahal', correct: false },
                            { text: 'Menyiapkan dekorasi ruangan', correct: true },
                            { text: 'Mengundang semua murid di sekolah', correct: false },
                            { text: 'Menyiapkan makanan dan minuman', correct: true },
                            { text: 'Menyewa gedung besar', correct: false },
                            { text: 'Membuat daftar tamu', correct: true },
                            { text: 'Menyiapkan musik dan hiburan', correct: true }
                        ],
                        explanation: 'Untuk mengorganisir pesta yang sukses, kita perlu memecahnya menjadi tugas-tugas yang bisa dikelola: menentukan waktu, menyiapkan tempat, mengundang tamu, menyiapkan makanan, dan hiburan.',
                        hint: 'Pilih aktivitas yang realistis untuk acara sekolah dan bisa dilakukan dengan budget terbatas.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Manakah contoh penerapan dekomposisi dalam kehidupan sehari-hari?',
                        options: [
                            { text: 'Memasak nasi goreng dengan membagi langkah: menyiapkan bahan, memasak nasi, menumis bumbu, mencampur semuanya', correct: true },
                            { text: 'Membeli semua bahan masakan sekaligus tanpa daftar', correct: false },
                            { text: 'Langsung memasak tanpa persiapan', correct: false },
                            { text: 'Makan di warung saja', correct: false }
                        ],
                        explanation: 'Memasak adalah contoh sempurna dekomposisi - kita memecah proses memasak menjadi langkah-langkah kecil yang berurutan.',
                        hint: 'Pikirkan tentang bagaimana resep masakan biasanya ditulis - apakah langsung jadi atau ada tahapan?'
                    },
                    {
                        type: 'decomposition',
                        subtype: 'step-ordering',
                        question: 'Urutkan langkah-langkah untuk menyelesaikan PR matematika',
                        context: 'Anda memiliki PR matematika yang harus dikumpulkan besok.',
                        steps: [
                            { id: 1, text: 'Membaca dan memahami soal', order: 1 },
                            { id: 2, text: 'Menyiapkan alat tulis dan buku catatan', order: 2 },
                            { id: 3, text: 'Mengerjakan soal satu per satu', order: 4 },
                            { id: 4, text: 'Mengidentifikasi rumus yang diperlukan', order: 3 },
                            { id: 5, text: 'Memeriksa kembali jawaban', order: 5 },
                            { id: 6, text: 'Merapikan dan menulis ulang jika perlu', order: 6 }
                        ],
                        explanation: 'Menyelesaikan PR matematika memerlukan pendekatan sistematis: persiapan, pemahaman, identifikasi metode, pengerjaan, dan verifikasi.',
                        hint: 'Mulai dari persiapan dasar, lalu pahami masalahnya, baru kerjakan step by step.'
                    }
                ]
            },
            'pattern': {
                title: 'Pengenalan Pola',
                description: 'Mengidentifikasi kesamaan dan pola dalam data',
                icon: 'search',
                color: 'bg-blue-500',
                questions: [
                    {
                        type: 'multiple-choice',
                        question: 'Apa yang dimaksud dengan pengenalan pola?',
                        options: [
                            { text: 'Kemampuan mengidentifikasi kesamaan, keteraturan, atau trend dalam data', correct: true },
                            { text: 'Membuat pola baru dari data yang ada', correct: false },
                            { text: 'Menghapus pola yang tidak diperlukan', correct: false },
                            { text: 'Mengubah semua data menjadi pola yang sama', correct: false }
                        ],
                        explanation: 'Pengenalan pola adalah kemampuan untuk melihat keteraturan, kesamaan, atau hubungan dalam sekumpulan data atau informasi.',
                        hint: 'Pikirkan tentang bagaimana Anda mengenali wajah teman atau memprediksi cuaca berdasarkan awan.'
                    },
                    {
                        type: 'pattern',
                        subtype: 'sequence',
                        question: 'Lengkapi deret angka berikut',
                        context: 'Perhatikan pola dalam deret angka ini dan temukan angka yang hilang.',
                        sequence: [2, 4, 6, null, 10, 12],
                        missingIndex: 3,
                        options: [
                            { text: '7', correct: false },
                            { text: '8', correct: true },
                            { text: '9', correct: false },
                            { text: '5', correct: false }
                        ],
                        explanation: 'Ini adalah deret bilangan genap yang naik 2 setiap langkah: 2, 4, 6, 8, 10, 12.',
                        hint: 'Perhatikan selisih antara angka-angka yang berurutan.'
                    },
                    {
                        type: 'pattern',
                        subtype: 'visual',
                        question: 'Buat pola catur 3x3',
                        context: 'Klik pada kotak-kotak untuk membuat pola seperti papan catur.',
                        gridSize: 'grid-3x3',
                        targetPattern: [0, 2, 4, 6, 8],
                        patternDescription: 'Buat pola kotak-kotak seperti papan catur dengan kotak yang berwarna bergantian',
                        explanation: 'Pola catur dibuat dengan mengisi kotak secara bergantian, dimulai dari pojok kiri atas.',
                        hint: 'Mulai dari pojok kiri atas, lalu lewati satu kotak untuk membuat pola bergantian.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Dalam kehidupan sehari-hari, manakah yang merupakan contoh pengenalan pola?',
                        options: [
                            { text: 'Mengenali bahwa setiap hari Senin kelas matematika selalu jam pertama', correct: true },
                            { text: 'Mengerjakan PR secara acak', correct: false },
                            { text: 'Bermain tanpa aturan', correct: false },
                            { text: 'Mengubah jadwal setiap hari', correct: false }
                        ],
                        explanation: 'Mengenali jadwal yang berulang adalah contoh pengenalan pola dalam kehidupan sehari-hari.',
                        hint: 'Pikirkan tentang hal-hal yang terjadi secara berulang atau teratur dalam kehidupan Anda.'
                    },
                    {
                        type: 'pattern',
                        subtype: 'number-pattern',
                        question: 'Temukan angka yang hilang dalam pola Fibonacci',
                        context: 'Deret Fibonacci: setiap angka adalah jumlah dari dua angka sebelumnya.',
                        numbers: [1, 1, 2, 3, 5, null, 13],
                        correctAnswer: 8,
                        explanation: 'Dalam deret Fibonacci: 1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13. Jadi angka yang hilang adalah 8.',
                        hint: 'Jumlahkan dua angka sebelumnya untuk mendapatkan angka berikutnya.'
                    }
                ]
            },
            'abstraction': {
                title: 'Abstraksi',
                description: 'Fokus pada informasi penting dan mengabaikan detail yang tidak relevan',
                icon: 'filter',
                color: 'bg-green-500',
                questions: [
                    {
                        type: 'multiple-choice',
                        question: 'Apa yang dimaksud dengan abstraksi?',
                        options: [
                            { text: 'Mengidentifikasi informasi penting dan mengabaikan detail yang tidak relevan', correct: true },
                            { text: 'Membuat semua informasi menjadi abstrak', correct: false },
                            { text: 'Menghapus semua informasi yang ada', correct: false },
                            { text: 'Membuat informasi menjadi lebih rumit', correct: false }
                        ],
                        explanation: 'Abstraksi adalah proses menyaring informasi untuk fokus pada hal-hal yang penting dan relevan sambil mengabaikan detail yang tidak perlu.',
                        hint: 'Seperti saat Anda melihat peta - Anda tidak perlu tahu setiap batu di jalan, yang penting adalah rute yang harus dilalui.'
                    },
                    {
                        type: 'abstraction',
                        subtype: 'information-filter',
                        question: 'Pilih informasi yang relevan',
                        scenario: 'Anda ingin membeli smartphone baru dengan budget terbatas untuk keperluan sekolah.',
                        goal: 'membeli smartphone untuk sekolah',
                        informationItems: [
                            { text: 'Kapasitas baterai', relevant: true },
                            { text: 'Warna casing yang tersedia', relevant: false },
                            { text: 'Kapasitas penyimpanan', relevant: true },
                            { text: 'Brand ambassador yang digunakan', relevant: false },
                            { text: 'Harga smartphone', relevant: true },
                            { text: 'Kemampuan kamera untuk foto selfie', relevant: false },
                            { text: 'Kompatibilitas dengan aplikasi pembelajaran', relevant: true },
                            { text: 'Desain kemasan produk', relevant: false }
                        ],
                        explanation: 'Untuk membeli smartphone sekolah, yang penting adalah aspek fungsional seperti baterai, storage, harga, dan kompatibilitas aplikasi. Warna, brand ambassador, dan kemasan tidak relevan untuk tujuan belajar.',
                        hint: 'Fokus pada fitur yang akan membantu kegiatan belajar, bukan pada aspek estetika atau marketing.'
                    },
                    {
                        type: 'abstraction',
                        subtype: 'key-details',
                        question: 'Identifikasi detail kunci dari cerita berikut',
                        text: 'Rani adalah siswa kelas X yang tinggal di Bandung. Setiap pagi dia bangun jam 5:30, mandi, sarapan roti bakar dengan selai strawberry kesukaannya, lalu berangkat ke sekolah naik angkot biru nomor 03. Perjalanan ke sekolah memakan waktu 30 menit. Hari ini dia memiliki ujian matematika jam ke-3 yang sangat penting karena akan menentukan nilai rapornya.',
                        sentences: [
                            { text: 'Rani adalah siswa kelas X yang tinggal di Bandung.', isKey: true },
                            { text: 'Setiap pagi dia bangun jam 5:30, mandi, sarapan roti bakar dengan selai strawberry kesukaannya.', isKey: false },
                            { text: 'lalu berangkat ke sekolah naik angkot biru nomor 03.', isKey: false },
                            { text: 'Perjalanan ke sekolah memakan waktu 30 menit.', isKey: false },
                            { text: 'Hari ini dia memiliki ujian matematika jam ke-3 yang sangat penting karena akan menentukan nilai rapornya.', isKey: true }
                        ],
                        explanation: 'Detail kunci adalah informasi yang paling penting: siapa (Rani, siswa kelas X), dan kejadian penting apa (ujian matematika yang menentukan nilai rapor). Detail tentang sarapan, transportasi adalah informasi tambahan.',
                        hint: 'Pilih informasi yang menjawab pertanyaan: siapa, apa, dan mengapa penting.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Manakah contoh abstraksi yang baik dalam menggambarkan sekolah?',
                        options: [
                            { text: 'Sekolah adalah tempat belajar yang memiliki guru, siswa, ruang kelas, dan kurikulum', correct: true },
                            { text: 'Sekolah adalah bangunan berlantai 3, berdinding putih, memiliki 25 ruang kelas, 1 kantin, dan halaman seluas 500m²', correct: false },
                            { text: 'Sekolah adalah tempat dengan kepala sekolah bernama Pak Budi, guru matematika Bu Sari, dan penjaga sekolah Pak Joko', correct: false },
                            { text: 'Sekolah adalah bangunan yang dibangun tahun 1995, direnovasi 2010, dan memiliki cat tembok warna hijau', correct: false }
                        ],
                        explanation: 'Abstraksi yang baik fokus pada fungsi dan komponen utama (tempat belajar, guru, siswa, kurikulum) bukan pada detail fisik spesifik atau nama-nama tertentu.',
                        hint: 'Pilih deskripsi yang bisa berlaku untuk sekolah manapun, bukan detail yang spesifik hanya untuk satu sekolah.'
                    }
                ]
            },
            'algorithm': {
                title: 'Desain Algoritma',
                description: 'Membuat langkah-langkah terstruktur untuk menyelesaikan masalah',
                icon: 'git-branch',
                color: 'bg-purple-500',
                questions: [
                    {
                        type: 'multiple-choice',
                        question: 'Apa yang dimaksud dengan algoritma?',
                        options: [
                            { text: 'Serangkaian langkah terstruktur untuk menyelesaikan masalah', correct: true },
                            { text: 'Sebuah program komputer', correct: false },
                            { text: 'Bahasa pemrograman', correct: false },
                            { text: 'Perangkat keras komputer', correct: false }
                        ],
                        explanation: 'Algoritma adalah urutan langkah-langkah logis dan terstruktur yang dirancang untuk menyelesaikan masalah atau mencapai tujuan tertentu.',
                        hint: 'Pikirkan tentang resep masakan - ada langkah-langkah yang harus diikuti untuk mendapatkan hasil yang diinginkan.'
                    },
                    {
                        type: 'algorithm',
                        subtype: 'step-sequence',
                        question: 'Urutkan langkah-langkah untuk mengirim email',
                        context: 'Anda ingin mengirim email tugas kepada guru.',
                        steps: [
                            { id: 1, text: 'Buka aplikasi email', order: 1 },
                            { id: 2, text: 'Klik tombol "Compose" atau "Tulis"', order: 2 },
                            { id: 3, text: 'Masukkan alamat email penerima', order: 3 },
                            { id: 4, text: 'Tulis judul email', order: 4 },
                            { id: 5, text: 'Tulis isi pesan', order: 5 },
                            { id: 6, text: 'Lampirkan file tugas jika ada', order: 6 },
                            { id: 7, text: 'Klik tombol "Send" atau "Kirim"', order: 7 }
                        ],
                        explanation: 'Mengirim email memiliki urutan yang logis: buka aplikasi, buat email baru, isi data penerima dan pesan, lampirkan file, lalu kirim.',
                        hint: 'Mulai dari membuka aplikasi, lalu ikuti urutan seperti mengisi formulir.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Manakah yang bukan ciri-ciri algoritma yang baik?',
                        options: [
                            { text: 'Memiliki banyak langkah yang rumit', correct: true },
                            { text: 'Jelas dan tidak ambigu', correct: false },
                            { text: 'Memiliki input dan output yang terdefinisi', correct: false },
                            { text: 'Efisien dalam penggunaan waktu dan sumber daya', correct: false }
                        ],
                        explanation: 'Algoritma yang baik seharusnya sederhana dan efisien, bukan rumit dengan banyak langkah yang tidak perlu.',
                        hint: 'Algoritma yang baik harus mudah dipahami dan diikuti, bukan membuat bingung.'
                    },
                    {
                        type: 'algorithm',
                        subtype: 'flowchart',
                        question: 'Buat flowchart untuk menentukan apakah seorang siswa lulus ujian',
                        context: 'Siswa lulus jika nilai ujian >= 75. Buat flowchart untuk proses penentuan kelulusan.',
                        components: [
                            { id: 1, text: 'Mulai', type: 'start' },
                            { id: 2, text: 'Input nilai ujian', type: 'input' },
                            { id: 3, text: 'Nilai >= 75?', type: 'decision' },
                            { id: 4, text: 'Output: LULUS', type: 'output' },
                            { id: 5, text: 'Output: TIDAK LULUS', type: 'output' },
                            { id: 6, text: 'Selesai', type: 'end' }
                        ],
                        correctSequence: [1, 2, 3, 4, 5, 6],
                        explanation: 'Flowchart dimulai dari start, input nilai, evaluasi kondisi (nilai >= 75), output hasil berdasarkan kondisi, lalu selesai.',
                        hint: 'Mulai dengan start, masukkan data, buat keputusan, tampilkan hasil, lalu selesai.'
                    }
                ]
            }
        },
        'XI': {
            'decomposition': {
                title: 'Dekomposisi Lanjutan',
                description: 'Pemecahan masalah kompleks dengan pendekatan sistematis',
                icon: 'layers',
                color: 'bg-red-500',
                questions: [
                    {
                        type: 'multiple-choice',
                        question: 'Dalam menganalisis sistem perpustakaan sekolah, manakah dekomposisi yang paling tepat?',
                        options: [
                            { text: 'Sistem anggota, sistem buku, sistem peminjaman, sistem pengembalian', correct: true },
                            { text: 'Ruang baca, rak buku, meja baca, kursi', correct: false },
                            { text: 'Pustakawan, siswa, guru, kepala sekolah', correct: false },
                            { text: 'Buku fiksi, buku non-fiksi, majalah, koran', correct: false }
                        ],
                        explanation: 'Dekomposisi sistem perpustakaan harus berdasarkan fungsi utama: mengelola anggota, mengelola koleksi buku, proses peminjaman, dan proses pengembalian.',
                        hint: 'Pikirkan tentang proses-proses utama yang terjadi di perpustakaan, bukan objek fisiknya.'
                    },
                    {
                        type: 'decomposition',
                        subtype: 'problem-breakdown',
                        question: 'Dekomposisi masalah: Membuat website sekolah',
                        context: 'Sekolah Anda ingin membuat website resmi untuk meningkatkan komunikasi dengan siswa dan orang tua.',
                        mainProblem: 'Membuat website resmi sekolah yang informatif dan mudah digunakan',
                        options: [
                            { text: 'Menentukan konten yang akan ditampilkan (profil, berita, jadwal)', correct: true },
                            { text: 'Membeli domain .com yang mahal', correct: false },
                            { text: 'Merancang struktur navigasi website', correct: true },
                            { text: 'Membuat animasi yang rumit', correct: false },
                            { text: 'Mengumpulkan foto dan video untuk galeri', correct: true },
                            { text: 'Menambahkan musik latar belakang', correct: false },
                            { text: 'Membuat sistem login untuk siswa dan guru', correct: true },
                            { text: 'Mengintegrasikan dengan media sosial sekolah', correct: true },
                            { text: 'Menambahkan game online untuk siswa', correct: false }
                        ],
                        explanation: 'Website sekolah yang baik fokus pada fungsi informasi dan komunikasi: konten yang relevan, navigasi yang mudah, galeri kegiatan sekolah, sistem login, dan integrasi media sosial.',
                        hint: 'Pilih komponen yang mendukung tujuan utama: memberikan informasi dan memfasilitasi komunikasi sekolah.'
                    },
                    {
                        type: 'decomposition',
                        subtype: 'step-ordering',
                        question: 'Urutkan langkah-langkah penelitian ilmiah sederhana',
                        context: 'Anda diminta membuat penelitian sederhana tentang pengaruh musik terhadap konsentrasi belajar siswa.',
                        steps: [
                            { id: 1, text: 'Menentukan topik dan rumusan masalah penelitian', order: 1 },
                            { id: 2, text: 'Menganalisis dan menyimpulkan hasil penelitian', order: 7 },
                            { id: 3, text: 'Mencari referensi dan teori yang mendukung', order: 2 },
                            { id: 4, text: 'Menentukan metode dan teknik pengumpulan data', order: 3 },
                            { id: 5, text: 'Menyiapkan instrumen penelitian (kuesioner, tes)', order: 4 },
                            { id: 6, text: 'Melaksanakan pengumpulan data dari responden', order: 5 },
                            { id: 7, text: 'Mengolah dan menganalisis data yang terkumpul', order: 6 },
                            { id: 8, text: 'Menulis laporan penelitian', order: 8 }
                        ],
                        explanation: 'Penelitian ilmiah mengikuti metode ilmiah: tentukan masalah, cari teori, tentukan metode, siapkan instrumen, kumpulkan data, analisis, simpulkan, dan buat laporan.',
                        hint: 'Ikuti urutan metode ilmiah: dari perencanaan, pelaksanaan, hingga pelaporan.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Dalam merancang aplikasi mobile untuk jadwal pelajaran, komponen utama apa yang diperlukan?',
                        options: [
                            { text: 'Database jadwal, interface pengguna, sistem notifikasi, fitur sinkronisasi', correct: true },
                            { text: 'Hanya tampilan kalender yang bagus', correct: false },
                            { text: 'Fitur game dan hiburan', correct: false },
                            { text: 'Sistem pembayaran online', correct: false }
                        ],
                        explanation: 'Aplikasi jadwal memerlukan: tempat penyimpanan data (database), antarmuka untuk interaksi (UI), pengingat (notifikasi), dan kemampuan sinkronisasi antar perangkat.',
                        hint: 'Pikirkan komponen teknis yang dibutuhkan untuk menyimpan, menampilkan, dan mengingatkan jadwal.'
                    }
                ]
            },
            'pattern': {
                title: 'Analisis Pola Kompleks',
                description: 'Mengidentifikasi pola dalam data dan sistem yang kompleks',
                icon: 'search',
                color: 'bg-blue-500',
                questions: [
                    {
                        type: 'pattern',
                        subtype: 'sequence',
                        question: 'Analisis pola dalam deret geometri',
                        context: 'Perhatikan pola dalam deret berikut dan temukan angka yang hilang.',
                        sequence: [3, 6, 12, null, 48, 96],
                        missingIndex: 3,
                        options: [
                            { text: '18', correct: false },
                            { text: '24', correct: true },
                            { text: '30', correct: false },
                            { text: '36', correct: false }
                        ],
                        explanation: 'Ini adalah deret geometri dengan rasio 2. Setiap angka adalah hasil kali angka sebelumnya dengan 2: 3×2=6, 6×2=12, 12×2=24, 24×2=48.',
                        hint: 'Perhatikan hubungan perkalian antara angka-angka berurutan.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Dalam menganalisis data penjualan kantin sekolah, pola apa yang paling berguna untuk diidentifikasi?',
                        options: [
                            { text: 'Pola penjualan per hari dalam seminggu dan per jam dalam sehari', correct: true },
                            { text: 'Warna kemasan produk yang paling laku', correct: false },
                            { text: 'Nama supplier produk', correct: false },
                            { text: 'Umur petugas kantin', correct: false }
                        ],
                        explanation: 'Pola waktu (hari dan jam) membantu memahami kapan demand tinggi dan rendah, sehingga bisa mengoptimalkan stok dan layanan.',
                        hint: 'Pikirkan informasi yang bisa membantu meningkatkan efisiensi operasional kantin.'
                    },
                    {
                        type: 'pattern',
                        subtype: 'visual',
                        question: 'Buat pola spiral sederhana',
                        context: 'Klik kotak-kotak untuk membuat pola spiral dari pusat ke luar.',
                        gridSize: 'grid-4x4',
                        targetPattern: [5, 6, 9, 10, 4, 7, 8, 11],
                        patternDescription: 'Mulai dari tengah grid dan buat pola spiral searah jarum jam',
                        explanation: 'Pola spiral dimulai dari pusat (kotak 5,6,9,10) lalu bergerak keluar membentuk spiral searah jarum jam.',
                        hint: 'Mulai dari 4 kotak tengah, lalu tambahkan kotak di sekitarnya membentuk spiral.'
                    },
                    {
                        type: 'pattern',
                        subtype: 'number-pattern',
                        question: 'Temukan pola dalam barisan aritmatika bertingkat',
                        context: 'Deret ini memiliki pola selisih yang bertambah secara teratur.',
                        numbers: [2, 5, 10, 17, null, 37],
                        correctAnswer: 26,
                        explanation: 'Pola selisih: +3, +5, +7, +9, +11. Jadi 17+9=26, dan 26+11=37.',
                        hint: 'Hitung selisih antara angka berurutan, lalu cari pola dalam selisih tersebut.'
                    }
                ]
            },
            'abstraction': {
                title: 'Abstraksi Sistem',
                description: 'Membuat model abstrak dari sistem kompleks',
                icon: 'filter',
                color: 'bg-green-500',
                questions: [
                    {
                        type: 'abstraction',
                        subtype: 'information-filter',
                        question: 'Pilih informasi relevan untuk sistem manajemen perpustakaan',
                        scenario: 'Anda merancang sistem digital untuk mengelola perpustakaan sekolah yang memiliki 5000 buku dan 800 anggota.',
                        goal: 'sistem manajemen perpustakaan digital',
                        informationItems: [
                            { text: 'ID unik untuk setiap buku', relevant: true },
                            { text: 'Warna sampul buku', relevant: false },
                            { text: 'Data anggota (nama, kelas, nomor induk)', relevant: true },
                            { text: 'Tinggi badan anggota', relevant: false },
                            { text: 'Tanggal peminjaman dan pengembalian', relevant: true },
                            { text: 'Cuaca saat buku dipinjam', relevant: false },
                            { text: 'Status ketersediaan buku', relevant: true },
                            { text: 'Makanan favorit anggota', relevant: false },
                            { text: 'Denda keterlambatan', relevant: true },
                            { text: 'Posisi duduk di perpustakaan', relevant: false }
                        ],
                        explanation: 'Sistem manajemen perpustakaan memerlukan data yang relevan untuk tracking: identitas buku, data anggota, riwayat peminjaman, status buku, dan sistem denda. Data personal yang tidak terkait operasional tidak diperlukan.',
                        hint: 'Fokus pada data yang diperlukan untuk mencatat, melacak, dan mengelola peminjaman buku.'
                    },
                    {
                        type: 'abstraction',
                        subtype: 'categorization',
                        question: 'Kategorikan komponen sistem e-learning sekolah',
                        context: 'Sekolah akan mengimplementasikan sistem e-learning. Kategorikan komponen berikut ke dalam kategori yang tepat.',
                        items: [
                            { id: 1, text: 'Video pembelajaran', categoryId: 'content' },
                            { id: 2, text: 'Login siswa dan guru', categoryId: 'authentication' },
                            { id: 3, text: 'Forum diskusi', categoryId: 'interaction' },
                            { id: 4, text: 'Quiz online', categoryId: 'assessment' },
                            { id: 5, text: 'Database nilai', categoryId: 'data' },
                            { id: 6, text: 'Chat real-time', categoryId: 'interaction' },
                            { id: 7, text: 'Materi PDF', categoryId: 'content' },
                            { id: 8, text: 'Sistem backup', categoryId: 'data' },
                            { id: 9, text: 'Ujian online', categoryId: 'assessment' },
                            { id: 10, text: 'Verifikasi identitas', categoryId: 'authentication' }
                        ],
                        categories: [
                            { id: 'content', name: 'Konten Pembelajaran' },
                            { id: 'authentication', name: 'Autentikasi & Keamanan' },
                            { id: 'interaction', name: 'Interaksi & Komunikasi' },
                            { id: 'assessment', name: 'Penilaian & Evaluasi' },
                            { id: 'data', name: 'Manajemen Data' }
                        ],
                        explanation: 'Sistem e-learning dapat dikategorikan berdasarkan fungsi: penyampaian konten, autentikasi pengguna, fasilitas interaksi, sistem penilaian, dan manajemen data.',
                        hint: 'Kelompokkan berdasarkan fungsi utama dalam sistem pembelajaran online.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Manakah model abstraksi yang tepat untuk sistem transportasi umum?',
                        options: [
                            { text: 'Node (halte), Edge (rute), Atribut (waktu, jarak, biaya)', correct: true },
                            { text: 'Hanya daftar nama semua supir bus', correct: false },
                            { text: 'Foto setiap kendaraan dari berbagai sudut', correct: false },
                            { text: 'Warna cat setiap kendaraan', correct: false }
                        ],
                        explanation: 'Model abstraksi transportasi umum menggunakan graph theory: node sebagai titik perhentian, edge sebagai jalur, dan atribut sebagai karakteristik perjalanan.',
                        hint: 'Pikirkan elemen-elemen penting dalam sistem transportasi: titik, jalur, dan informasi perjalanan.'
                    },
                    {
                        type: 'abstraction',
                        subtype: 'key-details',
                        question: 'Identifikasi detail kunci dalam spesifikasi sistem',
                        text: 'Sistem akademik SMA Merdeka akan menggantikan sistem manual yang ada. Sistem ini harus dapat menangani 1200 siswa dan 80 guru. Fitur utama meliputi manajemen nilai, absensi, jadwal pelajaran, dan komunikasi orang tua. Sistem harus dapat diakses 24/7 dengan waktu respons maksimal 3 detik. Database harus ter-backup otomatis setiap hari. Interface harus user-friendly dan dapat diakses via web browser. Budget pengembangan maksimal 100 juta rupiah dengan timeline 6 bulan.',
                        sentences: [
                            { text: 'Sistem akademik SMA Merdeka akan menggantikan sistem manual yang ada.', isKey: true },
                            { text: 'Sistem ini harus dapat menangani 1200 siswa dan 80 guru.', isKey: true },
                            { text: 'Fitur utama meliputi manajemen nilai, absensi, jadwal pelajaran, dan komunikasi orang tua.', isKey: true },
                            { text: 'Sistem harus dapat diakses 24/7 dengan waktu respons maksimal 3 detik.', isKey: true },
                            { text: 'Database harus ter-backup otomatis setiap hari.', isKey: false },
                            { text: 'Interface harus user-friendly dan dapat diakses via web browser.', isKey: false },
                            { text: 'Budget pengembangan maksimal 100 juta rupiah dengan timeline 6 bulan.', isKey: true }
                        ],
                        explanation: 'Detail kunci dalam spesifikasi sistem: tujuan sistem, kapasitas pengguna, fitur utama, requirement performa, dan constraint budget/timeline. Detail teknis backup dan interface adalah requirement sekunder.',
                        hint: 'Fokus pada requirement yang menentukan scope, skala, dan batasan utama proyek.'
                    }
                ]
            },
            'algorithm': {
                title: 'Algoritma dan Pseudocode',
                description: 'Merancang algoritma dengan pseudocode dan flowchart',
                icon: 'git-branch',
                color: 'bg-purple-500',
                questions: [
                    {
                        type: 'algorithm',
                        subtype: 'pseudocode',
                        question: 'Susun pseudocode untuk menghitung rata-rata nilai siswa',
                        context: 'Buat pseudocode untuk menghitung rata-rata dari sejumlah nilai yang diinputkan user.',
                        lines: [
                            { id: 1, text: 'BEGIN' },
                            { id: 2, text: 'INPUT jumlah_data' },
                            { id: 3, text: 'SET total = 0' },
                            { id: 4, text: 'FOR i = 1 TO jumlah_data' },
                            { id: 5, text: '    INPUT nilai' },
                            { id: 6, text: '    SET total = total + nilai' },
                            { id: 7, text: 'END FOR' },
                            { id: 8, text: 'SET rata_rata = total / jumlah_data' },
                            { id: 9, text: 'OUTPUT rata_rata' },
                            { id: 10, text: 'END' }
                        ],
                        correctSequence: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        explanation: 'Algoritma dimulai dengan inisialisasi, input jumlah data, loop untuk input setiap nilai dan akumulasi, hitung rata-rata, lalu output hasil.',
                        hint: 'Mulai dengan BEGIN, siapkan variabel, loop untuk input dan akumulasi, hitung hasil, output, END.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Apa keuntungan utama menggunakan pseudocode dalam pengembangan algoritma?',
                        options: [
                            { text: 'Memudahkan pemahaman logika sebelum implementasi dalam bahasa pemrograman', correct: true },
                            { text: 'Langsung dapat dijalankan di komputer', correct: false },
                            { text: 'Lebih cepat dari bahasa pemrograman', correct: false },
                            { text: 'Tidak memerlukan logika yang jelas', correct: false }
                        ],
                        explanation: 'Pseudocode memungkinkan kita fokus pada logika algoritma tanpa terikat syntax bahasa pemrograman tertentu, sehingga lebih mudah dipahami dan dirancang.',
                        hint: 'Pikirkan tentang fungsi pseudocode sebagai "bahasa manusia" untuk menggambarkan algoritma.'
                    },
                    {
                        type: 'algorithm',
                        subtype: 'flowchart',
                        question: 'Buat flowchart untuk menentukan diskon berdasarkan total belanja',
                        context: 'Toko memberikan diskon: 10% jika belanja >= 100rb, 5% jika >= 50rb, tidak ada diskon jika < 50rb.',
                        components: [
                            { id: 1, text: 'Mulai', type: 'start' },
                            { id: 2, text: 'Input total belanja', type: 'input' },
                            { id: 3, text: 'Total >= 100000?', type: 'decision' },
                            { id: 4, text: 'Diskon = 10%', type: 'process' },
                            { id: 5, text: 'Total >= 50000?', type: 'decision' },
                            { id: 6, text: 'Diskon = 5%', type: 'process' },
                            { id: 7, text: 'Diskon = 0%', type: 'process' },
                            { id: 8, text: 'Output diskon', type: 'output' },
                            { id: 9, text: 'Selesai', type: 'end' }
                        ],
                        correctSequence: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                        explanation: 'Flowchart menggunakan nested decision: cek kondisi tertinggi dulu (>=100rb), jika tidak, cek kondisi kedua (>=50rb), jika tidak, set diskon 0.',
                        hint: 'Mulai dengan decision untuk nilai tertinggi, lalu turun ke kondisi berikutnya jika kondisi pertama tidak terpenuhi.'
                    },
                    {
                        type: 'algorithm',
                        subtype: 'step-sequence',
                        question: 'Urutkan algoritma pencarian linear dalam array',
                        context: 'Implementasi algoritma untuk mencari nilai tertentu dalam array secara berurutan.',
                        steps: [
                            { id: 1, text: 'Inisialisasi index = 0 dan found = false', order: 1 },
                            { id: 2, text: 'Cek apakah array[index] == target', order: 3 },
                            { id: 3, text: 'Input target yang dicari', order: 2 },
                            { id: 4, text: 'Jika found = true, return index', order: 6 },
                            { id: 5, text: 'Jika sama, set found = true', order: 4 },
                            { id: 6, text: 'Jika tidak sama, increment index', order: 5 },
                            { id: 7, text: 'Ulangi langkah 2-6 sampai found = true atau index >= panjang array', order: 7 },
                            { id: 8, text: 'Jika tidak ditemukan, return -1', order: 8 }
                        ],
                        explanation: 'Linear search: mulai dari index 0, bandingkan setiap elemen dengan target, jika ketemu set flag, jika tidak lanjut ke elemen berikutnya.',
                        hint: 'Mulai dengan inisialisasi, input target, lalu loop untuk membandingkan setiap elemen.'
                    }
                ]
            }
        },
        'XII': {
            'decomposition': {
                title: 'Dekomposisi Sistem Kompleks',
                description: 'Analisis dan perancangan sistem skala besar',
                icon: 'layers',
                color: 'bg-red-500',
                questions: [
                    {
                        type: 'decomposition',
                        subtype: 'problem-breakdown',
                        question: 'Dekomposisi sistem informasi akademik terintegrasi',
                        context: 'Universitas ingin membangun sistem informasi akademik yang mengintegrasikan semua proses dari pendaftaran hingga kelulusan.',
                        mainProblem: 'Membangun sistem informasi akademik terintegrasi untuk universitas dengan 10,000 mahasiswa',
                        options: [
                            { text: 'Modul manajemen mahasiswa (registrasi, profil, status)', correct: true },
                            { text: 'Sistem hiburan dan game untuk mahasiswa', correct: false },
                            { text: 'Modul akademik (KRS, jadwal, nilai, transkrip)', correct: true },
                            { text: 'Aplikasi pesan instan antar mahasiswa', correct: false },
                            { text: 'Modul keuangan (pembayaran, beasiswa, tagihan)', correct: true },
                            { text: 'Sistem prediksi cuaca kampus', correct: false },
                            { text: 'Modul sumber daya (ruang, dosen, mata kuliah)', correct: true },
                            { text: 'Portal orang tua dan wali mahasiswa', correct: true },
                            { text: 'Sistem pemesanan makanan kantin', correct: false },
                            { text: 'Modul pelaporan dan analitik akademik', correct: true }
                        ],
                        explanation: 'Sistem akademik terintegrasi memerlukan modul inti: manajemen mahasiswa, proses akademik, keuangan, sumber daya, komunikasi dengan stakeholder, dan sistem pelaporan.',
                        hint: 'Fokus pada proses inti universitas: pendaftaran, pembelajaran, administrasi, keuangan, dan pelaporan.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Dalam merancang arsitektur microservices untuk e-commerce, prinsip dekomposisi apa yang paling penting?',
                        options: [
                            { text: 'Setiap service harus independen dengan tanggung jawab spesifik (Single Responsibility)', correct: true },
                            { text: 'Semua service harus menggunakan database yang sama', correct: false },
                            { text: 'Service harus saling bergantung erat untuk efisiensi', correct: false },
                            { text: 'Satu service harus menangani semua fungsi untuk kesederhanaan', correct: false }
                        ],
                        explanation: 'Prinsip microservices adalah setiap service memiliki tanggung jawab tunggal, independen, dan dapat dikembangkan secara terpisah (loose coupling, high cohesion).',
                        hint: 'Pikirkan tentang prinsip Single Responsibility Principle dalam arsitektur software.'
                    },
                    {
                        type: 'decomposition',
                        subtype: 'step-ordering',
                        question: 'Urutkan tahapan pengembangan sistem ERP perusahaan',
                        context: 'Perusahaan manufaktur ingin mengimplementasikan sistem ERP untuk mengintegrasikan semua proses bisnis.',
                        steps: [
                            { id: 1, text: 'Analisis kebutuhan bisnis dan proses existing', order: 1 },
                            { id: 2, text: 'Training user dan change management', order: 7 },
                            { id: 3, text: 'Desain arsitektur sistem dan database', order: 3 },
                            { id: 4, text: 'Pemilihan platform dan teknologi ERP', order: 2 },
                            { id: 5, text: 'Implementasi modul secara bertahap', order: 5 },
                            { id: 6, text: 'Testing terintegrasi dan UAT (User Acceptance Test)', order: 6 },
                            { id: 7, text: 'Pengembangan dan kustomisasi modul', order: 4 },
                            { id: 8, text: 'Go-live dan monitoring sistem', order: 8 },
                            { id: 9, text: 'Maintenance dan continuous improvement', order: 9 }
                        ],
                        explanation: 'Implementasi ERP mengikuti SDLC: analisis kebutuhan, pemilihan platform, desain arsitektur, development, implementasi bertahap, testing, training, go-live, dan maintenance.',
                        hint: 'Ikuti tahapan SDLC: analisis, design, development, testing, deployment, maintenance.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Dalam konteks Industry 4.0, bagaimana dekomposisi sistem IoT untuk smart factory sebaiknya dilakukan?',
                        options: [
                            { text: 'Layer fisik (sensors), layer konektivitas (network), layer data (analytics), layer aplikasi (dashboard)', correct: true },
                            { text: 'Hanya fokus pada sensor tanpa mempertimbangkan layer lain', correct: false },
                            { text: 'Menggabungkan semua komponen dalam satu sistem monolitik', correct: false },
                            { text: 'Memisahkan berdasarkan vendor perangkat', correct: false }
                        ],
                        explanation: 'Arsitektur IoT menggunakan layered approach: physical layer (devices/sensors), connectivity layer (network protocols), data layer (processing/analytics), application layer (user interface).',
                        hint: 'Pikirkan tentang alur data dari sensor fisik hingga tampilan informasi untuk user.'
                    }
                ]
            },
            'pattern': {
                title: 'Pattern Recognition dalam Data Science',
                description: 'Mengidentifikasi pola dalam big data dan machine learning',
                icon: 'search',
                color: 'bg-blue-500',
                questions: [
                    {
                        type: 'multiple-choice',
                        question: 'Dalam analisis data penjualan e-commerce, pola mana yang paling berguna untuk strategi bisnis?',
                        options: [
                            { text: 'Seasonal trends, customer behavior patterns, dan product correlation patterns', correct: true },
                            { text: 'Warna packaging produk yang paling banyak diklik', correct: false },
                            { text: 'Nama depan customer yang paling sering membeli', correct: false },
                            { text: 'Jam server backup yang dilakukan setiap hari', correct: false }
                        ],
                        explanation: 'Pola yang strategis untuk bisnis: trend musiman (kapan demand tinggi), pola perilaku customer (preferensi, lifecycle), dan korelasi produk (cross-selling opportunities).',
                        hint: 'Pilih pola yang bisa membantu meningkatkan revenue, customer retention, dan optimasi inventory.'
                    },
                    {
                        type: 'pattern',
                        subtype: 'sequence',
                        question: 'Analisis pola dalam time series data',
                        context: 'Data berikut menunjukkan jumlah pengunjung website per hari. Identifikasi pola yang hilang.',
                        sequence: [1200, 1100, 950, 1050, 1400, 1300, 1150, null, 1450],
                        missingIndex: 7,
                        options: [
                            { text: '1200', correct: false },
                            { text: '1250', correct: true },
                            { text: '1300', correct: false },
                            { text: '1350', correct: false }
                        ],
                        explanation: 'Pola menunjukkan siklus mingguan: tinggi di awal minggu, turun tengah minggu, naik lagi akhir minggu. Hari ke-8 adalah hari Senin yang biasanya sekitar 1250.',
                        hint: 'Perhatikan pola weekly cycle - ada perbedaan traffic antara weekday dan weekend.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Dalam machine learning untuk klasifikasi gambar, teknik pattern recognition apa yang paling efektif?',
                        options: [
                            { text: 'Convolutional Neural Networks (CNN) untuk mengidentifikasi fitur visual', correct: true },
                            { text: 'Hanya menggunakan pixel intensity tanpa feature extraction', correct: false },
                            { text: 'Template matching sederhana', correct: false },
                            { text: 'Pencarian berdasarkan nama file gambar', correct: false }
                        ],
                        explanation: 'CNN efektif untuk computer vision karena dapat mengidentifikasi pattern hierarkis: edge, shape, object parts, hingga complete objects.',
                        hint: 'Pikirkan tentang bagaimana manusia mengenali objek: dari garis, bentuk, bagian, hingga objek utuh.'
                    },
                    {
                        type: 'pattern',
                        subtype: 'visual',
                        question: 'Identifikasi pola clustering dalam data',
                        context: 'Visualisasikan pola clustering dengan membuat 3 kelompok terpisah.',
                        gridSize: 'grid-4x4',
                        targetPattern: [0, 1, 4, 6, 7, 8, 14, 15],
                        patternDescription: 'Buat 3 cluster: cluster kiri atas, cluster tengah, dan cluster kanan bawah',
                        explanation: 'Clustering pattern: data points dikelompokkan berdasarkan kedekatan atau kesamaan fitur, membentuk cluster yang terpisah.',
                        hint: 'Buat 3 kelompok titik yang terpisah jarak, simulasikan hasil clustering algorithm.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Dalam fraud detection sistem perbankan, pola apa yang paling mencurigakan?',
                        options: [
                            { text: 'Transaksi dengan jumlah, lokasi, dan waktu yang sangat berbeda dari pola normal user', correct: true },
                            { text: 'Transaksi yang dilakukan pada hari kerja', correct: false },
                            { text: 'Penggunaan kartu kredit untuk belanja online', correct: false },
                            { text: 'Transaksi di ATM bank sendiri', correct: false }
                        ],
                        explanation: 'Fraud detection mengidentifikasi anomali: penyimpangan signifikan dari pola normal user dalam hal amount, location, timing, dan frequency.',
                        hint: 'Fokus pada penyimpangan dari kebiasaan normal: sudden change in behavior patterns.'
                    }
                ]
            },
            'abstraction': {
                title: 'Model Abstraksi dan Design Patterns',
                description: 'Membuat model abstrak untuk sistem kompleks',
                icon: 'filter',
                color: 'bg-green-500',
                questions: [
                    {
                        type: 'abstraction',
                        subtype: 'categorization',
                        question: 'Kategorikan komponen dalam arsitektur cloud computing',
                        context: 'Sebuah perusahaan akan migrate ke cloud architecture. Kategorikan komponen berikut berdasarkan service model.',
                        items: [
                            { id: 1, text: 'Virtual Machine instances', categoryId: 'iaas' },
                            { id: 2, text: 'Database as a Service', categoryId: 'paas' },
                            { id: 3, text: 'Gmail/Office 365', categoryId: 'saas' },
                            { id: 4, text: 'Storage buckets', categoryId: 'iaas' },
                            { id: 5, text: 'Container orchestration platform', categoryId: 'paas' },
                            { id: 6, text: 'CRM software online', categoryId: 'saas' },
                            { id: 7, text: 'Load balancers', categoryId: 'iaas' },
                            { id: 8, text: 'API Gateway', categoryId: 'paas' },
                            { id: 9, text: 'Video conferencing tools', categoryId: 'saas' },
                            { id: 10, text: 'Network firewalls', categoryId: 'iaas' }
                        ],
                        categories: [
                            { id: 'iaas', name: 'Infrastructure as a Service (IaaS)' },
                            { id: 'paas', name: 'Platform as a Service (PaaS)' },
                            { id: 'saas', name: 'Software as a Service (SaaS)' }
                        ],
                        explanation: 'Cloud service models: IaaS (infrastruktur virtual), PaaS (platform development), SaaS (aplikasi siap pakai). Masing-masing memiliki level abstraksi yang berbeda.',
                        hint: 'IaaS = hardware virtual, PaaS = platform development, SaaS = aplikasi jadi.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Dalam software architecture, manakah yang merupakan contoh terbaik dari abstraction layer?',
                        options: [
                            { text: 'API yang menyembunyikan kompleksitas implementasi database dari client', correct: true },
                            { text: 'Kode program yang ditulis tanpa komentar', correct: false },
                            { text: 'Database yang menyimpan semua data dalam satu tabel', correct: false },
                            { text: 'User interface yang menampilkan semua detail teknis', correct: false }
                        ],
                        explanation: 'API adalah abstraction layer yang menyembunyikan implementasi detail dan menyediakan interface yang sederhana untuk client berinteraksi dengan sistem.',
                        hint: 'Abstraction layer menyembunyikan kompleksitas dan menyediakan interface yang sederhana.'
                    },
                    {
                        type: 'abstraction',
                        subtype: 'information-filter',
                        question: 'Filter informasi untuk model abstrak sistem rekomendasi',
                        scenario: 'Anda merancang sistem rekomendasi produk untuk platform e-commerce dengan jutaan user dan produk.',
                        goal: 'sistem rekomendasi yang akurat dan scalable',
                        informationItems: [
                            { text: 'Purchase history dan rating user', relevant: true },
                            { text: 'Warna favorit user', relevant: false },
                            { text: 'Product categories dan attributes', relevant: true },
                            { text: 'Nama lengkap pembuat produk', relevant: false },
                            { text: 'User demographic data (age, location)', relevant: true },
                            { text: 'Serial number produk', relevant: false },
                            { text: 'Similar user behavior patterns', relevant: true },
                            { text: 'Waktu exact pembuatan akun user', relevant: false },
                            { text: 'Product popularity trends', relevant: true },
                            { text: 'IP address saat login', relevant: false },
                            { text: 'User session duration patterns', relevant: true }
                        ],
                        explanation: 'Sistem rekomendasi memerlukan data yang relevan untuk pattern matching: behavior user, karakteristik produk, demografi, similarity patterns, dan trends. Data teknis atau personal yang tidak relevan diabaikan.',
                        hint: 'Fokus pada data yang bisa digunakan untuk mengidentifikasi preferensi dan similarity patterns.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Dalam design pattern, apa keuntungan utama menggunakan Observer Pattern?',
                        options: [
                            { text: 'Loose coupling antara subject dan observer, memungkinkan dynamic subscription', correct: true },
                            { text: 'Membuat semua object saling bergantung erat', correct: false },
                            { text: 'Mengurangi jumlah class dalam sistem', correct: false },
                            { text: 'Membuat kode lebih sulit dipahami', correct: false }
                        ],
                        explanation: 'Observer Pattern memungkinkan loose coupling: subject tidak perlu tahu detail observer, dan observer bisa subscribe/unsubscribe secara dinamis.',
                        hint: 'Observer Pattern seperti sistem notification: publisher tidak perlu tahu siapa saja subscriber-nya.'
                    },
                    {
                        type: 'abstraction',
                        subtype: 'key-details',
                        question: 'Identifikasi requirement kunci untuk sistem blockchain',
                        text: 'Perusahaan fintech ingin mengembangkan sistem pembayaran digital menggunakan teknologi blockchain. Sistem harus mampu memproses 10,000 transaksi per detik dengan tingkat keamanan tinggi. Setiap transaksi harus immutable dan dapat diverifikasi secara public. Sistem harus energy-efficient dan comply dengan regulasi keuangan lokal. Network harus decentralized dengan minimal 100 validator nodes. Smart contract harus mendukung programmable money dan DeFi features. User interface harus mobile-friendly dan mendukung multiple currencies.',
                        sentences: [
                            { text: 'Perusahaan fintech ingin mengembangkan sistem pembayaran digital menggunakan teknologi blockchain.', isKey: true },
                            { text: 'Sistem harus mampu memproses 10,000 transaksi per detik dengan tingkat keamanan tinggi.', isKey: true },
                            { text: 'Setiap transaksi harus immutable dan dapat diverifikasi secara public.', isKey: true },
                            { text: 'Sistem harus energy-efficient dan comply dengan regulasi keuangan lokal.', isKey: true },
                            { text: 'Network harus decentralized dengan minimal 100 validator nodes.', isKey: false },
                            { text: 'Smart contract harus mendukung programmable money dan DeFi features.', isKey: false },
                            { text: 'User interface harus mobile-friendly dan mendukung multiple currencies.', isKey: false }
                        ],
                        explanation: 'Requirement kunci blockchain payment: purpose dan teknologi, performance requirement (TPS), security properties (immutable, verifiable), compliance dan efficiency. Detail teknis seperti jumlah nodes, fitur smart contract, dan UI adalah secondary requirements.',
                        hint: 'Fokus pada core requirements yang menentukan feasibility dan compliance, bukan pada implementation details.'
                    }
                ]
            },
            'algorithm': {
                title: 'Algoritma Lanjutan dan Optimasi',
                description: 'Merancang algoritma efisien untuk masalah kompleks',
                icon: 'git-branch',
                color: 'bg-purple-500',
                questions: [
                    {
                        type: 'multiple-choice',
                        question: 'Untuk pencarian dalam dataset besar yang sudah terurut, algoritma mana yang paling efisien?',
                        options: [
                            { text: 'Binary Search dengan time complexity O(log n)', correct: true },
                            { text: 'Linear Search dengan time complexity O(n)', correct: false },
                            { text: 'Bubble Sort untuk mencari sambil mengurutkan', correct: false },
                            { text: 'Random search tanpa strategi tertentu', correct: false }
                        ],
                        explanation: 'Binary Search optimal untuk data terurut karena membagi search space menjadi setengah setiap iterasi, menghasilkan kompleksitas logaritmik.',
                        hint: 'Untuk data terurut, manfaatkan ordering untuk mengeliminasi setengah kemungkinan setiap langkah.'
                    },
                    {
                        type: 'algorithm',
                        subtype: 'pseudocode',
                        question: 'Buat pseudocode untuk algoritma Quick Sort',
                        context: 'Implementasikan algoritma Quick Sort menggunakan divide-and-conquer approach.',
                        lines: [
                            { id: 1, text: 'FUNCTION quickSort(array, low, high)' },
                            { id: 2, text: 'IF low < high THEN' },
                            { id: 3, text: '    pivot = partition(array, low, high)' },
                            { id: 4, text: '    quickSort(array, low, pivot - 1)' },
                            { id: 5, text: '    quickSort(array, pivot + 1, high)' },
                            { id: 6, text: 'END IF' },
                            { id: 7, text: 'END FUNCTION' },
                            { id: 8, text: 'FUNCTION partition(array, low, high)' },
                            { id: 9, text: '    pivot = array[high]' },
                            { id: 10, text: '    i = low - 1' },
                            { id: 11, text: '    FOR j = low TO high - 1' },
                            { id: 12, text: '        IF array[j] <= pivot THEN' },
                            { id: 13, text: '            i = i + 1' },
                            { id: 14, text: '            SWAP array[i] WITH array[j]' },
                            { id: 15, text: '        END IF' },
                            { id: 16, text: '    END FOR' },
                            { id: 17, text: '    SWAP array[i + 1] WITH array[high]' },
                            { id: 18, text: '    RETURN i + 1' },
                            { id: 19, text: 'END FUNCTION' }
                        ],
                        correctSequence: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                        explanation: 'Quick Sort menggunakan divide-and-conquer: pilih pivot, partisi array berdasarkan pivot, rekursif sort kedua bagian.',
                        hint: 'Struktur: function utama (quickSort), function helper (partition), dengan recursive calls.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Dalam optimasi algoritma, trade-off antara time complexity dan space complexity disebut?',
                        options: [
                            { text: 'Space-Time Trade-off', correct: true },
                            { text: 'Memory Optimization', correct: false },
                            { text: 'Performance Tuning', correct: false },
                            { text: 'Code Refactoring', correct: false }
                        ],
                        explanation: 'Space-Time Trade-off adalah konsep dimana kita bisa mengurangi waktu eksekusi dengan menggunakan lebih banyak memory, atau sebaliknya.',
                        hint: 'Contoh: memoization menggunakan lebih banyak memory untuk mengurangi waktu komputasi.'
                    },
                    {
                        type: 'algorithm',
                        subtype: 'flowchart',
                        question: 'Buat flowchart untuk algoritma Dijkstra (shortest path)',
                        context: 'Algoritma untuk mencari jalur terpendek dari satu node ke semua node lain dalam graph berbobot.',
                        components: [
                            { id: 1, text: 'Mulai', type: 'start' },
                            { id: 2, text: 'Initialize distances dan priority queue', type: 'process' },
                            { id: 3, text: 'Set distance[start] = 0', type: 'process' },
                            { id: 4, text: 'Priority queue empty?', type: 'decision' },
                            { id: 5, text: 'Extract min distance node', type: 'process' },
                            { id: 6, text: 'For each neighbor', type: 'process' },
                            { id: 7, text: 'Calculate new distance', type: 'process' },
                            { id: 8, text: 'New distance < current?', type: 'decision' },
                            { id: 9, text: 'Update distance dan add to queue', type: 'process' },
                            { id: 10, text: 'Output shortest paths', type: 'output' },
                            { id: 11, text: 'Selesai', type: 'end' }
                        ],
                        correctSequence: [1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 10, 11],
                        explanation: 'Dijkstra algorithm: inisialisasi distances, loop ekstrak node dengan distance minimum, update distance ke neighbors jika ditemukan path yang lebih pendek.',
                        hint: 'Greedy algorithm: selalu pilih node dengan distance terkecil yang belum diproses.'
                    },
                    {
                        type: 'multiple-choice',
                        question: 'Untuk masalah optimasi kombinatorial dengan constraint complex, pendekatan algoritma apa yang cocok?',
                        options: [
                            { text: 'Dynamic Programming atau Constraint Satisfaction Problem (CSP)', correct: true },
                            { text: 'Simple greedy algorithm tanpa backtracking', correct: false },
                            { text: 'Linear search dengan brute force', correct: false },
                            { text: 'Random guessing', correct: false }
                        ],
                        explanation: 'Masalah optimasi dengan constraint kompleks memerlukan pendekatan sistematis seperti DP (untuk optimal substructure) atau CSP (untuk constraint satisfaction).',
                        hint: 'Masalah kompleks memerlukan teknik advanced: DP, backtracking, CSP, atau heuristic algorithms.'
                    }
                ]
            }
        }
    }
};
