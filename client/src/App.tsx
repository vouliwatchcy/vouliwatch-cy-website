import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Home from "@/pages/Home";
import Sessions from "@/pages/Sessions";
import SessionDetail from "@/pages/SessionDetail";
import About from "@/pages/About";

function Router() {
  return (
    <Switch>
      {/* Greek Routes */}
      <Route path={"/"} component={Home} />
      <Route path={"/sessions"} component={Sessions} />
      <Route path={"/sessions/:date"} component={SessionDetail} />
      <Route path={"/about"} component={About} />
      
      {/* English Routes */}
      <Route path={"/en"} component={Home} />
      <Route path={"/en/sessions"} component={Sessions} />
      <Route path={"/en/sessions/:date"} component={SessionDetail} />
      <Route path={"/en/about"} component={About} />
      
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
