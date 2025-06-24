import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import Input from "@/components/common/Input";
import { munichDistricts } from "@/data/districts";
import Dropdown from "../common/Dropdown";
import { District } from "@/types/District";
import { StartPageState } from "./StartPageState";
import { useTranslations } from 'next-intl';

interface FirstStepProps {
    state: StartPageState;
    setState: (state: StartPageState) => void;
    onNextClick: () => void;
}

export default function FirstStep({ state, setState, onNextClick }: FirstStepProps) {
    const t = useTranslations();
    const handleDistrictSelect = (district: District) => {
        setState({ ...state, district });
    };
    return (
        <div>
            <h1>{t('startPage.firstStep.title')}</h1>
            <Dropdown
                label={t('startPage.firstStep.label')}
                options={munichDistricts.map((d, index: number) => { return { label: `${d.plz} - ${d.name}`, value: index }})}
                onChange={(value) => handleDistrictSelect(munichDistricts[parseInt(value)])}
            />
            <Button onClick={onNextClick}>
                <Icon imgUrl="/public/icons/iconNext.png" className="" />
            </Button>
        </div>
    )
}