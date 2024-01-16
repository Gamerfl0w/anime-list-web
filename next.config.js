/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        USER_POOL_ID:process.env.USER_POOL_ID,
        COGNITO_CLIENT_ID:process.env.COGNITO_CLIENT_ID,
        COGNITO_REGION:process.env.COGNITO_REGION,
        COGNITO_ISSUER: process.env.COGNITO_ISSUER,
    }
}



module.exports = nextConfig
