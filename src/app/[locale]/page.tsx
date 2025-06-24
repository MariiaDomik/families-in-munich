'use client'
import Button from "@/components/common/Button/Button";
import { ButtonType } from "@/components/common/Button/button.types";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const locale = useLocale();
  const t = useTranslations('home');
  return (
    <main className="min-h-screen">
      {/* Hero Section with background image */}
      <section className="relative md:h-4/6 h-2/3 flex items-center">
        <Image
          src="/images/family_in_city.png"
          alt="Family in city"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 container mx-auto px-6">
          <div className="md:text-left text-center md:max-w-lg max-w-full">
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-white drop-shadow-lg tracking-wide">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 drop-shadow-md font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <Button className="bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 px-8 py-3 rounded-full font-medium">
              {t('hero.cta_button')}
            </Button>
          </div>
        </div>
      </section>

      {/* Three colored sections with icons */}
      <section className="relative z-20 bg-white py-20 px-6">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-pink-100 to-rose-200 p-8 rounded-2xl shadow-lg text-gray-800 text-center border border-pink-200">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="font-light text-xl mb-4 text-gray-700">{t('features.loneliness.title')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('features.loneliness.description')}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-100 to-orange-200 p-8 rounded-2xl shadow-lg text-gray-800 text-center border border-amber-200">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="font-light text-xl mb-4 text-gray-700">{t('features.language.title')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('features.language.description')}</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-100 to-blue-200 p-8 rounded-2xl shadow-lg text-gray-800 text-center border border-cyan-200">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="font-light text-xl mb-4 text-gray-700">{t('features.community.title')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('features.community.description')}</p>
          </div>
        </div>
      </section>

      {/* How It Works - full width colored section */}
      <section className="relative z-30 bg-gradient-to-r from-emerald-100 to-teal-200 py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-light mb-12 text-gray-700 tracking-wide">{t('how_it_works.title')}</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30">
              <div className="text-3xl mb-4">📍</div>
              <p className="text-gray-700 font-medium">{t('how_it_works.steps.location')}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30">
              <div className="text-3xl mb-4">👶</div>
              <p className="text-gray-700 font-medium">{t('how_it_works.steps.children')}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30">
              <div className="text-3xl mb-4">🔍</div>
              <p className="text-gray-700 font-medium">{t('how_it_works.steps.search')}</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/30">
              <div className="text-3xl mb-4">💬</div>
              <p className="text-gray-700 font-medium">{t('how_it_works.steps.connect')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with semi-transparent background */}
      <section className="relative z-40 py-20 px-6">
        <Image
          src="/images/family_in_park.png"
          alt="Family in park"
          fill
          className="object-cover opacity-15"
        />
        <div className="relative z-10 container mx-auto text-center">
          <Link href={`/${locale}/start`}>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg px-10 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              {t('btn_start')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-50 bg-white py-16 px-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed font-light text-lg">
            {t('footer.description')}
          </p>
        </div>
      </footer>
    </main>
  );
}
