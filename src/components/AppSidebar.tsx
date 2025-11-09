import { Plus } from "lucide-react";
import { Sidebar, 
        SidebarContent, 
        SidebarGroup, 
        SidebarGroupAction, 
        SidebarGroupContent, 
        SidebarGroupLabel, 
        SidebarMenu,
        SidebarMenuButton,
        SidebarMenuItem} from "./ui/sidebar";
import { useNotes } from "@/context/NotesContext";


export function AppSidebar()
{
    // const { notes, selectedIndex, editNote } = useNotes();
    const { notes } = useNotes();
    
    return (
        <Sidebar variant="sidebar">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Notes</SidebarGroupLabel>
                    <SidebarGroupAction title="Add note">
                        <Plus/><span className="sr-only">Add Note</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {notes.map((note) => (
                                <SidebarMenuItem key={note.id}>
                                    <SidebarMenuButton asChild>
                                        <a href="#">
                                            <span>{note.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}