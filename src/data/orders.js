import { products } from "./products.js";

const findProduct = (id) => products.find((product) => product.id === id);

export const cartItems = [
  { product: findProduct("lap-hp-15"), quantity: 1 },
  { product: findProduct("jbl-tune-510bt"), quantity: 1 },
  { product: findProduct("logitech-m170"), quantity: 2 },
  { product: findProduct("jbl-flip-6"), quantity: 1 },
];

export const order = {
  id: "EBP-2026-0012",
  placedAt: "08/05/2026 a las 10:32 a. m.",
  status: "En preparación",
  paymentMethod: "PayPal",
  subtotal: 5895,
  discount: 998,
  shipping: 0,
  taxes: 0,
  total: 4897,
  message: "Tu pedido está siendo preparado",
  items: cartItems,
  timeline: [
    { label: "Pedido confirmado", date: "08/05/2026 - 10:32 a. m.", state: "complete" },
    { label: "En preparación", date: "09/05/2026 - 02:15 p. m.", state: "current" },
    { label: "Enviado", date: "Pendiente", state: "pending" },
    { label: "Entregado", date: "Pendiente", state: "pending" },
  ],
  delivery: {
    address: "12 Avenida 5-78 Zona 10, Edificio Los Alpes, Apt. 402",
    city: "Ciudad de Guatemala, Guatemala",
    reference: "Cerca del Parque Las Américas, portón negro.",
    carrier: "Forza Delivery",
    trackingNumber: "FZ123456789GT",
    estimatedDelivery: "10/05/2026 - 12/05/2026",
  },
  support: {
    phone: "+502 1234-5678",
    email: "info@elbuenprecio.com.gt",
  },
};
