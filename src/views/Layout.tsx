import { AppSidebar } from "@/components/AppSidebard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({children}: LayoutProps): JSX.Element {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="">
                <SidebarTrigger/>
                {children}
            </main>
        </SidebarProvider>
    )
}
