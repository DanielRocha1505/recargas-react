import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import './Faq.scss';

const Faq = () => {
  return (
    <section className="faq-container" id='faq'>
      <h2>Perguntas Frequentes</h2>
      <Accordion>
        <AccordionTab header="Qual é o horário de funcionamento?">
          <p>Nosso horário de funcionamento é de segunda a sexta, das 8h às 18h.</p>
        </AccordionTab>
        <AccordionTab header="Como posso entrar em contato?">
          <p>Você pode entrar em contato conosco pelo e-mail suporte@exemplo.com ou pelo telefone (11) 1234-5678.</p>
        </AccordionTab>
        <AccordionTab header="Quais são os métodos de pagamento aceitos?">
          <p>Aceitamos pagamentos por cartão de crédito, boleto bancário e transferência bancária.</p>
        </AccordionTab>
        <AccordionTab header="Vocês entregam para todo o Brasil?">
          <p>Sim, realizamos entregas para todo o Brasil com diferentes prazos e valores, dependendo da localidade.</p>
        </AccordionTab>
      </Accordion>
    </section>
  );
};

export default Faq;
