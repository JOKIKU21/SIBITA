import { Sidebar } from "@/components/dashboard/Sidebar";
import { RegistrasiMahasiswaList } from "@/components/dashboard/admin-dummy/RegistrasiMahasiswaList";

export default function DummyRegistrasiPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#F5F8FF]">
      <Sidebar roleOverride="admin" isDummy={true} />
      <div className="flex-1 min-w-0 max-[600px]:w-full p-7 max-[600px]:p-4">
        <RegistrasiMahasiswaList />
      </div>
    </div>
  );
}
