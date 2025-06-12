import { ButtonType } from "./button.types"
import { buttonBaseStyle, buttonStyleTypes } from "./button.styles"
import { joinClassnames } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType? : ButtonType;
}

export default function Button({ children, className, buttonType = ButtonType.Primary, ...props} : ButtonProps) {
    return (
        <button className={ joinClassnames( buttonBaseStyle, buttonStyleTypes[buttonType], className )} {...props} >
            {children}
        </button>
    )
}