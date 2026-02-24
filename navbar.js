class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                }
                nav {
                    backdrop-filter: blur(16px) saturate(180%);
                    -webkit-backdrop-filter: blur(16px) saturate(180%);
                    background-color: rgba(17, 24, 39, 0.75);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .nav-link {
                    position: relative;
                    transition: all 0.3s ease;
                    margin: 0 0.5rem;
                    outline: none;
                }
                .nav-link:focus {
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 4px 6px -1px rgba(124, 58, 237, 0.3);
                }
.mobile-menu {
                    transition: all 0.3s ease;
                    max-height: 0;
                    overflow: hidden;
                }
                .mobile-menu.open {
                    max-height: 500px;
                }
                @media (min-width: 768px) {
                    .mobile-menu {
                        max-height: none !important;
                        overflow: visible !important;
                    }
                }
            </style>
            <nav class="py-4 px-6">
                <div class="container mx-auto flex justify-end">
                    <button class="md:hidden text-white focus:outline-none" id="menu-toggle">
<i class="fas fa-bars"></i>
</button>
                    
                    <div class="mobile-menu md:flex" id="mobile-menu">
                    <div class="flex flex-col md:flex-row md:items-center justify-evenly w-full space-y-4 md:space-y-0 py-4 md:py-0">
                            <a href="#about" class="nav-link px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white hover:text-white transition-all duration-300">About</a>
                            <a href="#education" class="nav-link px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white hover:text-white transition-all duration-300">Education</a>
                            <a href="#skills" class="nav-link px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white hover:text-white transition-all duration-300">Skills</a>
                            <a href="#projects" class="nav-link px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white hover:text-white transition-all duration-300">Projects</a>
                            <a href="#contact" class="nav-link px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white hover:text-white transition-all duration-300">Contact</a>
</div>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);

// Add event listener for mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            feather.replace();
        });
    }
});