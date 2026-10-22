import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import axiosInstance from "../../api/axiosInstance";

const periods = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
  { value: "365", label: "Last year" },
  { value: "all", label: "All time" },
];

function SalesByCategory() {
  const [days, setDays] = useState("30");
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchSales() {
      setLoading(true);
      setError("");
      try {
        const { data } = await axiosInstance.get("/admin/sales-by-category", { params: { days } });
        if (!cancelled && data.success) setSales(data.data);
      } catch (requestError) {
        if (!cancelled) setError(requestError.response?.data?.message || "Unable to load category sales");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSales();
    return () => { cancelled = true; };
  }, [days]);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Sales by Category</h2>
          <p className="mt-1 text-sm text-gray-500">Paid-order revenue and units sold by product category.</p>
        </div>
        <select value={days} onChange={(event) => setDays(event.target.value)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#C8A96A]">
          {periods.map((period) => <option key={period.value} value={period.value}>{period.label}</option>)}
        </select>
      </div>

      {loading ? <div className="h-72 animate-pulse rounded-xl bg-gray-100" /> : error ? <p className="py-16 text-center text-sm text-red-600">{error}</p> : sales.length === 0 ? <p className="py-16 text-center text-sm text-gray-500">No paid sales in this period yet.</p> : (
        <>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sales} margin={{ top: 8, right: 12, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="category" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} interval={0} />
                <YAxis tickFormatter={(value) => `₦${Number(value / 1000).toLocaleString()}k`} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={64} />
                <Tooltip formatter={(value) => [`₦${Number(value).toLocaleString("en-NG")}`, "Revenue"]} />
                <Bar dataKey="revenue" fill="#C8A96A" radius={[7, 7, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="border-b border-gray-100 text-xs uppercase tracking-wide text-gray-500"><tr><th className="pb-3">Category</th><th className="pb-3">Revenue</th><th className="pb-3">Units Sold</th><th className="pb-3">Orders</th></tr></thead>
              <tbody>{sales.map((item) => <tr key={item.category} className="border-b border-gray-50 last:border-0"><td className="py-3 font-medium text-gray-900">{item.category}</td><td className="py-3">₦{Number(item.revenue).toLocaleString("en-NG")}</td><td className="py-3">{item.unitsSold}</td><td className="py-3">{item.orderCount}</td></tr>)}</tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

export default SalesByCategory;
