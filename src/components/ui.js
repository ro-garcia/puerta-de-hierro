import { escapeHtml, formatCurrency, icon, statusClass } from "../utils.js";

export const routeLink = (href, label, className = "") =>
  `<a class="${className}" href="${href}" data-route>${label}</a>`;

export const StoreNavbar = () => `
  <header class="store-nav">
    <a href="/" data-route class="brand-mark" aria-label="Inicio">
      <span class="brand-symbol">EBP</span>
      <span>
        <strong>Puerta de Hierro</strong>
        <small>Comercial Puerta de Hierro S.A.</small>
      </span>
    </a>
    <nav class="store-nav__links" aria-label="Navegación principal">
      ${routeLink("/", "Inicio")}
      ${routeLink("/tienda", "Tienda")}
      ${routeLink("/carrito", "Carrito")}
      ${routeLink("/mi-cuenta/pedidos/EBP-2026-0012", "Mi pedido")}
      ${routeLink("/admin/dashboard", "Admin")}
    </nav>
  </header>
`;

export const Breadcrumb = (items) => `
  <nav class="breadcrumb" aria-label="Breadcrumb">
    ${items
      .map((item, index) => {
        const label = escapeHtml(item.label);
        const isLast = index === items.length - 1;
        return isLast ? `<span>${label}</span>` : `${routeLink(item.href, label)}<span aria-hidden="true">›</span>`;
      })
      .join("")}
  </nav>
`;

export const HeaderBanner = ({ title, breadcrumb }) => `
  ${StoreNavbar()}
  <section class="page-banner">
    <div class="page-banner__content">
      <h1>${escapeHtml(title)}</h1>
      ${Breadcrumb(breadcrumb)}
    </div>
  </section>
`;

export const BenefitStrip = (variant = "") => {
  const benefits = [
    { title: "Envíos a todo el país", text: "Entrega rápida y segura", icon: "truck" },
    { title: "Pagos seguros", text: "Tarjetas y transferencia", icon: "card" },
    { title: "Garantía de calidad", text: "Productos 100% garantizados", icon: "shield" },
  ];

  return `
    <section class="benefit-strip ${variant}">
      ${benefits
        .map(
          (benefit) => `
            <article class="benefit-item">
              <span class="benefit-icon">${icon(benefit.icon)}</span>
              <div>
                <h3>${benefit.title}</h3>
                <p>${benefit.text}</p>
              </div>
            </article>
          `,
        )
        .join("")}
    </section>
  `;
};

export const Footer = () => `
  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <h2>Puerta de Hierro</h2>
        <p>Comercial Puerta de Hierro S.A.</p>
        <span>Tu tienda de confianza en productos electrónicos, con calidad, garantía y los mejores precios.</span>
        <div class="social-row" aria-label="Redes sociales">
          <span>f</span><span>ig</span><span>yt</span><span>in</span>
        </div>
      </div>
      <div>
        <h3>Tienda</h3>
        ${routeLink("/tienda", "Productos")}
        ${routeLink("/tienda", "Categorías")}
        ${routeLink("/tienda", "Ofertas")}
        ${routeLink("/tienda", "Nuevos ingresos")}
      </div>
      <div>
        <h3>Soporte</h3>
        <a href="#">Contacto</a>
        <a href="#">Envíos</a>
        <a href="#">Políticas</a>
        <a href="#">Preguntas frecuentes</a>
      </div>
      <div>
        <h3>Contacto</h3>
        <p>Ciudad, Guatemala</p>
        <p>info@elbuenprecio.com.gt</p>
        <p>+502 1234-5678</p>
      </div>
    </div>
    <div class="footer-bottom">© 2026 Comercial Puerta de Hierro S.A. — Todos los derechos reservados</div>
  </footer>
`;

export const ProductCard = (product) => `
  <article class="product-card" data-product-card>
    <div class="product-card__image">
      <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" />
    </div>
    <div class="product-card__body">
      <h3>${escapeHtml(product.name)}</h3>
      <p>${escapeHtml(product.description)}</p>
      <strong>${formatCurrency(product.price)}</strong>
      <span class="status-dot ${statusClass(product.status)}">${escapeHtml(product.status)}</span>
    </div>
    <div class="product-card__actions">
      <button class="button button--primary button--small js-demo-action" data-message="Vista de detalle preparada para ${escapeHtml(product.name)}">Ver detalles</button>
      <button class="icon-button js-demo-action" data-message="${escapeHtml(product.name)} agregado al carrito demo" aria-label="Agregar ${escapeHtml(product.name)} al carrito">${icon("cart")}</button>
    </div>
  </article>
`;

