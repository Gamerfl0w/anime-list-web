import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"

export const authOptions = {
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID,
            clientSecret: process.env.COGNITO_CLIENT_SECRET,
            issuer: process.env.COGNITO_ISSUER,
        }),
    ],
    // I still dont know how to get custom attributes, or any other attributes for that matter
    // callbacks: {
    //     async session({ session, user, account, profile, email, credentials, token }) {
    //         session.name = profile.username;
    //         return session
    //       },
    // },
    // custom signin idk
    // theme: {
    //     colorScheme: "dark", // "auto" | "dark" | "light"
    //     brandColor: "#000", // Hex color code
    //     logo: "https://cdn.designly.biz/images/designly-logo-300.webp", // Absolute URL to image
    //     buttonText: "#fff" // Hex color code
    // }
}

export default NextAuth(authOptions)