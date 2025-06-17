// app/components/forms/CompleteProfileForm.tsx
'use client';

import { useReducer, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { initialState, reducer } from './reducer/profileReducer';
import { Action, CompleteProfileData } from './reducer/profileTypes';

export default function CompleteProfileForm() {
  const [step, setStep] = useState(1);
  const [state, dispatch] = useReducer(reducer, initialState);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile submitted:', state);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">О себе</h2>
          <Input
            label="Город"
            value={state.city}
            onChange={(e) => dispatch({ type: 'updateField', key: 'city', value: e.target.value })}
            required
          />
          <Input
            label="Языки (через запятую)"
            value={state.languages.join(', ')}
            onChange={(e) =>
              dispatch({
                type: 'updateField',
                key: 'languages',
                value: e.target.value.split(',').map((s) => s.trim()),
              })
            }
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Дети (по желанию)</h2>
          {state.children.map((child, index) => (
            <div key={index} className="space-y-2 border p-4 rounded-xl mb-4">
              <Input
                label="Имя"
                value={child.name}
                onChange={(e) =>
                  dispatch({ type: 'updateChild', index, key: 'name', value: e.target.value })
                }
              />
              <Input
                label="Пол (м/ж)"
                value={child.gender}
                onChange={(e) =>
                  dispatch({ type: 'updateChild', index, key: 'gender', value: e.target.value })
                }
              />
              <Input
                label="Дата рождения (необязательно)"
                type="date"
                value={child.birthdate}
                onChange={(e) =>
                  dispatch({ type: 'updateChild', index, key: 'birthdate', value: e.target.value })
                }
              />
              <Input
                label="Или возраст / год рождения"
                value={child.age || ''}
                onChange={(e) =>
                  dispatch({ type: 'updateChild', index, key: 'age', value: e.target.value })
                }
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => dispatch({ type: 'removeChild', index })}
              >
                Удалить
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => dispatch({ type: 'addChild' })} variant="secondary">
            Добавить ребенка
          </Button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Хобби</h2>
          <Input
            label="Увлечения (через запятую)"
            value={state.hobbies.join(', ')}
            onChange={(e) =>
              dispatch({
                type: 'updateField',
                key: 'hobbies',
                value: e.target.value.split(',').map((s) => s.trim()),
              })
            }
          />
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Любимые места</h2>
          <Input
            label="Места, которые вы любите посещать (парки, кафе и т.д.)"
            value={state.favoritePlaces.join(', ')}
            onChange={(e) =>
              dispatch({
                type: 'updateField',
                key: 'favoritePlaces',
                value: e.target.value.split(',').map((s) => s.trim()),
              })
            }
          />
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Время для встреч</h2>
          <Input
            label="Например: Вечера по будням, выходные утро и т.д."
            value={state.availability}
            onChange={(e) =>
              dispatch({ type: 'updateField', key: 'availability', value: e.target.value })
            }
          />
        </div>
      )}

      <div className="flex justify-between">
        {step > 1 && (
          <Button type="button" onClick={prevStep} variant="secondary">
            Назад
          </Button>
        )}
        {step < 5 ? (
          <Button type="button" onClick={nextStep}>
            Далее
          </Button>
        ) : (
          <Button type="submit">Сохранить профиль</Button>
        )}
      </div>
    </form>
  );
}
