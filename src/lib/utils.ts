export function joinClassnames(...classes: (string | undefined) [] ) : string {
    return classes.filter(Boolean).join(" ") || "";
}