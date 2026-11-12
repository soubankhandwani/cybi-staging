import Link from "next/link";
import { BookOpenCheck, FilePenLine, FilePlus2, Files } from "lucide-react";
import { BlogActions } from "@/components/admin/BlogActions";
import { requireAdmin } from "@/lib/server/auth";
import { listAdminBlogs } from "@/lib/server/blogs";

const formatUpdated = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

export default async function AdminDashboardPage() {
  await requireAdmin();
  const blogs = await listAdminBlogs();
  const published = blogs.filter((blog) => blog.status === "published").length;
  const totals = [
    { label: "Total", value: blogs.length, icon: Files, color: "text-command-blue bg-blue-50" },
    { label: "Published", value: published, icon: BookOpenCheck, color: "text-emerald-700 bg-emerald-50" },
    { label: "Drafts", value: blogs.length - published, icon: FilePenLine, color: "text-amber-700 bg-amber-50" },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="admin-eyebrow">Publishing overview</p>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-600">Create, review, and publish website insights.</p>
        </div>
        <Link href="/admin/blogs/new" className="flex items-center justify-center gap-2 bg-command-blue px-5 py-3 text-sm font-bold text-white hover:bg-deep-navy">
          <FilePlus2 className="h-4 w-4" aria-hidden="true" />Add new blog
        </Link>
      </div>

      <dl className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
        {totals.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="flex flex-col-reverse border border-slate-200 bg-white p-2.5 sm:p-5">
            <dt className="mt-1 text-[10px] font-bold tracking-wide text-slate-600 uppercase sm:text-xs">{label}</dt>
            <dd className="flex items-center gap-2 text-xl font-bold sm:text-3xl">
              <span className={"hidden h-10 w-10 place-items-center sm:grid " + color}><Icon className="h-5 w-5" aria-hidden="true" /></span>
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <section className="mt-8 border border-slate-200 bg-white" aria-labelledby="admin-blog-list-title">
        <div className="border-b border-slate-200 px-4 py-4 sm:px-6">
          <h2 id="admin-blog-list-title" className="font-bold">All blogs</h2>
          <p className="mt-1 text-xs text-slate-600">Most recently updated first</p>
        </div>
        {blogs.length === 0 ? (
          <div className="grid min-h-72 place-items-center p-8 text-center">
            <div>
              <FilePenLine className="mx-auto h-9 w-9 text-slate-300" aria-hidden="true" />
              <h3 className="mt-4 font-bold">No blogs yet</h3>
              <p className="mt-2 text-sm text-slate-600">Create your first article and save it as a draft or publish it.</p>
              <Link href="/admin/blogs/new" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-command-blue hover:underline">
                <FilePlus2 className="h-4 w-4" aria-hidden="true" />Create first blog
              </Link>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {blogs.map((blog) => (
              <li key={blog.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-3 px-4 py-4 hover:bg-slate-50/60 sm:gap-x-4 sm:px-6 xl:grid-cols-[minmax(0,1fr)_7rem_12rem_auto]">
                <div className="col-span-2 min-w-0 xl:col-span-1">
                  <Link href={"/admin/blogs/" + blog.id + "/edit"} className="font-bold [overflow-wrap:anywhere] hover:text-command-blue">{blog.title}</Link>
                  <p className="mt-1 truncate text-xs text-slate-600">/{blog.slug}</p>
                </div>
                <div className="flex min-w-0 flex-wrap items-center gap-2 xl:contents">
                  <span className={"w-fit px-2 py-1 text-[10px] font-bold tracking-wider uppercase " + (blog.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")}>{blog.status}</span>
                  <time dateTime={blog.updatedAt.toISOString()} className="text-xs text-slate-600">{formatUpdated.format(blog.updatedAt)}</time>
                </div>
                <BlogActions id={blog.id} title={blog.title} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}