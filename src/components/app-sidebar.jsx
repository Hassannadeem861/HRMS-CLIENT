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
  IconIdBadge2 ,
  // IconLoan 
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
    name: "Admin",
    email: "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "EMPLOYEES",
      url: "/working-associated",
      icon: IconBriefcase,
    },
    {
      title: "MANAGE-TIME",
      url: "/manage-time",
      icon: IconCalendarTime,
    },
    {
      title: "LOAN",
      url: "/loan",
      icon: IconCalendarTime,
    },
    {
      title: "SALARY-SLIP",
      url: "/salary-slip",
      icon: IconCurrencyDollar,
    },
    {
      title: "ATTENDENCE",
      url: "/attendence",
      icon: IconClock,
    },
    {
      title: "HOLIDAY",
      url: "/holiday",
      icon: IconBeach,
    },
    {
      title: "LEAVE",
      url: "/leave",
      icon: IconCalendarMinus,
    },
    {
      title: "REMOTE",
      url: "/remote",
      icon: IconDeviceLaptop,
    },
    {
      title: "PROJECT-AWARD",
      url: "/project-award",
      icon: IconTrophy,
    },
    {
      title: "EXPENCE",
      url: "/expence",
      icon: IconReceipt2,
    },
    {
      title: "REVENUE",
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
