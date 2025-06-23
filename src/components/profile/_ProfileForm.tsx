'use client';

import { useProfile } from '@/hooks/useProfile';
import BaseInfo from './steps/BaseInfo';
import ChildrenInfo from './steps/ChildrenInfo';
import HobbiesInfo from './steps/HobbiesInfo';
import PlacesInfo from './steps/PlacesInfo';
import AvailabilityInfo from './steps/AvailabilityInfo';
import Button from '@/components/common/Button/Button';
import { ButtonType } from '@/components/common/Button/button.types';
import { useState } from 'react';

export default function ProfileForm() {
    const {
        profile,
        isLoading,
        isSaving,
        error,
        saveProfile,
        updateField,
        addChild,
        updateChild,
        removeChild,
        resetError
    } = useProfile();

    const [currentStep, setCurrentStep] = useState(0);
    const steps = [
        { title: 'Basic Info', component: BaseInfo },
        { title: 'Children', component: ChildrenInfo },
        { title: 'Hobbies', component: HobbiesInfo },
        { title: 'Places', component: PlacesInfo },
        { title: 'Availability', component: AvailabilityInfo }
    ];

    const CurrentStepComponent = steps[currentStep].component;

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSave = async () => {
        await saveProfile();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Complete Your Profile
                    </h1>
                    <p className="text-gray-600">
                        Help other families get to know you better
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        {steps.map((step, index) => (
                            <div key={index} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                    index <= currentStep 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-200 text-gray-600'
                                }`}>
                                    {index + 1}
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-16 h-1 mx-2 ${
                                        index < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}></div>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                        Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span>{error}</span>
                            <button 
                                onClick={resetError}
                                className="text-red-500 hover:text-red-700"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                {/* Step Content */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <CurrentStepComponent 
                        state={profile}
                        dispatch={({ type, ...payload }) => {
                            switch (type) {
                                case 'updateField':
                                    updateField(payload.key, payload.value);
                                    break;
                                case 'addChild':
                                    addChild();
                                    break;
                                case 'updateChild':
                                    updateChild(payload.index, payload.key, payload.value);
                                    break;
                                case 'removeChild':
                                    removeChild(payload.index);
                                    break;
                            }
                        }}
                    />
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <Button
                        type="button"
                        buttonType={ButtonType.Secondary}
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className="px-6 py-3"
                    >
                        Previous
                    </Button>

                    <div className="flex gap-4">
                        <Button
                            type="button"
                            buttonType={ButtonType.Primary}
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-6 py-3"
                        >
                            {isSaving ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Saving...
                                </div>
                            ) : (
                                'Save Profile'
                            )}
                        </Button>

                        {currentStep < steps.length - 1 && (
                            <Button
                                type="button"
                                buttonType={ButtonType.Primary}
                                onClick={handleNext}
                                className="px-6 py-3"
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 