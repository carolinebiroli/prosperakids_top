
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white animate-fade-in">
      <div className="container mx-auto px-6 py-12 md:py-20 max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-prospera-purple mb-8 text-center">Nossa Missão</h1>
        
        <div className="text-center mb-12">
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                No Prospera Kids, acreditamos que a educação do coração começa muito antes do que imaginamos. Nossa missão é acompanhar sua família desde a gestação até a pré-adolescência, criando pontes de amor e aprendizado em cada fase do desenvolvimento.
            </p>
        </div>

        {/* Founder's Section */}
        <div className="my-16">
            <div className="bg-prospera-pink/10 p-8 md:p-12 rounded-2xl shadow-lg">
                <h2 className="font-display text-3xl font-bold text-prospera-purple mb-6 text-center">Uma mensagem da fundadora</h2>
                <div className="text-gray-700 space-y-4 text-lg leading-relaxed max-w-3xl mx-auto">
                    <p>Oi, eu sou a Carol Leal — mãe do Peter, educadora e sonhadora por natureza.</p>
                    <p>Quando criei o Prospera Kids, meu foco era a primeira infância. Mas, conversando com tantas mães, percebi uma coisa linda: a necessidade de conexão não termina aos 7 anos. E, na verdade, ela começa antes mesmo do bebê nascer.</p>
                    <p>Por isso, expandimos nosso coração. Agora, queremos abraçar as mães que ainda estão gerando vidas, oferecendo histórias que acalmam e conectam. Queremos continuar encantando as crianças pequenas com a magia dos valores. E, mais do que nunca, queremos apoiar os pais de pré-adolescentes com histórias que falam a língua deles, abordando dilemas reais e fortalecendo o caráter.</p>
                    <p>Eu acredito que prosperar é um processo contínuo. É plantar sementes de fé e generosidade na barriga, regar com ludicidade na infância e fortalecer as raízes na pré-adolescência.</p>
                    <p>Todos os dias, eu preparo esses conteúdos com o mesmo amor que dedico à educação do meu filho. Quero ajudar você a tornar a jornada da maternidade e paternidade mais leve, significativa e cheia de propósito.</p>
                    <div className="pt-6 mt-6 border-t border-prospera-pink/30 text-center font-bold text-prospera-purple space-y-2">
                        <p>Seja com um bebê no colo ou um filho quase do seu tamanho, o Prospera Kids é para você.</p>
                        <p>Vamos crescer juntos? 💛</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
            <h2 className="font-display text-3xl font-bold text-prospera-purple mb-4">Por que expandimos?</h2>
            <div className="text-gray-700 space-y-4">
                <p>
                    Percebemos que muitas famílias têm filhos em idades diferentes e desejam um conteúdo que una a todos, respeitando a linguagem de cada fase.
                </p>
                <p>
                    Para o <strong>Curioso (gestantes e 0-3 anos)</strong>, o foco é o afeto, a voz, o som e o vínculo. Para o <strong>Explorador (4-7 anos)</strong>, a magia, a fantasia e o lúdico são as ferramentas de ensino. Já para o <strong>Aventureiro (8-12 anos)</strong>, que muitas vezes acha que "história é coisa de bebê", criamos narrativas com desafios reais, escolhas e dilemas éticos que os desafiam a pensar e sentir.
                </p>
                <p>
                    Assim, o Prospera Kids se torna um parceiro de longo prazo na educação emocional da sua família, garantindo que os valores plantados continuem florescendo ano após ano.
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
