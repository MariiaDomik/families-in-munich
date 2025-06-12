"use client"
import FirstStep from "@/components/ui/startpage/FirstStep";
import SecondStep from "@/components/ui/startpage/SecondStep";
import MapView from "@/components/ui/users/MapView";
import { useState } from "react";

export default function StartPage() {
    const [step, setStep] = useState<number>(0);

    return (
        <main>
            {(step == 0) && <FirstStep onNextClick={() => setStep(1)}/>}
            {(step == 1) && <SecondStep onNextClick={() => setStep(2)}/>}
            {(step == 2) && <MapView/>}
        </main>
    )
}