/**
 * A tiny localStorage-backed store shaped for useSyncExternalStore.
 *
 * The server snapshot is always the fallback, so the markup React hydrates
 * matches what was rendered; the stored value is picked up on the pass
 * straight after hydration. Writes from another tab are mirrored back in.
 */
export type PersistedStore<T> = {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
  set: (updater: (current: T) => T) => void;
};

export function createPersistedStore<T>(key: string, fallback: T): PersistedStore<T> {
  let snapshot = fallback;
  let loaded = false;
  const listeners = new Set<() => void>();

  const emit = () => {
    for (const listener of listeners) listener();
  };

  const load = () => {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) snapshot = JSON.parse(raw) as T;
    } catch {
      // Storage can be unavailable (private mode, blocked cookies). The store
      // still works for this session, it just will not survive a reload.
    }
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key !== key) return;
    loaded = false;
    load();
    emit();
  };

  return {
    subscribe(listener) {
      load();
      if (listeners.size === 0) window.addEventListener("storage", onStorage);
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) window.removeEventListener("storage", onStorage);
      };
    },

    getSnapshot() {
      load();
      return snapshot;
    },

    getServerSnapshot() {
      return fallback;
    },

    set(updater) {
      load();
      snapshot = updater(snapshot);
      try {
        window.localStorage.setItem(key, JSON.stringify(snapshot));
      } catch {
        // See above.
      }
      emit();
    },
  };
}
