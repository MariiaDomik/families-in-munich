import staticData from "@/services/staticData";
import Input from "@/components/common/Input";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button/Button";


interface SecondStepProps {
    onNextClick: () => void;
}

export default function SecondStep({onNextClick} : SecondStepProps) {
    const language = "ENG";
    const data = staticData[language].startPage.secondStep;

    return (
        <div>
            <h1>{data.title}</h1>
            <div>
                <Icon imgUrl={data.imgGirl} className=""/>
                <Input type="number" name="girl"/>
                <Icon imgUrl={data.imgPlus} className=""/>
            </div>
            <div>
                <Icon imgUrl={data.imgBoy} className=""/>
                <Input type="number" name="boy"/>
                <Icon imgUrl={data.imgPlus} className=""/>
            </div>          
            <Button onClick={onNextClick}>
                <Icon imgUrl={data.iconNext} className=""/>
            </Button>
        </div>
    )
}