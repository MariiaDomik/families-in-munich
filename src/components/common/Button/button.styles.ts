import { ButtonType } from "./button.types";

export const buttonBaseStyle =
    "px-4 py-2 rounded-2xl font-medium transition-colors text-sm foces:outline-none";

export const buttonStyleTypes = {
    [ButtonType.Primary] : "bg-green-600 text-white hover:bg-green-800",
    [ButtonType.Secondary] : "bg-gray-100 text-gray-800 hover:bg-gray-200",
    [ButtonType.Ghost] : "bg-transparent text-gray-700 hover:bg-gray-100",
};