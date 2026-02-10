// 主题切换功能
class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.themeIcon = this.themeToggle?.querySelector('.material-icons');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        // 应用保存的主题
        this.applyTheme(this.currentTheme);
        
        // 绑定切换事件
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // 监听系统主题变化
        this.watchSystemTheme();
    }
    
    applyTheme(theme) {
        document.body.className = `${theme}-theme`;
        
        // 更新图标
        if (this.themeIcon) {
            this.themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
        }
        
        // 保存到本地存储
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        
        // 添加点击反馈
        this.themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'scale(1)';
        }, 150);
    }
    
    watchSystemTheme() {
        // 检查系统主题偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // 如果没有手动设置过主题，跟随系统
        if (!localStorage.getItem('theme')) {
            this.applyTheme(prefersDark.matches ? 'dark' : 'light');
        }
        
        // 监听系统主题变化
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

// 卡片交互效果
class CardInteractions {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
            card.addEventListener('mousedown', this.handleMouseDown.bind(this));
            card.addEventListener('mouseup', this.handleMouseUp.bind(this));
        });
    }
    
    handleMouseEnter(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(-4px)';
        card.style.transition = 'all 0.2s var(--md-sys-motion-easing-standard)';
    }
    
    handleMouseLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(0)';
    }
    
    handleMouseDown(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(-2px) scale(0.98)';
    }
    
    handleMouseUp(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(-4px) scale(1)';
    }
}

// 滚动动画
class ScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver(this.handleIntersection.bind(this), this.observerOptions);
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化主题管理器
    new ThemeManager();
    
    // 初始化卡片交互
    new CardInteractions();
    
    // 初始化滚动动画
    new ScrollAnimations();
    
    // 添加加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s var(--md-sys-motion-easing-standard)';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加键盘快捷键
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + T 切换主题
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        document.querySelector('.theme-toggle')?.click();
    }
    
    // Escape 键清除所有焦点状态
    if (e.key === 'Escape') {
        document.activeElement?.blur();
    }
});