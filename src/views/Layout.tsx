import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({children}: LayoutProps): JSX.Element {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <main className="p-2 w-screen h-screen overflow-hidden">
                <SidebarTrigger/>
                {children}
            </main>
        </SidebarProvider>
    )
}
