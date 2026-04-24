"use client";

import React, {useState} from 'react';
import Link from 'next/link';
import {Menu, X, ChevronDown} from 'lucide-react';
import {NavChild, navConfig, NavItem} from '@/types/navs-admin';
import {usePathname} from 'next/navigation';
import {ModeToggle} from "@/components/ui/mode-toggle";

export default function NavbarAdmin() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="bg-background border-b border-border sticky top-0 z-50 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Linkerkant: Logo & Desktop Nav */}
                    <div className="flex items-center gap-6">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            {/* Logo met jouw Primary kleur */}
                            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center shadow-sm">
                                <span className="text-primary-foreground font-bold text-sm">G</span>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-1">
                                {navConfig.map((item) => (
                                    <div key={item.title} className="relative group">
                                        {item.children ? (
                                            <DropdownMenu item={item}/>
                                        ) : (
                                            <Link
                                                href={item.href!}
                                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                                    pathname === item.href
                                                        ? 'bg-accent text-accent-foreground' // De "Dashboard" look uit je screenshot
                                                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                                                }`}
                                            >
                                                {item.title}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Rechterkant: Acties */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                            <Bell size={20} />
                        </button>*/}

                        <ModeToggle/>
                        <Link href="/login">
                            <button
                                className="px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent border border-border rounded-md transition-all shadow-sm">
                                Log in
                            </button>
                        </Link>
                        {/* <div className="w-9 h-9 rounded-full border border-border bg-card overflow-hidden shadow-sm">
                            <img src="https://avatar.vercel.sh/user" alt="User Profile" />
                        </div>*/}
                    </div>

                    {/* Mobiele Hamburger Knop */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-muted-foreground hover:bg-accent rounded-md transition-colors"
                        >
                            {isOpen ? <X size={24}/> : <Menu size={24}/>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobiel Menu */}
            {/* Mobiel Menu */}
            {isOpen && (
                <div
                    className="md:hidden bg-background border-b border-border px-4 py-4 shadow-lg animate-in fade-in slide-in-from-top-2">
                    {/* Thema Switcher bovenaan */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-border mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Thema</span>
                        <ModeToggle/>
                    </div>

                    {/* Navigatie Links */}
                    <div className="space-y-1">
                        {navConfig.map((item) => (
                            <div key={item.title}>
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                                            pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent'
                                        }`}
                                    >
                                        {item.title}
                                    </Link>
                                ) : (
                                    <div className="py-2">
                                        <div
                                            className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                            {item.title}
                                        </div>
                                        {item.children?.map(child => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block pl-6 py-2 text-muted-foreground hover:text-foreground"
                                            >
                                                {child.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* --- DE LOGIN KNOP ONDERAAN --- */}
                    <div className="mt-4 pt-4 border-t border-border">
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            <button className="auth-button bg-primary text-primary-foreground">
                                Inloggen
                            </button>
                        </Link>
                        <p className="text-center text-xs text-muted-foreground mt-3">
                            Nog geen account? <Link href="/register" className="underline">Registreer hier</Link>
                        </p>
                    </div>
                </div>
            )}
        </nav>
    );
}

// Sub-component voor Dropdown (Desktop)
function DropdownMenu({item}: { item: NavItem }) {
    return (
        <div className="relative group">
            <button
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {item.title} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform"/>
            </button>
            <div
                className="absolute left-0 top-full pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                <div className="w-48 bg-popover border border-border text-popover-foreground rounded-md shadow-xl py-1">
                    {(item.children || []).map((child: NavChild) => (
                        <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                            {child.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}