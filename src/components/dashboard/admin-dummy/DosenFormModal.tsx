import Link from 'next/link';

interface DosenFormModalProps {
  title?: string;
  isEdit?: boolean;
}

export function DosenFormModal({ title = "Tambah Dosen", isEdit = false }: DosenFormModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-extrabold text-gray-900 font-display">{title}</h2>
          <Link href="?" className="text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100 p-2">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-x-6 gap-y-5 max-[600px]:grid-cols-1">
            
            {/* Nama Dosen */}
            <div>
              <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                Nama Dosen <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Masukkan nama lengkap dosen" 
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-shadow bg-gray-50/50 hover:bg-white"
              />
            </div>

            {/* NIDN */}
            <div>
              <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                NIDN <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Masukkan NIDN (10 digit)" 
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-shadow bg-gray-50/50 hover:bg-white"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                placeholder="Masukkan email dosen" 
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-shadow bg-gray-50/50 hover:bg-white"
              />
            </div>

            {/* No. HP */}
            <div>
              <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                No. HP <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                placeholder="Masukkan nomor HP" 
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-shadow bg-gray-50/50 hover:bg-white"
              />
            </div>

            {/* Program Studi */}
            <div className="col-span-2 max-[600px]:col-span-1">
              <label className="block text-[13px] font-bold text-gray-900 mb-1.5">
                Program Studi yang akan dibimbing <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select className="w-full appearance-none px-4 py-2.5 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-shadow bg-gray-50/50 hover:bg-white font-medium text-gray-600" defaultValue="">
                  <option value="" disabled>Pilih program studi</option>
                  <option>Sistem Informasi</option>
                  <option>Teknik Informatika</option>
                </select>
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Bidang Keahlian */}
            <div className="col-span-2 max-[600px]:col-span-1">
              <div className="mb-2">
                <label className="block text-[13px] font-bold text-gray-900 mb-0.5">Bidang Keahlian</label>
                <p className="text-[11px] text-gray-500">Pilih satu atau lebih bidang keahlian dosen</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-5 bg-gray-50/30">
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 max-[600px]:grid-cols-1">
                  {[
                    "Sistem Informasi",
                    "Manajemen Informatika",
                    "Teknik Informatika",
                    "Ilmu Komputer",
                    "Teknologi Informasi",
                    "Lainnya"
                  ].map((bidang, i) => (
                    <label key={i} className="flex items-center gap-2.5 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" className="peer appearance-none w-4.5 h-4.5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-600/20 checked:border-blue-600 checked:bg-blue-600 transition-colors cursor-pointer" />
                        <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-white absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-[13px] text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{bidang}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="col-span-2 max-[600px]:col-span-1">
              <label className="block text-[13px] font-bold text-gray-900 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
                {/* Aktif Option (Mocked as Selected) */}
                <label className="relative flex items-start p-4 border rounded-xl cursor-pointer transition-all border-green-200 bg-green-50/50 hover:bg-green-50">
                  <input type="radio" name="status" defaultChecked className="peer sr-only" />
                  <div className="w-5 h-5 rounded-full border-2 border-green-600 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-600"></div>
                  </div>
                  <div className="ml-3">
                    <div className="text-[13px] font-bold text-gray-900 mb-0.5">Aktif</div>
                    <div className="text-[11px] text-gray-500 leading-relaxed">Dosen dapat membimbing mahasiswa</div>
                  </div>
                </label>

                {/* Nonaktif Option */}
                <label className="relative flex items-start p-4 border rounded-xl cursor-pointer transition-all border-red-100 bg-red-50/30 hover:bg-red-50/50">
                  <input type="radio" name="status" className="peer sr-only" />
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center shrink-0 mt-0.5 peer-checked:border-red-500">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="ml-3">
                    <div className="text-[13px] font-bold text-gray-900 mb-0.5">Nonaktif</div>
                    <div className="text-[11px] text-gray-500 leading-relaxed">Dosen tidak dapat membimbing mahasiswa</div>
                  </div>
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50/50">
          <Link href="?" className="px-5 py-2.5 rounded-lg text-[13px] font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
            Batal
          </Link>
          <button className="px-5 py-2.5 rounded-lg text-[13px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
            Simpan
          </button>
        </div>

      </div>
    </div>
  );
}
