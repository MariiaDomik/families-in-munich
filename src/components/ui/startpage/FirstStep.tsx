import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import Input from "@/components/common/input/Input";
import staticData from "@/services/staticData";

interface FirstStepProps {
    onNextClick: () => void;
}

export default function FirstStep({onNextClick} : FirstStepProps) {
    const language = "ENG";
    const data = staticData[language].startPage.firstStep;
    return (
        <div>
            <h1>{data.title}</h1>
            <Input label={data.label} name="PLZ" type="text"></Input>
            <Button onClick={onNextClick}>
                <Icon imgUrl={data.iconNext} className=""/>
            </Button>
        </div>
    )
}