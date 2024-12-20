import passport from "passport";
import { generateToken } from "./jwtUtils.js";
import "dotenv/config";
import prisma from "./prismaClient.js";

const authMiddleware = (strategyName) => {
  return (req, res, next) => {
    passport.authenticate(
      strategyName,
      { session: false, failureRedirect: "/login" },
      async (err, user, info) => {
        if (err) {
          console.error("Authentication error:", err);
          return next(err);
        }

        if (!user) {
          console.log("No user found, sending 401");
          return res.status(401).send("Unauthorized");
        }

        console.log("User authenticated:", user);
        const userObj = await prisma.user.findFirst({
          where: {
            id: user.id,
          },
          select: {
            id: true,
            profileImage: true,
            username: true,
          },
        });

        const token = generateToken(user);
        console.log(token);

        if (strategyName === "local") {
          return res.json({ token, userObj });
        } else {
          return res.redirect(
            `${process.env.FRONTEND_URL}/oauth-callback?token=${token}`
          );
        }
      }
    )(req, res, next); // Ensure authenticate is invoked with req, res, next
  };
};

export default authMiddleware;
