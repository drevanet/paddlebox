import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
export async function POST(req: Request) {
 try {
  const {name,email,password}=await req.json();
  if(!email || !password || password.length<8) return NextResponse.json({error:'Enter an email and a password with at least 8 characters.'},{status:400});
  const normalized=email.toLowerCase().trim();
  if(await db.user.findUnique({where:{email:normalized}})) return NextResponse.json({error:'An account with this email already exists.'},{status:409});
  const user=await db.user.create({data:{name:name?.trim()||null,email:normalized,passwordHash:await bcrypt.hash(password,12),subscription:{create:{status:'inactive'}}}});
  return NextResponse.json({id:user.id,ok:true});
 } catch { return NextResponse.json({error:'Could not create your account.'},{status:500}); }
}
