import { getServerSession, User, type NextAuthOptions } from "next-auth";
import userModel from "@/models/user";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import PATH from "./path";

export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt", maxAge: 10 * 24 * 60 * 60 },
    callbacks: {
        async jwt({ token, user }) {
            const u = user as User;
            if (user) {
                return { ...token, userId: u.id };
            }
            return token;

            // if (account && account.type === "credentials") {
            //     //(2)
            //     token.userId = account.providerAccountId; // this is Id that coming from authorize() callback
            // }
            // return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: { ...session.user, userId: token.sub, userRole: token.userRole },
            };
        },
    },
    pages: {
        signIn: PATH.login(),
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "text",
                    placeholder: "abc@example.com",
                },
                password: {
                    label: "Password:",
                    type: "password",
                },
            },
            async authorize(credentials: any) {
                if (typeof credentials !== "undefined") {
                    const user = await userModel.findOne({
                        email: credentials?.email,
                    });

                    if (!user) {
                        throw new Error("Invalid credentials");
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials!.password, user.password);

                    if (!isPasswordCorrect) {
                        throw new Error("Invalid credentials");
                    }

                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
};

export const getServerAuthSession = () => getServerSession(authOptions); //(6)
