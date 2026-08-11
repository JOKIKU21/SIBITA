// ponytail: Server Component — lightweight static SVG charts (YAGNI on charting libraries for now)
import React from 'react';

export function AdminCharts() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6 max-[1100px]:grid-cols-1">
      
      {/* Line Chart Section */}
      <div className="col-span-2 bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col">
        <h3 className="font-bold text-gray-900 mb-4 text-sm">Statistik Bimbingan</h3>
        <div className="flex gap-6 mb-4 text-xs font-medium justify-center">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-600"></div>Bimbingan Berjalan</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div>Bimbingan Selesai</div>
        </div>
        
        {/* Simple SVG Line Chart with Horizontal Scroll */}
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
          <div className="relative h-[200px] min-w-[600px] text-xs text-gray-400 font-medium">
            {/* Y Axis */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between items-end w-4 pb-2 sticky left-0 bg-white z-10 pr-1">
              <span>3</span>
              <span>2.5</span>
              <span>2</span>
              <span>1.5</span>
              <span>1</span>
              <span>0.5</span>
              <span>0</span>
            </div>
            
            <div className="absolute left-8 right-0 top-2 bottom-8 border-b border-l border-gray-100">
              {/* Grid lines */}
              <div className="absolute left-0 right-0 top-0 border-t border-gray-100 w-full h-[16.6%]"></div>
              <div className="absolute left-0 right-0 top-[16.6%] border-t border-gray-100 w-full h-[16.6%]"></div>
              <div className="absolute left-0 right-0 top-[33.3%] border-t border-gray-100 w-full h-[16.6%]"></div>
              <div className="absolute left-0 right-0 top-[50%] border-t border-gray-100 w-full h-[16.6%]"></div>
              <div className="absolute left-0 right-0 top-[66.6%] border-t border-gray-100 w-full h-[16.6%]"></div>
              <div className="absolute left-0 right-0 top-[83.3%] border-t border-gray-100 w-full h-[16.6%]"></div>
              
              {/* Selesai Line (Green) - Smooth Curves */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M 0 100 C 8 100, 8 100, 16.6 100 C 25 100, 25 100, 33.3 100 C 41 100, 41 100, 50 100 C 58 100, 58 100, 66.6 100 C 75 100, 75 100, 83.3 100 C 91 100, 91 66.6, 100 66.6" fill="none" stroke="#22c55e" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 0 100 C 8 100, 8 100, 16.6 100 C 25 100, 25 100, 33.3 100 C 41 100, 41 100, 50 100 C 58 100, 58 100, 66.6 100 C 75 100, 75 100, 83.3 100 C 91 100, 91 66.6, 100 66.6 L 100 100 Z" fill="rgba(34, 197, 94, 0.08)" stroke="none" vectorEffect="non-scaling-stroke" />
                <circle cx="100" cy="66.6" r="3.5" fill="#fff" stroke="#22c55e" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                {/* Dots on the bottom line are optional, but we add them for consistency */}
                <circle cx="83.3" cy="100" r="3.5" fill="#fff" stroke="#22c55e" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                <circle cx="66.6" cy="100" r="3.5" fill="#fff" stroke="#22c55e" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
              </svg>
              
              {/* Berjalan Line (Blue) - Smooth Curves */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M 0 100 C 8 100, 8 100, 16.6 100 C 25 100, 25 90, 33.3 90 C 41 90, 41 50, 50 50 C 58 50, 58 33.3, 66.6 33.3 C 75 33.3, 75 33.3, 83.3 33.3 C 91 33.3, 91 33.3, 100 33.3" fill="none" stroke="#2563eb" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 0 100 C 8 100, 8 100, 16.6 100 C 25 100, 25 90, 33.3 90 C 41 90, 41 50, 50 50 C 58 50, 58 33.3, 66.6 33.3 C 75 33.3, 75 33.3, 83.3 33.3 C 91 33.3, 91 33.3, 100 33.3 L 100 100 Z" fill="rgba(37, 99, 235, 0.08)" stroke="none" vectorEffect="non-scaling-stroke" />
                <circle cx="16.6" cy="100" r="3.5" fill="#fff" stroke="#2563eb" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                <circle cx="33.3" cy="90" r="3.5" fill="#fff" stroke="#2563eb" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                <circle cx="50" cy="50" r="3.5" fill="#fff" stroke="#2563eb" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                <circle cx="66.6" cy="33.3" r="3.5" fill="#fff" stroke="#2563eb" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                <circle cx="83.3" cy="33.3" r="3.5" fill="#fff" stroke="#2563eb" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                <circle cx="100" cy="33.3" r="3.5" fill="#fff" stroke="#2563eb" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
              </svg>
            </div>
            
            {/* X Axis labels */}
            <div className="absolute left-8 right-0 bottom-1 flex justify-between pt-2">
              <span>20 Mei</span>
              <span>21 Mei</span>
              <span>22 Mei</span>
              <span>23 Mei</span>
              <span>24 Mei</span>
              <span>25 Mei</span>
              <span>26 Mei</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-auto pt-6">
          <div className="flex-1 bg-blue-50/50 rounded-lg p-3 flex justify-between items-center border border-blue-100/50">
            <div>
              <div className="text-[11px] font-medium text-gray-500">Total Bimbingan Minggu Ini</div>
              <div className="text-xl font-bold text-blue-600 mt-0.5">2</div>
            </div>
            <div className="w-8 h-8 rounded bg-white text-blue-600 flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="flex-1 bg-green-50/50 rounded-lg p-3 flex justify-between items-center border border-green-100/50">
            <div>
              <div className="text-[11px] font-medium text-gray-500">Bimbingan Selesai</div>
              <div className="text-xl font-bold text-green-600 mt-0.5">1</div>
            </div>
            <div className="w-8 h-8 rounded bg-white text-green-600 flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Donut Chart Section */}
      <div className="col-span-1 bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col">
        <h3 className="font-bold text-gray-900 mb-6 text-sm">Progres Bimbingan</h3>
        
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              {/* Selesai (Green) - 33.3% */}
              <circle cx="18" cy="18" r="14" fill="none" className="stroke-green-500" strokeWidth="6" strokeDasharray="33.3 100" />
              {/* Berjalan (Blue) - 66.7% */}
              <circle cx="18" cy="18" r="14" fill="none" className="stroke-blue-600" strokeWidth="6" strokeDasharray="66.7 100" strokeDashoffset="-33.3" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-[11px] text-gray-500 font-medium">Total</div>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
              <span className="font-medium text-gray-700">Bimbingan Berjalan</span>
            </div>
            <div className="font-bold text-gray-900">2 (66.7%)</div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <span className="font-medium text-gray-700">Bimbingan Selesai</span>
            </div>
            <div className="font-bold text-gray-900">1 (33.3%)</div>
          </div>
        </div>

        <div className="mt-auto bg-blue-50/30 border border-blue-100/50 rounded-lg p-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="text-[11px] text-gray-500 font-medium">Total Bimbingan</div>
              <div className="text-sm font-bold text-gray-900">3</div>
            </div>
          </div>
          <div className="text-[10px] text-gray-400 font-medium px-2 py-1 bg-gray-100 rounded">Semua waktu</div>
        </div>

      </div>
    </div>
  );
}
