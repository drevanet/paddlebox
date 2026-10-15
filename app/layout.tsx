import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/providers';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
export const metadata:Metadata={title:'Betty — 3D Box Maker',description:'Create beautiful custom 3D packaging in minutes with Betty Box Maker.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Providers><SiteHeader/>{children}<SiteFooter/></Providers></body></html>}
