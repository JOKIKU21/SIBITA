import { Sidebar } from "@/components/dashboard/Sidebar";
import { PembayaranManager } from "@/components/dashboard/admin-dummy/PembayaranManager";

export default function DummyPembayaranPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#F5F8FF]">
      <Sidebar roleOverride="admin" isDummy={true} />
      <div className="flex-1 min-w-0 max-[600px]:w-full p-7 max-[600px]:p-4">
        <PembayaranManager />
      </div>
    </div>
  );
}
