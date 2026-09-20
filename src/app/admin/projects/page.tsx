import { requireAdminSession } from "@/lib/auth";
import { getProjects } from "@/lib/queries";
import ProjectsManager from "@/components/admin/ProjectsManager";

export default async function AdminProjectsPage() {
  await requireAdminSession();
  const projects = await getProjects({ publishedOnly: false });
  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Projects</h1>
      <p className="mt-1 text-sm text-muted">Add, edit, reorder, and publish or hide projects.</p>
      <div className="mt-8">
        <ProjectsManager projects={projects} />
      </div>
    </div>
  );
}
