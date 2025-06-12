import Image from "next/image"

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    imgUrl: string;
    className: string;
}

export default function Icon({imgUrl, className} : IconProps) {
    return (
        <div>
            <Image
            src={imgUrl}
            alt=""
            className={className}
            ></Image>
        </div>
    )
}