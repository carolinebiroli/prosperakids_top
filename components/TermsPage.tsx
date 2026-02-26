import React from 'react';

const PageSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="font-display text-2xl md:text-3xl font-bold text-prospera-purple mb-4">{title}</h2>
    <div className="text-gray-700 space-y-4">{children}</div>
  </div>
);

const TermsPage: React.FC = () => {
  return (
    <div className="bg-white animate-fade-in">
      <div className="container mx-auto px-6 py-12 md:py-20 max-w-4xl">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-prospera-purple mb-8 text-center">Termos de Uso</h1>

        <PageSection title="1. Aceitação dos Termos">
          <p>
            Ao assinar e utilizar os serviços do Prospera Kids ("Serviço"), você concorda em cumprir e estar vinculado aos seguintes termos e condições ("Termos de Uso"). Se você não concorda com estes termos, por favor, não utilize o Serviço.
          </p>
        </PageSection>

        <PageSection title="2. Descrição do Serviço">
          <p>
            O Prospera Kids fornece histórias infantis diárias e materiais complementares através de um grupo exclusivo no WhatsApp para assinantes. O conteúdo é focado em ensinar valores e desenvolver a inteligência emocional das crianças.
          </p>
        </PageSection>

        <PageSection title="3. Assinatura e Pagamento">
          <p>
            O serviço é oferecido através de uma assinatura mensal recorrente. O pagamento será processado no início de cada ciclo de faturamento. Ofertas promocionais, como o desconto no primeiro mês, são válidas apenas uma vez por usuário.
          </p>
        </PageSection>

        <PageSection title="4. Uso do Conteúdo">
          <p>
            Todo o conteúdo fornecido pelo Prospera Kids, incluindo textos, áudios e materiais complementares, é de propriedade exclusiva do Prospera Kids e protegido por leis de direitos autorais. O conteúdo é para uso pessoal e familiar e não pode ser compartilhado, distribuído, revendido ou utilizado para fins comerciais sem autorização expressa.
          </p>
        </PageSection>

        <PageSection title="5. Cancelamento e Garantia">
          <p>
            Você pode cancelar sua assinatura a qualquer momento. O acesso ao serviço continuará até o final do período de faturamento já pago. Oferecemos uma garantia de 7 dias. Se você não estiver satisfeito dentro dos primeiros 7 dias de assinatura, poderá solicitar o reembolso total do valor pago.
          </p>
        </PageSection>

        <PageSection title="6. Limitação de Responsabilidade">
          <p>
            O Prospera Kids se esforça para fornecer conteúdo de alta qualidade, mas não garante que o serviço estará livre de erros ou interrupções. Não nos responsabilizamos por quaisquer danos diretos ou indiretos resultantes do uso ou da incapacidade de usar o serviço.
          </p>
        </PageSection>

        <PageSection title="7. Alterações nos Termos">
          <p>
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Notificaremos os usuários sobre quaisquer alterações significativas. O uso contínuo do Serviço após tais alterações constituirá seu consentimento para com as mesmas.
          </p>
        </PageSection>
        
        <PageSection title="8. Contato">
          <p>
            Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco através da nossa página de Contato.
          </p>
        </PageSection>
      </div>
    </div>
  );
};

export default TermsPage;
