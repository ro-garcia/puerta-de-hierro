const svg = (content) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(content)}`;

const shapeFor = (kind, accent) => {
  const dark = "#111827";
  const muted = "#334155";
  const light = "#f8fafc";

  const shapes = {
    laptop: `
      <rect x="73" y="46" width="154" height="104" rx="10" fill="${dark}"/>
      <rect x="84" y="58" width="132" height="78" rx="5" fill="#06112f"/>
      <path d="M92 105 C122 68 148 140 182 95 S210 84 218 112" fill="none" stroke="${accent}" stroke-width="6" opacity=".9"/>
      <path d="M46 164 L254 164 L232 187 L68 187 Z" fill="${muted}"/>
      <rect x="92" y="171" width="116" height="7" rx="3.5" fill="#64748b"/>
    `,
    phone: `
      <rect x="104" y="26" width="92" height="168" rx="22" fill="${dark}"/>
      <rect x="116" y="44" width="68" height="130" rx="15" fill="url(#screen)"/>
      <circle cx="170" cy="56" r="6" fill="#020617"/>
      <circle cx="150" cy="181" r="4" fill="#dbeafe"/>
    `,
    headphones: `
      <path d="M78 112 A72 72 0 0 1 222 112" fill="none" stroke="${dark}" stroke-width="20" stroke-linecap="round"/>
      <rect x="53" y="103" width="54" height="86" rx="22" fill="${dark}"/>
      <rect x="193" y="103" width="54" height="86" rx="22" fill="${dark}"/>
      <rect x="69" y="119" width="22" height="54" rx="10" fill="${accent}" opacity=".28"/>
      <rect x="209" y="119" width="22" height="54" rx="10" fill="${accent}" opacity=".28"/>
    `,
    tv: `
      <rect x="42" y="47" width="216" height="132" rx="12" fill="${dark}"/>
      <rect x="55" y="60" width="190" height="104" rx="5" fill="url(#screen)"/>
      <path d="M74 132 C108 92 143 158 179 109 S225 98 241 134" fill="none" stroke="#e0f2fe" stroke-width="5" opacity=".78"/>
      <rect x="132" y="179" width="36" height="18" rx="5" fill="${muted}"/>
      <rect x="92" y="197" width="116" height="10" rx="5" fill="${dark}"/>
    `,
    mouse: `
      <rect x="104" y="42" width="92" height="150" rx="46" fill="${dark}"/>
      <path d="M150 43 L150 92" stroke="#94a3b8" stroke-width="3"/>
      <rect x="145" y="60" width="10" height="26" rx="5" fill="${accent}"/>
    `,
    speaker: `
      <rect x="54" y="76" width="192" height="82" rx="41" fill="${dark}"/>
      <circle cx="91" cy="117" r="27" fill="#020617"/>
      <circle cx="206" cy="117" r="27" fill="#020617"/>
      <circle cx="91" cy="117" r="13" fill="${accent}"/>
      <circle cx="206" cy="117" r="13" fill="${accent}"/>
      <rect x="126" y="103" width="48" height="7" rx="3.5" fill="#cbd5e1"/>
      <rect x="134" y="121" width="32" height="6" rx="3" fill="#cbd5e1"/>
    `,
    controller: `
      <path d="M75 86 C91 65 120 73 140 85 L160 85 C180 73 209 65 225 86 C243 110 247 169 228 181 C210 193 195 158 180 147 L120 147 C105 158 90 193 72 181 C53 169 57 110 75 86 Z" fill="${light}" stroke="#cbd5e1" stroke-width="4"/>
      <circle cx="109" cy="118" r="12" fill="${dark}"/>
      <circle cx="194" cy="110" r="7" fill="${accent}"/>
      <circle cx="211" cy="126" r="7" fill="${accent}"/>
      <rect x="142" y="113" width="18" height="7" rx="3.5" fill="${muted}"/>
    `,
    watch: `
      <rect x="125" y="23" width="50" height="54" rx="17" fill="${dark}"/>
      <rect x="112" y="72" width="76" height="108" rx="30" fill="${dark}"/>
      <rect x="124" y="84" width="52" height="84" rx="20" fill="url(#screen)"/>
      <text x="150" y="125" text-anchor="middle" font-size="24" font-weight="800" fill="#f8fafc">19</text>
      <rect x="126" y="175" width="48" height="34" rx="15" fill="${dark}"/>
    `,
    keyboard: `
      <rect x="34" y="74" width="232" height="104" rx="13" fill="${dark}"/>
      ${Array.from({ length: 40 }).map((_, index) => {
        const x = 52 + (index % 10) * 20;
        const y = 94 + Math.floor(index / 10) * 17;
        return `<rect x="${x}" y="${y}" width="13" height="10" rx="2" fill="${index % 3 === 0 ? accent : "#475569"}"/>`;
      }).join("")}
      <rect x="91" y="158" width="118" height="9" rx="4.5" fill="${accent}"/>
    `,
    webcam: `
      <rect x="74" y="61" width="152" height="94" rx="21" fill="${dark}"/>
      <circle cx="150" cy="108" r="34" fill="#020617"/>
      <circle cx="150" cy="108" r="18" fill="${accent}"/>
      <circle cx="158" cy="100" r="7" fill="#bfdbfe"/>
      <rect x="128" y="155" width="44" height="27" rx="8" fill="${muted}"/>
      <rect x="95" y="181" width="110" height="12" rx="6" fill="${dark}"/>
    `,
  };

  return shapes[kind] || shapes.laptop;
};

const productImage = (kind, accent = "#0b63e5", background = "#eff6ff") => svg(`
  <svg xmlns="http://www.w3.org/2000/svg" width="420" height="320" viewBox="0 0 300 230">
    <defs>
      <linearGradient id="screen" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stop-color="#071433"/>
        <stop offset=".55" stop-color="${accent}"/>
        <stop offset="1" stop-color="#bfdbfe"/>
      </linearGradient>
      <radialGradient id="halo" cx="50%" cy="40%" r="60%">
        <stop offset="0" stop-color="${accent}" stop-opacity=".18"/>
        <stop offset="1" stop-color="${background}" stop-opacity="0"/>
      </radialGradient>
      <filter id="drop" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="12" stdDeviation="9" flood-color="#0f172a" flood-opacity=".22"/>
      </filter>
    </defs>
    <rect width="300" height="230" rx="24" fill="${background}"/>
    <rect width="300" height="230" rx="24" fill="url(#halo)"/>
    <g filter="url(#drop)">${shapeFor(kind, accent)}</g>
  </svg>
