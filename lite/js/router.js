// Simple client-side router
const router = {
  routes: {},
  currentPath: '/',
  
  register(path, handler) {
    this.routes[path] = handler;
  },
  
  async navigate(path) {
    this.currentPath = path;
    window.history.pushState({}, '', path);
    await this.render();
  },
  
  async render() {
    const path = window.location.pathname;
    const handler = this.routes[path] || this.routes['/404'];
    
    if (handler) {
      const content = await handler();
      document.getElementById('app').innerHTML = content;
      window.scrollTo(0, 0);
    }
  },
  
  init() {
    // Handle back/forward buttons
    window.addEventListener('popstate', () => this.render());
    
    // Handle link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-link]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
    
    // Initial render
    this.render();
  }
};
