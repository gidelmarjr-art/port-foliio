import conecta from "../assets/img/conecta.png";
import codeplac from "../assets/img/codeplac.jpeg";
import portifolio from "../assets/img/portifolio.png";
import polypla from "../assets/img/polypla.png";
import financeday from "../assets/img/financeday.png";

export const projects = [
  {
    id: "conecta",
    name: "Conecta+",
    image: conecta,
    repo: "https://github.com/gidelmarjr-art/CONECTA-",
    tags: ["HTML", "CSS", "JavaScript", "Java", "MySQL"],
    description: {
      pt: "Plataforma digital centralizada desenvolvida para conectar voluntários, doadores e ONGs de forma ágil e segura.",
      en: "Centralized digital platform built to connect volunteers, donors and NGOs quickly and securely.",
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
    tags: ["React", "JavaScript", "CSS"],
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
    tags: ["React", "JavaScript", "CSS"],
    description: {
      pt: "Aplicação web de gerenciamento de tarefas e projetos com suporte a quadros interativos, organização de fluxo de trabalho e controle de status em tempo real.",
      en: "Task and project management web app with interactive boards, workflow organization and real-time status tracking.",
    },
  },
  {
    id: "financeday",
    name: "FinanceDay",
    image: financeday,
    repo: "https://github.com/gidelmarjr-art",
    tags: ["React", "Vite", "CSS", "Frankfurter API"],
    description: {
      pt: "Painel de câmbio global em tempo real com leitura analítica por IA — projeto construído com uma landing page de marketing e um dashboard funcional.",
      en: "Real-time global exchange rate dashboard with an AI analytics layer — built with a marketing landing page plus a functional dashboard.",
    },
  },
];
