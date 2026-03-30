import React from 'react';

const AppLayout = ({ sidebar, topbar, children, sidebarCollapsed }) => {
    return (
        <div className="flex h-screen bg-notion-bg text-notion-text font-sans antialiased overflow-hidden">
            {/* Sidebar Area */}
            <aside className={`flex-shrink-0 border-r border-notion-border bg-notion-bg-subtle overflow-y-auto custom-scrollbar transition-all duration-300 ${sidebarCollapsed ? 'w-0 -translate-x-full' : 'w-[260px]'}`}>
                {!sidebarCollapsed && sidebar}
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-notion-bg relative">
                {/* Topbar Row */}
                {topbar}

                {/* Page Content Row */}
                <div className="flex-1 overflow-y-auto custom-scrollbar scroll-smooth">
                    <section className={`mx-auto w-full px-12 md:px-16 lg:px-20 py-12 pb-32 transition-all duration-300 ${sidebarCollapsed ? 'max-w-[1200px]' : 'max-w-[1000px]'}`}>
                        {children}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default AppLayout;
