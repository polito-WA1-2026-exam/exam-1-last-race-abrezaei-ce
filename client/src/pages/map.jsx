import api from "@/api";
import MapDisplay from "@/components/map/mapDisplay";
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
        const response = await api.game.start();

        if (response.success) navigate(`/game/${response.data.game_id}`);
    }

    return (
        <div className="grid grid-cols-10 gap-6">

            {
                map
                &&
                <MapDisplay className="col-span-7" segments={map.segments} stations={map.stations} />
            }
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