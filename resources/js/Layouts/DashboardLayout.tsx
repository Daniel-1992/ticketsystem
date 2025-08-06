import { PropsWithChildren, useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Menu, X, LogOut, ChevronDown } from 'lucide-react';

type MenuItem = {
    label: string;
    href: string;
};

export default function DashboardLayout({ children }: PropsWithChildren) {
    const { auth, pendingTicketsCount } = usePage().props as any;
    const role = auth.user?.role as 'director' | 'soporte' | 'usuario';
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Menú común para todos los usuarios
    const commonMenu: MenuItem[] = [
        { label: 'Inicio', href: '/' },
        { label: 'Perfil', href: '/perfil' },
    ];

    

    // Menú extra según el rol
    const roleMenus: Record<typeof role, MenuItem[]> = {
        director: [
            { label: 'Reportes', href: '/reportes' },
            { label: 'Usuarios', href: '/usuarios' },
        ],
        soporte: [
            { label: `Tickets a mi cargo (${pendingTicketsCount})`, href: '/tickets' },
            { label: 'Historial', href: '/soporte/tickets/historial' },
        ],
        usuario: [
        { label: 'Abrir Ticket', href: '/tickets/crear' },
        { label: 'Mis Tickets', href: '/tickets' },
    ],
    };

    // Combinar menús
    const menus = [...commonMenu, ...(roleMenus[role] || [])];

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md p-4 transform ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 transition-transform duration-300 z-40`}
            >
                <h2 className="text-xl font-bold mb-4 capitalize">{role}</h2>

                {/* Menú lateral */}
                <nav className="space-y-2">
                    {menus.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="block px-3 py-2 rounded hover:bg-gray-200"
                            onClick={() => setSidebarOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Contenedor principal */}
            <div className="flex-1 flex flex-col">
                {/* Encabezado */}
                <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
                    {/* Botón hamburguesa móvil */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden p-2"
                    >
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Usuario + menú */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                        >
                            <span className="font-medium">{auth.user?.name}</span>
                            <ChevronDown size={18} />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg border">
                                <div className="px-4 py-2 text-sm text-gray-500 border-b">
                                    {auth.user?.email}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                                >
                                    <LogOut size={16} /> Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                {/* Contenido principal */}
                <main className="flex-1 p-6">{children}</main>
            </div>
        </div>
    );
}
