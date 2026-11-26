import { Component, signal, afterNextRender, ElementRef, inject, DestroyRef } from '@angular/core';

@Component({selector:'app-root', standalone:true, templateUrl:'./app.html', styleUrl:'./app.scss'})
export class App {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (preference.matches || !('IntersectionObserver' in window)) return;

      const elements = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>(
        '.about-photo, .about-copy, .section-heading, .goal, .process-intro, .steps article, .center-heading, .plan, .faq > div, .contact > :not(.contact-flower)'
      ));
      const reveal = (element: HTMLElement) => element.classList.remove('reveal-pending');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });

      elements.forEach(element => {
        element.classList.add('scroll-reveal');
        if (element.getBoundingClientRect().top >= window.innerHeight) {
          element.classList.add('reveal-pending');
          observer.observe(element);
        }
      });
      const onMotionChange = () => {
        if (preference.matches) {
          observer.disconnect();
          elements.forEach(reveal);
        }
      };
      preference.addEventListener('change', onMotionChange);
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        preference.removeEventListener('change', onMotionChange);
      });
    });
  }
  readonly menuOpen = signal(false);
  readonly whatsapp = 'https://wa.me/5551996540402?text=' + encodeURIComponent('Olá, Maria Luísa! Gostaria de saber mais sobre o acompanhamento nutricional.');
  readonly instagram = 'https://www.instagram.com/marialuisabeltran.nutri/';
  readonly goals = [
    {number:'01',title:'Uma rotina mais saudável',description:'Construir hábitos alimentares possíveis, respeitando suas preferências e o seu dia a dia.'},
    {number:'02',title:'Emagrecimento',description:'Cuidar da alimentação com um planejamento individualizado e uma escuta atenta às suas necessidades.'},
    {number:'03',title:'Hipertrofia',description:'Alinhar sua alimentação aos seus objetivos de ganho de massa muscular e à sua rotina de treinos.'},
    {number:'04',title:'Performance esportiva',description:'Pensar a nutrição junto com você para apoiar seus treinos e objetivos no esporte.'}
  ];
  readonly plans = [
    {
      name: 'Silver',
      eyebrow: 'O primeiro passo',
      description: 'Para começar a cuidar da alimentação com orientação individualizada.',
      features: ['30 dias de acompanhamento', 'Planejamento individualizado'],
      price: 'R$ 320',
      pricePeriod: '/mês'
    },
    {
      name: 'Gold',
      eyebrow: 'Continuidade no cuidado',
      description: 'Mais tempo para construir hábitos e acompanhar o seu processo.',
      features: ['90 dias de acompanhamento', 'Planejamento individualizado'],
      price: 'R$ 750',
      cashPrice: 'R$ 700'
    },
    {
      name: 'Platinum',
      eyebrow: 'Uma jornada com você',
      description: 'Um acompanhamento mais longo para avançar com constância.',
      features: ['180 dias de acompanhamento', 'Planejamento individualizado'],
      price: 'R$ 3.300',
      cashPrice: 'R$ 3.030'
    }
  ];
  readonly faqs = [
    {question:'Como funciona a primeira consulta?',answer:'A consulta pode durar até 2 horas. É um momento de escuta para conhecer sua rotina, sua história, suas preferências e seus objetivos. A partir dessa conversa, o planejamento alimentar é construído de forma individualizada.'},
    {question:'O atendimento pode ser online?',answer:'Sim! O acompanhamento está disponível nas modalidades online e presencial. Pelo WhatsApp, você pode consultar a disponibilidade e combinar a melhor opção para você.'},
    {question:'Para quem é o acompanhamento?',answer:'O atendimento é voltado para adolescentes e adultos que buscam melhorar hábitos alimentares, emagrecer, ganhar massa muscular ou apoiar sua performance esportiva.'},
    {question:'Como escolho o melhor plano?',answer:'Você pode conversar diretamente com a Maria Luísa sobre seus objetivos e sua rotina. Assim, vocês avaliam juntas ou juntos qual modalidade de acompanhamento faz mais sentido. Consulte as condições de pagamento pelo WhatsApp.'}
  ];
  closeMenu():void { this.menuOpen.set(false); }
  planContact(name:string):string { return 'https://wa.me/5551996540402?text=' + encodeURIComponent(`Olá, Maria Luísa! Gostaria de saber mais sobre o plano ${name}.`); }
}
