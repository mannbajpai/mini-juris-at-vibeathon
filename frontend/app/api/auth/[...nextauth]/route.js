import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { admins, speakers } from "@/lib/demoUsers"
import { getDynamicSpeakers } from "@/lib/dynamicUsers"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null

        // Combine static and dynamic users
        const dynamicSpeakers = getDynamicSpeakers()
        const allUsers = [
          ...admins.map(u => ({ ...u, role: 'admin' })), 
          ...speakers.map(u => ({ ...u, role: 'speaker' })),
          ...dynamicSpeakers.map(u => ({ ...u, role: 'speaker' }))
        ]

        const user = allUsers.find(u => u.email === credentials.email)

        if (user && await bcrypt.compare(credentials.password, user.passwordHash)) {
          return { id: user.email, name: user.name || (user.role === 'admin' ? 'Admin User' : 'Speaker User'), email: user.email, role: user.role }
        }
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role 
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
