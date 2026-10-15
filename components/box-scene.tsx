'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';
const defaults=['FRONT','BACK','LEFT','RIGHT','TOP','BOTTOM'];
function BoxModel({faces,accent}:{faces:string[];accent:string}){
 const materials=useMemo(()=>faces.map((label,i)=>{
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=512;const c=canvas.getContext('2d')!;
  c.fillStyle=i===4?'#eeeaff':i===5?'#e6e7ef':'#ffffff';c.fillRect(0,0,512,512);
  c.strokeStyle=accent;c.lineWidth=10;c.strokeRect(24,24,464,464);
  c.fillStyle=accent;c.beginPath();c.roundRect(42,42,428,12,6);c.fill();
  c.fillStyle='#17172b';c.textAlign='center';c.font='bold 38px Arial';c.fillText((label||defaults[i]).toUpperCase().slice(0,22),256,245);
  c.fillStyle='#77778a';c.font='22px Arial';c.fillText('DESIGNED WITH BETTY',256,290);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  return new THREE.MeshStandardMaterial({map:texture,roughness:.72,metalness:.02});
 }),[faces,accent]);
 return <mesh castShadow receiveShadow rotation={[.1,.55,0]}><boxGeometry args={[2.3,2.3,2.3]}/>{materials.map((m,i)=><primitive key={i} attach={`material-${i}`} object={m}/>)}</mesh>
}
export default function BoxScene({faces,accent='#7557f6',className=''}:{faces:string[];accent?:string;className?:string}){return <div className={className}><Canvas camera={{position:[4,3.2,4.5],fov:42}} shadows dpr={[1,2]}><color attach="background" args={['#f3f1ff']}/><ambientLight intensity={1.4}/><directionalLight position={[4,6,5]} intensity={2.3} castShadow/><Environment preset="studio"/><BoxModel faces={faces} accent={accent}/><ContactShadows position={[0,-1.45,0]} opacity={.22} scale={7} blur={2.5}/><OrbitControls enablePan={false} minDistance={3.5} maxDistance={8} autoRotate autoRotateSpeed={.55}/></Canvas></div>}
