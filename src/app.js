import { brands, categories, products } from "./data/products.js";
import { cartItems, order } from "./data/orders.js";
import {
  adminMenu,
  lowStockProducts,
  metrics,
  orderStatus,
  quickActions,
  recentOrders,
  salesSeries,
} from "./data/dashboard.js";
import {
  AccountSidebar,
  AdminSidebar,
  BenefitStrip,
  CartItem,
  DashboardTable,
  FilterSidebar,
  Footer,
  HeaderBanner,
  MetricCard,
  OrderTimeline,
  ProductCard,
  StoreNavbar,
} from "./components/ui.js";
import { escapeHtml, formatCurrency, icon, statusClass } from "./utils.js";

const app = document.querySelector("#app");
let cartState = cartItems.map((item) => ({ ...item }));

const routes = {
  "/": { title: "Comercial El Buen Precio S.A. | Demo", render: renderHome },
  "/tienda": { title: "Catálogo de productos | Comercial El Buen Precio S.A.", render: renderCatalog },
  "/carrito": { title: "Carrito de compras | Comercial El Buen Precio S.A.", render: renderCart },
  "/mi-cuenta/pedidos/EBP-2026-0012": { title: "Seguimiento de pedido | Comercial El Buen Precio S.A.", render: renderOrderTracking },
  "/admin/dashboard": { title: "Dashboard administrativo | Comercial El Buen Precio S.A.", render: renderAdminDashboard },
};

function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function render() {
  const route = routes[normalizePath(window.location.pathname)] || routes["/"];
  document.title = route.title;
  app.innerHTML = route.render();
  bindRouteLinks();
  bindDemoActions();

  if (normalizePath(window.location.pathname) === "/tienda") bindCatalogFilters();
  if (normalizePath(window.location.pathname) === "/carrito") bindCartActions();
}

function bindRouteLinks() {
  document.querySelectorAll("a[data-route]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      window.history.pushState({}, "", url.pathname);
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function bindDemoActions() {
  document.querySelectorAll(".js-demo-action").forEach((button) => {
    button.addEventListener("click", () => showToast(button.dataset.message || "Acción demo lista"));
  });
}

function showToast(message) {
  let toast = document.querySelector(".demo-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "demo-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("visible"), 2600);
}

function renderHome() {
  return `
    ${StoreNavbar()}
    <main>
      <section class="home-hero">
        <div class="home-hero__content">
          <span>Comercial El Buen Precio S.A.</span>
          <h1>Tecnología que mejora tu vida, al mejor precio</h1>
          <p>Encuentra productos electrónicos de calidad, con garantía y al mejor precio del mercado.</p>
          <a class="button button--primary" href="/tienda" data-route>Ver productos</a>
        </div>
      </section>
      ${BenefitStrip("benefit-strip--home")}
    </main>
  `;
}

function renderCatalog() {
  return `
    ${HeaderBanner({
      title: "Catálogo de productos",
      breadcrumb: [
        { label: "Inicio", href: "/" },
        { label: "Tienda", href: "/tienda" },
      ],
    })}
    <main class="catalog-layout page-shell">
      ${FilterSidebar({ categories, brands })}
      <section class="catalog-content">
        <div class="catalog-toolbar">
          <p id="catalogCount">Mostrando 1-12 de ${products.length} productos</p>
          <div class="catalog-toolbar__actions">
            <span>Ver:</span>
            <button class="icon-button active" aria-label="Vista en cuadrícula">${icon("grid")}</button>
            <button class="icon-button" aria-label="Vista en lista">${icon("list")}</button>
            <select id="sortProducts" aria-label="Ordenar por">
              <option value="featured">Más vendidos</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>
        </div>
        <div id="productGrid" class="product-grid">
          ${products.map(ProductCard).join("")}
        </div>
        <nav class="pagination" aria-label="Paginación del catálogo">
          <button class="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button aria-label="Siguiente">›</button>
        </nav>
      </section>
    </main>
    ${Footer()}
  `;
}

function bindCatalogFilters() {
  const search = document.querySelector("#searchProducts");
  const range = document.querySelector("#priceRange");
  const rangeLabel = document.querySelector("#priceRangeLabel");
  const sort = document.querySelector("#sortProducts");
  const grid = document.querySelector("#productGrid");
  const count = document.querySelector("#catalogCount");
  const controls = document.querySelectorAll(".filter-sidebar input, #sortProducts");

  const apply = () => {
    const query = search.value.trim().toLowerCase();
    const selectedCategory = document.querySelector("input[name='category']:checked")?.value || "Todas las categorías";
    const selectedBrands = [...document.querySelectorAll("input[name='brand']:checked")].map((input) => input.value);
    const selectedAvailability = [...document.querySelectorAll("input[name='availability']:checked")].map((input) => input.value);
    const maxPrice = Number(range.value);

    if (selectedBrands.includes("Todas las marcas") && selectedBrands.length > 1) {
      document.querySelector("input[name='brand'][value='Todas las marcas']").checked = false;
    }

    rangeLabel.textContent = formatCurrency(maxPrice).replace(".00", "");

    let filtered = products.filter((product) => {
      const matchesQuery = `${product.name} ${product.description} ${product.brand}`.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === "Todas las categorías" || product.category === selectedCategory;
      const brandsToUse = selectedBrands.includes("Todas las marcas") || selectedBrands.length === 0 ? brands.slice(1) : selectedBrands;
      const matchesBrand = brandsToUse.includes(product.brand);
      const matchesAvailability = selectedAvailability.includes(product.availability);
      const matchesPrice = product.price <= maxPrice;

      return matchesQuery && matchesCategory && matchesBrand && matchesAvailability && matchesPrice;
    });

    filtered = sortProducts(filtered, sort.value);
    grid.innerHTML = filtered.length
      ? filtered.map(ProductCard).join("")
      : `<div class="empty-state"><strong>No se encontraron productos</strong><p>Ajusta los filtros para ver más opciones.</p></div>`;
    count.textContent = `Mostrando ${filtered.length ? `1-${filtered.length}` : "0"} de ${products.length} productos`;
    bindDemoActions();
  };

  controls.forEach((control) => control.addEventListener("input", apply));
  controls.forEach((control) => control.addEventListener("change", apply));
}

function sortProducts(items, sort) {
  const sorted = [...items];

  if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));

  return sorted;
}

