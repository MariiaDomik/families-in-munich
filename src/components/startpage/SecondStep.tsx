import { useTranslations } from 'next-intl';
import Input from "@/components/common/Input";
import Icon from "@/components/common/Icon";
import Button from "@/components/common/Button/Button";
import { useState } from "react";
import { ChildSimple } from "@/types/Child";
import { StartPageState } from '@/components/startpage/StartPageState';
import { Gender } from "@/types/Gender";

interface SecondStepProps {
  state: StartPageState;
  setState: (state: StartPageState) => void;
  onNextClick: () => void;
}

export default function SecondStep({ state, setState, onNextClick }: SecondStepProps) {
  const t = useTranslations();
  const addChild = (gender: Gender) => {
    const label = gender === Gender.female ? t('profile.children.child') : t('profile.children.child');
    const age = prompt(t('profile.children.age') + ` (${label})`);
    if (age) {
      const newChild = { gender, age: parseInt(age) };
      setState({ ...state, children: [...state.children, newChild] });
    }
  };

  const handleNext = () => {
    onNextClick();
  };

  return (
    <div>
      <h1>{t('startPage.secondStep.title')}</h1>
      <div className="flex gap-4">
        <Button onClick={() => addChild(Gender.female)}>
          <Icon imgUrl="/public/icons/iconGirl.png" className="" /> {t('profile.children.child')}
        </Button>
        <Button onClick={() => addChild(Gender.male)}>
          <Icon imgUrl="/public/icons/iconBoy.png" className="" /> {t('profile.children.child')}
        </Button>
      </div>
      <ul className="mt-4">
        {state.children.map((child, index) => (
          <li key={index}>{t('profile.children.child')} - {child.age} {t('profile.children.age')}</li>
        ))}
      </ul>
      <Button onClick={handleNext} className="mt-4">
        <Icon imgUrl="/public/icons/iconNext.png" className="" /> {t('header.nav.next') || 'Далее'}
      </Button>
    </div>
  );
}