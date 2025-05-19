"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Card3d } from "./3d-card"

type SortDirection = "asc" | "desc" | null

interface Column<T> {
  header: string
  accessorKey: keyof T
  cell?: (item: T) => React.ReactNode
  sortable?: boolean
}

interface ResponsiveTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (item: T) => void
  className?: string
}

export function ResponsiveTable<T>({ data, columns, onRowClick, className }: ResponsiveTableProps<T>) {
  const isMobile = useIsMobile()
  const [sortColumn, setSortColumn] = React.useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortDirection(null)
        setSortColumn(null)
      } else {
        setSortDirection("asc")
      }
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      if (aValue === bValue) return 0

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : 1
      } else {
        return aValue > bValue ? -1 : 1
      }
    })
  }, [data, sortColumn, sortDirection])

  const getSortIcon = (column: keyof T) => {
    if (sortColumn !== column) return <ChevronsUpDown className="h-4 w-4 ml-1 opacity-50" />
    if (sortDirection === "asc") return <ChevronUp className="h-4 w-4 ml-1" />
    if (sortDirection === "desc") return <ChevronDown className="h-4 w-4 ml-1" />
    return <ChevronsUpDown className="h-4 w-4 ml-1 opacity-50" />
  }

  if (isMobile) {
    return (
      <div className={cn("space-y-4", className)}>
        {sortedData.map((item, index) => (
          <Card3d
            key={index}
            className={cn("p-4", onRowClick && "cursor-pointer hover:bg-medical-50")}
            onClick={() => onRowClick && onRowClick(item)}
          >
            <div className="space-y-2">
              {columns.map((column) => (
                <div key={String(column.accessorKey)} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-medical-600">{column.header}</span>
                  <span className="text-sm text-medical-900">
                    {column.cell ? column.cell(item) : String(item[column.accessorKey] || "")}
                  </span>
                </div>
              ))}
            </div>
          </Card3d>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("w-full overflow-auto", className)}>
      <table className="w-full caption-bottom text-sm">
        <thead className="border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            {columns.map((column) => (
              <th
                key={String(column.accessorKey)}
                className={cn(
                  "h-12 px-4 text-left align-middle font-medium text-medical-500",
                  column.sortable && "cursor-pointer select-none",
                )}
                onClick={() => column.sortable && handleSort(column.accessorKey)}
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && getSortIcon(column.accessorKey)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={index}
              className={cn(
                "border-b transition-colors hover:bg-medical-50/50 data-[state=selected]:bg-muted",
                onRowClick && "cursor-pointer",
              )}
              onClick={() => onRowClick && onRowClick(item)}
            >
              {columns.map((column) => (
                <td key={String(column.accessorKey)} className="p-4 align-middle">
                  {column.cell ? column.cell(item) : String(item[column.accessorKey] || "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
