import api from "@/api";
import MapDisplay from "@/components/map/mapDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import useCountdown from "@/hooks/useCountdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router";
import * as zod from 'zod';

function PageGame() {
    const params = useParams();
    const [game, setGame] = useState(null);
    const [segments, setSegments] = useState([]);
    const [stations, setStations] = useState([]);
    const countdown = useCountdown(game?.started_at);
    const formSchema = zod.object({
        route: zod.array(zod.number()).min(3, "Select at least three connections.")
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            route: []
        }
    });

    useEffect(() => {
        async function getGame() {
            const response = await api.game.get(params.gameId);

            if (response.success) setGame(response.data);
        }
        async function listSegments() {
            const response = await api.segments.list();

            if (response.success) setSegments(response.data);
        }
        async function listStations() {
            const response = await api.stations.list();

            if (response.success) setStations(response.data);
        }

        getGame();
        listSegments();
        listStations();
    }, [params.gameId]);

    useEffect(() => {
        if (countdown === 0 && game && game.history.length === 0) handleSubmit({ route: [] });
    }, [countdown, game]);

    async function handleSubmit(data) {
        const response = await api.game.submit(params.gameId, data);

        if (response.success) setGame(response.data);
    }

    return (
        <div className="grid grid-cols-10 gap-6">

            {
                stations.length && segments.length
                &&
                <div className="col-span-7">
                    <MapDisplay stations={stations} />
                </div>
            }
            {
                game
                &&
                <div className="col-span-3 space-y-4">
                    <div className="grid grid-cols-2 gap-4">

                        <Card>

                            <CardHeader>
                                <CardTitle>Origin</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-bold text-muted-foreground">
                                    {stations.find((item) => item.id === game.origin)?.name}
                                </p>
                            </CardContent>

                        </Card>
                        <Card>

                            <CardHeader>
                                <CardTitle>Destination</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg font-bold text-muted-foreground">
                                    {stations.find((item) => item.id === game.destination)?.name}
                                </p>
                            </CardContent>

                        </Card>

                    </div>
                    <Card>

                        <CardHeader>
                            <CardTitle>Remaining Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg font-bold text-muted-foreground">
                                {countdown}
                            </p>
                        </CardContent>

                    </Card>
                    <Card>

                        <CardHeader>
                            <CardTitle>Build your path from Origin to Destination</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={form.handleSubmit(handleSubmit)}>
                                <FieldGroup>

                                    <Controller
                                        name="route"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <FieldGroup>
                                                <FieldSet data-invalid={fieldState.invalid}>
                                                    <FieldGroup data-slot="checkbox-group">
                                                        {segments.map((segment) => (
                                                            <Field
                                                                key={segment.id}
                                                                orientation="horizontal"
                                                                data-invalid={fieldState.invalid}>

                                                                <Checkbox
                                                                    id={`segment-${segment.id}`}
                                                                    name={field.name}
                                                                    aria-invalid={fieldState.invalid}
                                                                    checked={field.value.includes(segment.id)}
                                                                    onCheckedChange={(checked) => {
                                                                        field.onChange(
                                                                            checked
                                                                                ? [...field.value, segment.id]
                                                                                : field.value.filter((value) => value !== segment.id)
                                                                        )
                                                                    }} />
                                                                <FieldLabel
                                                                    htmlFor={`segment-${segment.id}`}>
                                                                    {`${stations.find((item) => item.id === segment.origin)?.name} - ${stations.find((item) => item.id === segment.destination)?.name}`}
                                                                </FieldLabel>

                                                            </Field>
                                                        ))}
                                                    </FieldGroup>
                                                </FieldSet>
                                                {
                                                    fieldState.invalid &&
                                                    <FieldError errors={[fieldState.error]} />
                                                }
                                            </FieldGroup>
                                        )} />
                                    <Button type="submit" size="lg">
                                        Save
                                    </Button>

                                </FieldGroup>
                            </form>
                        </CardContent>

                    </Card>
                </div>
            }

        </div>
    );
}

export default PageGame;