export const metrics = [
  { label: "Ventas totales", value: "Q54,897.00", trend: "+18.6% vs. semana anterior", tone: "blue", icon: "sale" },
  { label: "Pedidos", value: "128", trend: "+12.3% vs. semana anterior", tone: "green", icon: "cart" },
  { label: "Clientes nuevos", value: "36", trend: "+8.7% vs. semana anterior", tone: "orange", icon: "users" },
  { label: "Productos", value: "245", trend: "+5.4% vs. semana anterior", tone: "purple", icon: "box" },
  { label: "Stock bajo", value: "14", trend: "-3.3% vs. semana anterior", tone: "red", icon: "alert" },
];

export const salesSeries = [
  { label: "01/05", value: 9500 },
  { label: "02/05", value: 21500 },
  { label: "03/05", value: 29800 },
  { label: "04/05", value: 38200 },
  { label: "05/05", value: 26500 },
  { label: "06/05", value: 40500 },
  { label: "07/05", value: 35100 },
  { label: "08/05", value: 54897 },
];

export const orderStatus = [
  { label: "Pendiente", value: 28, color: "#2563eb" },
  { label: "En preparación", value: 34, color: "#f59e0b" },
  { label: "Enviado", value: 42, color: "#8b5cf6" },
  { label: "Entregado", value: 20, color: "#22c55e" },
  { label: "Cancelado", value: 4, color: "#ef4444" },
];

export const recentOrders = [
  { id: "EBP-2026-00128", client: "María López", date: "08/05/2026 10:15 a. m.", total: "Q1,299.00", status: "En preparación" },
  { id: "EBP-2026-00127", client: "Juan Pérez", date: "08/05/2026 09:42 a. m.", total: "Q699.00", status: "Pendiente" },
  { id: "EBP-2026-00126", client: "Ana García", date: "07/05/2026 07:30 p. m.", total: "Q2,399.00", status: "Enviado" },
  { id: "EBP-2026-00125", client: "Carlos Méndez", date: "07/05/2026 05:18 p. m.", total: "Q459.00", status: "Entregado" },
  { id: "EBP-2026-00124", client: "Lucía Rodríguez", date: "07/05/2026 03:11 p. m.", total: "Q1,899.00", status: "Entregado" },
];

export const lowStockProducts = [
  { product: "Audífonos JBL Tune 510BT", sku: "JBL-T510BT", stock: 8, min: 10 },
  { product: "Mouse inalámbrico Logitech M170", sku: "LOG-M170", stock: 5, min: 10 },
  { product: "Parlante JBL Flip 6", sku: "JBL-FLIP6", stock: 3, min: 8 },
  { product: "Laptop Lenovo IdeaPad 3", sku: "LEN-IP3", stock: 2, min: 5 },
  { product: "Samsung Galaxy A54 5G", sku: "SAM-A54", stock: 4, min: 8 },
];

export const quickActions = [
  { label: "Nuevo producto", icon: "plus" },
  { label: "Nuevo pedido", icon: "cart" },
  { label: "Nuevo cliente", icon: "users" },
  { label: "Nueva categoría", icon: "folder" },
  { label: "Reporte de ventas", icon: "chart" },
  { label: "Facturación FEL", icon: "file" },
];

export const adminMenu = [
  { section: "Panel principal", items: ["Dashboard"] },
  { section: "Catálogo", items: ["Productos", "Categorías", "Marcas", "Atributos"] },
  { section: "Ventas", items: ["Pedidos", "Clientes", "Carritos abandonados", "Cupones de descuento"] },
  { section: "Inventario", items: ["Inventario", "Movimientos", "Alertas de stock"] },
  { section: "Finanzas", items: ["Pagos", "Facturación FEL", "Notas de crédito"] },
  { section: "Proveedores", items: ["Proveedores", "Órdenes de compra"] },
  { section: "Reportes", items: ["Ventas", "Productos", "Clientes", "Inventario"] },
  { section: "Sistema", items: ["Usuarios", "Roles y permisos", "Configuración", "Bitácora de actividad"] },
];
