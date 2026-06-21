import { cn } from "@/lib/utils";

function MapDisplay({ className, ...props }) {
    const { segments = null, stations } = props;
    const lineColors = {
        1: "stroke-red-500",
        2: "stroke-emerald-500",
        3: "stroke-blue-500",
        4: "stroke-slate-800"
    };

    return (
        <div className={cn("bg-card rounded-xl border", className)}>
            <svg
                viewBox="0 0 900 600"
                className="w-full h-auto">

                {
                    segments
                    &&
                    segments.map((segment) => {
                        const origin = stations.find((item) => item.id === segment.origin);
                        const destination = stations.find((item) => item.id === segment.destination);

                        return (
                            <line
                                key={segment.id}
                                x1={origin.x}
                                y1={origin.y}
                                x2={destination.x}
                                y2={destination.y}
                                className={`${lineColors[segment.line_id]}`}
                                strokeWidth="8" />
                        );
                    })
                }
                {stations.map((station) => (
                    <g key={station.id}>

                        <circle
                            cx={station.x}
                            cy={station.y}
                            r="12"
                            className="fill-background stroke-foreground"
                            strokeWidth="3" />
                        <text
                            x={station.x}
                            y={station.y - 24}
                            textAnchor="middle"
                            className="text-xs font-medium fill-foreground">
                            {station.name}
                        </text>

                    </g>
                ))}

            </svg>
        </div>
    );
}

export default MapDisplay;