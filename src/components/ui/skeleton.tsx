import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-zinc-100", className)}
      {...props}
    />
  );
}

export function RepoSkeleton() {
  return (
    <li className="bg-white border border-zinc-200 rounded-xl p-4 space-y-2.5">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-2/3" />
      <div className="flex gap-4 pt-1">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-10" />
        <Skeleton className="h-3 w-10" />
      </div>
    </li>
  );
}

export function UserProfileSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-zinc-200 rounded-xl">
      <Skeleton className="w-14 h-14 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );
}

export { Skeleton };
