
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Authentication Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// App Pages
import Feed from "./pages/Feed";
import Post from "./pages/Post";
import MyPosts from "./pages/MyPosts";
import AiHelp from "./pages/AiHelp";
import NotFound from "./pages/NotFound";

// Context Providers
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Auth Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* App Pages - Add Auth guard later */}
              <Route path="/feed" element={<Feed />} />
              <Route path="/post" element={<Post />} />
              <Route path="/my-posts" element={<MyPosts />} />
              <Route path="/ai" element={<AiHelp />} />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
