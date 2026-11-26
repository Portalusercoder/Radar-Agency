import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SiteLoader } from "./components/SiteLoader";
import { LEGACY_SERVICE_SLUGS, SERVICES, servicePath } from "./data";
import { I18nProvider } from "./i18n";
import { LeadProvider } from "./lead";
import { Blog } from "./pages/Blog";
import { Contract } from "./pages/Contract";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Packages } from "./pages/Packages";
import { Portfolio } from "./pages/Portfolio";
import { Post } from "./pages/Post";
import { Service } from "./pages/Service";
import { Terms } from "./pages/Terms";

function LegacyService() {
  const { slug = "" } = useParams();
  const next = LEGACY_SERVICE_SLUGS[slug];
  if (next) return <Navigate to={servicePath(next)} replace />;
  if (SERVICES.some((service) => service.slug === slug)) {
    return <Navigate to={servicePath(slug)} replace />;
  }
  return <Navigate to="/#services" replace />;
}

function ScrollTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <I18nProvider>
      <LeadProvider>
        <BrowserRouter>
          <SiteLoader />
          <ScrollTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              {SERVICES.map((service) => (
                <Route
                  key={service.slug}
                  path={servicePath(service.slug)}
                  element={<Service slug={service.slug} />}
                />
              ))}
              <Route path="/services" element={<Navigate to="/#services" replace />} />
              <Route path="/services/:slug" element={<LegacyService />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/packages" element={<Packages />} />
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