function getCartTotals() {
  const subtotal = cartState.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal > 0 ? 998 : 0;
  const shipping = 0;
  const taxes = 0;
  const total = Math.max(subtotal - discount + shipping + taxes, 0);

  return { subtotal, discount, shipping, taxes, total };
}

function renderCart() {
  const totals = getCartTotals();

  return `
    ${HeaderBanner({
      title: "Carrito de compras",
      breadcrumb: [
        { label: "Inicio", href: "/" },
        { label: "Carrito de compras", href: "/carrito" },
      ],
    })}
    <main class="cart-page page-shell">
      <section class="cart-panel">
        <div class="cart-panel__header">
          <h2>Productos en tu carrito (${cartState.length})</h2>
        </div>
        <div class="cart-heading" aria-hidden="true">
          <span>Producto</span><span>Precio unitario</span><span>Cantidad</span><span>Subtotal</span><span></span>
        </div>
        <div class="cart-list">
          ${cartState.length ? cartState.map(CartItem).join("") : `<div class="empty-state"><strong>Tu carrito está vacío</strong><p>Agrega productos desde el catálogo demo.</p></div>`}
        </div>
      </section>
      <aside class="order-summary">
        <h2>Resumen del pedido</h2>
        ${summaryRow(`Subtotal (${cartState.length} productos)`, totals.subtotal)}
        ${summaryRow("Descuento", -totals.discount, "success")}
        ${summaryRow("Envío", totals.shipping)}
        ${summaryRow("Impuestos (12%)", totals.taxes)}
        <div class="summary-total">
          <span>Total</span>
          <strong>${formatCurrency(totals.total)}</strong>
        </div>
        <button class="button button--primary button--full js-demo-action" data-message="Checkout demo preparado"> ${icon("lock")} Proceder al pago</button>
        ${BenefitStrip("benefit-strip--summary")}
      </aside>
      <div class="cart-actions">
        <a class="button button--outline" href="/tienda" data-route>${icon("left")} Seguir comprando</a>
      </div>
      <section class="secure-payments">
        <div>
          <span class="benefit-icon">${icon("shield")}</span>
          <div>
            <h2>Compra segura</h2>
            <p>Tu información está protegida con encriptación SSL de 256 bits.</p>
          </div>
        </div>
        <ul>
          <li>Visa</li>
          <li>Mastercard</li>
          <li>PayPal</li>
          <li>BI</li>
          <li>Transferencia bancaria</li>
        </ul>
      </section>
    </main>
  `;
}

function summaryRow(label, value, tone = "") {
  return `
    <div class="summary-row ${tone}">
      <span>${label}</span>
      <strong>${formatCurrency(value)}</strong>
    </div>
  `;
}

