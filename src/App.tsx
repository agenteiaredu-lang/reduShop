/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Home, 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  ArrowLeft, 
  Trash2, 
  Plus, 
  Minus, 
  Star, 
  ChevronRight,
  ShieldCheck,
  Truck,
  Zap,
  Heart,
  ShoppingCart
} from 'lucide-react';
import { animate, motion, AnimatePresence } from 'motion/react';

// --- Types ---
type View = 'home' | 'shop' | 'product' | 'bag' | 'checkout';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  color: string;
}

interface BagItem {
  product: Product;
  quantity: number;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Apex Compresión 2.0',
    price: 89,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWJNEIHkBHhg5msB6p9njKqkHP07NDFzAKO1sOsff7ea4zL9JS7DoKE4ELIdlMlSw6BR1PJz-ajImuXzq2G9enQqP_w41MoiGqgY-2RBoCboA_uSWP57RdBMm19NIn6kC6Zt4wW2JIlgqtaq1qGWGmtpoEb0n4FKxJ3hu-EIPgF4a-EHwHQ41NAlmfOKG-pI7hIz1p0yq9ltFtWTpNAKCeMuckgzfl_-5OtQc77ollcf6rT9gYTiUgod0h-NRYNak1CYo-gRWhT6ve',
    category: 'Compresión',
    rating: 4.9,
    reviews: 124,
    description: 'Diseñada para entrenamientos de alta intensidad, la Apex 2.0 proporciona soporte muscular específico y tecnología de absorción de humedad.',
    color: 'Negro'
  },
  {
    id: '2',
    name: 'Velocity Elite Runner',
    price: 180,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYRLj8KT6IqbyRg8QaLVQkGzwFZZeE2oJ83hOsjAAC-2T8XIdnYCK8PWGxu07Gn-21kdz9YTYiLQCF25rI9i_CGsOdddyaZaF01tobw7CNR6cTg7Hx9ILQLBOb6Aauipvlc0IwjsIiAQR4YH0GpMbINXWMXQ1VrwfZtqJOdU0b3NXQHLIFmCcHGdhe6emjIzKy7oMBRYPmUW7ZqwTbuH6-tSM6xG1lzuUl3-D8Mpi_otYFGS3d0ENUKar_GcFcx1owrAYz1pW85pos',
    category: 'Calzado',
    rating: 4.8,
    reviews: 89,
    description: 'Zapatillas de rendimiento ultraligeras diseñadas para el máximo retorno de energía y estabilidad en cualquier terreno.',
    color: 'Lima/Gris'
  },
  {
    id: '3',
    name: 'Omega Tracker Pro',
    price: 299,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSpNlta-NNRsmrERhGMFxu1CEyOuHH7KcdYMjjr_cik0s47O-mKC3U2g854tQv5gvB1kU4xwqCqy71ZxJ9WVI8_UiJHUo7w75SpEVPWKY2yTc2ELK4_GePjIizWTbO64MH6dOV6kuRH66F6YvvJQzFi7OSPtEAn4TvSlP5a2xr7c7xYQ9sVPzr4nFMzgcZ-9YQOTBQ6f41eqfJQM47ew5CsAs7RqTB9KGxyGZs-LFDPY5EmAI0-E2oR3CW5-bkY7JuDNFoeIr96xvE',
    category: 'Relojes Inteligentes',
    rating: 4.7,
    reviews: 210,
    description: 'Seguimiento integral del estado físico con GPS, monitor de frecuencia cardíaca y conocimientos avanzados de recuperación atlética.',
    color: 'Titanio'
  }
];

// --- Components ---

const Navbar = ({ currentView, setView, cartCount }: { currentView: View, setView: (v: View) => void, cartCount: number }) => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center w-full px-6 py-4">
    <div className="flex items-center gap-4">
      <button onClick={() => setView('home')} className="text-accent hover:opacity-80 transition-opacity">
        {currentView === 'home' ? <Menu size={24} /> : <ArrowLeft size={24} onClick={() => setView('home')} />}
      </button>
      <span className="text-2xl font-black italic text-accent tracking-tighter font-display uppercase leading-none">VELOCITY</span>
    </div>
    <div className="flex items-center gap-4">
      <button onClick={() => setView('bag')} className="text-accent hover:opacity-80 transition-opacity relative">
        <ShoppingBag size={24} />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  </header>
);

