function auth() {
    const isAuthenticated = true;

    if (!isAuthenticated) throw redirect("/login");
}

export default auth;