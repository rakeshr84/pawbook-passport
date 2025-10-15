import React, { useEffect, useRef, useState } from "react";
import type { UploadedFile } from "@/components/InlineUploadButton";

function dataURLtoBlob(dataUrl: string): Promise<Blob> {
  return fetch(dataUrl).then(r => r.blob());
}

function asFile(blob: Blob, filename: string, type = "image/png"): File {
  return new File([blob], filename, { type });
}

const DPR = typeof window !== "undefined" ? Math.max(1, window.devicePixelRatio || 1) : 1;

export function SignatureModal({
  open, onClose, petId, context, onUpload,
}: {
  open: boolean;
  onClose: () => void;
  petId: string;
  context: "signature" | "pre-travel" | "medical-records";
  onUpload: (files: UploadedFile[]) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [paths, setPaths] = useState<{x:number;y:number}[][]>([]);
  const [drawing, setDrawing] = useState(false);
  const [typed, setTyped] = useState("");

  // Size canvas crisply for DPR
  useEffect(() => {
    if (!open) return;
    const cvs = canvasRef.current!;
    const cssW = 600; const cssH = 200;
    cvs.style.width = cssW + "px";
    cvs.style.height = cssH + "px";
    cvs.width = Math.floor(cssW * DPR);
    cvs.height = Math.floor(cssH * DPR);
    const ctx = cvs.getContext("2d")!;
    ctx.scale(DPR, DPR);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2.2;
    ctx.clearRect(0,0,cssW,cssH);
  }, [open]);

  const getPos = (e: any) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    if (e.touches?.[0]) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e:any) => {
    e.preventDefault();
    const p = getPos(e);
    setPaths(prev => [...prev, [p]]);
    setDrawing(true);
  };
  const move = (e:any) => {
    if (!drawing) return;
    const p = getPos(e);
    setPaths(prev => {
      const next = [...prev];
      next[next.length - 1] = [...next[next.length - 1], p];
      return next;
    });
  };
  const end = () => setDrawing(false);

  // Redraw on every path change
  useEffect(() => {
    const cvs = canvasRef.current; if (!cvs) return;
    const ctx = cvs.getContext("2d")!;
    const cssW = cvs.clientWidth, cssH = cvs.clientHeight;
    ctx.clearRect(0,0,cssW,cssH);
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 2.2;
    paths.forEach(seg => {
      ctx.beginPath();
      seg.forEach((pt, i) => i ? ctx.lineTo(pt.x, pt.y) : ctx.moveTo(pt.x, pt.y));
      ctx.stroke();
    });
  }, [paths]);

  const clear = () => setPaths([]);
  const undo = () => setPaths(prev => prev.slice(0, -1));

  const saveCanvas = async () => {
    const cvs = canvasRef.current!;
    const png = cvs.toDataURL("image/png");
    const blob = await dataURLtoBlob(png);
    const file = asFile(blob, `signature-${Date.now()}.png`, "image/png");
    const url = URL.createObjectURL(file);
    const uploaded = {
      id: crypto.randomUUID(),
      petId,
      context,
      name: file.name,
      mime: file.type,
      size: file.size,
      url,
      createdAt: new Date().toISOString(),
    };
    onUpload([uploaded]);
    onClose();
  };

  const saveTyped = async () => {
    if (!typed.trim()) return;
    // Simple SVG render of typed signature
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="200">
        <rect width="100%" height="100%" fill="white"/>
        <text x="50%" y="55%" font-size="56" font-family="\"Brush Script MT\", \"Segoe Script\", cursive"
              text-anchor="middle" fill="#111827">${typed.replace(/[<>&]/g,'')}</text>
      </svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const file = asFile(blob, `signature-${Date.now()}.svg`, "image/svg+xml");
    const url = URL.createObjectURL(file);
    const uploaded = {
      id: crypto.randomUUID(),
      petId,
      context,
      name: file.name,
      mime: file.type,
      size: file.size,
      url,
      createdAt: new Date().toISOString(),
    };
    onUpload([uploaded]);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-light text-gray-900">Add Signature</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">✕</button>
        </div>

        {/* Draw */}
        <div className="bg-gray-50 rounded-2xl p-3 border">
          <canvas
            ref={canvasRef}
            onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
            onTouchStart={start} onTouchMove={move} onTouchEnd={end}
            className="w-full h-[200px] touch-none rounded-xl bg-white"
          />
          <div className="flex gap-2 mt-3">
            <button onClick={undo}  className="px-4 py-2 rounded-xl border hover:bg-gray-50">Undo</button>
            <button onClick={clear} className="px-4 py-2 rounded-xl border hover:bg-gray-50">Clear</button>
            <button onClick={saveCanvas} className="ml-auto px-6 py-2 rounded-full bg-gray-900 text-white">Save & Attach</button>
          </div>
        </div>

        {/* OR typed signature */}
        <div className="mt-6">
          <div className="text-sm text-gray-600 font-light mb-2">Or type your name:</div>
          <div className="flex gap-2">
            <input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border"
              placeholder="e.g., Alex Johnson"
            />
            <button onClick={saveTyped} className="px-4 py-3 rounded-xl border hover:bg-gray-50">Generate</button>
          </div>
          <div className="text-xs text-gray-500 mt-2">Tip: You can also upload a photo of a signature below.</div>
        </div>
      </div>
    </div>
  );
}
