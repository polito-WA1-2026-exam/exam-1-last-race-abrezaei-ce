import logo from '@/assets/img/logo.png';
import { Link, useNavigate } from "react-router";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { LogOutIcon } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useUserStore from '@/store/user';

function Navbar({ className, ...props }) {
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);
    const logout = useUserStore((state) => state.logout);

    async function handleLogout() {
        if (await logout()) navigate('/');
    }

    return (
        <nav className="bg-background fixed w-full z-20 top-0 start-0 border-b border-default">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <Link to="/" className="flex items-center space-x-3">

                    <img src={logo} className="h-7" alt="Flowbite Logo" />
                    <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">Last Race</span>

                </Link>
                {
                    user
                    &&
                    <NavigationMenu>
                        <NavigationMenuList>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link to="/">Home</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link to="/game">Game</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link to="/leaderboard">Leaderboard</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                }
                {
                    user
                        ?
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive">Logout</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent size="sm">
                                <AlertDialogHeader>
                                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                        <LogOutIcon />
                                    </AlertDialogMedia>
                                    <AlertDialogTitle>Logout?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You’re about to logout of your account. Do you want to continue?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                                    <AlertDialogAction variant="destructive" onClick={handleLogout}>Logout</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        :
                        <Button asChild>
                            <Link to="/auth/login">Login</Link>
                        </Button>
                }

            </div>
        </nav>
    )
}

export default Navbar;