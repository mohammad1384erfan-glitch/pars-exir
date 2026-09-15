import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from '@/lib/settingsContext';
import { AuthProvider } from '@/lib/authContext';
import { SEOProvider } from '@/components/seo/SEOHead';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/admin/ProtectedRoute';
import { AdminLayout } from '@/components/admin/AdminLayout';

// Public pages
import { HomePage } from '@/pages/HomePage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { IndustrialParaffinPage } from '@/pages/IndustrialParaffinPage';
import { ParaffinPricePage } from '@/pages/ParaffinPricePage';
import { ParaffinKashanPage } from '@/pages/ParaffinKashanPage';
import { ParaffinTypesPage } from '@/pages/ParaffinTypesPage';
import { BuyingGuidePage } from '@/pages/BuyingGuidePage';
import { ApplicationsPage } from '@/pages/ApplicationsPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailPage } from '@/pages/ArticleDetailPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Admin pages
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminProductsPage } from '@/pages/admin/AdminProductsPage';
import { AdminProductEditor } from '@/pages/admin/AdminProductEditor';
import { AdminArticlesPage } from '@/pages/admin/AdminArticlesPage';
import { AdminArticleEditor } from '@/pages/admin/AdminArticleEditor';
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage';

export default function App() {
  return (
    <SEOProvider>
      <BrowserRouter>
        <AuthProvider>
          <SettingsProvider>
            <Routes>
              {/* Public routes */}
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:slug" element={<ProductDetailPage />} />
                <Route path="/industrial-paraffin" element={<IndustrialParaffinPage />} />
                <Route path="/paraffin-price" element={<ParaffinPricePage />} />
                <Route path="/paraffin-kashan" element={<ParaffinKashanPage />} />
                <Route path="/paraffin-types" element={<ParaffinTypesPage />} />
                <Route path="/buying-guide" element={<BuyingGuidePage />} />
                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/articles" element={<ArticlesPage />} />
                <Route path="/articles/:slug" element={<ArticleDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Admin login (no layout) */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Protected admin routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminProductsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/:id"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminProductEditor />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/articles"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminArticlesPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/articles/:id"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminArticleEditor />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminSettingsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </SettingsProvider>
        </AuthProvider>
      </BrowserRouter>
    </SEOProvider>
  );
}