export const FilterSidebar = ({ categories, brands }) => `
  <aside class="filter-sidebar" aria-label="Filtros del catálogo">
    <h2>Filtros</h2>
    <label class="field-label" for="searchProducts">Buscar productos</label>
    <div class="search-field">
      <input id="searchProducts" type="search" placeholder="Buscar por nombre, marca..." />
      ${icon("search")}
    </div>

    <div class="filter-group">
      <h3>Categorías</h3>
      ${categories
        .map((category, index) => `
          <label class="check-row">
            <input type="radio" name="category" value="${escapeHtml(category)}" ${index === 0 ? "checked" : ""} />
            <span>${escapeHtml(category)}</span>
          </label>
        `)
        .join("")}
    </div>

    <div class="filter-group">
      <h3>Rango de precio</h3>
      <input id="priceRange" type="range" min="0" max="6000" step="100" value="6000" />
      <div class="range-row"><span>Q0</span><span id="priceRangeLabel">Q6,000</span></div>
    </div>

    <div class="filter-group">
      <h3>Marca</h3>
      ${brands
        .map((brand, index) => `
          <label class="check-row">
            <input type="checkbox" name="brand" value="${escapeHtml(brand)}" ${index === 0 ? "checked" : ""} />
            <span>${escapeHtml(brand)}</span>
          </label>
        `)
        .join("")}
    </div>

    <div class="filter-group">
      <h3>Disponibilidad</h3>
      <label class="check-row"><input type="checkbox" name="availability" value="in-stock" checked /> <span>En existencia</span></label>
      <label class="check-row"><input type="checkbox" name="availability" value="backorder" checked /> <span>Bajo pedido</span></label>
      <label class="check-row"><input type="checkbox" name="availability" value="out-of-stock" checked /> <span>Agotado</span></label>
    </div>
  </aside>
`;

export const CartItem = ({ product, quantity }) => `
  <article class="cart-item" data-cart-item="${product.id}">
    <div class="cart-product">
      <img src="${product.image}" alt="${escapeHtml(product.name)}" />
      <div>
        <h3>${escapeHtml(product.name)}</h3>
        <p>${escapeHtml(product.description)}</p>
        <span class="status-dot ${statusClass(product.status)}">${escapeHtml(product.status)}</span>
      </div>
    </div>
    <strong>${formatCurrency(product.price)}</strong>
    <div class="quantity-control" aria-label="Cantidad para ${escapeHtml(product.name)}">
      <button data-qty="decrement" data-id="${product.id}" aria-label="Reducir cantidad">−</button>
      <span>${quantity}</span>
      <button data-qty="increment" data-id="${product.id}" aria-label="Aumentar cantidad">+</button>
    </div>
    <strong>${formatCurrency(product.price * quantity)}</strong>
    <button class="icon-button icon-button--plain" data-remove="${product.id}" aria-label="Eliminar ${escapeHtml(product.name)}">${icon("trash")}</button>
  </article>
`;

export const OrderTimeline = (steps) => `
  <ol class="order-timeline">
    ${steps
      .map(
        (step) => `
          <li class="${step.state}">
            <span>${step.state === "current" ? icon("box") : ""}</span>
            <strong>${escapeHtml(step.label)}</strong>
            <small>${escapeHtml(step.date)}</small>
          </li>
        `,
      )
      .join("")}
  </ol>
`;

export const AccountSidebar = () => {
  const items = ["Mi perfil", "Mis direcciones", "Mis pedidos", "Mis facturas", "Métodos de pago", "Cambiar contraseña", "Cerrar sesión"];

  return `
    <aside class="account-sidebar">
      <h2>Mi cuenta</h2>
      ${items.map((item) => `<a class="${item === "Mis pedidos" ? "active" : ""}" href="#">${icon(item === "Cerrar sesión" ? "left" : "file")} ${item}</a>`).join("")}
      <div class="support-box">
        <h3>¿Necesitas ayuda?</h3>
        <p>Si tienes dudas sobre tu pedido, nuestro equipo está para ayudarte.</p>
        <span>${icon("phone")} +502 1234-5678</span>
        <span>${icon("mail")} info@elbuenprecio.com.gt</span>
        <button class="button button--outline js-demo-action" data-message="Soporte demo listo para contactar al cliente">Contactar soporte</button>
      </div>
    </aside>
  `;
};

export const AdminSidebar = (menu) => `
  <aside class="admin-sidebar">
    <div class="admin-brand">
      <span class="brand-symbol">EBP</span>
      <div>
        <strong>Admin EBP</strong>
        <small>Comercial Puerta de Hierro S.A.</small>
      </div>
    </div>
    <nav aria-label="Menú administrativo">
      ${menu
        .map(
          (group) => `
            <section>
              <h3>${escapeHtml(group.section)}</h3>
              ${group.items
                .map((item) => `<a class="${item === "Dashboard" ? "active" : ""}" href="#">${icon(item === "Dashboard" ? "home" : "box")} ${escapeHtml(item)}</a>`)
                .join("")}
            </section>
          `,
        )
        .join("")}
    </nav>
    <button class="collapse-button">${icon("left")} Colapsar menú</button>
  </aside>
`;

export const MetricCard = (metric) => `
  <article class="metric-card metric-card--${metric.tone}">
    <span>${icon(metric.icon)}</span>
    <div>
      <p>${escapeHtml(metric.label)}</p>
      <strong>${escapeHtml(metric.value)}</strong>
      <small>${escapeHtml(metric.trend)}</small>
    </div>
  </article>
`;

export const DashboardTable = ({ title, columns, rows, footer }) => `
  <section class="dashboard-card table-card">
    <div class="dashboard-card__header">
      <h2>${escapeHtml(title)}</h2>
    </div>
    <div class="table-scroll">
      <table>
        <thead>
          <tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
    ${footer ? `<a class="table-footer-link" href="#">${footer}</a>` : ""}
  </section>
`;