const BottomNav = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => (
  <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-black/90 backdrop-blur-2xl border-t border-white/5 flex justify-around items-center px-8 pb-4 rounded-t-2xl shadow-[0_-10px_20px_rgba(0,0,0,0.5)] md:hidden">
    {[
      { id: 'home' as View, icon: Home, label: 'Inicio' },
      { id: 'shop' as View, icon: Search, label: 'Explorar' },
      { id: 'bag' as View, icon: ShoppingBag, label: 'Tienda' },
      { id: 'home' as View, icon: User, label: 'Perfil' },
    ].map((item) => (
      <button
        key={item.label}
        onClick={() => setView(item.id)}
        className={`flex flex-col items-center gap-1 transition-all ${currentView === item.id ? 'text-accent scale-110' : 'text-white/40 hover:text-accent/80'}`}
      >
        <item.icon size={24} fill={currentView === item.id ? 'currentColor' : 'none'} />
        <span className="font-display font-medium text-[10px] uppercase">{item.label}</span>
      </button>
    ))}
  </nav>
);

// --- Screen Components ---

const HomeScreen = ({ setView }: { setView: (v: View) => void }) => (
  <div className="pb-32">
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC48KvfO5VRrJ3tmQvTFGUhMg4J8BJoWihtMwg1SB2EHTwwV2tcnHQV_OSqTGftCOvNzvKeNU0jpHTDNsQA_pAcA40xdb2AxUzGhmNe1-v1qh52wZKJn2e7NDK-TtBlZTqYJN9ok8MZXZdrS7SOKcMU2wKF9_404_8eFuhM6q8zUUslffheBHanWgPFuteElEfNSQjmD8EiRtN6sxvxkggLAGKuaA5S4hFSDdqt4oIQ9wysx2v_zsw0SsJ5N5xOC4p7PGYmy9DFfpj_" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-bg via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end max-w-xl">
        <span className="font-display font-bold text-accent uppercase tracking-[0.2em] mb-2 block text-xs">Colección Pro 2024</span>
        <h1 className="font-display text-4xl md:text-6xl font-black italic uppercase leading-none mb-4">
          Diseñado para<br /><span className="text-accent">Rendimiento Élite</span>
        </h1>
        <p className="text-white/60 mb-6 text-sm max-w-sm">Experimenta la próxima evolución en ropa deportiva. Diseñado para quienes exigen más en cada movimiento.</p>
        <div className="flex gap-4">
          <button onClick={() => setView('shop')} className="bg-accent text-black px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-accent/90 transition-colors">Hombre</button>
          <button onClick={() => setView('shop')} className="glass-panel px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors">Mujer</button>
        </div>
      </div>
    </section>

    <div className="px-6 py-8">
      <div className="flex gap-3 overflow-x-auto hide-scrollbar mb-8">
        {['Todo el Equipo', 'Calzado', 'Ropa', 'Accesorios'].map((cat, i) => (
          <button key={cat} className={`flex-none px-6 py-2 rounded-full border border-white/10 uppercase text-[10px] font-bold tracking-widest ${i === 0 ? 'bg-accent text-black border-accent' : 'bg-surface-muted text-white'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase italic italic">Tendencias</h2>
          <div className="h-1 w-12 bg-accent mt-1" />
        </div>
        <button onClick={() => setView('shop')} className="text-accent text-[10px] font-bold uppercase flex items-center gap-1 group">
          Ver Todo <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRODUCTS.slice(0, 2).map((product) => (
          <div key={product.id} onClick={() => setView('product')} className="group relative aspect-[4/5] overflow-hidden rounded-2xl glass-panel cursor-pointer">
            <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <span className="bg-black/40 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-accent mb-2 inline-block">Destacado</span>
              <h3 className="font-display text-xl font-bold uppercase mb-1">{product.name}</h3>
              <div className="flex justify-between items-center">
                <p className="font-display text-2xl font-bold">{product.price}€</p>
                <div className="bg-white text-black p-2 rounded-full hover:scale-110 transition-transform">
                  <Plus size={20} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-2xl border-accent/20 relative overflow-hidden mt-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full -mr-16 -mt-16" />
        <h3 className="font-display font-bold text-sm uppercase italic mb-4">Velocidad de Stock</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-[10px] font-bold text-white/50 mb-1 uppercase tracking-widest">
              <span>Velocity Nitro Elite</span>
              <span>95% AGOTADO</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent/50 to-accent w-[95%]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] font-bold text-white/50 mb-1 uppercase tracking-widest">
              <span>Serie AeroFit</span>
              <span>Cantidades Limitadas</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent/50 to-accent w-[65%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ShopScreen = ({ setView }: { setView: (v: View) => void }) => (
  <div className="pt-24 px-6 pb-32">
    <div className="flex justify-between items-end mb-8">
      <div>
        <h1 className="font-display text-3xl font-black uppercase italic italic">Equipo de Entrenamiento</h1>
        <p className="text-white/40 text-sm mt-1">42 Artículos encontrados</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
        <Menu size={16} className="text-accent" />
        <span className="text-[10px] font-bold uppercase tracking-widest">Filtrar</span>
      </button>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {PRODUCTS.map((product) => (
        <div key={product.id} onClick={() => setView('product')} className="glass-panel rounded-2xl overflow-hidden group cursor-pointer transition-colors hover:border-accent/30">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <button className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60">
              <Heart size={16} />
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-1 mb-2">
              <Star size={12} className="text-accent fill-accent" />
              <span className="text-[10px] text-white/60">{product.rating} ({product.reviews})</span>
            </div>
            <h3 className="font-display font-bold text-sm uppercase truncate mb-1">{product.name}</h3>
            <p className="font-display text-accent font-black">{product.price}€</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProductScreen = ({ setView, addToBag }: { setView: (v: View) => void, addToBag: () => void }) => {
  const [selectedSize, setSelectedSize] = useState('M');

  return (
    <div className="pt-20 px-6 pb-40">
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-8">
        <img src={PRODUCTS[0].image} alt="Producto" className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4 flex flex-col gap-3">
          <button className="p-3 bg-black/40 backdrop-blur-md rounded-full"><Heart size={20} /></button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <span className="text-accent font-bold text-[10px] uppercase tracking-[0.2em] mb-2 block">Nueva Línea de Rendimiento</span>
          <h1 className="font-display text-3xl font-black uppercase italic italic mb-2">{PRODUCTS[0].name}</h1>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold">{PRODUCTS[0].price}€</span>
            <div className="flex items-center gap-1 text-accent">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-accent" />)}
              <span className="text-white/40 text-xs ml-2">(124 Reseñas)</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-sm uppercase">Seleccionar Talla</span>
              <button className="text-accent text-[10px] font-bold underline">Guía de Tallas</button>
            </div>
            <div className="flex gap-2">
              {['S', 'M', 'L', 'XL'].map((s) => (
                <button 
                  key={s} 
                  onClick={() => setSelectedSize(s)}
                  className={`flex-1 h-12 flex items-center justify-center rounded-xl border font-bold transition-all ${s === selectedSize ? 'bg-accent text-black border-accent' : 'border-white/10 hover:border-accent/50 text-white'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase mb-2">Descripción</h3>
            <p className="text-sm text-white/60 leading-relaxed">{PRODUCTS[0].description}</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Transpirabilidad', val: 95 },
            { label: 'Nivel de Compresión', val: 80 }
          ].map(m => (
            <div key={m.label} className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase text-white/40">
                <span>{m.label}</span>
                <span>{m.val}%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-accent" style={{ width: `${m.val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 p-6 bg-black/80 backdrop-blur-xl border-t border-white/10 md:static md:p-0 md:bg-transparent md:border-0 z-40">
        <button onClick={addToBag} className="w-full bg-accent text-black py-4 rounded-xl font-display font-black text-xl uppercase italic italic tracking-tight flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">
          <Zap size={24} fill="currentColor" />
          Añadir al Carrito — {PRODUCTS[0].price}€
        </button>
      </div>
    </div>
  );
};

const BagScreen = ({ setView, bag, setBag }: { setView: (v: View) => void, bag: BagItem[], setBag: (b: BagItem[]) => void }) => {
  const increment = (id: string) => {
    setBag(bag.map(item => item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };
  const decrement = (id: string) => {
    setBag(bag.map(item => item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item).filter(item => item.quantity > 0));
  };

  return (
  <div className="pt-24 px-6 pb-32 max-w-4xl mx-auto">
    <div className="mb-8">
      <h1 className="font-display text-4xl font-black uppercase italic italic leading-none mb-1">Tu Bolsa</h1>
      <p className="text-white/40 text-sm">{bag.length} Artículos — Listos para pagar</p>
    </div>

    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8 space-y-4">
        {bag.map(({ product: p, quantity }) => (
          <div key={p.id} className="glass-panel p-4 rounded-2xl flex gap-4">
            <div className="w-24 h-32 aspect-[3/4] rounded-xl overflow-hidden bg-surface-muted">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-display text-sm font-bold uppercase leading-tight">{p.name}</h3>
                  <button onClick={() => setBag(bag.filter(item => item.product.id !== p.id))} className="text-white/30 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                </div>
                <p className="text-[10px] font-bold text-white/40 mt-1">TALLA: MEDIANA • COLOR: {p.color.toUpperCase()}</p>
              </div>
              <div className="flex justify-between items-end">
                <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1">
                  <button onClick={() => decrement(p.id)} className="p-1 hover:text-accent"><Minus size={14} /></button>
                  <span className="px-3 text-xs font-bold">{quantity}</span>
                  <button onClick={() => increment(p.id)} className="p-1 hover:text-accent"><Plus size={14} /></button>
                </div>
                <span className="font-display text-lg font-black text-accent">{p.price * quantity}.00€</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-4 space-y-6">
        <div className="glass-panel p-6 rounded-2xl sticky top-24">
          <h2 className="font-display text-lg font-bold uppercase italic mb-6">Resumen del Pedido</h2>
          <div className="space-y-4 text-sm border-b border-white/10 pb-6 mb-6">
            <div className="flex justify-between">
              <span className="text-white/40">Subtotal</span>
              <span>€564.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Envío</span>
              <span className="text-accent">GRATIS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40">Impuesto Estimado</span>
              <span>45.12€</span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold uppercase text-xs">Total</span>
            <span className="font-display text-4xl font-black text-accent">609.12€</span>
          </div>
          <button onClick={() => setView('checkout')} className="w-full bg-accent text-black py-4 rounded-xl font-display font-black uppercase text-sm tracking-widest shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:opacity-90 active:scale-95 transition-all">
            Proceder al Pago
          </button>
          
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase">
              <ShieldCheck size={14} /> Transacción Segura
            </div>
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-bold uppercase">
              <Truck size={14} /> Envío Rápido en 2 Días
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

const CheckoutScreen = ({ setView }: { setView: (v: View) => void }) => (
  <div className="pt-24 px-6 pb-40 max-w-5xl mx-auto">
    <div className="mb-10">
      <h1 className="font-display text-4xl font-bold uppercase italic italic">Pago</h1>
      <p className="text-white/40 text-sm mt-1">Revisa tu pedido y completa tu compra.</p>
    </div>

    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 space-y-8">
        <section className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Truck size={20} className="text-accent" />
            <h2 className="font-display text-lg font-bold uppercase">Dirección de Envío</h2>
          </div>
          <div className="grid gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase">Nombre Completo</label>
              <input type="text" className="w-full bg-surface-muted border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-accent transition-all" defaultValue="Johnathan Velocity" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-white/40 uppercase">Dirección</label>
              <input type="text" className="w-full bg-surface-muted border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-accent transition-all" defaultValue="123 Performance Way" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase">Ciudad</label>
                <input type="text" className="w-full bg-surface-muted border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-accent transition-all" defaultValue="Los Angeles" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase">Código Postal</label>
                <input type="text" className="w-full bg-surface-muted border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-accent transition-all" defaultValue="90210" />
              </div>
            </div>
          </div>
        </section>

        <section className="glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Zap size={20} className="text-accent" />
            <h2 className="font-display text-lg font-bold uppercase">Método de Pago</h2>
          </div>
          <div className="space-y-4">
            <div className="border-2 border-accent bg-accent/5 p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Menu size={20} className="text-accent" />
                <div>
                  <p className="font-bold text-sm">Tarjeta de Crédito</p>
                  <p className="text-[10px] text-white/40 font-bold">Visa, Mastercard, Amex</p>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-accent flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-accent rounded-full" />
              </div>
            </div>
            <div className="border border-white/5 bg-white/5 p-4 rounded-xl flex items-center justify-between opacity-50">
              <div className="flex items-center gap-4">
                <Menu size={20} className="text-white/40" />
                <div>
                  <p className="font-bold text-sm">PayPal</p>
                  <p className="text-[10px] text-white/40 font-bold">Rápido y Seguro</p>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-white/10" />
            </div>
          </div>
          
          <div className="mt-8 grid gap-4">
             <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase">Número de Tarjeta</label>
                <input type="text" className="w-full bg-surface-muted border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-accent transition-all font-mono" placeholder="**** **** **** 4242" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase">Vencimiento</label>
                  <input type="text" className="w-full bg-surface-muted border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-accent transition-all" placeholder="MM/AA" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase">CVC</label>
                  <input type="text" className="w-full bg-surface-muted border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-accent transition-all" placeholder="***" />
                </div>
              </div>
          </div>
        </section>
      </div>

      <div className="lg:col-span-5">
        <div className="glass-panel p-6 rounded-2xl sticky top-24">
          <h2 className="font-display text-lg font-bold uppercase mb-6">Resumen del Pedido</h2>
          <div className="space-y-4 mb-8">
            {PRODUCTS.slice(0, 2).map(item => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 rounded-lg bg-surface-muted overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="text-xs font-bold uppercase truncate pr-2">{item.name}</h3>
                    <p className="text-xs font-bold">€{item.price}</p>
                  </div>
                  <p className="text-[10px] text-white/40 font-bold uppercase mt-1">Talla: M / Negro</p>
                  <p className="text-[10px] text-accent font-bold mt-1">Cant: 1</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-6 space-y-4 text-sm mb-6">
             <div className="flex justify-between">
              <span className="text-white/40">Subtotal</span>
              <span>€274.00</span>
            </div>
            <div className="flex justify-between text-accent">
              <span className="opacity-60">Envío</span>
              <span>GRATIS</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-4 mt-2">
              <span className="font-display text-xl font-bold uppercase">Total</span>
              <span className="font-display text-xl font-bold text-accent">295.92€</span>
            </div>
          </div>

          <button onClick={() => alert('¡Pedido realizado con éxito!')} className="w-full bg-accent text-black py-4 rounded-xl font-display font-black uppercase text-base tracking-widest shadow-[0_0_20px_rgba(204,255,0,0.3)] hover:opacity-90 active:scale-95 transition-all">
            Realizar Pedido
          </button>
          <p className="text-[9px] text-center text-white/20 uppercase tracking-tighter mt-4">Transacción segura y encriptada • Garantía Velocity</p>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState<View>('home');
  const [bag, setBag] = useState<BagItem[]>([]);

  const addToBag = () => {
    const item = bag.find(i => i.product.id === PRODUCTS[0].id);
    if (item) {
        setBag(bag.map(i => i.product.id === PRODUCTS[0].id ? {...i, quantity: i.quantity + 1} : i));
    } else {
        setBag([...bag, { product: PRODUCTS[0], quantity: 1 }]);
    }
    setView('bag');
  };

  return (
    <div className="min-h-screen">
      <Navbar currentView={view} setView={setView} cartCount={bag.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {view === 'home' && <HomeScreen setView={setView} />}
            {view === 'shop' && <ShopScreen setView={setView} />}
            {view === 'product' && <ProductScreen setView={setView} addToBag={addToBag} />}
            {view === 'bag' && <BagScreen setView={setView} bag={bag} setBag={setBag} />}
            {view === 'checkout' && <CheckoutScreen setView={setView} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav currentView={view} setView={setView} />
    </div>
  );
}

