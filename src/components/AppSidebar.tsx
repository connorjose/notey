import { Plus } from "lucide-react";
import { Sidebar, 
        SidebarContent, 
        SidebarGroup, 
        SidebarGroupAction, 
        SidebarGroupContent, 
        SidebarGroupLabel, 
        SidebarHeader, 
        SidebarMenu,
        SidebarMenuButton,
        SidebarMenuItem} from "./ui/sidebar";
import { useNotes } from "@/context/NotesContext";
import SearchBox from "./SearchBox";


export function AppSidebar()
{
    const { filteredNotes, selectedIndex, setSelectedIndex, addNote } = useNotes();
    
    return (
        <Sidebar variant="sidebar">
            <SidebarHeader>
                <h1 className="text-lg font-medium">Notey</h1>
                <SearchBox />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Notes</SidebarGroupLabel>
                    <SidebarGroupAction 
                        title="Add note"
                        onClick={(e) => {
                            e.preventDefault();
                            addNote();
                        }}
                    >
                        <Plus/><span className="sr-only">Add Note</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {filteredNotes?.map((note, idx) => (
                                <SidebarMenuItem key={note.id}>
                                    <SidebarMenuButton 
                                        asChild 
                                        isActive={selectedIndex == idx}
                                    >
                                        <a 
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedIndex(idx)
                                            }}    
                                        >
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