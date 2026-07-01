import type { ChartData, Month } from "@/types/cims";
import { cn } from "@/lib/utils";

interface ChartPlaceholderProps {
    data: ChartData;
    title?: string;
    className?: string;
}

export function ChartPlaceholder({
    data,
    title = "Incidents Overview",
    className,
}: ChartPlaceholderProps) {
    const labels: Month[] = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const max = Math.max(
        ...Object.values(data).flatMap((month) => [
            month.incidents,
            month.resolved,
        ]),
        1,
    );

    return (
        <div
            className={cn(
                "rounded-xl border border-border bg-card p-6",
                className,
            )}
        >
            <h3 className="mb-6 text-sm font-semibold text-foreground">
                {title}
            </h3>
            <div className="flex h-48 items-end justify-between gap-2 sm:gap-4">
                {labels.map((label) => {
                    const month = data[label]?? {
                        incidents: 0,
                        resolved: 0,
                    };

                    return (
                        <div
                            key={label}
                            className="flex flex-1 flex-col items-center gap-1 h-full"
                        >
                            <div className="flex h-full w-full items-end justify-center gap-1">
                                <div
                                    className="w-3 rounded-t bg-primary/80 sm:w-4"
                                    title={`${month.incidents}`}
                                    style={{
                                        height: `${(month.incidents / max) * 100}%`,
                                    }}
                                />
                                <div
                                    className="w-3 rounded-t bg-chart-2 sm:w-4"
                                    title={`${month.resolved}`}
                                    style={{
                                        height: `${(month.resolved / max) * 100}%`,
                                    }}
                                />
                            </div>

                            <span className="text-[10px] text-muted-foreground sm:text-xs">
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm bg-primary/80" />{" "}
                    Reported
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm bg-chart-2" /> Resolved
                </span>
            </div>
        </div>
    );
}
