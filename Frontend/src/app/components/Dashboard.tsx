import React, { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  MessageSquare, 
  Smile, 
  Frown, 
  Meh, 
  AlertCircle,
  Search,
  Bell,
  Settings,
  Menu,
  Filter,
  Activity
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  overviewMetrics, 
  sentimentTrendData, 
  sentimentDistribution, 
  topicAnalysisData, 
  recentMentions 
} from "../data/mockData";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("panel");

  const getHeaderTitle = () => {
    switch (activeTab) {
      case "panel": return "Resumen Ejecutivo";
      case "menciones": return "Feedback y Menciones";
      case "tendencias": return "Evolución de Marca";
      case "temas": return "Análisis de Temas";
      case "configuracion": return "Preferencias";
      default: return "SentiMark";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "panel":
        return <OverviewPanel key="panel" />;
      case "menciones":
        return <MentionsPanel key="menciones" />;
      case "tendencias":
        return <TrendsPanel key="tendencias" />;
      case "temas":
        return <TopicsPanel key="temas" />;
      case "configuracion":
        return <SettingsPanel key="configuracion" />;
      default:
        return <OverviewPanel key="panel" />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-slate-200/60 hidden md:flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
        <div className="h-20 flex items-center px-6 shrink-0">
          <div className="flex items-center gap-2.5 text-indigo-600">
            <div className="bg-indigo-600/10 p-2 rounded-xl">
              <Activity className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">SentiMark</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">Análisis</div>
          <NavItem active={activeTab === "panel"} onClick={() => setActiveTab("panel")} icon={<Activity />} label="Panel Principal" />
          <NavItem active={activeTab === "menciones"} onClick={() => setActiveTab("menciones")} icon={<MessageSquare />} label="Menciones" />
          <NavItem active={activeTab === "tendencias"} onClick={() => setActiveTab("tendencias")} icon={<TrendingUp />} label="Tendencias" />
          <NavItem active={activeTab === "temas"} onClick={() => setActiveTab("temas")} icon={<AlertCircle />} label="Temas Críticos" />
          
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 mt-8 px-3">Sistema</div>
          <NavItem active={activeTab === "configuracion"} onClick={() => setActiveTab("configuracion")} icon={<Settings />} label="Configuración" />
        </nav>

        <div className="p-5 border-t border-slate-100 shrink-0 bg-slate-50/30 m-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/150?u=manager" alt="Gerente" className="w-10 h-10 rounded-full shadow-sm ring-2 ring-white" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">Laura Gómez</p>
              <p className="text-xs text-slate-500 truncate">Gerente de Marketing</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header - Glassmorphism */}
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 sm:px-10 shrink-0 z-10 sticky top-0">
          <div className="flex items-center md:hidden">
            <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <span className="ml-2 text-lg font-bold text-slate-900">SentiMark</span>
          </div>
          
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{getHeaderTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="relative hidden lg:block group">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Buscar análisis, temas..." 
                className="pl-10 pr-4 py-2.5 bg-slate-100/50 border-transparent rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 w-72 transition-all duration-300 placeholder:text-slate-400"
              />
            </div>
            <button className="p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 rounded-xl relative transition-all duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

// Panels

function OverviewPanel() {
  return (
    <div className="space-y-8">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewMetrics.map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-slate-500">{metric.title}</p>
              <div className={`p-2 rounded-xl ${
                metric.trend === 'up' && i !== 2 ? 'bg-emerald-50 text-emerald-600' : 
                metric.trend === 'down' && i === 2 ? 'bg-emerald-50 text-emerald-600' : 
                'bg-rose-50 text-rose-600'
              }`}>
                {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">{metric.value}</h3>
              <span className={`text-sm font-semibold ${
                metric.trend === 'up' && i !== 2 ? 'text-emerald-600' : 
                metric.trend === 'down' && i === 2 ? 'text-emerald-600' : 
                'text-rose-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Chart */}
        <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Evolución del Sentimiento</h3>
              <p className="text-sm text-slate-500 mt-1">Análisis de los últimos 7 días</p>
            </div>
            <select className="bg-slate-50 border-none text-sm font-medium text-slate-700 rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 cursor-pointer hover:bg-slate-100 transition-colors">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
              <option>Este mes</option>
            </select>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '12px 16px', fontWeight: 500 }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 500, paddingTop: '20px' }} />
                <Line type="monotone" name="Positivo" dataKey="positive" stroke="#10B981" strokeWidth={3} dot={false} activeDot={{r: 6, strokeWidth: 0}} />
                <Line type="monotone" name="Neutral" dataKey="neutral" stroke="#94A3B8" strokeWidth={3} dot={false} />
                <Line type="monotone" name="Negativo" dataKey="negative" stroke="#F43F5E" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col">
          <h3 className="text-lg font-bold text-slate-900">Distribución Global</h3>
          <p className="text-sm text-slate-500 mt-1 mb-6">Porcentaje general por sentimiento</p>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {sentimentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-slate-900">8.4</span>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Puntuación</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
             {sentimentDistribution.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                   <span className="text-sm font-medium text-slate-600">{item.name}</span>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Topic Analysis */}
        <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <h3 className="text-lg font-bold text-slate-900">Análisis por Tema</h3>
          <p className="text-sm text-slate-500 mt-1 mb-6">Sentimiento neto (%) categorizado</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topicAnalysisData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }} barSize={24}>
                <CartesianGrid strokeDasharray="4 4" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="topic" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 13, fontWeight: 500}} width={130} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 500 }}
                />
                <Bar dataKey="sentiment" name="Sentimiento %" radius={[0, 6, 6, 0]}>
                  {topicAnalysisData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.sentiment > 70 ? '#10B981' : entry.sentiment > 50 ? '#F59E0B' : '#F43F5E'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Mentions */}
        <div className="bg-white p-7 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-6 shrink-0">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Feed en Vivo</h3>
              <p className="text-sm text-slate-500 mt-1">Últimas menciones destacadas</p>
            </div>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors">
              Ver todas
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {recentMentions.map((mention) => (
              <div key={mention.id} className="p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                <div className="flex justify-between items-start mb-2.5">
                  <div className="flex items-center gap-3">
                    <img src={mention.avatar} alt={mention.user} className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{mention.user}</p>
                      <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{mention.platform} • {mention.time}</p>
                    </div>
                  </div>
                  <SentimentBadge sentiment={mention.sentiment} />
                </div>
                <p className="text-sm text-slate-700 leading-relaxed line-clamp-2">{mention.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MentionsPanel() {
  const allMentions = [...recentMentions, ...recentMentions.map(m => ({ ...m, id: m.id + 10, time: "Hace " + (Math.floor(Math.random() * 5) + 3) + " horas" }))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-2 rounded-lg">
            <Filter className="w-5 h-5 text-slate-600" />
          </div>
          <span className="font-semibold text-slate-800">Filtros Activos</span>
        </div>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <select className="bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all hover:bg-slate-100 cursor-pointer">
            <option>Todos los sentimientos</option>
            <option>Positivos</option>
            <option>Neutrales</option>
            <option>Negativos</option>
          </select>
          <select className="bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all hover:bg-slate-100 cursor-pointer">
            <option>Todas las plataformas</option>
            <option>Twitter</option>
            <option>Facebook</option>
            <option>Instagram</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="divide-y divide-slate-100">
          {allMentions.map((mention) => (
            <div key={mention.id} className="p-6 hover:bg-slate-50/80 transition-colors group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-4">
                  <img src={mention.avatar} alt={mention.user} className="w-12 h-12 rounded-full ring-4 ring-white shadow-sm" />
                  <div>
                    <p className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{mention.user}</p>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">{mention.platform} • {mention.time}</p>
                  </div>
                </div>
                <SentimentBadge sentiment={mention.sentiment} />
              </div>
              <p className="text-slate-700 ml-16 text-[15px] leading-relaxed">{mention.content}</p>
              <div className="ml-16 mt-4 flex items-center gap-4 opacity-80 group-hover:opacity-100 transition-opacity">
                <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-1.5 rounded-lg transition-colors">
                  Responder
                </button>
                <button className="text-sm text-slate-500 font-semibold hover:text-slate-800 hover:bg-slate-100 px-4 py-1.5 rounded-lg transition-colors">
                  Resolver ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrendsPanel() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h3 className="text-xl font-bold text-slate-900 mb-1">Volumen de Actividad</h3>
        <p className="text-sm text-slate-500 mb-8">Evolución de menciones totales en el tiempo</p>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sentimentTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 500}} dy={15} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 500}} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px 16px', fontWeight: 500 }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontWeight: 500 }} />
              <Line type="monotone" name="Total Menciones" dataKey={(d) => d.positive + d.neutral + d.negative} stroke="#6366F1" strokeWidth={4} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 8, strokeWidth: 0}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
           <h3 className="text-lg font-bold text-slate-900 mb-1">Plataformas Dominantes</h3>
           <p className="text-sm text-slate-500 mb-6">Distribución por origen de mención</p>
           <div className="space-y-5">
             {[
               { name: "Twitter", value: 45, color: "bg-sky-500", lightColor: "bg-sky-100" },
               { name: "Instagram", value: 30, color: "bg-fuchsia-500", lightColor: "bg-fuchsia-100" },
               { name: "Facebook", value: 15, color: "bg-blue-600", lightColor: "bg-blue-100" },
               { name: "Foros / Web", value: 10, color: "bg-slate-500", lightColor: "bg-slate-100" },
             ].map(platform => (
               <div key={platform.name} className="group">
                 <div className="flex justify-between text-sm mb-2">
                   <span className="font-bold text-slate-700">{platform.name}</span>
                   <span className="font-bold text-slate-900">{platform.value}%</span>
                 </div>
                 <div className={`w-full ${platform.lightColor} rounded-full h-2.5 overflow-hidden`}>
                   <div className={`${platform.color} h-full rounded-full transition-all duration-1000 group-hover:opacity-80`} style={{ width: `${platform.value}%` }}></div>
                 </div>
               </div>
             ))}
           </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
           <h3 className="text-lg font-bold text-slate-900 mb-1">Mapa de Calor: Horarios</h3>
           <p className="text-sm text-slate-500 mb-6">Horas pico de actividad (24h)</p>
           <div className="flex items-end h-48 gap-2 mt-8">
              {[2, 4, 3, 6, 8, 10, 5, 3, 2, 4, 7, 5].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center group relative">
                  <div className="w-full bg-indigo-100 hover:bg-indigo-500 rounded-t-md transition-all duration-300" style={{ height: `${val * 10}%` }}></div>
                  <span className="text-[10px] font-semibold text-slate-400 mt-3">{i*2}h</span>
                  <div className="absolute -top-10 bg-slate-800 text-white text-xs font-semibold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                    {val * 120} msj
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function TopicsPanel() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-rose-50 to-white p-7 rounded-2xl border border-rose-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] col-span-1 md:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertCircle className="w-32 h-32 text-rose-500" />
          </div>
          <div className="relative z-10 flex items-start gap-5">
            <div className="bg-white p-3.5 rounded-2xl shadow-sm">
              <AlertCircle className="w-7 h-7 text-rose-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-rose-900">Alerta: "Tiempos de Envío"</h3>
              <p className="text-rose-800 mt-2 font-medium leading-relaxed">
                El sentimiento negativo relacionado con la logística ha experimentado un <span className="font-bold bg-rose-200/50 px-1 rounded">pico del 24%</span> en las últimas 48 horas. Se requiere atención inmediata.
              </p>
              <button className="mt-5 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-rose-200 transition-all hover:-translate-y-0.5">
                Investigar Casos
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-white p-7 rounded-2xl border border-emerald-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Smile className="w-24 h-24 text-emerald-500" />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="bg-white p-3 w-fit rounded-xl shadow-sm mb-4">
              <Smile className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-emerald-900 leading-tight">Fortaleza:<br/>"Experiencia Web"</h3>
              <p className="text-emerald-800 mt-3 font-semibold text-2xl">
                92% <span className="text-sm font-medium text-emerald-700">positivo</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <h3 className="text-xl font-bold text-slate-900 mb-1">Mapa Semántico</h3>
        <p className="text-sm text-slate-500 mb-8">Términos más frecuentes extraídos por IA</p>
        <div className="flex flex-wrap gap-x-6 gap-y-4 items-center justify-center py-10 px-4 min-h-[300px]">
          {/* A more styled word cloud */}
          <span className="text-5xl font-black text-rose-500 opacity-90 hover:scale-110 transition-transform cursor-pointer">retraso</span>
          <span className="text-3xl font-bold text-emerald-500 opacity-80 hover:scale-110 transition-transform cursor-pointer">excelente</span>
          <span className="text-6xl font-black bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">servicio</span>
          <span className="text-2xl font-bold text-slate-400 hover:scale-110 transition-transform cursor-pointer">precio</span>
          <span className="text-4xl font-bold text-rose-400 opacity-90 hover:scale-110 transition-transform cursor-pointer">roto</span>
          <span className="text-3xl font-bold text-emerald-600 hover:scale-110 transition-transform cursor-pointer">rápido</span>
          <span className="text-5xl font-black text-slate-700 opacity-80 hover:scale-110 transition-transform cursor-pointer">calidad</span>
          <span className="text-xl font-medium text-slate-300 hover:scale-110 transition-transform cursor-pointer">web</span>
          <span className="text-4xl font-bold text-emerald-400 opacity-90 hover:scale-110 transition-transform cursor-pointer">recomendado</span>
          <span className="text-3xl font-bold text-rose-500 opacity-80 hover:scale-110 transition-transform cursor-pointer">espera</span>
          <span className="text-2xl font-semibold text-slate-500 hover:scale-110 transition-transform cursor-pointer">empaque</span>
          <span className="text-5xl font-black text-indigo-400 hover:scale-110 transition-transform cursor-pointer">producto</span>
        </div>
      </div>
    </div>
  );
}

function SettingsPanel() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">Integraciones de Datos</h2>
          <p className="text-sm text-slate-500 mt-1">Administra las fuentes que alimentan el análisis de SentiMark.</p>
        </div>
        <div className="p-8 space-y-4">
          {['Twitter API (X)', 'Facebook Graph API', 'Instagram Business', 'Google Reviews'].map((source, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-slate-100 rounded-2xl hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors group gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${i < 3 ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                  {i < 3 ? <span className="text-emerald-600 font-bold text-xl">✓</span> : <span className="text-slate-400 text-xl">-</span>}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{source}</p>
                  <p className="text-sm font-medium text-slate-500">{i < 3 ? 'Sincronizado hace 5 min' : 'Requiere configuración'}</p>
                </div>
              </div>
              <button className={`px-5 py-2.5 text-sm font-bold rounded-xl transition-all ${
                i < 3 
                  ? 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-rose-600 hover:border-rose-200' 
                  : 'text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200'
              }`}>
                {i < 3 ? 'Desconectar' : 'Conectar Cuenta'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-900">Reglas y Notificaciones</h2>
          <p className="text-sm text-slate-500 mt-1">Configura alertas automáticas para mantenerte informado.</p>
        </div>
        <div className="p-8 space-y-6">
          <div className="flex items-start justify-between gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
            <div>
              <p className="font-bold text-slate-900">Alerta de Crisis (Picos Negativos)</p>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">Te notificaremos vía email y push si el sentimiento negativo de la marca supera el 20% de volumen en un periodo de 1 hora.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          
          <div className="h-px bg-slate-100"></div>
          
          <div className="flex items-start justify-between gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
            <div>
              <p className="font-bold text-slate-900">Digest Ejecutivo Diario</p>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">Recibe un reporte automatizado en tu bandeja de entrada a las 18:00 hrs con el resumen del sentimiento del día.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-2">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponents

function NavItem({ 
  icon, 
  label, 
  active = false, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-semibold cursor-pointer relative group ${
        active 
          ? "bg-indigo-50 text-indigo-600" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {active && (
        <motion.div 
          layoutId="activeTabIndicator"
          className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full" 
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <span className={`${active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"} transition-colors`}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
      </span>
      {label}
    </button>
  );
}

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const map: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    positive: { color: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: <Smile className="w-4 h-4" />, label: "Positivo" },
    neutral: { color: "bg-slate-100 text-slate-700 border-slate-200", icon: <Meh className="w-4 h-4" />, label: "Neutral" },
    negative: { color: "bg-rose-50 text-rose-700 border-rose-200", icon: <Frown className="w-4 h-4" />, label: "Negativo" },
  };

  const { color, icon, label } = map[sentiment] || map.neutral;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${color} shadow-sm`}>
      {icon}
      {label}
    </span>
  );
}
