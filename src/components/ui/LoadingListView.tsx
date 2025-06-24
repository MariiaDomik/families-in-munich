interface Props {
    loadingText: string;
}

export default function LoadingListView( { loadingText }: Props) {
    return (
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
    <div className="py-8 text-center animate-pulse text-gray-400">{loadingText}</div>
    {[1, 2, 3, 4, 5].map((item) => (
      <div key={item} className="p-5 w-80 h-40 rounded-xl shadow hover:shadow-lg  bg-gray-200 animate-pulse">
      <div key={item} className="p-4 w-20 h-20 rounded-full shadow hover:shadow-lg  bg-gray-300 animate-pulse">
        </div>
        </div>
    ))}
    </div>
    )
}