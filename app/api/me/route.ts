import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
export async function GET(){const session=await getServerSession(authOptions);if(!session?.user?.email)return NextResponse.json({signedIn:false});const user=await db.user.findUnique({where:{email:session.user.email},include:{subscription:true}});if(!user)return NextResponse.json({signedIn:false});return NextResponse.json({signedIn:true,name:user.name,email:user.email,subscription:user.subscription?{status:user.subscription.status,planKey:user.subscription.planKey,downloadCount:user.subscription.downloadCount,periodEnd:user.subscription.periodEnd}:null});}
