
import React, { useState } from 'react';
import { CheckIcon, StoryIcon, WhatsAppIcon, HeartIcon, SeedlingIcon, SparklesIcon, BrainIcon, ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, ChevronDownIcon, HeroIllustration } from './icons/Icons';

interface HomePageProps {
  onNavigateToMembers: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl h-full">
        <div className="rounded-full p-5 mb-4 inline-block">{icon}</div>
        <h3 className="font-display text-2xl font-bold text-prospera-purple mb-2">{title}</h3>
        <p className="text-gray-600 max-w-xs">{description}</p>
    </div>
);

const AgeGroupCard: React.FC<{ age: string; title: string; description: string; color: string }> = ({ age, title, description, color }) => (
  <div className={`bg-white rounded-3xl shadow-xl overflow-hidden border-b-8 ${color} transform transition-all duration-300 hover:-translate-y-2 h-full`}>
    <div className="p-8 flex flex-col h-full">
      <div>
        <span className={`inline-block px-4 py-1 rounded-lg text-xs font-bold uppercase tracking-wide text-white mb-4 ${color.replace('border-', 'bg-')}`}>
          {age}
        </span>
      </div>
      <h3 className="font-display text-2xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
        {description}
      </p>
    </div>
  </div>
);


const TestimonialCard: React.FC<{ quote: string; author: string; }> = ({ quote, author }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
        <p className="text-gray-700 italic mb-4">"{quote}"</p>
        <p className="font-bold text-prospera-purple text-right">- {author}</p>
    </div>
);


