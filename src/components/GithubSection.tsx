import { Github, Star, GitFork } from "lucide-react";

async function fetchRepo(username: string, repo: string) {
  try {
    const res = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function GithubSection({ username }: { username: string }) {
  const repo = await fetchRepo(username, "hope-reach-ai");

  return (
    <section className="rule">
      <div className="container-page py-20">
        <h2 className="font-display text-3xl text-ink">Code, Experiments &amp; Projects</h2>
        <p className="mt-3 max-w-prose text-muted">
          Everything I build lives on GitHub — follow along or check out the source.
        </p>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-lg border border-line bg-surface p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Github size={22} className="text-ink" />
            <div>
              <p className="font-medium text-ink">@{username}</p>
              {repo ? (
                <p className="text-sm text-muted">Featured repository: {repo.name}</p>
              ) : (
                <p className="text-sm text-muted">Featured repository: hope-reach-ai</p>
              )}
            </div>
          </div>

          {repo && (
            <div className="flex items-center gap-5 font-mono text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Star size={14} /> {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1.5">
                <GitFork size={14} /> {repo.forks_count}
              </span>
            </div>
          )}

          <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="btn-secondary">
            View GitHub Profile
          </a>
        </div>
        {!repo && (
          <p className="mt-3 font-mono text-xs text-muted">
            Live repository stats will appear here automatically once the repository is public.
          </p>
        )}
      </div>
    </section>
  );
}
