import conecta from "../assets/img/conecta.png";
import codeplac from "../assets/img/codeplac.jpeg";
import portifolio from "../assets/img/portifolio.png";
import polypla from "../assets/img/polypla.png";
import financeday from "../assets/img/financeday.png";
import nutricionista from "../assets/img/nutricionista.png";
import docurasdahavs from "../assets/img/docurasdahavs.png";
import draraquel from "../assets/img/draraquel.png";
import gbrazcontabilidade from "../assets/img/gbrazcontabilidade.png";
import yummy from "../assets/img/yummy.png";
import minhasFinancias from "../assets/img/minhas-financias.png";

export const projects = [
  {
    id: "financeday",
    name: "FinanceDay",
    image: financeday,
    repo: "https://github.com/gidelmarjr-art/financeday",
    tags: ["React", "Vite", "CSS", "Frankfurter API", "Vercel"],
    description: {
      pt: "Painel de câmbio global em tempo real com leitura analítica por IA — projeto construído com uma landing page de marketing e um dashboard funcional.",
      en: "Real-time global exchange rate dashboard with an AI analytics layer — built with a marketing landing page plus a functional dashboard."
    },
  },

  {
    id: "yummy",
    name: "Yummy - Restaurante",
    image: yummy,
    repo: "https://github.com/gidelmarjr-art/yummy",
    tags: ["React", "Python", "CSS", "JavaScript", "Vercel", "MySQL", "Render"],
    description: {
      pt: "Aplicação Web para restaurante, com landing page profissional desenvolvida para serviços como pedidos online, unindo competência técnica e escuta humana.",
      en: "Web application for restaurants, with a professional landing page developed for services such as online ordering, combining technical competence and human listening."
    },
  },

  {
    id: "codeplac",
    name: "Codeplac",
    image: codeplac,
    repo: "https://github.com/gidelmarjr-art/Codeplac",
    tags: ["React", "CSS", "Java", "MySQL"],
    description: {
      pt: "Plataforma online desenvolvida para facilitar a inscrição e gestão de competições de programação para estudantes de TI.",
      en: "Online platform built to streamline registration and management of programming competitions for IT students.",
    },
  },

  {
    id: "portifolio",
    name: "Portfólio",
    image: portifolio,
    repo: "https://github.com/gidelmarjr-art/port-foliio",
    tags: ["React", "JavaScript", "CSS", "Vercel"], // ✅ Removido o "React" duplicado
    description: {
      pt: "Este site: estrutura em React com componentes reutilizáveis, sistema de temas e i18n, e animações inspiradas em blueprints técnicos.",
      en: "This very site: a React structure with reusable components, a theme + i18n system, and animations inspired by technical blueprints.",
    },
  },

  {
    id: "polypla",
    name: "Polypla",
    image: polypla,
    repo: "https://github.com/gidelmarjr-art/polyypla-as",
    tags: ["React", "JavaScript", "CSS", "Vercel"], // ✅ Removido o "React" duplicado
    description: {
      pt: "Aplicação web de gerenciamento de tarefas e projetos com suporte a quadros interativos, organização de fluxo de trabalho e controle de status em tempo real.",
      en: "Task and project management web app with interactive boards, workflow organization and real-time status tracking.",
    },
  },

  {
    id: "minhas-financias",
    name: "Minhas Finanças",
    image: minhasFinancias, // ✅ Atualizado para usar a variável correta
    repo: "https://github.com/gidelmarjr-art/minhas-financias",
    tags: ["React", "Vite", "CSS", "JavaScript", "Vercel", "Supabase", "PostgreSQL"],
    description: {
      pt: "Painel de controle financeiro pessoal com visualização de gastos e receitas, desenvolvido com tecnologias modernas.",
      en: "Personal financial dashboard with expense and income visualization, built with modern technologies."
    }
  },

  {
    id: "docuras-da-havs",
    name: "Doçuras da Hav's",
    image: docurasdahavs,
    repo: "https://github.com/gidelmarjr-art/docuras-da-havs",
    tags: ["React", "Vite", "CSS", "JavaScript", "Vercel"],
    description: {
      pt: "Ateliê artesanal de bolos e doces personalizados, onde cada encomenda é desenhada, esculpida e decorada à mão para transformar datas especiais em memórias afetivas.",
      en: "Handcrafted cake and cookie boutique, where each order is designed, sculpted and decorated by hand to turn special dates into affectionate memories."
    },
  },

  {
    id: "nutricionista",
    name: "Ana Giedry - Nutricionista",
    image: nutricionista,
    repo: "https://github.com/gidelmarjr-art",
    tags: ["React", "Vite", "CSS", "JavaScript", "Vercel"],
    description: {
      pt: "Página web para atendimento nutricional individualizado, guiado por ciência e pela sua rotina real através de uma nutricionista formada em ensino superior.",
      en: "Website for individualized nutritional care, guided by science and your real routine through a nutritionist graduated in higher education.",
    },
  },

  {
    id: "draraquel",
    name: "Dra. Raquel - Médica da Fampilia e Paliativista",
    image: draraquel,
    repo: "https://github.com/gidelmarjr-art/draraquel",
    tags: ["React", "Vite", "CSS", "JavaScript", "Vercel"],
    description: {
      pt: "Landing page profissional desenvolvida para serviços de medicina de família e cuidados paliativos domiciliares, unindo competência técnica e escuta humana.",
      en: "Professional landing page developed for family medicine and home palliative care services, combining technical competence and human listening."
    },
  },

  {
    id: "conecta",
    name: "Conecta+",
    image: conecta,
    repo: "https://github.com/gidelmarjr-art/CONECTA-",
    tags: ["HTML", "CSS", "JavaScript", "Java", "MySQL", "Vercel"],
    description: {
      pt: "Plataforma digital centralizada desenvolvida para conectar voluntários, doadores e ONGs de forma ágil e segura.",
      en: "Centralized digital platform built to connect volunteers, donors and NGOs quickly and securely.",
    },
  },

  {
    id: "gbrazcontabilidade",
    name: "GBraz Contabilidade - Escritório Contábil",
    image: gbrazcontabilidade,
    repo: "https://github.com/gidelmarjr-art/gbraz-contabilidade",
    tags: ["React", "Vite", "CSS", "JavaScript", "Vercel"],
    description: {
      pt: "Landing page profissional desenvolvida para serviços contábeis para diversas áreas, unindo competência técnica e escuta humana.",
      en: "Professional landing page developed for various accounting services, combining technical competence and human listening."
    },
  },

];