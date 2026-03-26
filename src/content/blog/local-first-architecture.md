---
title: "How I Approach Local-First Architecture"
date: 2026-01-20
description: "Local-first software sounds simple but has sharp edges. Here's how I think about sync, conflict resolution, and when to reach for CRDTs versus simpler approaches."
tags: ["architecture", "databases", "engineering"]
---

"Local-first" as a term has been diluted by marketing, but the core idea is still compelling: your data lives on your device, the app works offline, and changes sync to the server when you have connectivity. The last point is where it gets hard.

## The Sync Problem

Every sync system is essentially solving one question: **what happens when two clients make conflicting changes to the same data?**

There are a few broad approaches:

**Last-write-wins (LWW)**: Whoever has the latest timestamp wins. Simple to implement, but clock skew is real and you lose data silently. Acceptable for user preferences, terrible for collaborative documents.

**Operational transformation (OT)**: Transform operations so they remain meaningful after remote changes are applied. Google Docs uses this. It's theoretically elegant and practically nightmarish to implement correctly. The correctness proofs are full of off-by-one errors in published papers.

**CRDTs** (Conflict-free Replicated Data Types): Data structures that merge deterministically regardless of operation order. The math is sound. The practical problem is that not every problem maps cleanly onto CRDT primitives, and the memory overhead for tombstones and version vectors adds up.

## When CRDTs Are Worth It

CRDTs make sense when:

- You have **true peer-to-peer sync** (no central server to mediate conflicts)
- The data model fits CRDT primitives: sets, counters, maps, sequences
- You can tolerate the memory overhead of the metadata

For most apps I work on, this doesn't apply. They have a server. The server can be the source of truth. What you actually want is **optimistic UI with backend reconciliation**.

```typescript
async function updateTask(id: string, patch: Partial<Task>) {
  // Apply optimistically
  localState.update(id, patch);

  try {
    const result = await api.patch(`/tasks/${id}`, patch);
    // Reconcile: server may have applied additional transforms
    localState.update(id, result.data);
  } catch (err) {
    // Roll back on failure
    localState.revert(id);
    throw err;
  }
}
```

This pattern is boring and it works. The UI feels instant, the server stays authoritative, and you have a well-defined rollback path.

## Conflict Resolution in Practice

When you do need to handle conflicts without a central authority, I reach for a simple version vector approach before touching CRDT libraries:

```typescript
type VersionedItem<T> = {
  data: T;
  version: number;      // monotonic, per-client
  clientId: string;
  updatedAt: number;    // unix ms, for human display only — not sync authority
};

function merge<T>(local: VersionedItem<T>, remote: VersionedItem<T>): VersionedItem<T> {
  if (remote.version > local.version) return remote;
  if (local.version > remote.version) return local;
  // Same version, different clients: deterministic tiebreak
  return local.clientId > remote.clientId ? local : remote;
}
```

It's not as theoretically clean as a CRDT but it's auditable, debuggable, and handles 95% of real sync conflicts correctly. Timestamps are for display only — using them for sync ordering is how you get subtle data corruption.

## What I'd Tell My Past Self

Don't start with CRDTs unless you've exhausted simpler options. The marginal benefit is rarely worth the complexity budget. Start with SQLite locally and a well-designed backend sync protocol. IndexedDB if you're in the browser. Most apps don't need anything fancier.

The hard part of local-first isn't the sync algorithm. It's the UX: how do you communicate to users that their changes are pending, synced, or in conflict? Getting that right is worth more engineering time than picking the right CRDT flavor.
