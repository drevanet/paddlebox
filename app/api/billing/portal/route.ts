import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
export async function POST() {
 const session=await getServerSession(authOptions); const email=session?.user?.email;
 if(!email) return NextResponse.json({error:'Please sign in first.'},{status:401});
 const user=await db.user.findUnique({where:{email},include:{subscription:true}});
 if(!user?.subscription?.paddleCustomerId) return NextResponse.json({error:'No Paddle customer is linked yet. Subscribe first, or manage your plan in Paddle.'},{status:400});
 const response=await fetch(`https://api.paddle.com/customers/${user.subscription.paddleCustomerId}/portal-sessions`,{method:'POST',headers:{Authorization:`Bearer ${process.env.PADDLE_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({customer_id:user.subscription.paddleCustomerId})});
 const data=await response.json(); if(!response.ok) return NextResponse.json({error:data?.error?.detail||'Unable to open the billing portal.'},{status:502});
 const url=data?.data?.urls?.general?.overview;
 if(!url) return NextResponse.json({error:'Paddle did not return a portal URL.'},{status:502});
 return NextResponse.json({url});
}
