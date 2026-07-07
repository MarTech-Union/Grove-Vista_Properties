export default function StatCard({ icon, label, value, trend, trendUp, color = "blue" }) {
  const colors = {
    blue:   { bg: "bg-blue-50",   text: "text-blue-600"   },
    green:  { bg: "bg-emerald-50", text: "text-emerald-600" },
    purple: { bg: "bg-purple-50", text: "text-purple-600" },
    amber:  { bg: "bg-amber-50",  text: "text-amber-600"  },
  };
  const c = colors[color] ?? colors.blue;

  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.bg} ${c.text}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-slate-500 truncate">{label}</p>
        <p className="mt-0.5 text-2xl font-bold text-slate-900">{value}</p>
        {trend !== undefined && (
          <p className={`mt-1 text-xs font-semibold ${
            trendUp === true  ? "text-emerald-600" :
            trendUp === false ? "text-red-500" :
                                "text-slate-400"
          }`}>
            {trendUp === true ? "↑" : trendUp === false ? "↓" : "→"} {trend}
          </p>
        )}
      </div>
    </div>
  );
}
