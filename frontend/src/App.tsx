import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { ResumeAnalysis } from './pages/ResumeAnalysis';
import { JobAnalysis } from './pages/JobAnalysis';
import { SkillGap } from './pages/SkillGap';
import { InterviewPlan } from './pages/InterviewPlan';
import { QuestionGenerator } from './pages/QuestionGenerator';
import { MockInterview } from './pages/MockInterview';
import { InterviewReport } from './pages/InterviewReport';
import { StudyAssistant } from './pages/StudyAssistant';
import { Profile } from './pages/Profile';

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resume" element={<ResumeAnalysis />} />
            <Route path="/job-analysis" element={<JobAnalysis />} />
            <Route path="/skill-gap" element={<SkillGap />} />
            <Route path="/interview-plan" element={<InterviewPlan />} />
            <Route path="/question-generator" element={<QuestionGenerator />} />
            <Route path="/mock-interview" element={<MockInterview />} />
            <Route path="/interview-report" element={<InterviewReport />} />
            <Route path="/study-assistant" element={<StudyAssistant />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<AppLayout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
