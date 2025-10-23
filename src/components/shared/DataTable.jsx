import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight, FileSpreadsheet, ChevronsLeft, ChevronsRight } from "lucide-react";
import * as XLSX from "xlsx";
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
        const filtered = data.filter((item) =>
          Object.values(item).some((val) =>
            val?.toString().toLowerCase().includes(search.toLowerCase())
          )
        );
        setTotal(filtered.length);
        const start = (page - 1) * pageSize;
        setRows(filtered.slice(start, start + pageSize));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [data, page, search, pageSize]);

  const totalPages = Math.ceil(total / pageSize);

  const handleExportExcel = () => {
    if (data.length === 0) {
      toast.console.warn("No hay datos para exportar");
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
      case 'center': return 'text-center';
      case 'right': return 'text-right';
      default: return 'text-left';
    }
  };

  const getActionCellClass = (align) => {
    let justify = "justify-start";
    if (align === "center") justify = "justify-center";
    if (align === "right") justify = "justify-end";
    return `items-center  ${justify}`;
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-4 transition-all duration-300">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>Mostrar</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="border border-gray-300 rounded-lg px-2 py-1 focus:ring focus:ring-blue-300"
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
            <div className="relative group inline-block">
              <button
                onClick={handleExportExcel}
                className="cursor-pointer flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm shadow-sm hover:bg-green-700 hover:shadow-md transition-all duration-200"
              >
                <FileSpreadsheet size={18} />
              </button>
              <span className="absolute w-25 text-center -top-6 left-1/2 -translate-x-1/2 bg-gray-800/60 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-200">
                Exportar a Excel
              </span>
            </div>
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
            className="pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              {headers.map((header) => (
                <th key={header.key} className={`px-4 py-2 text-left font-semibold ${getAlingTextClass(header.aling)}`}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={headers.length} className="text-center py-6 text-gray-400">
                  Cargando...
                </td>
              </tr>
            ) : rows.length > 0 ? (
              rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors border-t">
                  {headers.map((header) => (
                    <td key={header.key} className={`px-4 py-2 ${header.render
                        ? getActionCellClass(header.aling)
                        : getAlingTextClass(header.aling)
                      }`}>
                      {header.render ? header.render(row) : row[header.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center py-6 text-gray-400">
                  No hay resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

<div className="flex justify-between items-center mt-4 text-sm text-gray-600">
  <p>
    Página {page} de {totalPages || 1}
  </p>

  <div className="flex gap-1 items-center">
    {/* Ir al inicio */}
    <button
      onClick={() => setPage(1)}
      disabled={page === 1}
      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition"
      title="Primera página"
    >
      <ChevronsLeft size={18} />
    </button>

    {/* Página anterior */}
    <button
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      disabled={page === 1}
      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition"
      title="Página anterior"
    >
      <ChevronLeft size={18} />
    </button>

    {/* Botones numéricos dinámicos */}
    {(() => {
      const visibleButtons = 3;
      let start = Math.max(1, page - 1);
      let end = Math.min(totalPages, start + visibleButtons - 1);

      if (end - start + 1 < visibleButtons) {
        start = Math.max(1, end - visibleButtons + 1);
      }

      const pagesToShow = [];
      for (let i = start; i <= end; i++) {
        pagesToShow.push(i);
      }

      return pagesToShow.map((pNum) => (
        <button
          key={pNum}
          onClick={() => setPage(pNum)}
          className={`px-3 py-1 rounded-lg border transition-all ${
            page === pNum
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          {pNum}
        </button>
      ));
    })()}

    {/* Página siguiente */}
    <button
      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
      disabled={page === totalPages}
      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition"
      title="Página siguiente"
    >
      <ChevronRight size={18} />
    </button>

    {/* Ir al final */}
    <button
      onClick={() => setPage(totalPages)}
      disabled={page === totalPages}
      className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40 transition"
      title="Última página"
    >
      <ChevronsRight size={18} />
    </button>
  </div>
</div>

    </div>
  );
}
