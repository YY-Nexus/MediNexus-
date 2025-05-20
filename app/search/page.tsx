import { Suspense } from "react"
import { SearchResults } from "@/components/search/search-results"
import { SearchSkeleton } from "@/components/search/search-skeleton"
import { PageHeader } from "@/components/page-header"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; type?: string; sort?: string }
}) {
  const query = searchParams.q || ""
  const type = searchParams.type || "all"
  const sort = searchParams.sort || "relevance"

  return (
    <div className="container py-6 space-y-6">
      <PageHeader title="搜索结果" description={query ? `"${query}" 的搜索结果` : "请输入搜索关键词"} />

      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults query={query} type={type} sort={sort} />
      </Suspense>
    </div>
  )
}
