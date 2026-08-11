import { Sidebar } from "@/components/dashboard/Sidebar";
import { ManajemenDosenTabs } from "@/components/dashboard/admin-dummy/ManajemenDosenTabs";
import { DosenFormModal } from "@/components/dashboard/admin-dummy/DosenFormModal";

export default async function DummyManajemenDosenPage({ searchParams }: { searchParams: Promise<any> }) {
  const resolvedSearchParams = await searchParams;
  const showModal = resolvedSearchParams?.modal === 'tambah' || resolvedSearchParams?.modal === 'edit';
  
  return (
    <div className="flex min-h-screen w-full bg-[#F5F8FF]">
      <Sidebar roleOverride="admin" isDummy={true} />
      <div className="flex-1 min-w-0 max-[600px]:w-full p-7 max-[600px]:p-4">
        {/* Header content moved into ManajemenDosenTabs for flex layout with Button */}
        <ManajemenDosenTabs />
      </div>
      
      {/* Conditionally render the Server Component Modal based on URL query */}
      {showModal && (
        <DosenFormModal title={resolvedSearchParams.modal === 'edit' ? "Edit Dosen" : "Tambah Dosen"} isEdit={resolvedSearchParams.modal === 'edit'} />
      )}
    </div>
  );
}
