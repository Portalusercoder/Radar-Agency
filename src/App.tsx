import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { I18nProvider } from "./i18n";
import { LeadProvider } from "./lead";
import { Blog } from "./pages/Blog";
import { Contract } from "./pages/Contract";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Portfolio } from "./pages/Portfolio";
import { Post } from "./pages/Post";
import { Service } from "./pages/Service";
import { Terms } from "./pages/Terms";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <I18nProvider>
      <LeadProvider>
        <BrowserRouter>
          <ScrollTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/services/:slug" element={<Service />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<Post />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/terms-and-conditions" element={<Navigate to="/terms" replace />} />
              <Route path="/contract" element={<Contract />} />
              <Route path="/contracting-policy" element={<Navigate to="/contract" replace />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LeadProvider>
    </I18nProvider>
  );
}
