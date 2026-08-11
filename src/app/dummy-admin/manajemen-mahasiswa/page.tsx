import { Sidebar } from "@/components/dashboard/Sidebar";
import { ManajemenMahasiswaList } from "@/components/dashboard/admin-dummy/ManajemenMahasiswaList";

export default function DummyManajemenMahasiswaPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#F5F8FF]">
      <Sidebar roleOverride="admin" isDummy={true} />
      <div className="flex-1 min-w-0 max-[600px]:w-full p-7 max-[600px]:p-4">
        {/* Header content moved into ManajemenMahasiswaList for layout consistency */}
        <ManajemenMahasiswaList />
      </div>
    </div>
  );
}
