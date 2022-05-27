export const STATUS_EMOJI = {
    success: "✅",
    on_hold: "🔄",
    not_running: "🔄",
    blocked: "⏸ ",
    canceled: "➖ ",
    running: "▶️ ",
    failed: "⛔️",
};

export function getEmoji(status: string) {
    return STATUS_EMOJI[status] ?? status;
}
