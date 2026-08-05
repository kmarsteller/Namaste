"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { instructors as STATIC } from "@/data/instructors";

type ArketaInstructor = { id: string; name: string; photo: string; bio: string };
type AddedInstructor  = { arketa_id: string; name: string; certs: string; photo: string };

function Avatar({ name, photo }: { name: string; photo: string }) {
  const isLocal = photo.startsWith("/");
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-stone-800">
      {photo ? (
        isLocal ? (
          <Image src={photo} alt={name} width={40} height={40} className="w-full h-full object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center text-stone-600 text-sm font-medium">
          {name.charAt(0)}
        </div>
      )}
    </div>
  );
}

export default function ManageFacultyPage() {
  const [muted,   setMuted]   = useState<Set<string>>(new Set());
  const [deleted, setDeleted] = useState<Set<string>>(new Set());
  const [added,   setAdded]   = useState<AddedInstructor[]>([]);
  const [arketa,  setArketa]  = useState<ArketaInstructor[]>([]);
  const [loading, setLoading]    = useState(true);
  const [busy, setBusy]          = useState<Record<string, boolean>>({});
  const [addingId, setAddingId]  = useState<string | null>(null);
  const [addCerts, setAddCerts]  = useState("200-hr");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [fac, ark] = await Promise.all([
      fetch("/api/faculty").then((r) => r.json()),
      fetch("/api/instructors").then((r) => r.json()),
    ]);
    setMuted(new Set(fac.muted ?? []));
    setDeleted(new Set(fac.deleted ?? []));
    setAdded(fac.added ?? []);
    setArketa(ark.instructors ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function call(action: string, payload: Record<string, string>) {
    const key = payload.arketaId;
    setBusy((b) => ({ ...b, [key]: true }));
    await fetch("/api/faculty", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, ...payload }),
    });
    await load();
    setBusy((b) => ({ ...b, [key]: false }));
    setConfirmDelete(null);
  }

  // Build the unified roster: static (non-deleted) + DB-added
  const addedIds  = new Set(added.map((a) => a.arketa_id));
  const staticIds = new Set(STATIC.map((i) => i.arketaId ?? "").filter(Boolean));

  const roster = [
    ...STATIC
      .filter((i) => !deleted.has(i.arketaId ?? i.name))
      .map((i) => {
        const ark = arketa.find((a) => a.name.toLowerCase() === i.name.toLowerCase());
        return {
          id: i.arketaId ?? i.name,
          name: i.name,
          photo: ark?.photo || i.photo,
          certs: i.certs.join(", "),
          isStatic: true as const,
        };
      }),
    ...added.map((a) => ({
      id: a.arketa_id,
      name: a.name,
      photo: a.photo,
      certs: a.certs,
      isStatic: false as const,
    })),
  ];

  // Arketa staff not in the roster and not deleted → candidates to add
  const candidates = arketa.filter(
    (a) => !staticIds.has(a.id) && !addedIds.has(a.id) && !deleted.has(a.id)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <p className="font-body text-xs text-stone-600 tracking-widest uppercase animate-pulse">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950">
      {/* Header */}
      <header className="border-b border-stone-800/60 bg-stone-950/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="font-body text-xs text-stone-500 hover:text-stone-300 transition-colors tracking-wide">
              ← Admin
            </Link>
            <span className="text-stone-700 select-none">·</span>
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-500">Manage Faculty</span>
          </div>
          <Link href="/instructors" target="_blank"
            className="font-body text-xs text-stone-600 hover:text-stone-300 transition-colors tracking-wide">
            View instructors ↗
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">

        <div>
          <h1 className="font-display text-3xl font-light text-stone-200 mb-1">Faculty</h1>
          <p className="font-body text-xs text-stone-600 tracking-wide leading-relaxed">
            <strong className="text-stone-500 font-normal">Mute</strong> hides an instructor temporarily — they stay in the list and you can unmute any time.{" "}
            <strong className="text-stone-500 font-normal">Remove from Site</strong> hides them and sends them back to the Arketa candidates list.
          </p>
        </div>

        {/* ── Roster ─────────────────────────────────────────────────────── */}
        <section>
          <h2 className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-4">
            On Site — {roster.filter((i) => !muted.has(i.id)).length} active
            {muted.size > 0 && <span className="text-stone-700 ml-2">· {muted.size} muted</span>}
          </h2>
          <div className="space-y-2">
            {roster.map((inst) => {
              const isMuted = muted.has(inst.id);
              const isBusy  = !!busy[inst.id];
              const isConfirming = confirmDelete === inst.id;

              return (
                <div key={inst.id}
                  className={`rounded-sm border transition-all ${
                    isMuted
                      ? "border-stone-800/40 bg-stone-900/20 opacity-55"
                      : "border-stone-800/60 bg-stone-900/35"
                  }`}>
                  <div className="flex items-center gap-4 px-4 py-3">
                    <Avatar name={inst.name} photo={inst.photo} />
                    <div className="flex-1 min-w-0">
                      <p className={`font-body text-sm ${isMuted ? "text-stone-500 line-through decoration-stone-700" : "text-stone-200"}`}>
                        {inst.name}
                      </p>
                      <p className="font-body text-[10px] text-stone-600 truncate">{inst.certs}</p>
                    </div>

                    {!isConfirming && (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Mute / Unmute */}
                        <button
                          onClick={() => call(isMuted ? "unmute" : "mute", { arketaId: inst.id })}
                          disabled={isBusy}
                          className={`px-3 py-1.5 rounded-sm border font-body text-[10px] tracking-[0.15em] uppercase transition-all disabled:opacity-40 ${
                            isMuted
                              ? "border-sage-500/40 bg-sage-500/10 text-sage-400 hover:bg-sage-500/20"
                              : "border-stone-700/60 text-stone-400 hover:border-stone-500 hover:text-stone-200"
                          }`}
                        >
                          {isBusy ? "…" : isMuted ? "Unmute" : "Mute"}
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => setConfirmDelete(inst.id)}
                          disabled={isBusy}
                          className="px-3 py-1.5 rounded-sm border border-red-900/40 text-red-700 hover:border-red-700/60 hover:text-red-400 font-body text-[10px] tracking-[0.15em] uppercase transition-all disabled:opacity-40"
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    {/* Confirm delete inline */}
                    {isConfirming && (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-body text-[10px] text-stone-500">Move back to Arketa list?</span>
                        <button
                          onClick={() => call("delete", { arketaId: inst.id })}
                          disabled={isBusy}
                          className="px-3 py-1.5 rounded-sm bg-red-900/40 border border-red-700/60 text-red-400 font-body text-[10px] tracking-[0.15em] uppercase transition-all disabled:opacity-40"
                        >
                          {isBusy ? "…" : "Yes, remove"}
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="font-body text-[10px] text-stone-600 hover:text-stone-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Add from Arketa ────────────────────────────────────────────── */}
        {candidates.length > 0 && (
          <section>
            <h2 className="font-body text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-1">
              In Arketa — Not on Site ({candidates.length})
            </h2>
            <p className="font-body text-[10px] text-stone-700 mb-4">
              Teaching upcoming classes on Arketa but not yet listed on the site.
            </p>
            <div className="space-y-2">
              {candidates.map((inst) => (
                <div key={inst.id} className="rounded-sm border border-stone-800/40 bg-stone-900/20">
                  <div className="flex items-center gap-4 px-4 py-3">
                    <Avatar name={inst.name} photo={inst.photo} />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm text-stone-400">{inst.name}</p>
                      {inst.bio && (
                        <p className="font-body text-[10px] text-stone-600 truncate">{inst.bio.slice(0, 80)}</p>
                      )}
                    </div>
                    <button
                      onClick={() => { setAddingId(addingId === inst.id ? null : inst.id); setAddCerts("200-hr"); }}
                      className="flex-shrink-0 px-3 py-1.5 rounded-sm border border-stone-700/60 hover:border-sage-500/50 text-stone-400 hover:text-sage-300 font-body text-[10px] tracking-[0.15em] uppercase transition-all"
                    >
                      {addingId === inst.id ? "Cancel" : "Add to site"}
                    </button>
                  </div>

                  {addingId === inst.id && (
                    <div className="px-4 pb-4 flex items-end gap-3 border-t border-stone-800/40 pt-3">
                      <div className="flex-1">
                        <label className="font-body text-[10px] tracking-[0.2em] uppercase text-stone-600 block mb-1">
                          Certifications
                        </label>
                        <input
                          type="text"
                          value={addCerts}
                          onChange={(e) => setAddCerts(e.target.value)}
                          placeholder="200-hr, Yin Yoga…"
                          className="w-full bg-stone-950/70 border border-stone-700/60 focus:border-stone-500 focus:outline-none rounded-sm px-3 py-2 font-body text-sm text-stone-200 placeholder:text-stone-700"
                        />
                      </div>
                      <button
                        onClick={async () => {
                          await call("add", { arketaId: inst.id, name: inst.name, certs: addCerts, photo: inst.photo });
                          setAddingId(null);
                        }}
                        disabled={!!busy[inst.id]}
                        className="flex-shrink-0 px-5 py-2 bg-sage-500 hover:bg-sage-400 text-stone-950 font-body font-medium text-xs tracking-[0.18em] uppercase rounded-sm transition-all disabled:opacity-40"
                      >
                        {busy[inst.id] ? "…" : "Confirm"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {candidates.length === 0 && (
          <p className="font-body text-xs text-stone-700 italic">
            All Arketa instructors are already on the site.
          </p>
        )}

      </div>
    </div>
  );
}
