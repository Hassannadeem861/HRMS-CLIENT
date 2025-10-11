import { Routes, Route } from "react-router-dom";
import data from "./data.json";

import Employer from "./pages/working-associated.jsx";
import SalarySlip from "./pages/salary-slip.jsx";
import AttendenceSlip from "./pages/attendence.jsx";
import GetSingleAttendence from "./pages/get-single-attendence.jsx";
import Holiday from "./pages/holiday.jsx";
import Leave from "./pages/leave.jsx";
import Remote from "./pages/remote.jsx";
import Time from "./pages/manage-time.jsx";
import ViewSalarySlip from "./pages/view-salary-slip.jsx";
import ProjectAwards from "./pages/project-award.jsx";
import Revenue from "./pages/revenue.jsx";
import Expence from "./pages/expence.jsx";
import Login from "./pages/login.jsx";
import PrivateRoute from "../src/components/pritate-route.jsx";
import DashboardLayout from "./components/dashboard-layout.jsx";
import { ChartAreaInteractive } from "./components/chart-area-interactive.jsx";
import { DataTable } from "./components/data-table.jsx";
import { SectionCards } from "./components/section-cards.jsx";

export default function App() {
  return (
    <Routes>
      {/* ✅ Login: without layout */}
      <Route path="/login" element={<Login />} />

      {/* ✅ Protected Routes with layout */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>
                <DataTable data={data} />
              </div>
            </DashboardLayout>
          }
        />

        <Route
          path="/working-associated"
          element={
            <DashboardLayout>
              <Employer />
            </DashboardLayout>
          }
        />

        <Route
          path="/salary-slip"
          element={
            <DashboardLayout>
              <SalarySlip />
            </DashboardLayout>
          }
        />
        <Route
          path="/manage-time"
          element={
            <DashboardLayout>
              <Time />
            </DashboardLayout>
          }
        />

        <Route
          path="/attendence"
          element={
            <DashboardLayout>
              <AttendenceSlip />
            </DashboardLayout>
          }
        />

        <Route
          path="/get-single-attendence"
          element={
            <DashboardLayout>
              <GetSingleAttendence />
            </DashboardLayout>
          }
        />

        <Route
          path="/holiday"
          element={
            <DashboardLayout>
              <Holiday />
            </DashboardLayout>
          }
        />
        <Route
          path="/leave"
          element={
            <DashboardLayout>
              <Leave />
            </DashboardLayout>
          }
        />

        <Route
          path="/remote"
          element={
            <DashboardLayout>
              <Remote />
            </DashboardLayout>
          }
        />
        {/* Not use route */}
        {/* <Route
          path="/view-salary-slip/:id"
          element={
            <DashboardLayout>
              <ViewSalarySlip />
            </DashboardLayout>
          }
        /> */}
        {/* Not use route */}

        <Route
          path="/project-award"
          element={
            <DashboardLayout>
              <ProjectAwards />
            </DashboardLayout>
          }
        />
        <Route
          path="/expence"
          element={
            <DashboardLayout>
              <Expence />
            </DashboardLayout>
          }
        />
        <Route
          path="/revenue"
          element={
            <DashboardLayout>
              <Revenue />
            </DashboardLayout>
          }
        />
      </Route>
    </Routes>
  );
}
