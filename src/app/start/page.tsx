"use client"
import FirstStep from "@/components/ui/startpage/FirstStep";
import SecondStep from "@/components/ui/startpage/SecondStep";
import MapView from "@/components/ui/users/MapView";
import { useState } from "react";

export default function StartPage() {
    const [step, setStep] = useState<1 | 2 | 3>(1);

    return (
        <main>
            {(step == 1) && <FirstStep onNextClick={() => setStep(2)}/>}
            {(step == 2) && <SecondStep onNextClick={() => setStep(3)}/>}
            {(step == 3) && <MapView/>}
        </main>
    )
}