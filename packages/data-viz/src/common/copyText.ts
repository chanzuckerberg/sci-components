/**
 * Writes `text` to the clipboard.
 *
 * The async Clipboard API is preferred, but nested srcdoc sandboxes — MCP
 * inspectors, Claude Desktop, and similar hosts — often omit `clipboard-write`
 * from their Permissions Policy, so `navigator.clipboard.writeText` rejects
 * even on a user click. `document.execCommand("copy")` only needs that click, so
 * it covers those hosts without the consumer having to patch the bundle.
 */
export function copyText(text: string): Promise<void> {
  if (!navigator.clipboard?.writeText) {
    return copyWithSelection(text);
  }

  return navigator.clipboard
    .writeText(text)
    .catch(() => copyWithSelection(text));
}

/**
 * Copies by selecting a transient textarea. Must run under user activation,
 * which a click still has after the Clipboard API has been refused.
 */
function copyWithSelection(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.setAttribute("aria-hidden", "true");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    document.body.appendChild(area);
    area.select();
    area.setSelectionRange(0, text.length);

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }

    area.remove();

    if (copied) {
      resolve();
    } else {
      reject(new Error("The host blocked clipboard access."));
    }
  });
}
