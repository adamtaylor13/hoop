export function sleep(seconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
}

// 1000% ripped from SO: https://stackoverflow.com/a/65843476/6535053
export function caseSensitiveCompare(a, b) {
    // Sort character by character, return early if possible
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        const aChar = a.charAt(i);
        const bChar = b.charAt(i);

        // If inputs match up to here, but lengths don't match, sort by length
        // istanbul ignore next - I can't figure out how this would happen
        if (!(aChar && bChar)) {
            return a.length - b.length;
        }

        // If we meet a differing character, return early
        const comp = aChar.localeCompare(bChar);
        if (comp !== 0) {
            return comp;
        }
    }
    // If we found nothing to do, the strings are equal
    return 0;
}
