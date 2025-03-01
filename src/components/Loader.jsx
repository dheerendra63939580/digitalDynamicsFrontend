import { Loading } from "./Loading";

export function Loader() {
    return (
        <div className="flex justify-center items-center">
            <div className="text-white bg-blue-500 px-2 py-1 rounded-lg flex gap-2 items-center">Loading <Loading/></div>
        </div>
    )
}