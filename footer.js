class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: rgba(17, 24, 39, 0.8);
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                .footer-content {
                    backdrop-filter: blur(16px) saturate(180%);
                    -webkit-backdrop-filter: blur(16px) saturate(180%);
                }
                .social-link {
                    transition: all 0.3s ease;
                }
                .social-link:hover {
                    transform: translateY(-3px);
                }
            </style>
            <footer class="py-8">
                <div class="container mx-auto px-4 footer-content">
                    <div class="flex flex-col md:flex-row justify-between items-center">
                        <div class="mb-6 md:mb-0">
                            <h2 class="text-2xl font-bold text-white gradient-text bg-gradient-to-r from-purple-400 to-pink-600">
                                Nkululeko Khalishwayo
                            </h2>
                            <p class="text-gray-400 mt-2">BSc Information Technology</p>
                        </div>
                        
                        <div class="flex space-x-6">
                            <a href="mailto:khalishwayoN@outlook.com" class="social-link text-gray-400 hover:text-purple-400">
                            <i class="fas fa-envelope"></i>
</a>
                            <a href="tel:+27839615007" class="social-link text-gray-400 hover:text-purple-400">
                            <i class="fas fa-phone"></i>
</a>
                            <a href="https://www.linkedin.com/in/nkululeko-khalishwayo-782566376" class="social-link text-gray-400 hover:text-purple-400">
                            <i class="fab fa-linkedin-in"></i>
</a>
                            <a href="https://github.com/thrill4N" class="social-link text-gray-400 hover:text-purple-400">
                            <i class="fab fa-github"></i>
</a>
                        </div>
                    </div>
                    
                    <div class="mt-8 text-center text-gray-500 text-sm">
                        <p>© ${new Date().getFullYear()} Nkululeko Khalishwayo. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);