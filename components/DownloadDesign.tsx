
'use client';

import { useCallback } from 'react';

type DownloadDesignProps = {
  canvasId?: string;
};

export default function DownloadDesign({
  canvasId = 'paddlebox-canvas',
}: DownloadDesignProps) {
  const downloadDesign = useCallback(() => {
    const canvas = document.getElementById(
      canvasId
    ) as HTMLCanvasElement | null;

    if (!canvas) {
      alert('Design canvas not found. Please open your box designer first.');
      return;
    }

    try {
      const link = document.createElement('a');

      link.download = 'paddlebox-design.png';
      link.href = canvas.toDataURL('image/png');

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('PNG export failed:', error);
      alert(
        'Could not export the design. Please try again.'
      );
    }
  }, [canvasId]);

  return (
    <button
      type="button"
      onClick={downloadDesign}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>

      Download Design (PNG)
    </button>
  );
}
