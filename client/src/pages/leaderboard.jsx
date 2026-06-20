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
import { Medal, Trophy } from "lucide-react";

function PageLeaderboard() {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function getLeaderboardList() {
            const response = await api.leaderboard.list();

            if (response.success) setList(response.data);
        }

        getLeaderboardList();
    }, []);

    const getRankIcon = (index) => {
        switch (index) {
            case 0:
                return <Trophy className="w-5 h-5 text-yellow-500" />;
            case 1:
                return <Medal className="w-5 h-5 text-slate-400" />;
            case 2:
                return <Medal className="w-5 h-5 text-amber-600" />;
            default:
                return <span className="font-bold text-muted-foreground ml-">{index + 1}</span>;
        }
    };

    return (
        <>

            <div className="mb-6">

                <h1 className="text-3xl font-semibold text-center mb-2">Leaderboard</h1>
                <p className="text-muted-foreground text-center">Top 10 players with the highest scores.</p>

            </div>
            <Table>
                <TableHeader>
                    <TableRow>

                        <TableHead className="w-24 font-bold text-center">Rank</TableHead>
                        <TableHead className="font-bold">Player</TableHead>
                        <TableHead className="font-bold text-right pr-6">Best Score</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        list.map((item, index) =>
                            <TableRow>

                                <TableCell className="flex justify-center items-center py-4">{getRankIcon(index)}</TableCell>
                                <TableCell className="font-medium">{item.username}</TableCell>
                                <TableCell className="text-right pr-6">{item.best_score} Coins</TableCell>

                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>

        </>
    );
}

export default PageLeaderboard;