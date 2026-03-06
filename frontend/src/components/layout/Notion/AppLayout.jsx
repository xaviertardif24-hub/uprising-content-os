import React from 'react';

const AppLayout = ({ sidebar, topbar, children }) => {
    return (
        <div className="flex h-screen bg-[var(--color-notion-bg)] text-[var(--color-notion-text)] font-sans antialiased overflow-hidden">
            {/* Sidebar Area */}
            <aside className="w-[260px] flex-shrink-0 border-r border-[var(--color-notion-border)] bg-[var(--color-notion-bg-subtle)] overflow-y-auto custom-scrollbar transition-all duration-300">
                {sidebar}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-[var(--color-notion-bg)] relative">
                {/* Topbar Row */}
                {topbar}

                {/* Page Content Row */}
                <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
                    <section className="mx-auto max-w-[960px] w-full px-12 py-10 pb-32">
                        {children}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default AppLayout;
