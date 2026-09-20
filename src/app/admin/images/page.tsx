import { requireAdminSession } from "@/lib/auth";
import { getImages } from "@/lib/queries";
import ImagesManager from "@/components/admin/ImagesManager";

export default async function AdminImagesPage() {
  await requireAdminSession();
  const images = await getImages();
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Image Library</h1>
      <p className="mt-1 text-sm text-muted">Upload once, then assign the image's URL wherever you need it (profile, projects, certificates).</p>
      <div className="mt-8">
        <ImagesManager images={images} />
      </div>
    </div>
  );
}
