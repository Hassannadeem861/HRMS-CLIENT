import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import data from "./data.json";
import PrivateRoute from "../src/components/pritate-route.jsx";
import DashboardLayout from "./components/dashboard-layout.jsx";

// Lazy load pages
const Employer = lazy(() => import("./pages/working-associated.jsx"));
const SalarySlip = lazy(() => import("./pages/salary-slip.jsx"));
const AttendenceSlip = lazy(() => import("./pages/attendence.jsx"));
const GetSingleAttendence = lazy(() =>
  import("./pages/get-single-attendence.jsx")
);
const Holiday = lazy(() => import("./pages/holiday.jsx"));
const Leave = lazy(() => import("./pages/leave.jsx"));
const Remote = lazy(() => import("./pages/remote.jsx"));
const Time = lazy(() => import("./pages/manage-time.jsx"));
const ViewSalarySlip = lazy(() => import("./pages/view-salary-slip.jsx"));
const ProjectAwards = lazy(() => import("./pages/project-award.jsx"));
const Revenue = lazy(() => import("./pages/revenue.jsx"));
const Expence = lazy(() => import("./pages/expence.jsx"));
const Login = lazy(() => import("./pages/login.jsx"));
const Loan = lazy(() => import("./pages/office-loan.jsx"));

import { ChartAreaInteractive } from "./components/chart-area-interactive.jsx";
import { DataTable } from "./components/data-table.jsx";
import { SectionCards } from "./components/section-cards.jsx";
import Loader from "./components/loader.jsx";
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
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
            path="/loan"
            element={
              <DashboardLayout>
                <Loan />
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
    </Suspense>
  );
}
