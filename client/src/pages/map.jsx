import api from "@/api";
import Map from "@/components/map";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function PageMap() {
    const navigate = useNavigate();
    const [map, setMap] = useState(null);

    useEffect(() => {
        async function getMap() {
            const response = await api.map.get();

            if (response.success) setMap(response.data);
        }

        getMap();
    }, []);

    async function startGame() {
        const response = await api.games.start();

        if (response.success) navigate(`/games/${response.data.id}`, { viewTransition: true });
    }

    return (
        <div className="grid grid-cols-10 gap-6">

            <div className="col-span-7">
                {
                    map
                    &&
                    <Map lines={map.lines} segments={map.segments} stations={map.stations} />
                }
            </div>
            <div className="col-span-3">
                <Card>

                    <CardHeader>
                        <CardTitle>Are You Ready?</CardTitle>
                    </CardHeader>
                    <CardContent>

                        <p className="text-sm text-muted-foreground leading-normal mb-6">
                            Memorize the connections carefully. Once you start, the lines will vanish.
                        </p>
                        <Button className="w-full" size="lg" onClick={startGame}>
                            Start Game
                        </Button>

                    </CardContent>

                </Card>
            </div>

        </div>
    );
}

export default PageMap;