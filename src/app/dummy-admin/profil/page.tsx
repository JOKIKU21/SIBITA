import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DummyProfilPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#F5F8FF]">
      <Sidebar roleOverride="admin" isDummy={true} />
      <div className="flex-1 min-w-0 max-[600px]:w-full p-7 max-[600px]:p-4">
        <div className="mb-6">
          <h2 className="font-display text-5.5 font-extrabold mb-1">Profil & Akun (Dummy)</h2>
          <p className="text-3.5 text-neutral-muted">Halaman ini belum diimplementasikan di versi dummy.</p>
        </div>
      </div>
    </div>
  );
}
