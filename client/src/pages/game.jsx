import api from "@/api";
import MapDisplay from "@/components/map/mapDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import useCountdown from "@/hooks/useCountdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useParams } from "react-router";
import * as zod from 'zod';
import { CircleMinus, CirclePlus, ArrowRight } from "lucide-react"
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"

function PageGame() {
    const params = useParams();
    const [game, setGame] = useState(null);
    const [lines, setLines] = useState([]);
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
    const isGameOver = useMemo(() => Boolean(game && game.history && game.history.length > 0), [game]);
    const isWin = useMemo(() => {
        if (!game || !game.history.length) return false;

        const lastEvent = game.history[game.history.length - 1];

        return lastEvent.type !== 'penalty' && lastEvent.score_after > 0;
    }, [game]);

    useEffect(() => {
        async function getGame() {
            const response = await api.games.get(params.gameId);

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
        async function listLines() {
            const response = await api.lines.list();
            if (response.success) setLines(response.data);
        }

        if (isGameOver) listLines();
    }, [isGameOver]);

    useEffect(() => {
        if (countdown === 0 && game && !game.history.length) handleSubmit({ route: form.getValues('route') });
    }, [countdown, game]);

    async function handleSubmit(data) {
        const response = await api.games.submit(params.gameId, data);

        if (response.success) setGame(response.data);
    }

    return (
        <div className="grid grid-cols-10 gap-6">

            <div className="col-span-7">
                {
                    stations.length > 0 && segments.length > 0
                    &&
                    <MapDisplay lines={lines} segments={isGameOver ? segments : null} stations={stations} />
                }
            </div>
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
                    {
                        isGameOver
                            ?
                            <>

                                <Card>

                                    <CardHeader>
                                        <CardTitle>Remaining Coins</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className={`text-lg font-bold ${isWin ? 'text-green-600' : 'text-red-600'}`}>
                                            {game.score}
                                        </p>
                                    </CardContent>

                                </Card>
                                <Card>

                                    <CardHeader className="flex justify-between items-center">
                                        <CardTitle>Journey Log</CardTitle>
                                        {
                                            isWin ?

                                                <p className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold">
                                                    You Won
                                                </p>
                                                :
                                                <p className="px-3 py-1 bg-red-500/10 text-red-600 rounded-full text-sm font-semibold">
                                                    You Lost
                                                </p>
                                        }
                                    </CardHeader>
                                    <CardContent>

                                        <div className="space-y-2 mb-4">
                                            {
                                                game.history.map((item) =>
                                                    <Item key={item.step} className={item.effect > 0 ? 'bg-green-500/10' : 'bg-red-500/10'}>
                                                        <ItemMedia variant="icon">
                                                            {
                                                                item.effect > 0
                                                                    ?
                                                                    <CirclePlus className="text-green-600" />
                                                                    :
                                                                    <CircleMinus className="text-red-600" />
                                                            }
                                                        </ItemMedia>
                                                        <ItemContent>
                                                            <ItemTitle className={item.effect > 0 ? 'text-green-600' : 'text-red-600'}>{item.description}</ItemTitle>
                                                            {
                                                                isWin
                                                                &&
                                                                <ItemDescription className="flex items-center gap-2">
                                                                    <span>{stations.find(st => st.id === item.user_origin)?.name}</span>
                                                                    <ArrowRight className="w-3 h-3" />
                                                                    <span>{stations.find(st => st.id === item.user_destination)?.name}</span>
                                                                </ItemDescription>

                                                            }
                                                        </ItemContent>
                                                        <ItemContent className="flex-none text-center">
                                                            <ItemDescription className={`text-2xl font-bold ${item.effect > 0 ? 'text-green-600' : 'text-red-600'}`}>{item.effect}</ItemDescription>
                                                        </ItemContent>
                                                    </Item>
                                                )
                                            }
                                        </div>
                                        <Button className="w-full" size="lg" asChild>
                                            <Link to="/map" viewTransition>Play Again</Link>
                                        </Button>

                                    </CardContent>

                                </Card>

                            </>
                            :
                            <>

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
                                                    Submit
                                                </Button>

                                            </FieldGroup>
                                        </form>
                                    </CardContent>

                                </Card>

                            </>
                    }
                </div>
            }

        </div>
    );
}

export default PageGame;