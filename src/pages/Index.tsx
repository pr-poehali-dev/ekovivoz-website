import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/34be4908-0a8c-4602-bd28-7756960e0000/files/e97c3b08-d7f9-496a-a9af-6f91c8e960e0.jpg';

const PHONE = '+7 (952) 546-78-86';

const advantages = [
  {
    icon: 'Truck',
    title: 'Своя техника',
    text: 'Самосвалы, погрузчики и манипуляторы — без посредников и наценок.',
  },
  {
    icon: 'Clock',
    title: 'Выезд в день обращения',
    text: 'Подаём технику в течение часа после согласования заявки.',
  },
  {
    icon: 'FileCheck',
    title: 'Договор и документы',
    text: 'Работаем официально. Наличный и безналичный расчёт.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Гарантия сроков',
    text: 'Более 10 лет опыта. Соблюдаем договорённости до минуты.',
  },
];

const steps = [
  { n: '01', title: 'Заявка', text: 'Оставьте номер или пришлите фото объекта в WhatsApp.' },
  { n: '02', title: 'Расчёт', text: 'Назовём точную стоимость по фото за 5 минут.' },
  { n: '03', title: 'Выезд', text: 'Подаём технику и бригаду в день обращения.' },
  { n: '04', title: 'Готово', text: 'Убираем мусор, подписываем закрывающие документы.' },
];

const services = [
  { title: 'Вывоз строительного мусора', price: 'от 3000 ₽' },
  { title: 'Расчистка участков', price: 'от 2500 ₽/час' },
  { title: 'Спил аварийных деревьев', price: 'от 3500 ₽' },
  { title: 'Демонтаж старых построек', price: 'от 2500 ₽/час' },
];

const reviews = [
  {
    name: 'Дмитрий',
    area: 'Центральный р-н',
    text: 'После ремонта вывезли весь хлам за пару часов. Цена совпала с расчётом по фото.',
  },
  {
    name: 'Елена',
    area: 'Коминтерновский р-н',
    text: 'Расчистили заросший участок под дачу. Аккуратно, в срок, оставили чистоту.',
  },
  {
    name: 'Сергей',
    area: 'Левобережный р-н',
    text: 'Спилили два аварийных дерева у дома. Работали безопасно, ветки увезли бесплатно.',
  },
];

