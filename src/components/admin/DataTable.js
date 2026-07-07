"use client";

import { useState, useMemo } from "react";
import ConfirmModal from "./ConfirmModal";

export default function DataTable({
  columns,
  rows,
  onDelete,
  onBulkDelete,
  searchPlaceholder = "Search…",
  emptyMessage = "No records found.",
  title,
  subtitle,
  action,
}) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const PER_PAGE = 10;

  const filtered = useMemo(() => {
    let result = rows;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        columns.some((col) =>
          String(row[col.key] ?? "").toLowerCase().includes(q),
        ),
      );
    }

    if (sortKey) {
      result = [...result].sort((a, b) => {
        const av = String(a[sortKey] ?? "");
        const bv = String(b[sortKey] ?? "");
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    }

    return result;
  }, [rows, search, sortKey, sortDir, columns]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  function toggleSelect(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  function toggleAll() {
    const pageIds = paginated.map((r) => r.id);
    const allSelected = pageIds.every((id) => selected.includes(id));

    if (allSelected) {
      setSelected((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelected((prev) => [...new Set([...prev, ...pageIds])]);
    }
  }

  async function handleConfirmedDelete() {
    if (!confirmDelete) return;

    if (confirmDelete.type === "single" && onDelete) {
      await onDelete(confirmDelete.id);
      setSelected((prev) => prev.filter((id) => id !== confirmDelete.id));
    } else if (confirmDelete.type === "bulk" && onBulkDelete) {
      await onBulkDelete(selected);
      setSelected([]);
    }

    setConfirmDelete(null);
  }

  return (
    <>
      <ConfirmModal
        open={!!confirmDelete}
        title={
          confirmDelete?.type === "bulk"
            ? `Delete ${selected.length} records?`
            : "Delete record?"
        }
        message={
          confirmDelete?.type === "bulk"
            ? `This will permanently delete ${selected.length} selected record(s). This cannot be undone.`
            : "This will permanently delete this record. This cannot be undone."
        }
        onConfirm={handleConfirmedDelete}
        onCancel={() => setConfirmDelete(null)}
      />

      <div className="space-y-4">
        {/* Header row: title (left) + search + action (right) */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {title && (
            <div className="shrink-0">
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>
              {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 ml-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={searchPlaceholder}
              className="min-w-[200px] rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />

            {action && action}

            {selected.length > 0 && onBulkDelete && (
                <button
                  onClick={() => setConfirmDelete({ type: "bulk" })}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete {selected.length}
                </button>
              )}
          </div>
        </div>

        {/* Table — always visible */}
        <div className="rounded-2xl border border-slate-100 shadow-sm w-full overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                {(onDelete || onBulkDelete) && (
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={
                        paginated.length > 0 &&
                        paginated.every((r) => selected.includes(r.id))
                      }
                      onChange={toggleAll}
                      className="rounded border-slate-300"
                    />
                  </th>
                )}

                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() =>
                      col.sortable !== false && toggleSort(col.key)
                    }
                    className={`px-4 py-3 text-left font-semibold text-slate-600 whitespace-nowrap ${
                      col.sortable !== false
                        ? "cursor-pointer select-none hover:text-slate-900"
                        : ""
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      {sortKey === col.key && (
                        <svg
                          className="w-3.5 h-3.5 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d={
                              sortDir === "asc"
                                ? "M5 15l7-7 7 7"
                                : "M19 9l-7 7-7-7"
                            }
                          />
                        </svg>
                      )}
                    </span>
                  </th>
                ))}

                {onDelete && (
                  <th className="px-4 py-3 text-right font-semibold text-slate-600">
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50 bg-white">
              {paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 2}
                    className="px-4 py-16 text-center text-slate-400 text-sm"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginated.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    {(onDelete || onBulkDelete) && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selected.includes(row.id)}
                          onChange={() => toggleSelect(row.id)}
                          className="rounded border-slate-300"
                        />
                      </td>
                    )}

                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-4 py-3 text-slate-700 max-w-[220px] truncate"
                      >
                        {col.render
                          ? col.render(row[col.key], row)
                          : (row[col.key] ?? "—")}
                      </td>
                    ))}

                    {onDelete && (
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() =>
                            setConfirmDelete({ type: "single", id: row.id })
                          }
                          className="rounded-lg p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          aria-label="Delete"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>



        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg px-3 py-1.5 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                ← Prev
              </button>

              <span className="px-3 py-1.5 font-semibold">
                {page} / {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg px-3 py-1.5 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
