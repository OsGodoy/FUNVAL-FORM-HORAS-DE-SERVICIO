import { useEffect, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import * as XLSX from "xlsx";
import * as Icons from "lucide-react";
import toast from "react-hot-toast";

export default function DataTable({
  headers = [],
  data = [],
  pageSize: initialPageSize = 10,
  exportable = false,
  exportFileName = "data_export",
}) {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (!Array.isArray(data)) return;

        const filtered = search
          ? data.filter((item) => deepSearch(item, search))
          : data;

        setTotal(filtered.length);
        const start = (page - 1) * pageSize;
        setRows(filtered.slice(start, start + pageSize));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [data, page, search, pageSize]);

  function deepSearch(obj, searchTerm) {
    const term = searchTerm.toLowerCase();
    function search(value) {
      if (value == null) return false;
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        return String(value).toLowerCase().includes(term);
      }
      if (Array.isArray(value)) return value.some((item) => search(item));
      if (typeof value === "object")
        return Object.values(value).some((val) => search(val));
      return false;
    }
    return search(obj);
  }

  const totalPages = Math.ceil(total / pageSize);

  const handleExportExcel = () => {
    if (data.length === 0) {
      toast.error("No hay datos para exportar");
      return;
    }

    const exportableHeaders = headers.filter((h) => h.key !== "actions");
    const now = new Date();
    const date = now.toLocaleDateString("es-CO").replace(/\//g, "-");
    const time = now.toLocaleTimeString("es-CO").replace(/:/g, "-");
    const fileName = `${exportFileName}_${date}_${time}.xlsx`;

    const exportData = data.map((row) => {
      const formattedRow = {};
      exportableHeaders.forEach((h) => {
        formattedRow[h.label] = row[h.key];
      });
      return formattedRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    XLSX.writeFile(workbook, fileName);

    toast.success("Archivo exportado correctamente");
  };

  const getAlingTextClass = (aling) => {
    switch (aling) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const getActionCellClass = (align) => {
    let justify = "justify-start";
    if (align === "center") justify = "justify-center";
    if (align === "right") justify = "justify-end";
    return `items-center ${justify}`;
  };

  const getCellValue = (row, header) => {
    if (header.icon) {
      const IconComponent = Icons[row[header.key]] || Icons.Circle;
      return (
        <div className="flex justify-center items-center">
          <IconComponent size={18} className="text-gray-600" />
        </div>
      );
    }
    if (header.render) return header.render(row);
    return header.key.split(".").reduce((acc, key) => acc?.[key], row);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-5 border border-gray-200 transition-all duration-300">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Mostrar</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="border border-gray-300 bg-gray-50 rounded-lg px-2 py-1 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>registros</span>
          </div>

          {exportable && (
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
              title="Exportar a Excel"
            >
              <FileSpreadsheet size={18} />
              Exportar
            </button>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-300"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-blue-100/70 text-gray-700 uppercase text-xs font-semibold border-b border-gray-200">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.key}
                  className={`px-4 py-3 ${getAlingTextClass(
                    header.aling
                  )} text-gray-600`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-6 text-gray-400"
                >
                  Cargando...
                </td>
              </tr>
            ) : rows.length > 0 ? (
              rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 hover:bg-gray-200/50 transition-colors"
                >
                  {headers.map((header) => (
                    <td
                      key={header.key}
                      className={`px-4 py-3 ${header.render
                          ? getActionCellClass(header.aling)
                          : getAlingTextClass(header.aling)
                        }`}
                    >
                      {getCellValue(row, header)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-6 text-gray-400"
                >
                  No hay resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-5 text-sm text-gray-600">
        <p>
          Página <span className="font-medium">{page}</span> de{" "}
          {totalPages || 1}
        </p>

        <div className="flex gap-1 items-center">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-blue-100 disabled:opacity-40 transition"
            title="Primera página"
          >
            <ChevronsLeft size={18} />
          </button>

          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-blue-100 disabled:opacity-40 transition"
            title="Anterior"
          >
            <ChevronLeft size={18} />
          </button>

          {(() => {
            const visibleButtons = 3;
            let start = Math.max(1, page - 1);
            let end = Math.min(totalPages, start + visibleButtons - 1);
            if (end - start + 1 < visibleButtons)
              start = Math.max(1, end - visibleButtons + 1);
            const pagesToShow = [];
            for (let i = start; i <= end; i++) pagesToShow.push(i);
            return pagesToShow.map((pNum) => (
              <button
                key={pNum}
                onClick={() => setPage(pNum)}
                className={`px-3 py-1 rounded-lg border text-sm font-medium transition-all ${page === pNum
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 hover:bg-blue-100 text-gray-700"
                  }`}
              >
                {pNum}
              </button>
            ));
          })()}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-blue-100 disabled:opacity-40 transition"
            title="Siguiente"
          >
            <ChevronRight size={18} />
          </button>

          <button
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-blue-100 disabled:opacity-40 transition"
            title="Última página"
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
