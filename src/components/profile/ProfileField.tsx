export function ProfileField({ label, value }: { label: string; value?: string }) {
    if (!value) return null;
    return (
        <div>
            <div className="text-sm text-gray-500">{label}:</div>
            <div className="text-gray-800 font-medium">{value}</div>
        </div>
    );
}