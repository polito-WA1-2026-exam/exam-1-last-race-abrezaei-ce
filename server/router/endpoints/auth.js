import express from "express";
import passport from "passport";

const authRoutes = express.Router();

authRoutes.post("/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
});

authRoutes.delete("/logout", (req, res) => {
    req.logout(() => {
        res.end();
    });
});

authRoutes.get("/check", (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ error: "Not authenticated" });
    }
});

export default authRoutes;