function bindCartActions() {
  document.querySelector(".cart-page")?.addEventListener("click", (event) => {
    const quantityButton = event.target.closest("[data-qty]");
    const removeButton = event.target.closest("[data-remove]");

    if (quantityButton) {
      const id = quantityButton.dataset.id;
      const item = cartState.find((cartItem) => cartItem.product.id === id);
      if (!item) return;
      item.quantity = quantityButton.dataset.qty === "increment" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
      render();
    }

    if (removeButton) {
      cartState = cartState.filter((cartItem) => cartItem.product.id !== removeButton.dataset.remove);
      render();
    }
  });
}

function renderOrderTracking() {
  return `
    ${HeaderBanner({
      title: "Seguimiento de pedidos",
      breadcrumb: [
        { label: "Inicio", href: "/" },
        { label: "Mi cuenta", href: "/mi-cuenta/pedidos/EBP-2026-0012" },
        { label: "Mis pedidos", href: "/mi-cuenta/pedidos/EBP-2026-0012" },
        { label: `Pedido ${order.id}`, href: "/mi-cuenta/pedidos/EBP-2026-0012" },
      ],
    })}
    <main class="account-page page-shell">
      ${AccountSidebar()}
      <section class="order-content">
        <div class="order-return-row">
          <a href="/tienda" data-route>${icon("left")} Volver a mis pedidos</a>
          <span>Pedido realizado el ${order.placedAt}</span>
        </div>
        <section class="order-summary-card">
          <div><span>Número de pedido</span><strong>${order.id}</strong></div>
          <div><span>Estado actual</span><strong class="pill pill--green">${order.status}</strong></div>
          <div><span>Método de pago</span><strong>${order.paymentMethod}</strong></div>
          <div><span>Total del pedido</span><strong>${formatCurrency(order.total)}</strong></div>
        </section>
        <section class="tracking-card">
          <h2>Estado de tu pedido</h2>
          ${OrderTimeline(order.timeline)}
          <div class="status-message">
            ${icon("box")}
            <div>
              <strong>${order.message}</strong>
              <p>Estamos empacando tus productos con cuidado. En breve será entregado a la empresa de transporte.</p>
            </div>
          </div>
        </section>
        <div class="order-detail-grid">
          <section class="order-products-card">
            <h2>Productos (${order.items.length})</h2>
            ${order.items
              .map(
                ({ product, quantity }) => `
                  <article class="mini-product">
                    <img src="${product.image}" alt="${escapeHtml(product.name)}" />
                    <div>
                      <h3>${escapeHtml(product.name)}</h3>
                      <p>Cantidad: ${quantity}</p>
                    </div>
                    <strong>${formatCurrency(product.price * quantity)}</strong>
                  </article>
                `,
              )
              .join("")}
            <button class="button button--outline js-demo-action" data-message="Detalle completo del pedido disponible">Ver detalles del pedido</button>
          </section>
          <section class="delivery-card">
            <h2>Información de entrega</h2>
            <article>
              ${icon("map")}
              <div>
                <strong>${order.delivery.address}</strong>
                <p>${order.delivery.city}</p>
                <p>Referencia: ${order.delivery.reference}</p>
              </div>
            </article>
            <article>
              ${icon("truck")}
              <div>
                <strong>Empresa de envío</strong>
                <p>${order.delivery.carrier}</p>
                <p>Número de guía: ${order.delivery.trackingNumber}</p>
                <button class="button button--outline js-demo-action" data-message="Rastreo de envío demo abierto">Rastrear envío</button>
              </div>
            </article>
            <article>
              ${icon("card")}
              <div>
                <strong>Fecha estimada de entrega</strong>
                <p>${order.delivery.estimatedDelivery}</p>
              </div>
            </article>
          </section>
        </div>
      </section>
    </main>
  `;
}

