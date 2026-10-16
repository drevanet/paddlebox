'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { createElement, useMemo } from 'react';
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
 const mesh=useMemo(()=>{
  const object=new THREE.Mesh(new THREE.BoxGeometry(2.3,2.3,2.3),materials);
  object.castShadow=true;
  object.receiveShadow=true;
  object.rotation.set(.1,.55,0);
  return object;
 },[materials]);
 return createElement('primitive' as any, { object: mesh });
}
export default function BoxScene({faces,accent='#7557f6',className=''}:{faces:string[];accent?:string;className?:string}){
 return createElement('div',{className},createElement(Canvas,{camera:{position:[4,3.2,4.5],fov:42},shadows:true,dpr:[1,2]},
  createElement('color' as any,{attach:'background',args:['#f3f1ff']}),
  createElement('ambientLight' as any,{intensity:1.4}),
  createElement('directionalLight' as any,{position:[4,6,5],intensity:2.3,castShadow:true}),
  createElement(Environment,{preset:'studio'}),
  createElement(BoxModel,{faces,accent}),
  createElement(ContactShadows,{position:[0,-1.45,0],opacity:.22,scale:7,blur:2.5}),
  createElement(OrbitControls,{enablePan:false,minDistance:3.5,maxDistance:8,autoRotate:true,autoRotateSpeed:.55})
 ));
}
