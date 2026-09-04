import type { Observable } from "rxjs";
import { useEffect, useRef } from "react";

/**
 * Subscribes to an observable for as long as the component is mounted, the
 * hook equivalent of `PluginUIComponent`'s `subscribe`.
 *
 * The handler is read through a ref so that passing a fresh closure on every
 * render - which is the normal case, since these handlers read props and state
 * - does not tear down and rebuild the subscription.
 */
export function useSubscribe<T>(
  observable: Observable<T> | undefined,
  handler: (value: T) => void
): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!observable) return;

    const subscription = observable.subscribe((value) =>
      handlerRef.current(value)
    );

    return () => subscription.unsubscribe();
  }, [observable]);
}