function renderAdminDashboard() {
  return `
    <main class="admin-layout">
      ${AdminSidebar(adminMenu)}
      <section class="admin-main">
        <header class="admin-header">
          <div>
            <h1>Dashboard</h1>
            <p>Resumen general de la tienda</p>
          </div>
          <select aria-label="Rango de fechas">
            <option>01/05/2026 - 08/05/2026</option>
            <option>Semana anterior</option>
            <option>Mes actual</option>
          </select>
        </header>
        <section class="metrics-grid">
          ${metrics.map(MetricCard).join("")}
        </section>
        <section class="dashboard-grid">
          <article class="dashboard-card sales-card">
            <div class="dashboard-card__header">
              <h2>Ventas</h2>
              <select aria-label="Periodo de ventas"><option>Últimos 7 días</option></select>
            </div>
            ${SalesChart()}
          </article>
          <article class="dashboard-card donut-card">
            <div class="dashboard-card__header">
              <h2>Pedidos por estado</h2>
            </div>
            ${DonutChart()}
          </article>
        </section>
        <section class="dashboard-grid">
          ${DashboardTable({
            title: "Pedidos recientes",
            columns: ["Pedido", "Cliente", "Fecha", "Total", "Estado", "Acciones"],
            rows: recentOrders.map((row) => [
              escapeHtml(row.id),
              escapeHtml(row.client),
              escapeHtml(row.date),
              escapeHtml(row.total),
              `<span class="pill pill--${statusClass(row.status)}">${escapeHtml(row.status)}</span>`,
              `<button class="icon-button icon-button--plain js-demo-action" data-message="Abriendo ${escapeHtml(row.id)}">${icon("eye")}</button>`,
            ]),
            footer: "Ver todos los pedidos →",
          })}
          ${DashboardTable({
            title: "Productos con stock bajo",
            columns: ["Producto", "Stock actual", "Stock mínimo", "Acciones"],
            rows: lowStockProducts.map((row) => [
              `<strong>${escapeHtml(row.product)}</strong><small>SKU: ${escapeHtml(row.sku)}</small>`,
              `<span class="stock-danger">${row.stock}</span>`,
              escapeHtml(row.min),
              `<button class="button button--outline button--tiny js-demo-action" data-message="Producto ${escapeHtml(row.product)} seleccionado">Ver producto</button>`,
            ]),
            footer: "Ver todos los productos →",
          })}
        </section>
        <section class="quick-actions dashboard-card">
          <h2>Accesos rápidos</h2>
          <div>
            ${quickActions
              .map((action) => `<button class="quick-action js-demo-action" data-message="${escapeHtml(action.label)} demo listo">${icon(action.icon)} ${escapeHtml(action.label)}</button>`)
              .join("")}
          </div>
        </section>
        <footer class="admin-footer">
          <span>© 2026 Comercial El Buen Precio S.A. Todos los derechos reservados.</span>
          <span>Versión 1.0.0</span>
        </footer>
      </section>
    </main>
  `;
}

function SalesChart() {
  const width = 640;
  const height = 230;
  const padding = 32;
  const max = 60000;
  const points = salesSeries.map((item, index) => {
    const x = padding + (index * (width - padding * 2)) / (salesSeries.length - 1);
    const y = height - padding - (item.value / max) * (height - padding * 2);
    return { ...item, x, y };
  });
  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${path} L ${points.at(-1).x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return `
    <svg class="sales-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Gráfico de ventas simulado">
      <defs>
        <linearGradient id="salesArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2563eb" stop-opacity=".24"/>
          <stop offset="1" stop-color="#2563eb" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <g class="chart-grid">
        ${[0, 1, 2, 3].map((step) => `<line x1="${padding}" y1="${padding + step * 42}" x2="${width - padding}" y2="${padding + step * 42}"/>`).join("")}
      </g>
      <path d="${areaPath}" fill="url(#salesArea)"/>
      <path d="${path}" fill="none" stroke="#2563eb" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      ${points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="5" fill="#2563eb"/>`).join("")}
      ${points.map((point) => `<text x="${point.x}" y="${height - 8}" text-anchor="middle">${point.label}</text>`).join("")}
    </svg>
  `;
}

function DonutChart() {
  const total = orderStatus.reduce((sum, item) => sum + item.value, 0);
  let offset = 25;
  const radius = 64;
  const circumference = 2 * Math.PI * radius;

  const slices = orderStatus
    .map((item) => {
      const dash = (item.value / total) * circumference;
      const slice = `<circle r="${radius}" cx="90" cy="90" fill="transparent" stroke="${item.color}" stroke-width="28" stroke-dasharray="${dash} ${circumference - dash}" stroke-dashoffset="-${offset}" />`;
      offset += dash;
      return slice;
    })
    .join("");

  return `
    <div class="donut-wrap">
      <svg class="donut-chart" viewBox="0 0 180 180" role="img" aria-label="Pedidos por estado">
        <circle r="${radius}" cx="90" cy="90" fill="transparent" stroke="#e5e7eb" stroke-width="28" />
        ${slices}
        <text x="90" y="84" text-anchor="middle">128</text>
        <text x="90" y="108" text-anchor="middle">Total</text>
      </svg>
      <ul>
        ${orderStatus
          .map((item) => {
            const percent = ((item.value / total) * 100).toFixed(1);
            return `<li><span style="--dot:${item.color}"></span><strong>${escapeHtml(item.label)}</strong><em>${item.value} (${percent}%)</em></li>`;
          })
          .join("")}
      </ul>
    </div>
  `;
}

window.addEventListener("popstate", render);
render();
