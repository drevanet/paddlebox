import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
export const authOptions: NextAuthOptions = {
 session: { strategy: 'jwt' },
 providers: [CredentialsProvider({ name:'Email and password', credentials:{ email:{label:'Email',type:'email'}, password:{label:'Password',type:'password'} }, async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) return null;
  const user = await db.user.findUnique({ where:{email:credentials.email.toLowerCase()} });
  if (!user || !(await bcrypt.compare(credentials.password,user.passwordHash))) return null;
  return { id:user.id, name:user.name, email:user.email };
 }})],
 pages: { signIn:'/sign-in' },
 callbacks: { async jwt({token,user}) { if(user) token.id = user.id; return token; }, async session({session,token}) { if(session.user) (session.user as any).id = token.id; return session; } }
};
export default NextAuth(authOptions);
