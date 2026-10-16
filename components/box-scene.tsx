
'use client';

import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  Environment,
} from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';

const defaults = ['FRONT', 'BACK', 'LEFT', 'RIGHT', 'TOP', 'BOTTOM'];

// Maps editor order to Three.js BoxGeometry material order:
// +X, -X, +Y, -Y, +Z, -Z
const materialFaceOrder = [3, 2, 4, 5, 0, 1];

type BoxModelProps = {
  faces: string[];
  faceImages?: (string | null)[];
  accent: string;
};

function BoxModel({
  faces,
  faceImages = [],
  accent,
}: BoxModelProps) {
  const [imageTextures, setImageTextures] = useState<
    (THREE.Texture | null)[]
  >([]);

  useEffect(() => {
    let cancelled = false;
    const loadedTextures: THREE.Texture[] = [];

    async function loadImages() {
      const textures = await Promise.all(
        defaults.map(async (_, index) => {
          const src = faceImages[index];

          if (!src) return null;

          try {
            const image = new Image();
            image.crossOrigin = 'anonymous';

            await new Promise<void>((resolve, reject) => {
              image.onload = () => resolve();
              image.onerror = () =>
                reject(new Error('Could not load face image'));
              image.src = src;
            });

            const texture = new THREE.Texture(image);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.needsUpdate = true;
            loadedTextures.push(texture);

            return texture;
          } catch {
            return null;
          }
        }),
      );

      if (cancelled) {
        loadedTextures.forEach((texture) => texture.dispose());
        return;
      }

      setImageTextures(textures);
    }

    void loadImages();

    return () => {
      cancelled = true;
      loadedTextures.forEach((texture) => texture.dispose());
    };
  }, [faceImages]);

  const materials = useMemo(() => {
    return defaults.map((_, index) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;

      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle =
        index === 4
          ? '#eeeaff'
          : index === 5
            ? '#e6e7ef'
            : '#ffffff';

      ctx.fillRect(0, 0, 512, 512);

      const imageTexture = imageTextures[index];

      if (imageTexture?.image) {
        const image = imageTexture.image as HTMLImageElement;
        const scale = Math.max(
          512 / image.width,
          512 / image.height,
        );

        const width = image.width * scale;
        const height = image.height * scale;

        ctx.drawImage(
          image,
          (512 - width) / 2,
          (512 - height) / 2,
          width,
          height,
        );
      } else {
        ctx.fillStyle = '#17172b';
        ctx.textAlign = 'center';
        ctx.font = 'bold 38px Arial';

        ctx.fillText(
          (faces[index] || defaults[index])
            .toUpperCase()
            .slice(0, 22),
          256,
          245,
        );

        ctx.fillStyle = '#77778a';
        ctx.font = '22px Arial';
        ctx.fillText('DESIGNED WITH BETTY', 256, 290);
      }

      ctx.strokeStyle = accent;
      ctx.lineWidth = 10;
      ctx.strokeRect(24, 24, 464, 464);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;

      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.72,
        metalness: 0.02,
      });
    });
  }, [faces, accent, imageTextures]);

  useEffect(() => {
    return () => {
      materials.forEach((material) => {
        material.map?.dispose();
        material.dispose();
      });
    };
  }, [materials]);

  const mesh = useMemo(() => {
    const geometry = new THREE.BoxGeometry(2.3, 2.3, 2.3);

    const orderedMaterials = materialFaceOrder.map(
      (editorIndex) => materials[editorIndex],
    );

    const object = new THREE.Mesh(geometry, orderedMaterials);
    object.castShadow = true;
    object.receiveShadow = true;
    object.rotation.set(0.1, 0.55, 0);

    return object;
  }, [materials]);

  useEffect(() => {
    return () => {
      mesh.geometry.dispose();
    };
  }, [mesh]);

  return <primitive object={mesh} />;
}

export default function BoxScene({
  faces,
  faceImages = [],
  accent = '#7557f6',
  className = '',
}: {
  faces: string[];
  faceImages?: (string | null)[];
  accent?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [4, 3.2, 4.5], fov: 42 }}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
        }}
        onCreated={({ gl }) => {
          gl.domElement.id = 'paddlebox-canvas';
        }}
      >
        <color attach="background" args={['#f3f1ff']} />

        <ambientLight intensity={1.4} />

        <directionalLight
          position={[4, 6, 5]}
          intensity={2.3}
          castShadow
        />

        <Environment preset="studio" />

        <BoxModel
          faces={faces}
          faceImages={faceImages}
          accent={accent}
        />

        <ContactShadows
          position={[0, -1.45, 0]}
          opacity={0.22}
          scale={7}
          blur={2.5}
        />

        <OrbitControls
          enablePan={false}
          minDistance={3.5}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={0.55}
        />
      </Canvas>
    </div>
  );
}
