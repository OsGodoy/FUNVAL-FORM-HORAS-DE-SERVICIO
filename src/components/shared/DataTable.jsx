import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function DataTable({ headers = [], data = [], pageSize = 10, title = "Data Table" }) {
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
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

    return (
        <div className="w-full bg-white  rounded-2xl shadow-md p-4">

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="pl-10 pr-3 py-2 rounded-lg border border-gray-300  bg-gray-50  text-sm text-gray-700  focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                </div>
            </div>


            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700 ">
                    <thead className="bg-gray-100  text-gray-700  uppercase">
                        <tr>
                            {headers.map((header) => (
                                <th key={header.key} className="px-4 py-2 text-left font-semibold">
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
                                <tr
                                    key={idx}
                                    className="hover:bg-gray-50  transition-colors"
                                >
                                    {headers.map((header) => (
                                        <td key={header.key} className="px-4 py-2 border-t ">
                                            {row[header.key]}
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


            <div className="flex justify-between items-center mt-4 text-sm text-gray-600 ">
                <p>
                    Página {page} de {totalPages || 1}
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-40"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
