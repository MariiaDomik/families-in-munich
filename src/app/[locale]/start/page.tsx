"use client"

import MotionContainer from "@/components/common/MotionContainer";
import FirstStep from "@/components/startpage/FirstStep";
import SecondStep from "@/components/startpage/SecondStep";
import Map from "@/components/map/MapView";
import { useState } from "react";
import { User, UserForMap } from "@/types/User";
import { StartPageState } from "@/components/startpage/StartPageState";

const initialState: StartPageState = {
    district: null,
    children: [],
  };

export default function StartPage() {
  const [step, setStep] = useState< 0| 1 | 2 | 3 >(0);

  const [state, setState] = useState<StartPageState>(initialState);

  const [filters, setFilters] = useState({
    plz: "",
    district: "",
    children: [] as { gender: "boy" | "girl"; age: number }[],
  });

  const [users, setUsers] = useState<UserForMap[]>([]);

//   const handleSetPLZ = (plz: string, district?: string) => {
//     setFilters(prev => ({ ...prev, plz, district: district ?? "" }));
//     setStep(2);
//   };

//   const handleAddChild = (gender: "boy" | "girl", age: number) => {
//     setFilters(prev => ({
//       ...prev,
//       children: [...prev.children, { gender, age }]
//     }));
//   };

const steps = [
    {component: <FirstStep
        state={state}
        setState={setState}
        onNextClick={() => setStep(1)}
      />, color: "from-sky-100 to-indigo-200"},
    {component: <SecondStep
        state={state}
        setState={setState}
        onNextClick={() => setStep(2)}
      />, color: "from-pink-100 to-rose-200"},
    {component: <Map
        filteredUsers={users}
        currentUserLocation={[48.1351, 11.5820]}
      />, color: "from-lime-70 to-green-200"},
]

  const handleNextToMap = async () => {
    // тут заглушка, можно потом сделать fetch
    const nearbyUsers: UserForMap[] = await fetch("/api/match-users", {
      method: "POST",
      body: JSON.stringify(filters),
    }).then(res => res.json());
    setUsers(nearbyUsers);
    setStep(3);
  };

  return (
    <main className="">
              <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${steps[step].color} px-4`}>
              <div className="w-full max-w-md">
      <MotionContainer key={step.toString()}>
      {steps[step].component}
      </MotionContainer>
      </div>
      </div>
    </main>
  );
}
