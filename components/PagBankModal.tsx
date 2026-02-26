
import React, { useState, useEffect, useRef } from 'react';
import { User } from '../App';
import { LockIcon, CheckCircleIcon } from './icons/Icons';

// Adicionando a declaração do MercadoPago ao escopo global da janela para o TypeScript
declare global {
  interface Window {
    MercadoPago: any;
  }
}

interface MercadoPagoModalProps {
  user: User;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

type ViewState = 'FORM' | 'LOADING' | 'SUCCESS';

const PUBLIC_KEY = 'TEST-c841f662-b2ac-42a4-ab1c-664ea73aa663';

// Esta função simula a chamada ao backend.
const processPaymentOnBackend = async (paymentData: any): Promise<boolean> => {
    console.log("Enviando dados para o backend (simulação):", paymentData);
    
    // Simulação de sucesso após 2.5 segundos
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Backend respondeu com sucesso (simulação).");
            resolve(true);
        }, 2500);
    });
};


const MercadoPagoModal: React.FC<MercadoPagoModalProps> = ({ user, onClose, onPaymentSuccess }) => {
  const [viewState, setViewState] = useState<ViewState>('FORM');
  const [isBrickReady, setIsBrickReady] = useState(false);
  
  const cardPaymentBrickContainer = useRef<HTMLDivElement>(null);
  const brickController = useRef<any>(null);

  useEffect(() => {
    if (viewState !== 'FORM' || !cardPaymentBrickContainer.current) return;

    if (window.MercadoPago) {
      const mp = new window.MercadoPago(PUBLIC_KEY);
      
      const renderCardPaymentBrick = async () => {
        try {
          if (brickController.current) {
            brickController.current.unmount();
          }

          const bricksBuilder = mp.bricks();
          const controller = await bricksBuilder.create('cardPayment', cardPaymentBrickContainer.current!.id, {
            initialization: {
              amount: 19.90,
              payer: {
                email: user.email,
              },
            },
            customization: {
              visual: { 
                style: { theme: 'default' },
                // Garantimos que o título do Mercado Pago seja vazio para evitar duplicidade com o nosso JSX
                texts: {
                  paymentsTitle: '', 
                }
              },
              paymentMethods: { maxInstallments: 1 }
            },
            callbacks: {
              onReady: () => {
                console.log('Brick de pagamento está pronto.');
                setIsBrickReady(true);
              },
              onSubmit: async (formData: any) => {
                setViewState('LOADING');
                const isSuccess = await processPaymentOnBackend(formData);
                
                if (isSuccess) {
                  onPaymentSuccess();
                  setViewState('SUCCESS');
                } else {
                  alert('Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.');
                  setViewState('FORM');
                }
              },
              onError: (error: any) => {
                console.error("Erro no Brick do Mercado Pago:", error);
                alert('Ocorreu um erro ao carregar o formulário de pagamento. Por favor, tente novamente.');
                onClose();
              },
            },
          });
          brickController.current = controller;
        } catch (error) {
            console.error("Erro ao inicializar o Brick do Mercado Pago:", error);
        }
      };

      renderCardPaymentBrick();
    }

    return () => {
      if (brickController.current) {
        brickController.current.unmount();
        brickController.current = null;
      }
    };
  }, [viewState, user.email, onClose, onPaymentSuccess]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative my-8">
        <button onClick={onClose} disabled={viewState === 'LOADING'} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 disabled:opacity-50" aria-label="Fechar modal">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        {viewState === 'SUCCESS' ? (
          <div className="text-center animate-fade-in py-8">
            <div className="bg-prospera-green/10 rounded-full p-3 mb-4 inline-block">
              <CheckCircleIcon className="w-16 h-16 text-prospera-green" />
            </div>
            <h3 className="font-display text-2xl font-bold text-prospera-purple mb-4">Pagamento Confirmado!</h3>
            <p className="text-gray-600 mb-8">Sua assinatura está ativa e você já tem acesso total ao conteúdo.</p>
            <button 
                onClick={onClose}
                className="w-full bg-prospera-blue text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
                Acessar Área de Membros
            </button>
          </div>
        ) : (
          <>
            {viewState !== 'LOADING' && (
              <div className="mb-6">
                <h3 className="font-bold text-xl text-gray-800 mb-4">Cartão de crédito ou débito</h3>
                <div className="flex gap-2 mb-6">
                  {/* Ícones de cartões simulando a imagem */}
                  <div className="border border-gray-200 rounded px-1.5 py-1 bg-white flex items-center shadow-sm">
                    <img src="https://logodownload.org/wp-content/uploads/2014/07/mastercard-logo-7.png" alt="Mastercard" className="h-4 object-contain" />
                  </div>
                  <div className="border border-gray-200 rounded px-1.5 py-1 bg-white flex items-center shadow-sm">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 object-contain" />
                  </div>
                  <div className="border border-gray-200 rounded px-1.5 py-1 bg-white flex items-center shadow-sm">
                    <img src="https://logodownload.org/wp-content/uploads/2016/10/elo-logo-0.png" alt="Elo" className="h-4 object-contain" />
                  </div>
                  <div className="border border-gray-200 rounded px-1.5 py-1 bg-white flex items-center shadow-sm">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/1200px-American_Express_logo_%282018%29.svg.png" alt="Amex" className="h-4 object-contain" />
                  </div>
                  <div className="border border-gray-200 rounded px-1.5 py-1 bg-white flex items-center shadow-sm">
                    <img src="https://logodownload.org/wp-content/uploads/2016/11/hipercard-logo-1.png" alt="Hipercard" className="h-4 object-contain" />
                  </div>
                </div>
              </div>
            )}

            {viewState === 'LOADING' ? (
                 <div className="text-center py-10 min-h-[350px] flex flex-col justify-center">
                    <div className="flex justify-center items-center">
                      <svg className="animate-spin h-8 w-8 text-[#009EE3]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="ml-4 font-bold text-lg text-gray-700">Processando pagamento...</p>
                    </div>
                 </div>
            ) : (
              <div className="animate-fade-in">
                <div id="cardPaymentBrick_container" ref={cardPaymentBrickContainer} className="min-h-[300px]"></div>
                
                {/* O botão VOLTAR agora aparece logo abaixo do botão "Pagar" gerado pelo Brick */}
                <div className={`mt-2 text-center transition-opacity duration-300 ${isBrickReady ? 'opacity-100' : 'opacity-0'}`}>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-sm font-semibold transition-colors underline py-2"
                    >
                        Voltar
                    </button>
                </div>
              </div>
            )}
            
            <div className="mt-6 text-center text-[10px] text-gray-400 flex items-center justify-center">
                <LockIcon className="w-3 h-3 mr-1.5" />
                <span>Pagamento seguro processado pelo Mercado Pago.</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MercadoPagoModal;
