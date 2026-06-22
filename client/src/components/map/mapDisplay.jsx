import { cn } from "@/lib/utils";

function MapDisplay({ className, ...props }) {
    const { lines, segments, stations } = props;

    return (
        <div className={cn("bg-card rounded-xl border", className)}>
            <div className="mb-6">
                <svg
                    viewBox="0 0 900 600"
                    className="w-full h-auto">

                    {
                        lines.length > 0 && segments
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
                                    style={{ stroke: lines.find((line) => line.id === segment.line_id).color }}
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
                {
                    lines
                    &&
                    <ul className="flex justify-center items-center gap-8">
                        {
                            lines.map((line) =>
                                <li key={line.id} className="flex items-center gap-1">
                                    <span className="w-12 h-4" style={{ backgroundColor: line.color }}></span><span>{line.name}</span>
                                </li>
                            )
                        }
                    </ul>
                }
            </div>
        </div>
    );
}

export default MapDisplay;