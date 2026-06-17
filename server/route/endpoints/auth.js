import express from "express";
import passport from "passport";

const router = express.Router();

router.post("/auth/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
});

router.delete("/auth/logout", (req, res) => {
    req.logout(() => {
        res.end();
    });
});

router.get("/auth/check", (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.status(401).json({ error: "Not authenticated" });
    }
});

export default router;