const HomePage: React.FC<HomePageProps> = ({ onNavigateToMembers }) => {
  const whyParticipateSlides = [
    {
      icon: <HeartIcon />,
      title: "Conexão Real Diária",
      description: "Substitua o tempo de tela por um ritual simples antes de dormir. Crie conexão emocional com seu filho em poucos minutos por dia.",
      bgColor: "bg-prospera-orange",
    },
    {
      icon: <SparklesIcon />,
      title: "Alívio Imediato da Culpa",
      description: "Um caminho estruturado que alivia o peso da rotina corrida. Sem metodologias complexas, preparações cansativas ou improviso.",
      bgColor: "bg-prospera-blue",
    },
    {
      icon: <SeedlingIcon />,
      title: "Educação de Caráter",
      description: "Ensine valores fundamentais e desenvolva a inteligência emocional de forma indireta e leve, sem gerar resistência na criança.",
      bgColor: "bg-prospera-pink",
    },
    {
      icon: <BrainIcon />,
      title: "Método Guiado na Prática",
      description: "Acesse conteúdos prontos para aplicar na vida real. Uma jornada de desenvolvimento coerente e progressiva para cada idade.",
      bgColor: "bg-prospera-green",
    }
  ];
  
  const faqs = [
    {
      question: "Como o conteúdo é dividido?",
      answer: "A plataforma é organizada por fases do desenvolvimento: 'Curioso' (0 a 3 anos e gestantes) focado em vínculo; 'Explorador' (4 a 7 anos) focado em valores; e 'Aventureiro' (8 a 12 anos) focado em tomada de decisão e caráter."
    },
    {
      question: "Como funciona a garantia prolongada de 30 dias?",
      answer: "Você tem 7 dias de garantia incondicional (reembolso total sem perguntas). Após isso, você tem uma extensão de até 30 dias na qual nossa equipe pode te orientar a adaptar o método para sua realidade. Nosso objetivo é garantir que você consiga fortalecer o vínculo."
    },
    {
      question: "E se eu não tiver tempo na rotina?",
      answer: "O método CONEC foi desenhado exatamente para pais sobrecarregados. O programa exige apenas cerca de 5 a 10 minutos por dia e não demanda planejamento ou estudos da sua parte."
    },
    {
      question: "O que recebo além das histórias?",
      answer: "Dependendo do plano escolhido, você recebe o Checklist do Momento Sem Estresse, Sinais de Progresso, Biblioteca de Perguntas, Plano de Emergência para Birras e Acesso Antecipado a novidades."
    }
  ];

  const testimonials = [
    {
      quote: "Comecei a ler para minha barriga com o material de gestante e agora leio para meu bebê. A conexão é inexplicável!",
      author: "Juliana M."
    },
    {
      quote: "Meu filho de 10 anos estava achando tudo 'de criança', mas os contos de dilemas do Prospera Kids ele adora. Gera ótimas conversas.",
      author: "Roberto D."
    },
    {
      quote: "As histórias são curtas, envolventes e sempre trazem uma bela lição. Recomendo para todos os pais que querem educar com valores.",
      author: "Carlos S."
    },
    {
      quote: "Assinei sem muita expectativa e me surpreendi. A qualidade do conteúdo é excelente e o impacto na rotina da família foi muito positivo.",
      author: "Mariana F."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === whyParticipateSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? whyParticipateSlides.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFaqToggle = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };


  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-100 to-blue-100 overflow-hidden">
        <div className="container mx-auto px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Column: Text */}
            <div className="text-center md:text-left animate-fade-in">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-prospera-purple mb-6 leading-tight">
                    Crie conexão com seu filho em 5 minutos por dia
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0 text-gray-700 leading-relaxed">
                    Reduza telas e forme o caráter do seu filho sem esforço ou planejamento. Um método prático para pais ocupados que transforma a culpa em momentos reais de conexão.
                </p>
                <button
                    onClick={scrollToPricing}
                    className="bg-prospera-green text-white font-bold py-5 px-12 rounded-full text-xl shadow-xl hover:bg-prospera-purple transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl animate-pulse-subtle"
                >
                    Assinar agora
                </button>
            </div>
            {/* Right Column: Illustration */}
            <div className="w-full max-w-lg mx-auto md:max-w-none animate-fade-in">
                <HeroIllustration />
            </div>
        </div>
      </section>

      {/* Age Groups Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-prospera-purple mb-4">
              Conteúdo para Cada Fase
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sabemos que cada idade tem sua linguagem. Por isso, personalizamos nossas histórias para acompanhar o desenvolvimento do seu filho.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <AgeGroupCard 
              age="Curioso (0–3 anos)"
              title="Vínculo e Afeto"
              description="Histórias afetivas, rimas, sons e estímulos sensoriais simples que fortalecem o vínculo entre mãe, pai e bebê desde a barriga."
              color="border-prospera-pink"
            />
            <AgeGroupCard 
              age="Explorador (4–7 anos)"
              title="Magia e Valores"
              description="Histórias lúdicas, divertidas e educativas que ensinam valores eternos de forma encantadora, despertando a imaginação."
              color="border-prospera-green"
            />
            <AgeGroupCard 
              age="Aventureiro (8–12 anos)"
              title="Dilemas e Caráter"
              description="Contos curtos com dilemas, escolhas e situações reais que desenvolvem inteligência emocional e caráter, sem parecer 'coisa de criança'."
              color="border-prospera-blue"
            />
          </div>
        </div>
      </section>

      {/* Why Participate Section */}
      <section className="py-20 bg-prospera-purple text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-12">
            Por que Participar?
          </h2>
          <div className="flex items-center justify-center">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
              aria-label="Motivo anterior"
            >
              <ArrowLeftIcon />
            </button>
            <div className="mx-4 w-full max-w-lg">
              <div key={currentSlide} className="animate-fade-in bg-white/90 text-prospera-purple rounded-2xl p-8 shadow-lg flex flex-col items-center text-center min-h-[340px]">
                <div className={`${whyParticipateSlides[currentSlide].bgColor} rounded-full p-5 mb-6 inline-block`}>
                  {whyParticipateSlides[currentSlide].icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{whyParticipateSlides[currentSlide].title}</h3>
                <p className="text-lg">
                  {whyParticipateSlides[currentSlide].description}
                </p>
              </div>
            </div>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
              aria-label="Próximo motivo"
            >
              <ArrowRightIcon />
            </button>
          </div>
          <div className="flex justify-center space-x-3 mt-8">
            {whyParticipateSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Ir para o motivo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-prospera-purple mb-12">Como Funciona?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<div className="bg-prospera-green rounded-full p-5"><CheckIcon /></div>}
              title="1. Selecione a Fase"
              description="Dentro da plataforma, cadastre o perfil do seu filho escolhendo a fase (Curioso, Explorador ou Aventureiro)."
            />
            <FeatureCard
              icon={<div className="bg-prospera-blue rounded-full p-5"><StoryIcon /></div>}
              title="2. Acesse o Conteúdo"
              description="Receba histórias, checklists e bônus específicos para a etapa exata de desenvolvimento em que ele está."
            />
            <FeatureCard
              icon={<div className="bg-prospera-pink rounded-full p-5"><HeartIcon /></div>}
              title="3. Crie a Conexão"
              description="Em poucos minutos diários, aplique na sua rotina e transforme a distância em um momento real de presença."
            />
          </div>
          <div className="mt-12">
            <button
              onClick={scrollToPricing}
              className="bg-prospera-green text-white font-bold py-4 px-10 rounded-full text-lg shadow-xl hover:bg-prospera-purple transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl animate-pulse-subtle"
            >
              Quero participar
            </button>
          </div>
        </div>
      </section>

      {/* Slogan Section */}
      <section className="bg-prospera-orange py-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white drop-shadow-md">
            Educação emocional prática para pais sem tempo.
          </h2>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-prospera-purple mb-4">Escolha o Seu Plano</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
            Tudo o que você precisa para criar momentos mágicos com seus filhos, por um preço que cabe no bolso.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {/* Starter */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 transform transition-transform duration-300 hover:-translate-y-2 flex flex-col h-full">
                <h3 className="font-display text-2xl font-bold text-gray-800">Starter</h3>
                <div className="my-6">
                    <p className="font-display text-4xl font-extrabold text-prospera-purple">R$ 29,90</p>
                    <p className="font-bold text-gray-500 text-sm">/mês</p>
                </div>
                <ul className="text-left space-y-3 mb-8 text-gray-600 text-sm flex-grow">
                    <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-prospera-green mr-2 flex-shrink-0" />
                        <span>Acesso às <strong>histórias diárias</strong></span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-prospera-green mr-2 flex-shrink-0" />
                        <span><strong>1 perfil</strong> de criança</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-prospera-green mr-2 flex-shrink-0" />
                        <span>Conteúdo básico por fase</span>
                    </li>
                </ul>
                <button onClick={onNavigateToMembers} className="w-full bg-gray-100 text-gray-800 font-bold py-3 rounded-full hover:bg-gray-200 transition-colors mt-auto">
                    Assinar Starter
                </button>
            </div>

            {/* Core (Main) */}
            <div className="bg-white rounded-2xl shadow-2xl border-4 border-prospera-green p-8 transform scale-105 z-10 relative flex flex-col h-full">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-prospera-green text-white font-bold py-1 px-4 rounded-full text-xs uppercase tracking-wider">
                        Recomendado
                    </span>
                </div>
                <h3 className="font-display text-3xl font-bold text-prospera-purple">Core</h3>
                <div className="my-6">
                    <p className="text-sm text-gray-500 mb-1">Teste o 1º mês por apenas R$19,90</p>
                    <p className="font-display text-5xl font-extrabold text-prospera-purple">R$ 39,90</p>
                    <p className="font-bold text-gray-500 text-sm">/mês</p>
                </div>
                <ul className="text-left space-y-4 mb-8 text-gray-700 flex-grow">
                    <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-prospera-green mr-2 flex-shrink-0 mt-0.5" />
                        <span><strong>Histórias diárias completas</strong></span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-prospera-green mr-2 flex-shrink-0 mt-0.5" />
                        <span><strong>Todas as fases liberadas</strong></span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-prospera-pink mr-2 flex-shrink-0 mt-0.5" />
                        <span><strong>Todos os 5 Bônus exclusivos</strong> incluídos</span>
                    </li>
                </ul>
                <button onClick={onNavigateToMembers} className="w-full bg-prospera-green text-white font-bold py-4 rounded-full shadow-lg hover:bg-prospera-purple hover:scale-105 transition-all mt-auto">
                    Assinar Plano Core
                </button>
            </div>

            {/* Scale */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 transform transition-transform duration-300 hover:-translate-y-2 flex flex-col h-full">
                <h3 className="font-display text-2xl font-bold text-gray-800">Scale</h3>
                <div className="my-6">
                    <p className="font-display text-4xl font-extrabold text-prospera-purple">R$ 59,90</p>
                    <p className="font-bold text-gray-500 text-sm">/mês</p>
                </div>
                <ul className="text-left space-y-3 mb-8 text-gray-600 text-sm flex-grow">
                    <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-prospera-green mr-2 flex-shrink-0" />
                        <span>Tudo do Plano Core</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-prospera-green mr-2 flex-shrink-0" />
                        <span><strong>2 ou mais perfis</strong> de filhos</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-prospera-green mr-2 flex-shrink-0" />
                        <span><strong>Conteúdos extras</strong> exclusivos da plataforma</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-prospera-green mr-2 flex-shrink-0" />
                        <span>Prioridade em novidades</span>
                    </li>
                </ul>
                <button onClick={onNavigateToMembers} className="w-full bg-gray-100 text-gray-800 font-bold py-3 rounded-full hover:bg-gray-200 transition-colors mt-auto">
                    Assinar Scale
                </button>
            </div>
          </div>

          <div className="mt-16 bg-blue-50 max-w-4xl mx-auto rounded-3xl p-8 border border-blue-100 text-left flex flex-col md:flex-row gap-6 items-center">
             <div className="bg-white p-4 rounded-full shadow-sm shrink-0">
                <CheckCircleIcon className="w-12 h-12 text-prospera-blue" />
             </div>
             <div>
                 <h4 className="font-display text-2xl font-bold text-gray-800 mb-2">Garantia Risco Zero 7 + 30 Dias</h4>
                 <p className="text-gray-600 mb-2">Se nos primeiros <strong>7 dias</strong> você sentir que o programa não é para você, devolvemos 100% do seu dinheiro, sem perguntas.</p>
                 <p className="text-gray-600 text-sm">E mais: como a conexão não acontece em 1 dia, você tem uma proteção estendida de <strong>até 30 dias</strong> para testar a aplicação na sua rotina com auxílio guiado da nossa equipe.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-prospera-pink">
        <div className="container mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white text-center mb-12">O que os Pais Dizem</h2>
          <div className="flex items-center justify-center max-w-2xl mx-auto">
              <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                  aria-label="Depoimento anterior"
              >
                  <ArrowLeftIcon />
              </button>
              <div className="mx-4 w-full">
                  <div key={currentTestimonial} className="animate-fade-in">
                      <TestimonialCard
                          quote={testimonials[currentTestimonial].quote}
                          author={testimonials[currentTestimonial].author}
                      />
                  </div>
              </div>
              <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                  aria-label="Próximo depoimento"
              >
                  <ArrowRightIcon />
              </button>
          </div>
          <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
              <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Ir para o depoimento ${index + 1}`}
              />
              ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-prospera-purple text-center mb-12">
            Dúvidas Frequentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b-2 border-gray-200 pb-4">
                <button
                  onClick={() => handleFaqToggle(index)}
                  className="w-full flex justify-between items-center text-left py-4 focus:outline-none"
                  aria-expanded={openFaqIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-xl font-bold text-gray-800">{faq.question}</span>
                  <span className={`transform transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon className="w-6 h-6 text-prospera-purple" />
                  </span>
                </button>
                {openFaqIndex === index && (
                  <div 
                    id={`faq-answer-${index}`}
                    className="mt-2 text-gray-700 animate-fade-in pr-8"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-prospera-blue py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Pronto para Transformar Noites em Memórias Inesquecíveis?</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Junte-se a centenas de famílias e comece hoje mesmo a construir um futuro mais próspero para seus filhos, não importa a idade.
          </p>
          <button
            onClick={scrollToPricing}
            className="bg-prospera-green text-white font-bold py-5 px-12 rounded-full text-xl shadow-xl hover:bg-prospera-purple transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl animate-pulse-subtle"
          >
            Assinar agora
          </button>
        </div>
      </section>
    </>
  );
};

export default HomePage;
