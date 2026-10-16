
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Download,
  Save,
  Sparkles,
  LockKeyhole,
  RotateCcw,
  Box as BoxIcon,
  CheckCircle2,
  ImagePlus,
  Trash2,
} from 'lucide-react';
import BoxScene from '@/components/box-scene';

const faceNames = [
  'Front',
  'Back',
  'Left',
  'Right',
  'Top',
  'Bottom',
];

const initialFaces = [
  'YOUR BRAND',
  'A LITTLE MAGIC',
  'SIDE A',
  'SIDE B',
  'MADE WITH LOVE',
  'EST. 2026',
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
];

export default function Editor() {
  const { data: session, status } = useSession();

  const [faces, setFaces] = useState<string[]>(initialFaces);

  const [faceImages, setFaceImages] = useState<
    (string | null)[]
  >(Array(6).fill(null));

  const [active, setActive] = useState(0);
  const [accent, setAccent] = useState('#7557f6');
  const [projectName, setProjectName] =
    useState('My first box');

  const [account, setAccount] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function loadAccount() {
      if (status === 'loading') return;

      if (!session) {
        setAccount(null);
        return;
      }

      try {
        const response = await fetch('/api/me');

        if (!response.ok) {
          throw new Error('Could not load account');
        }

        const data = await response.json();

        if (!cancelled) {
          setAccount(data);
        }
      } catch {
        if (!cancelled) {
          setAccount(null);
        }
      }
    }

    void loadAccount();

    return () => {
      cancelled = true;
    };
  }, [session, status]);

  const subscribed =
    account?.subscription?.status === 'active' ||
    account?.subscription?.status === 'trialing';

  const plan = account?.subscription?.planKey;
  const count = account?.subscription?.downloadCount || 0;

  const allowance =
    plan === 'two_weeks' ? Infinity : 50;

  const downloadsLeft =
    allowance === Infinity
      ? 'Unlimited'
      : Math.max(0, allowance - count);

  function updateFaceText(value: string) {
    setFaces((previous) =>
      previous.map((face, index) =>
        index === active ? value : face
      )
    );
  }

  function uploadFaceImage(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setMessage(
        'Please choose a PNG, JPG, or WebP image.'
      );
      event.target.value = '';
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setMessage(
        'Images must be 5 MB or smaller.'
      );
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        setMessage(
          'Could not read the selected image.'
        );
        return;
      }

      const imageData = reader.result;

      setFaceImages((previous) =>
        previous.map((image, index) =>
          index === active ? imageData : image
        )
      );

      setMessage(
        `Image added to the ${faceNames[active]} face.`
      );
    };

    reader.onerror = () => {
      setMessage(
        'Could not read that image. Please try another.'
      );
    };

    reader.readAsDataURL(file);

    // Allows selecting the same file again.
    event.target.value = '';
  }

  function removeFaceImage() {
    setFaceImages((previous) =>
      previous.map((image, index) =>
        index === active ? null : image
      )
    );

    setMessage(
      `Image removed from the ${faceNames[active]} face.`
    );
  }

  function resetDesign() {
    setFaces([...initialFaces]);
    setFaceImages(Array(6).fill(null));
    setAccent('#7557f6');
    setActive(0);
    setProjectName('My first box');
    setMessage('Design reset to the starter layout.');
  }

  async function download() {
    if (status === 'loading') {
      setMessage('Please wait while your account loads.');
      return;
    }

    if (!session) {
      setMessage(
        'Please sign in to download your box.'
      );
      return;
    }

    if (!subscribed) {
      setMessage(
        'A subscription is required before you can download. Choose a plan to unlock exports.'
      );
      return;
    }

    if (
      allowance !== Infinity &&
      count >= allowance
    ) {
      setMessage(
        'You have used your 50 downloads for this subscription period. Upgrade or manage your plan to continue.'
      );
      return;
    }

    const canvas = document.getElementById(
      'paddlebox-canvas'
    ) as HTMLCanvasElement | null;

    if (!canvas) {
      setMessage(
        'The 3D preview is not ready. Please wait for it to load and try again.'
      );
      return;
    }

    try {
      const pngData = canvas.toDataURL('image/png');

      const safeName =
        projectName
          .trim()
          .replace(/[^a-z0-9]+/gi, '-')
          .replace(/^-+|-+$/g, '')
          .toLowerCase() || 'betty-box';

      const anchor = document.createElement('a');

      anchor.href = pngData;
      anchor.download = `${safeName}.png`;

      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      setMessage(
        'Your box preview has been downloaded as a PNG image.'
      );
    } catch (error) {
      console.error('PNG export failed:', error);

      setMessage(
        'Could not export the PNG. Check whether any image texture blocks export, then try again.'
      );
    }
  }

  return (
    <main className="min-h-[70vh] bg-[#f6f5fb]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="eyebrow">
              <Sparkles size={14} />
              BETTY DESIGN STUDIO
            </div>

            <h1 className="mt-3 text-3xl font-black tracking-tight">
              Your box workspace
            </h1>

            <p className="mt-2 text-slate-600">
              Edit six faces, upload artwork, and watch your
              packaging concept take shape.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/pricing"
              className="btn-secondary"
            >
              View plans
            </Link>

            <button
              type="button"
              onClick={download}
              className="btn-primary"
            >
              <Download size={17} />
              Download design (PNG)
            </button>
          </div>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_340px]">
          {/* 3D preview */}
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet/10 text-violet">
                  <BoxIcon />
                </span>

                <div>
                  <input
                    className="max-w-[230px] border-0 bg-transparent p-0 text-lg font-extrabold outline-none"
                    value={projectName}
                    maxLength={100}
                    onChange={(event) =>
                      setProjectName(event.target.value)
                    }
                    aria-label="Project name"
                  />

                  <p className="text-xs text-slate-500">
                    Auto-preview · Interactive 3D
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                Preview ready
              </span>
            </div>

            <BoxScene
              faces={faces}
              faceImages={faceImages}
              accent={accent}
              className="h-[420px] w-full sm:h-[540px]"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-5 py-3 text-xs font-semibold text-slate-500">
              <span>Drag to rotate · Scroll to zoom</span>

              <button
                type="button"
                onClick={resetDesign}
                className="inline-flex items-center gap-1.5 hover:text-violet"
              >
                <RotateCcw size={13} />
                Reset design
              </button>
            </div>
          </section>

          {/* Editor and subscription sidebar */}
          <aside className="space-y-5">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-extrabold">
                Edit your faces
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Select a side to edit its text or attach an
                image.
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {faceNames.map((faceName, index) => (
                  <button
                    type="button"
                    key={faceName}
                    onClick={() => setActive(index)}
                    className={`relative rounded-xl border px-2 py-3 text-xs font-bold transition ${
                      active === index
                        ? 'border-violet bg-violet/10 text-violet'
                        : 'border-slate-200 hover:border-violet/50'
                    }`}
                  >
                    {faceName}

                    {faceImages[index] && (
                      <span
                        className="absolute right-1 top-1 h-2 w-2 rounded-full bg-emerald-500"
                        title="Image attached"
                      />
                    )}
                  </button>
                ))}
              </div>

              <label className="mt-5 block text-sm font-bold">
                {faceNames[active]} face text
              </label>

              <input
                className="field mt-2"
                maxLength={22}
                value={faces[active]}
                onChange={(event) =>
                  updateFaceText(event.target.value)
                }
                placeholder="Enter your text"
              />

              <p className="mt-2 text-xs text-slate-400">
                {faces[active].length}/22 characters
              </p>

              {/* Face image upload */}
              <div className="mt-5 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-2">
                  <ImagePlus
                    size={18}
                    className="text-violet"
                  />

                  <label
                    htmlFor="face-image-upload"
                    className="text-sm font-bold"
                  >
                    Image for {faceNames[active]} face
                  </label>
                </div>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  PNG, JPG, or WebP. Maximum file size: 5 MB.
                </p>

                <input
                  id="face-image-upload"
                  className="field mt-3 w-full text-sm"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={uploadFaceImage}
                />

                {faceImages[active] ? (
                  <div className="mt-4 rounded-2xl border border-slate-200 p-3">
                    <img
                      src={faceImages[active]!}
                      alt={`${faceNames[active]} face artwork preview`}
                      className="h-36 w-full rounded-xl object-contain"
                    />

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-emerald-700">
                        Image attached
                      </span>

                      <button
                        type="button"
                        onClick={removeFaceImage}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:underline"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 rounded-xl border border-dashed border-slate-300 p-4 text-center">
                    <ImagePlus
                      size={24}
                      className="mx-auto text-slate-400"
                    />

                    <p className="mt-2 text-xs text-slate-500">
                      No image attached to this face yet.
                    </p>
                  </div>
                )}
              </div>

              {/* Accent color */}
              <label className="mt-5 block text-sm font-bold">
                Brand accent color
              </label>

              <div className="mt-2 flex items-center gap-3">
                <input
                  aria-label="Brand accent color picker"
                  type="color"
                  value={accent}
                  onChange={(event) =>
                    setAccent(event.target.value)
                  }
                  className="h-11 w-14 cursor-pointer rounded-lg border-0 bg-transparent"
                />

                <input
                  aria-label="Brand accent color hex value"
                  className="field min-w-0 flex-1"
                  value={accent}
                  onChange={(event) =>
                    setAccent(event.target.value)
                  }
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setMessage(
                    'Your edits are reflected in the live 3D preview. Persistent project saving still needs to be connected.'
                  )
                }
                className="btn-secondary mt-5 w-full"
              >
                <Save size={16} />
                Keep editing
              </button>
            </section>

            {/* Subscription status */}
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <LockKeyhole
                  size={18}
                  className="text-violet"
                />

                <h2 className="font-extrabold">
                  Subscription status
                </h2>
              </div>

              {status === 'loading' ? (
                <p className="mt-3 text-sm text-slate-500">
                  Checking account…
                </p>
              ) : !session ? (
                <>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Sign in to see your subscription status and
                    download allowance.
                  </p>

                  <Link
                    href="/sign-in"
                    className="btn-secondary mt-4 w-full"
                  >
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-sm text-slate-500">
                      Status
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${
                        subscribed
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {subscribed
                        ? 'Active'
                        : 'Not subscribed'}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-sm text-slate-500">
                      Downloads remaining
                    </span>

                    <span className="font-extrabold">
                      {subscribed ? downloadsLeft : '—'}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    {subscribed
                      ? plan === 'two_weeks'
                        ? 'Two-week plan · Unlimited downloads'
                        : 'Monthly plan · Up to 50 downloads per subscription period'
                      : 'Choose a plan to unlock downloads.'}
                  </p>

                  <Link
                    href="/pricing"
                    className="btn-primary mt-4 w-full justify-center"
                  >
                    {subscribed
                      ? 'View subscription'
                      : 'Subscribe to download'}
                  </Link>
                </>
              )}
            </section>
          </aside>
        </div>

        {/* Feedback message */}
        {message && (
          <div
            role="status"
            className="mt-5 flex items-start gap-3 rounded-2xl border border-violet/20 bg-violet/5 p-4 text-sm leading-6"
          >
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0 text-violet"
            />

            <div className="flex-1">
              {message}

              {message.toLowerCase().includes(
                'subscription'
              ) ||
              message.toLowerCase().includes(
                'subscribe'
              ) ? (
                <div>
                  <Link
                    className="mt-1 inline-block font-extrabold text-violet underline"
                    href="/pricing"
                  >
                    Go to pricing →
                  </Link>
                </div>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => setMessage('')}
              aria-label="Dismiss message"
              className="font-bold text-slate-400"
            >
              ×
            </button>
          </div>
        )}

        <p className="mt-5 text-xs leading-5 text-slate-400">
          PNG downloads contain the visible 3D preview, not a
          print-ready packaging dieline. Images are currently held
          in browser memory and are not permanently saved to your
          account. Download allowance checks in this page are
          client-side; enforce download limits on the server before
          production.
        </p>
      </div>
    </main>
  );
}
