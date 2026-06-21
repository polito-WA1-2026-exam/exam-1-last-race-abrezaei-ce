import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useUserStore from "@/store/user";
import { Link } from "react-router";

function PageIndex() {
    const user = useUserStore((state) => state.user);

    return (
        <>

            <div className="mb-12 border-b pb-8">

                <div className="flex justify-between items-center">

                    <h1 className="text-3xl font-semibold tracking-tight">Last Race</h1>
                    {
                        user
                        &&
                        <Button asChild>
                            <Link to='/map'>Let's Play</Link>
                        </Button>
                    }

                </div>
                <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-2xl">
                    Your goal is to travel from a random starting station to your destination without getting lost, or losing all your coins.
                </p>

            </div>
            <div className="grid grid-cols-12 gap-16">

                <div className="col-span-5 space-y-8 border-r pr-12">

                    <div className="space-y-4">
                        <h2 className="flex items-center gap-2 text-base font-medium">
                            The Objective
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            You will be assigned a random Origin and Destination on the metro map. You must successfully navigate between these two stations using the correct connecting routes.
                        </p>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                        <h2 className="flex items-center gap-2 text-base font-medium">
                            Coins & Random Events
                        </h2>
                        <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
                            <p>
                                You start every game with 20 Coins. For every connection you travel, a random event will occur.
                            </p>
                            <ul className="list-disc list-inside space-y-1.5 ml-1">
                                <li>Lucky events will increase your balance.</li>
                                <li>Unlucky events will deduct coins.</li>
                            </ul>
                            <p>
                                Your final score is the amount of coins you have left when you reach the destination.
                            </p>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                        <h2 className="flex items-center gap-2 text-base font-medium">
                            Game Over Conditions
                        </h2>
                        <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1.5">
                            <li>Submit an invalid route.</li>
                            <li>Submit a disconnected route.</li>
                            <li>Fail to reach your assigned destination.</li>
                        </ul>
                    </div>

                </div>

                <div className="col-span-7 pl-4">
                    <div className="space-y-8">

                        <h2 className="flex items-center gap-2 text-base font-medium">
                            Gameplay Mechanics
                        </h2>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-10">

                            <div className="space-y-2">
                                <h3 className="flex items-center gap-2 text-sm font-medium">
                                    Step 1
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Before starting, memorize the full map on the home page. Pay close attention to the lines, connections, and stations.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="flex items-center gap-2 text-sm font-medium">
                                    Step 2
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Once you click "Start Game", the connecting lines will disappear! You will only see the stations.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="flex items-center gap-2 text-sm font-medium">
                                    Step 3
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Choose connections in the exact order to build your path from the Origin to the Destination.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="flex items-center gap-2 text-sm font-medium">
                                    Step 4
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Once you reach the destination, submit your route to see what happened during your journey.
                                </p>
                            </div>
                            <div className="col-span-2 border-t pt-8 mt-2 space-y-2">
                                <h3 className="flex items-center gap-2 text-sm font-medium">
                                    Time Limit
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    You have exactly 90 seconds to complete your journey and submit your route.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default PageIndex;