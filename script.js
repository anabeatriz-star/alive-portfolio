// ===== Trabalhos por categoria =====
// Tipos de item:
//   { image: "images/arquivo.png", alt: "descrição" }
//   { title: "Nome", text: "Descrição", link: "https://..." }

const categories = {
    discord: {
        label: "DESIGN PARA DISCORD",
        title: "Banners e embeds",
        desc: "Banners, embeds e identidade visual criados para servidores.",
        items: [
            { image: "images/banner-01.png", alt: "Banner 1" },
            { image: "images/banner-02.png", alt: "Banner 2" },
            { image: "images/banner-03.png", alt: "Banner 3" },
            { image: "images/banner-05.png", alt: "Banner 5" },
            { image: "images/banner-06.png", alt: "Banner 6" },
            { image: "images/banner-07.png", alt: "Banner 7" },
            { image: "images/banner-08.png", alt: "Banner 8" }
        ]
    },
    automacao: {
        label: "AUTOMAÇÃO E SISTEMAS",
        title: "Bots e sistemas",
        desc: "Bots, organização de sistemas e logs.",
        items: []
    },
    grafico: {
        label: "DESIGN GRÁFICO",
        title: "Apresentações e materiais",
        desc: "Apresentações, slides, capas e materiais criados no Canva.",
        items: [
            {
                title: "Refúgio e Esperança",
                text: "Apresentação editorial criada no Canva para um trabalho escolar.",
                link: "https://www.canva.com/design/DAHKfUmqhFM/cLcNZLjgOuJx4dQJdWr2CA/view"
            }
        ]
    },
    identidade: {
        label: "IDENTIDADE VISUAL",
        title: "Conceitos e marcas",
        desc: "Conceitos visuais e elementos de marca.",
        items: []
    }
};

// ===== Janela (modal) =====
const modal = document.getElementById("modal");
const modalLabel = document.getElementById("modal-label");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalGrid = document.getElementById("modal-grid");

let lastFocused = null;

function renderItem(item) {
    if (item.image) {
        return `<figure class="modal-item modal-item--image">
                    <img src="${item.image}" alt="${item.alt || ""}" loading="lazy">
                </figure>`;
    }

    const link = item.link
        ? `<a href="${item.link}" target="_blank" rel="noopener">Ver projeto ↗</a>`
        : "";

    return `<article class="modal-item modal-item--text">
                <h3>${item.title}</h3>
                <p>${item.text || ""}</p>
                ${link}
            </article>`;
}

function openModal(key) {
    const cat = categories[key];
    if (!cat) return;

    modalLabel.textContent = cat.label;
    modalTitle.textContent = cat.title;
    modalDesc.textContent = cat.desc;

    if (cat.items.length === 0) {
        modalGrid.innerHTML = `<div class="modal-empty">
            <span class="project-tag">Em breve</span>
            <p>Ainda não há trabalhos publicados nesta categoria.</p>
        </div>`;
    } else {
        modalGrid.innerHTML = cat.items.map(renderItem).join("");
    }

    lastFocused = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
}

function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
}

document.querySelectorAll("[data-category]").forEach((card) => {
    card.addEventListener("click", () => openModal(card.dataset.category));
});

modal.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});