const faq = [
  {
    q: 'Как быстро вы приедете?',
    a: 'В большинстве случаев подаём технику в течение часа и выезжаем в день обращения.',
  },
  {
    q: 'Как рассчитывается стоимость?',
    a: 'Пришлите фото объекта в WhatsApp — назовём точную цену за 5 минут, без скрытых наценок.',
  },
  {
    q: 'Вы работаете с организациями?',
    a: 'Да. Заключаем договор, предоставляем документы, принимаем наличный и безналичный расчёт.',
  },
  {
    q: 'Что входит в расчистку участка?',
    a: 'Покос травы, удаление поросли, вывоз веток и мусора, корчевание пней по запросу.',
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

const Index = () => {
  const ref = useReveal();

  return (
    <div ref={ref} className="min-h-screen bg-background text-foreground font-sans antialiased">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="font-display text-xl font-700 tracking-tight uppercase">
            Чисто<span className="text-muted-foreground">.Вывоз</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition-colors">Услуги</a>
            <a href="#process" className="hover:text-foreground transition-colors">Как работаем</a>
            <a href="#reviews" className="hover:text-foreground transition-colors">Отзывы</a>
            <a href="#faq" className="hover:text-foreground transition-colors">Вопросы</a>
          </nav>
          <a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`}>
            <Button className="rounded-none font-display uppercase tracking-wide text-xs">
              <Icon name="Phone" size={15} className="mr-2" />
              Позвонить
            </Button>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-16">
        <div className="container grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-28">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
              <span className="h-px w-8 bg-foreground" />
              Воронеж · своя техника
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-700 leading-[0.95] uppercase text-balance">
              Вывоз мусора, расчистка участков и спил деревьев
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Убираем строительный мусор после демонтажа, расчищаем участки и пилим аварийные деревья. Выезд в день обращения.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`}>
                <Button size="lg" className="rounded-none font-display uppercase tracking-wide h-14 px-8">
                  <Icon name="Phone" size={18} className="mr-2" />
                  Позвонить сейчас
                </Button>
              </a>
              <a href="#request">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-none font-display uppercase tracking-wide h-14 px-8 border-foreground"
                >
                  Оставить заявку
                </Button>
              </a>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm">
              <div>
                <div className="font-display text-2xl font-700">10+ лет</div>
                <div className="text-muted-foreground">на рынке</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-2xl font-700">5 минут</div>
                <div className="text-muted-foreground">расчёт по фото</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <img
              src={HERO_IMG}
              alt="Спецтехника для вывоза строительного мусора"
              className="w-full h-[300px] lg:h-[560px] object-cover grayscale"
            />
            <div className="absolute -bottom-5 -left-5 hidden sm:block bg-foreground text-background p-6 max-w-[220px]">
              <Icon name="Recycle" size={24} className="mb-3" />
              <p className="text-sm leading-snug">
                Вывозим и утилизируем мусор официально, с документами
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="border-t border-border">
        <div className="container py-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {advantages.map((a, i) => (
              <div
                key={a.title}
                className="reveal bg-background p-8"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Icon name={a.icon} size={28} className="mb-5" />
                <h3 className="font-display text-lg uppercase font-600 mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / Pricing */}
      <section id="services" className="bg-foreground text-background">
        <div className="container py-24">
          <div className="reveal max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-background/50">Услуги и цены</span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase font-700 mt-3">
              Прозрачные цены без скрытых наценок
            </h2>
            <p className="mt-4 text-background/60">
              Точную стоимость рассчитаем по фото за 5 минут. Минимальный выезд — от 2500 ₽.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-background/15">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="reveal bg-foreground p-8 flex items-center justify-between group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="font-display text-xl uppercase">{s.title}</span>
                <span className="font-display text-xl text-background/70 group-hover:text-background transition-colors whitespace-nowrap">
                  {s.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="border-t border-border">
        <div className="container py-24">
          <div className="reveal max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Как мы работаем</span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase font-700 mt-3">
              Четыре шага до чистого объекта
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.n} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="font-display text-5xl font-700 text-muted-foreground/30 mb-4">{s.n}</div>
                <h3 className="font-display text-lg uppercase font-600 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-secondary border-t border-border">
        <div className="container py-24">
          <div className="reveal max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Отзывы</span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase font-700 mt-3">
              Нам доверяют в Воронеже
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {reviews.map((r, i) => (
              <div
                key={r.name}
                className="reveal bg-background p-8"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Icon key={k} name="Star" size={15} className="fill-foreground" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6">«{r.text}»</p>
                <div className="font-display uppercase text-sm">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.area}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request form */}
      <section id="request" className="border-t border-border">
        <div className="container py-24 grid lg:grid-cols-2 gap-16 items-start">
          <div className="reveal">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Заявка</span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase font-700 mt-3 max-w-md">
              Получите расчёт стоимости
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Оставьте контакты — перезвоним в течение 5 минут и назовём точную цену.
            </p>
            <div className="mt-10 space-y-4">
              <a
                href={`tel:${PHONE.replace(/[^+\d]/g, '')}`}
                className="flex items-center gap-4 group"
              >
                <span className="flex h-12 w-12 items-center justify-center border border-foreground">
                  <Icon name="Phone" size={18} />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground uppercase tracking-wide">Телефон</span>
                  <span className="font-display text-lg group-hover:underline">{PHONE}</span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center border border-foreground">
                  <Icon name="MapPin" size={18} />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground uppercase tracking-wide">Адрес</span>
                  <span className="font-display text-lg">г. Воронеж</span>
                </span>
              </div>
            </div>
          </div>

          <form className="reveal border border-border p-8" style={{ transitionDelay: '120ms' }}>
            <div className="space-y-5">
              <div>
                <label className="text-xs uppercase tracking-wide text-muted-foreground">Имя</label>
                <Input placeholder="Как к вам обращаться" className="rounded-none mt-2 h-12" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-muted-foreground">Телефон</label>
                <Input placeholder="+7 (___) ___-__-__" className="rounded-none mt-2 h-12" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-muted-foreground">Что нужно сделать</label>
                <Textarea
                  placeholder="Например: вывезти мусор после демонтажа стен"
                  className="rounded-none mt-2 min-h-[100px]"
                />
              </div>
              <Button type="button" size="lg" className="w-full rounded-none font-display uppercase tracking-wide h-14">
                Получить расчёт
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь на обработку данных
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-secondary border-t border-border">
        <div className="container py-24">
          <div className="reveal grid lg:grid-cols-[1fr_1.4fr] gap-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Вопросы</span>
              <h2 className="font-display text-3xl sm:text-4xl uppercase font-700 mt-3">
                Частые вопросы
              </h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {faq.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="font-display uppercase text-left text-base hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-foreground text-background">
        <div className="container py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="font-display text-2xl uppercase font-700">Чисто.Вывоз</div>
            <p className="text-background/60 text-sm mt-2">Вывоз мусора, расчистка, спил деревьев в Воронеже</p>
          </div>
          <a href={`tel:${PHONE.replace(/[^+\d]/g, '')}`}>
            <Button
              size="lg"
              variant="outline"
              className="rounded-none font-display uppercase tracking-wide h-14 px-8 border-background text-background bg-transparent hover:bg-background hover:text-foreground"
            >
              <Icon name="Phone" size={18} className="mr-2" />
              {PHONE}
            </Button>
          </a>
        </div>
      </footer>

      {/* Floating call button */}
      <a
        href={`tel:${PHONE.replace(/[^+\d]/g, '')}`}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-xl hover:scale-105 transition-transform"
        aria-label="Позвонить"
      >
        <Icon name="Phone" size={22} />
      </a>
    </div>
  );
};

export default Index;
