"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type ActivityPoint = {
    date: string;
    count: number;
};

function formatDateLabel(value: string): string {
    const date = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    });
}

export default function SubmissionActivityChart({
    data,
}: {
    data: ActivityPoint[];
}) {
    const hasData = data.some((point) => point.count > 0);

    if (!hasData) {
        return (
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-400">
                No submissions yet. Activity will appear here once responses arrive.
            </div>
        );
    }

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="submissionGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="rgba(148, 163, 184, 0.25)"
                    />
                    <XAxis
                        dataKey="date"
                        tickFormatter={formatDateLabel}
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
                        minTickGap={16}
                    />
                    <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 11, fill: "#94a3b8" }}
                        axisLine={false}
                        tickLine={false}
                        width={32}
                    />
                    <Tooltip
                        cursor={{ stroke: "#6366f1", strokeWidth: 1, strokeDasharray: "4 4" }}
                        contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid rgba(99,102,241,0.2)",
                            background: "rgba(15,23,42,0.92)",
                            color: "#fff",
                            fontSize: "12px",
                        }}
                        labelFormatter={(label) => formatDateLabel(String(label))}
                        formatter={(value) => [`${value} submission${Number(value) === 1 ? "" : "s"}`, "Submissions"]}
                    />
                    <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#6366f1"
                        strokeWidth={2.5}
                        fill="url(#submissionGradient)"
                        dot={false}
                        activeDot={{ r: 4, strokeWidth: 0, fill: "#6366f1" }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
