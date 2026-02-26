import React from 'react';

const PageSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="font-display text-2xl md:text-3xl font-bold text-prospera-purple mb-4">{title}</h2>
    <div className="text-gray-700 space-y-4">{children}</div>
  </div>
);

const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-white animate-fade-in">
      <div className="container mx-auto px-6 py-12 md:py-20 max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-prospera-purple mb-8 text-center">Política de Privacidade</h1>

        <PageSection title="1. Introdução">
          <p>
            A sua privacidade é importante para nós. Esta Política de Privacidade explica como o Prospera Kids coleta, usa, compartilha e protege as informações pessoais de nossos usuários. Esta política se aplica a todos que utilizam nosso serviço de assinatura.
          </p>
        </PageSection>

        <PageSection title="2. Informações que Coletamos">
          <p>
            Coletamos informações que você nos fornece diretamente ao se cadastrar no serviço, como:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone (para acesso ao grupo do WhatsApp)</li>
            <li>Informações de pagamento (processadas por nossos parceiros de pagamento seguros)</li>
          </ul>
        </PageSection>

        <PageSection title="3. Como Usamos Suas Informações">
          <p>
            Utilizamos suas informações para:
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>Processar sua assinatura e pagamentos.</li>
            <li>Fornecer acesso ao grupo exclusivo do WhatsApp e enviar o conteúdo diário.</li>
            <li>Comunicar-se com você sobre sua conta, atualizações do serviço e ofertas promocionais.</li>
            <li>Melhorar nosso serviço e a experiência do usuário.</li>
          </ul>
        </PageSection>

        <PageSection title="4. Compartilhamento de Informações">
          <p>
            Nós não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Suas informações podem ser compartilhadas com prestadores de serviços que nos auxiliam na operação do nosso negócio (como processadores de pagamento), mas eles são obrigados a proteger suas informações e usá-las apenas para os fins para os quais foram contratados.
          </p>
        </PageSection>

        <PageSection title="5. Segurança dos Dados">
          <p>
            Implementamos medidas de segurança para proteger suas informações pessoais contra acesso, alteração, divulgação ou destruição não autorizada. No entanto, nenhum sistema de segurança é impenetrável, e não podemos garantir a segurança absoluta de suas informações.
          </p>
        </PageSection>
        
        <PageSection title="6. Seus Direitos">
          <p>
            Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Para exercer esses direitos, entre em contato conosco.
          </p>
        </PageSection>

        <PageSection title="7. Alterações nesta Política">
          <p>
            Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova política nesta página.
          </p>
        </PageSection>
      </div>
    </div>
  );
};

export default PrivacyPage;
