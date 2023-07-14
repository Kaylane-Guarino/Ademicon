import React from "react";

const InitialHome = () => {
  const timelineData = [
    "Em 29 de novembro de 1991, nasce a Ademilar, a primeira administradora de consórcio de imóveis do Brasil.",
    "Em 1996, a estrutura societária da Ademilar passa a ser composta exclusivamente por membros da Família Schuchovsky.",
    "Em 2004, Tatiana Schuchovsky Reichmann assume o cargo de diretora-superintendente da Ademilar.",
    "Em 2006, a Ademilar inaugura uma nova sede em Curitiba (PR).",
    "Em 2014, a marca Ademilar adiciona a palavra 'investimento' ao logotipo.",
    "Em 2016, a Ademilar atinge seu primeiro bilhão em créditos comercializados e inicia o processo de licenciamento de marca.",
    "Em 2020, ocorre a fusão entre a Ademilar e a Conseg, surgindo a marca institucional Ademicon, além da aquisição da Startup Conguru.",
    "Em 2021, a marca Ademicon é apresentada ao mercado, com a comercialização de cotas de consórcio de serviços e crédito através do home equity.",
    "Em 2022, a Ademicon amplia sua presença nacional, cria a Ademicon Crédito e adquire a carteira de clientes do Consórcio Vemar.",
    "A Ademicon é a maior administradora independente de consórcio do Brasil, atuando há mais de 30 anos nos segmentos de imóveis, veículos e serviços.",
    "A Ademicon oferece o CaaS (Consortium as a Service) em parceria com grandes marcas de diversos segmentos.",
    "A Ademicon possui 162 unidades distribuídas pelo Brasil, permitindo a conquista planejada de imóveis, veículos e serviços.",
  ];

  return (
    <div className="w-full h-full border-2 shadow-md rounded flex flex-col-reverse lg:flex-row">
      <div className="w-full lg:w-3/6 h-full flex items-center justify-center overflow-auto mt-5 lg:mt-0">
        <div className="w-11/12 h-full flex flex-col justify-start overflow-y-auto">
          {timelineData.map((item, index) => (
            <li className="mb-4" key={index}>
              {item}
            </li>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-3/6 flex justify-center items-center">
        <img
          src="https://ademicon.com.br/wp-content/themes/ademicon2022/assets/webp/ademicon.webp"
          alt="ademicon"
          className="rounded h-80 lg:h-auto"
        />
      </div>
    </div>
  );
};

export default InitialHome;
