export const overviewMetrics = [
  { title: "Menciones Totales", value: "24,593", change: "+12%", trend: "up" },
  { title: "Sentimiento Positivo", value: "68%", change: "+5%", trend: "up" },
  { title: "Sentimiento Negativo", value: "14%", change: "-2%", trend: "down" },
  { title: "Puntuación de Marca", value: "8.4/10", change: "+0.3", trend: "up" },
];

export const sentimentTrendData = [
  { name: "Lun", positive: 400, neutral: 240, negative: 120 },
  { name: "Mar", positive: 300, neutral: 139, negative: 221 },
  { name: "Mié", positive: 200, neutral: 980, negative: 229 },
  { name: "Jue", positive: 278, neutral: 390, negative: 200 },
  { name: "Vie", positive: 189, neutral: 480, negative: 218 },
  { name: "Sáb", positive: 239, neutral: 380, negative: 250 },
  { name: "Dom", positive: 349, neutral: 430, negative: 210 },
];

export const sentimentDistribution = [
  { name: "Positivo", value: 68, color: "#10B981" },
  { name: "Neutral", value: 18, color: "#6B7280" },
  { name: "Negativo", value: 14, color: "#EF4444" },
];

export const topicAnalysisData = [
  { topic: "Atención al Cliente", sentiment: 85 },
  { topic: "Calidad del Producto", sentiment: 78 },
  { topic: "Tiempos de Envío", sentiment: 45 },
  { topic: "Precios y Ofertas", sentiment: 62 },
  { topic: "Experiencia Web", sentiment: 92 },
];

export const recentMentions = [
  {
    id: 1,
    user: "@maria_gomez",
    avatar: "https://i.pravatar.cc/150?u=maria",
    content: "Me encantó el nuevo producto, superó mis expectativas por completo. ¡Definitivamente compraré más!",
    sentiment: "positive",
    platform: "Twitter",
    time: "Hace 10 min",
  },
  {
    id: 2,
    user: "Carlos Ruiz",
    avatar: "https://i.pravatar.cc/150?u=carlos",
    content: "El envío tardó más de lo esperado y la caja llegó un poco maltratada. El producto está bien, pero deben mejorar la logística.",
    sentiment: "negative",
    platform: "Facebook",
    time: "Hace 25 min",
  },
  {
    id: 3,
    user: "@juanpablo99",
    avatar: "https://i.pravatar.cc/150?u=juan",
    content: "El servicio al cliente resolvió mi duda rápidamente. Muy eficientes.",
    sentiment: "positive",
    platform: "Instagram",
    time: "Hace 1 hora",
  },
  {
    id: 4,
    user: "Ana Martínez",
    avatar: "https://i.pravatar.cc/150?u=ana",
    content: "No tengo una opinión fuerte sobre la actualización. Está bien, supongo.",
    sentiment: "neutral",
    platform: "Foro",
    time: "Hace 2 horas",
  },
];
