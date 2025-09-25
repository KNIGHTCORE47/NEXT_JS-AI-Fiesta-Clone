"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
} from "@/components/ui/sidebar"
import SidebarHeaderComponent from '@/app/_components/sidebar-header-component';
import SidebarGroupComponent from "./sidebar-group-component";
import SidebarFooterComponent from "./sidebar-footer-component";

export function AppSidebar() {
    return (
        <Sidebar
        // className="w-72"
        >
            <SidebarHeader>
                <SidebarHeaderComponent />
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupComponent />
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarFooterComponent />
            </SidebarFooter>
        </Sidebar>
    )
}