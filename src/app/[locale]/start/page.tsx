"use client"
import MotionContainer from "@/components/common/MotionContainer";
import FirstStep from "@/components/startpage/FirstStep";
import SecondStep from "@/components/startpage/SecondStep";
import MapView from "@/components/map/MapView";
import { useState } from "react";

export default function StartPage() {
    const [step, setStep] = useState<1 | 2 | 3>(1);

    return (
        <main>
            <MotionContainer key={step.toString()}>
                {(step == 1) && <FirstStep onNextClick={() => setStep(2)} />}
                {(step == 2) && <SecondStep onNextClick={() => setStep(3)} />}
                {(step == 3) && <MapView />}
            </MotionContainer>
        </main>
    )
}