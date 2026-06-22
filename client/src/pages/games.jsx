import api from "@/api";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { timestampFormat } from "@/utils/date";

function PageGames() {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function listGames() {
            const response = await api.games.list();

            if (response.success) setList(response.data.sort((a, b) => b.score - a.score));
        }

        listGames();
    }, []);

    return (
        <>
            <div className="mb-12">

                <div className="flex justify-between items-center">

                    <h1 className="text-3xl font-semibold tracking-tight">Game History</h1>
                    <Button asChild>
                        <Link to='/map' viewTransition>Let's Play</Link>
                    </Button>

                </div>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-2xl">
                    Game history sorted by highest score.
                </p>

            </div>
            <Table>
                <TableHeader>
                    <TableRow>

                        <TableHead className="font-bold">Origin</TableHead>
                        <TableHead className="font-bold">Destination</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                        <TableHead className="font-bold">Coins</TableHead>
                        <TableHead className="font-bold">Started At</TableHead>
                        <TableHead className="text-right"></TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        list.map((item, index) =>
                            <TableRow key={index}>

                                <TableCell className="font-medium py-6">{item.origin}</TableCell>
                                <TableCell className="font-medium py-6">{item.destination}</TableCell>
                                <TableCell className="font-medium py-6">
                                    {
                                        item.score > 0
                                            ?
                                            <p className="inline-block px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold">
                                                Won
                                            </p>
                                            :
                                            <p className="inline-block px-3 py-1 bg-red-500/10 text-red-600 rounded-full text-sm font-semibold">
                                                Lost
                                            </p>
                                    }
                                </TableCell>
                                <TableCell className="font-medium py-6">
                                    <p className={`text-lg font-bold ${item.score > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {item.score}
                                    </p>
                                </TableCell>
                                <TableCell className="font-medium py-6">{timestampFormat(item.started_at)}</TableCell>
                                <TableCell className="text-right font-medium py-6">
                                    <Button asChild>
                                        <Link to={`/games/${item.id}`} viewTransition>View Game</Link>
                                    </Button>
                                </TableCell>

                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </>
    );
}

export default PageGames;