`);

export const products = [
  {
    id: "lap-hp-15",
    name: "Laptop HP 15-fd0002la",
    description: "Intel Core i5, 8GB RAM, 512GB SSD",
    price: 4599,
    status: "En existencia",
    category: "Laptops",
    brand: "HP",
    availability: "in-stock",
    image: productImage("laptop", "#0b63e5", "#edf4ff"),
  },
  {
    id: "samsung-a54",
    name: "Samsung Galaxy A54 5G",
    description: "128GB, 6GB RAM",
    price: 2899,
    status: "En existencia",
    category: "Celulares",
    brand: "Samsung",
    availability: "in-stock",
    image: productImage("phone", "#7c3aed", "#f4f0ff"),
  },
  {
    id: "jbl-tune-510bt",
    name: "Audífonos JBL Tune 510BT",
    description: "Inalámbricos, Bluetooth",
    price: 399,
    status: "En existencia",
    category: "Audio",
    brand: "JBL",
    availability: "in-stock",
    image: productImage("headphones", "#111827", "#f8fafc"),
  },
  {
    id: "samsung-tv-43",
    name: "Smart TV Samsung 43\"",
    description: "4K UHD, Tizen OS",
    price: 2799,
    status: "En existencia",
    category: "Televisores",
    brand: "Samsung",
    availability: "in-stock",
    image: productImage("tv", "#0ea5e9", "#ecfeff"),
  },
  {
    id: "iphone-13-128",
    name: "iPhone 13 128GB",
    description: "Pantalla 6.1\", iOS",
    price: 5799,
    status: "En existencia",
    category: "Celulares",
    brand: "Apple",
    availability: "in-stock",
    image: productImage("phone", "#64748b", "#f8fafc"),
  },
  {
    id: "lenovo-ideapad-3",
    name: "Laptop Lenovo IdeaPad 3",
    description: "AMD Ryzen, 8GB RAM, 512GB SSD",
    price: 3999,
    status: "En existencia",
    category: "Laptops",
    brand: "Lenovo",
    availability: "in-stock",
    image: productImage("laptop", "#f97316", "#fff7ed"),
  },
  {
    id: "logitech-m170",
    name: "Mouse inalámbrico Logitech M170",
    description: "USB, negro",
    price: 99,
    status: "En existencia",
    category: "Periféricos",
    brand: "Logitech",
    availability: "in-stock",
    image: productImage("mouse", "#2563eb", "#f8fafc"),
  },
  {
    id: "jbl-flip-6",
    name: "Parlante JBL Flip 6",
    description: "Bluetooth, resistente al agua",
    price: 699,
    status: "En existencia",
    category: "Audio",
    brand: "JBL",
    availability: "in-stock",
    image: productImage("speaker", "#fb923c", "#fff7ed"),
  },
  {
    id: "dualsense-ps5",
    name: "Control PlayStation 5 DualSense",
    description: "Inalámbrico",
    price: 649,
    status: "En existencia",
    category: "Consolas",
    brand: "Sony",
    availability: "in-stock",
    image: productImage("controller", "#2563eb", "#eff6ff"),
  },
  {
    id: "xiaomi-watch-4",
    name: "Xiaomi Redmi Watch 4 Active",
    description: "Pantalla 1.83\", IP68",
    price: 399,
    status: "Bajo pedido",
    category: "Accesorios",
    brand: "Xiaomi",
    availability: "backorder",
    image: productImage("watch", "#22c55e", "#f0fdf4"),
  },
  {
    id: "redragon-keyboard",
    name: "Teclado mecánico Redragon",
    description: "RGB, switch azul",
    price: 299,
    status: "En existencia",
    category: "Periféricos",
    brand: "Redragon",
    availability: "in-stock",
    image: productImage("keyboard", "#ef4444", "#fff1f2"),
  },
  {
    id: "logitech-c920",
    name: "Webcam Logitech C920",
    description: "Full HD 1080p",
    price: 499,
    status: "En existencia",
    category: "Periféricos",
    brand: "Logitech",
    availability: "in-stock",
    image: productImage("webcam", "#0b63e5", "#f8fafc"),
  },
];

export const categories = ["Todas las categorías", ...new Set(products.map((product) => product.category))];
export const brands = ["Todas las marcas", ...new Set(products.map((product) => product.brand))];
