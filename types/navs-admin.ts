// types/nav.ts

export interface NavChild {
    title: string;
    href: string;
    description?: string; // Optioneel, handig voor grotere dropdowns
}

export interface NavItem {
    title: string;
    href?: string;       // Optioneel omdat een dropdown-parent vaak geen eigen link heeft
    children?: NavChild[]; // De sub-links
    icon?: React.ElementType; // Optioneel, voor als je icoontjes naast je tekst wilt
}

// De eigenlijke configuratie die je exporteert
export const navConfig: NavItem[] = [
    {
        title: "Account",
        href: "/my-account",
    },
    {
        title: "Team",
        href: "/team",
    }
];