import * as React from "react";
import {
  IconCurrencyDollar,
  IconClock,
  IconBeach,
  IconCalendarMinus,
  IconDeviceLaptop,
  IconTrophy,
  IconReceipt2,
  IconChartBar,
  IconInnerShadowTop,
  IconCalendarTime,
  IconUsersGroup ,
  IconBriefcase ,
  IconIdBadge2 
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "hassan",
    email: "hassan@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Working-Associated",
      url: "/working-associated",
      icon: IconBriefcase,
    },
    {
      title: "Manage-Time",
      url: "/manage-time",
      icon: IconCalendarTime,
    },
    {
      title: "Salary-Slip",
      url: "/salary-slip",
      icon: IconCurrencyDollar,
    },
    {
      title: "Attendence",
      url: "/attendence",
      icon: IconClock,
    },
    {
      title: "Holiday",
      url: "/holiday",
      icon: IconBeach,
    },
    {
      title: "Leave",
      url: "/leave",
      icon: IconCalendarMinus,
    },
    {
      title: "Remote",
      url: "/remote",
      icon: IconDeviceLaptop,
    },
    {
      title: "Project-Award",
      url: "/project-award",
      icon: IconTrophy,
    },
    {
      title: "Expence",
      url: "/expence",
      icon: IconReceipt2,
    },
    {
      title: "Revenue",
      url: "/revenue",
      icon: IconChartBar,
    },
  ],
  navClouds: [],
  navSecondary: [],
  documents: [],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconBriefcase className="!size-5 text-blue-600" />
                <span className="text-base font-semibold">HRMS</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
