import { useState, useMemo, useRef } from "react";
import {
  Search,
  Download,
  Plane,
  Shield,
  Eye,
  X,
  Layers,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Gauge,
  Box,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  AlertTriangle,
  UploadCloud,
  Image as ImageIcon,
  Cpu,
  FlaskConical,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useProducts } from "../context/ProductsContext";
import ProductFormDrawer from "../components/products/ProductFormDrawer";
import ProductDetailInspectModal from "../components/products/ProductDetailInspectModal";
import {
  AEROSPACE_CATEGORIES,
  DEFENCE_CATEGORIES,
  PRESET_IMAGES,
  SUGGESTED_SPECS,
} from "../components/products/aerospaceTemplates";

const renderDivisionIcon = (name, className = "w-3.5 h-3.5") => {
  switch (name) {
    case "Aerospace":
      return <Plane className={className} />;
    case "Defence":
      return <Shield className={className} />;
    case "Advanced Systems":
      return <Cpu className={className} />;
    case "Petrochemicals":
      return <FlaskConical className={className} />;
    default:
      return <Layers className={className} />;
  }
};

export default function ProductsPage({
  initialDivision = "All",
  lockedDivision = null,
  onNavigateTab,
}) {
  const {
    divisions = [],
    categories = [],
    products = [],
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
    resetCatalog,
  } = useProducts();

  const [activeDivision, setActiveDivision] = useState(
    lockedDivision || initialDivision
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'Active' | 'Inactive'
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("table"); // default to list/table view

  // Side Drawer & Modals state
  const [showAddDrawer, setShowAddDrawer] = useState(false); // Add Sidebar Drawer
  const [productToEdit, setProductToEdit] = useState(null); // Edit Sidebar Drawer
  const [selectedProduct, setSelectedProduct] = useState(null); // Inspect Modal
  const [productToDelete, setProductToDelete] = useState(null); // Delete Confirm Modal
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Toast notice
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const ITEMS_PER_PAGE = 10;

  // Active division products from dynamic products (supports All)
  const currentProducts = useMemo(() => {
    if (!activeDivision || activeDivision === "All" || activeDivision === "all") {
      return products;
    }
    return products.filter((p) => p.division === activeDivision);
  }, [products, activeDivision]);

  // Temporarily hide Advanced Systems and Petrochemicals, leaving the 2 main divisions (Aerospace & Defence)
  const visibleDivisions = useMemo(() => {
    return divisions.filter((d) => {
      const name = d.name?.toLowerCase().trim();
      const slug = d.slug?.toLowerCase().trim();
      return (
        name !== "advanced systems" &&
        name !== "petrochemicals" &&
        slug !== "advanced-systems" &&
        slug !== "petrochemicals" &&
        d.status !== "Inactive"
      );
    });
  }, [divisions]);

  // Active categories definition dynamically from context or fallback
  const activeCategoriesList = useMemo(() => {
    if (activeDivision === "Aerospace") {
      const fromContext = categories.filter((c) => c.division === "Aerospace");
      if (fromContext.length > 0) return fromContext;
      return AEROSPACE_CATEGORIES;
    }
    if (activeDivision === "Defence") {
      const fromContext = categories.filter((c) => c.division === "Defence");
      if (fromContext.length > 0) return fromContext;
      return DEFENCE_CATEGORIES;
    }
    return categories;
  }, [categories, activeDivision]);

  // Compute live product counts per category in this division
  const categoryCounts = useMemo(() => {
    const counts = {};
    currentProducts.forEach((p) => {
      const cTitle = p.categoryTitle || p.categoryName || "";
      const cId = p.categoryId || "";
      if (cId) counts[cId] = (counts[cId] || 0) + 1;
      if (cTitle) counts[cTitle] = (counts[cTitle] || 0) + 1;
    });
    return counts;
  }, [currentProducts]);

  // Compute status counts for active division
  const activeCount = useMemo(
    () => currentProducts.filter((p) => p.status !== "Inactive").length,
    [currentProducts]
  );
  const inactiveCount = useMemo(
    () => currentProducts.filter((p) => p.status === "Inactive").length,
    [currentProducts]
  );

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return currentProducts.filter((p) => {
      // Category filter
      const pCatName = (p.categoryTitle || p.categoryName || "").toLowerCase().trim();
      const pCatId = (p.categoryId || "").toLowerCase().trim();
      const targetCat = selectedCategory.toLowerCase().trim();

      const matchesCategory =
        selectedCategory === "all" ||
        pCatId === targetCat ||
        pCatName === targetCat ||
        pCatId.replace(/[^a-z0-9]/g, "") === targetCat.replace(/[^a-z0-9]/g, "");

      // Status filter
      const pStatus = p.status || "Active";
      const matchesStatus =
        statusFilter === "all" ||
        pStatus.toLowerCase() === statusFilter.toLowerCase();

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        (p.categoryTitle && p.categoryTitle.toLowerCase().includes(q)) ||
        (p.id && p.id.toLowerCase().includes(q));

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [currentProducts, selectedCategory, statusFilter, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleDivisionChange = (newDivision) => {
    setActiveDivision(newDivision);
    setSelectedCategory("all");
    setStatusFilter("all");
    setSearchQuery("");
    setCurrentPage(1);
    if (onNavigateTab) {
      if (newDivision === "All" || newDivision === "all") {
        onNavigateTab("products");
      } else {
        const slug =
          newDivision === "Aerospace"
            ? "products-aerospace"
            : newDivision === "Defence"
            ? "products-defence"
            : `products-${newDivision.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
        onNavigateTab(slug);
      }
    }
  };

  const handleToggleStatus = async (p) => {
    try {
      const serverStatus = await toggleProductStatus(p.id || p._id);
      const resultingStatus = serverStatus || (p.status === "Inactive" ? "Active" : "Inactive");
      triggerToast(`"${p.name}" status changed to ${resultingStatus}.`);
      if (selectedProduct && (selectedProduct.id === p.id || selectedProduct._id === p._id)) {
        setSelectedProduct((prev) => ({ ...prev, status: resultingStatus }));
      }
    } catch (err) {
      triggerToast(err.message || "Failed to update product status.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete.id || productToDelete._id);
      triggerToast(`"${productToDelete.name}" was successfully deleted.`);
      if (selectedProduct && (selectedProduct.id === productToDelete.id || selectedProduct._id === productToDelete._id)) {
        setSelectedProduct(null);
      }
    } catch (err) {
      triggerToast(err.message || "Failed to delete product.");
    } finally {
      setProductToDelete(null);
    }
  };

  const handleExportCSV = () => {
    const headers =
      "Product ID,Name,Division,Category,Status,Description,Image\n";
    const rows = filteredProducts
      .map(
        (p) =>
          `"${p.id}","${p.name.replace(/"/g, '""')}","${p.division}","${
            p.categoryTitle || p.categoryName || ""
          }","${p.status || "Active"}","${(p.description || "").replace(
            /"/g,
            '""'
          )}","${p.imageSrc}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `SkyWardens_${activeDivision}_Products_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(`${activeDivision} products exported to CSV.`);
  };

  const extractSpecGrid = (product) => {
    if (!product?.details) return [];
    const gridSection = product.details.find((d) => d.type === "spec-grid");
    return gridSection?.items || [];
  };

  const extractOverviewText = (product) => {
    if (!product?.details) return product.description;
    const textSection = product.details.find((d) => d.type === "text");
    return textSection?.body || product.description;
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1c232f] text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1c232f]">
            {activeDivision === "All" || activeDivision === "all"
              ? "All Products"
              : `${activeDivision} Products`}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage equipment catalog, upload imagery, and toggle active/inactive status.
          </p>
        </div>

        {/* Action: Only New Product Button (Opens Right Sidebar Drawer) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddDrawer(true)}
            className="px-4 py-2.5 bg-[#105784] hover:bg-[#0c476c] text-white text-xs sm:text-sm font-bold rounded-xl shadow-2xs hover:shadow-sm transition flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Product</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Total in Division */}
        <div className="bg-white rounded-xl p-4 border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] border-l-4 border-l-[#105784]">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            {activeDivision === "All" || activeDivision === "all" ? "Total Products" : `Total ${activeDivision}`}
          </span>
          <div className="text-2xl font-bold text-[#1c232f] mt-1">
            {currentProducts.length}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">Total catalog items</div>
        </div>

        {/* Active Products */}
        <div className="bg-white rounded-xl p-4 border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Active Status
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {activeCount}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            Live & operational
          </div>
        </div>

        {/* Inactive Products */}
        <div className="bg-white rounded-xl p-4 border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] border-l-4 border-l-amber-500">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Inactive Status
          </span>
          <div className="text-2xl font-bold text-amber-600 mt-1">
            {inactiveCount}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            Disabled / Archived
          </div>
        </div>

        {/* Categories Count */}
        <div className="bg-white rounded-xl p-4 border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] border-l-4 border-l-sky-500">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Categories
          </span>
          <div className="text-2xl font-bold text-sky-700 mt-1">
            {activeCategoriesList.length}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            Product lines & series
          </div>
        </div>
      </div>

      {/* Unified Filter & Search Toolbar */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-xs p-3.5 sm:p-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={`Search ${activeDivision.toLowerCase()} by name, specs, or ID...`}
              className="w-full pl-9 pr-8 py-2 text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#105784] focus:bg-white transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Controls: Category Dropdown + Status Filter + Clear Button + View Mode */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            {/* Category Dropdown */}
            <div className="relative min-w-[190px]">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className={`w-full text-xs font-semibold px-3 py-2 border rounded-lg appearance-none bg-white pr-8 focus:outline-none focus:border-[#105784] cursor-pointer transition ${
                  selectedCategory !== "all"
                    ? "border-[#105784] text-[#105784] bg-sky-50/40 shadow-2xs"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                <option value="all">All Categories</option>
                {activeCategoriesList.map((cat, idx) => {
                  const catNum = cat.number || String(idx + 1).padStart(2, "0");
                  return (
                    <option key={cat.id || idx} value={cat.id || cat.name}>
                      {catNum}. {cat.name}
                    </option>
                  );
                })}
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 flex items-center">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="relative min-w-[130px]">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className={`w-full text-xs font-semibold px-3 py-2 border rounded-lg appearance-none bg-white pr-8 focus:outline-none focus:border-[#105784] cursor-pointer transition ${
                  statusFilter !== "all"
                    ? "border-[#105784] text-[#105784] bg-sky-50/40 shadow-2xs"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 flex items-center">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Reset / Clear Active Filters */}
            {(selectedCategory !== "all" || statusFilter !== "all" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setStatusFilter("all");
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="px-2.5 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition cursor-pointer flex items-center gap-1 shrink-0"
                title="Reset all filters"
              >
                <X className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            {/* View Mode Switcher */}
            <div className="bg-[#f4f7fa] p-1 rounded-lg border border-[#e2e8f0] flex items-center shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white text-[#105784] shadow-2xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`p-1.5 rounded-md transition cursor-pointer ${
                  viewMode === "table"
                    ? "bg-white text-[#105784] shadow-2xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                title="Table View"
                aria-label="Table View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Display: Grid or Table View */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#e9ecef] p-12 text-center shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)]">
          <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-3">
            <Box className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-gray-800">
            No {activeDivision} Products Found
          </h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            No products match the selected filters or search query. You can reset
            filters or create a new product.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setStatusFilter("all");
                setSearchQuery("");
              }}
              className="px-3.5 py-1.5 bg-[#105784] text-white text-xs font-semibold rounded-lg hover:bg-[#0c476c] transition cursor-pointer"
            >
              Reset Filters
            </button>
            <button
              onClick={() => setShowAddDrawer(true)}
              className="px-3.5 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedProducts.map((product, pIdx) => {
              const specItems = extractSpecGrid(product);
              const isInactive = product.status === "Inactive";

              return (
                <div
                  key={product.id || product._id || `product-grid-${pIdx}`}
                  className={`bg-white rounded-xl border shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] hover:shadow-md transition-all flex flex-col overflow-hidden group ${
                    isInactive
                      ? "border-amber-200 bg-amber-50/20 opacity-90"
                      : "border-[#e9ecef]"
                  }`}
                >
                  {/* Product Image Box */}
                  <div className="relative aspect-4/3 bg-[#f8fafc] border-b border-[#eaedf1] overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt || product.name}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                      className={`max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 ${
                        isInactive ? "grayscale-50" : ""
                      }`}
                    />
                    {/* Fallback placeholder */}
                    <div
                      style={{ display: "none" }}
                      className="w-full h-full items-center justify-center bg-gray-100 text-gray-400"
                    >
                      {renderDivisionIcon(product.division, "w-10 h-10 text-gray-300")}
                    </div>

                    {/* Status Toggle Switch Top Left */}
                    <div className="absolute top-2.5 left-2.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStatus(product);
                        }}
                        className="flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-2 py-1 rounded-full border border-gray-200 shadow-2xs group cursor-pointer transition hover:border-gray-300"
                        title={isInactive ? "Product hidden from website. Click to Show." : "Product visible on website. Click to Hide."}
                      >
                        <div
                          className={`w-7 h-4 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
                            isInactive ? "bg-gray-300" : "bg-emerald-600"
                          }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full bg-white shadow-xs transform transition-transform duration-200 ${
                              isInactive ? "translate-x-0" : "translate-x-3"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-[10px] font-bold ${
                            isInactive ? "text-gray-400" : "text-emerald-700"
                          }`}
                        >
                          {isInactive ? "Hidden" : "Show"}
                        </span>
                      </button>
                    </div>

                    {/* Category Tag Top Right */}
                    <span className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-[#1c232f] text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs border border-gray-200">
                      {product.categoryTitle || product.categoryName}
                    </span>
                  </div>

                  {/* Product Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="font-bold text-sm text-[#1c232f] group-hover:text-[#105784] transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                        {product.description}
                      </p>
                    </div>

                    {/* Quick Specs Preview */}
                    {specItems.length > 0 && (
                      <div className="pt-2 border-t border-[#f1f4f8] grid grid-cols-2 gap-2 text-[11px]">
                        {specItems.slice(0, 2).map((item, idx) => (
                          <div
                            key={`${product.id || product._id || 'item'}-spec-${idx}`}
                            className="bg-[#f8fafc] p-1.5 rounded border border-[#edf2f7]"
                          >
                            <span className="text-[10px] text-gray-400 block truncate">
                              {item.label}
                            </span>
                            <span className="font-bold text-gray-800 block truncate">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Card Actions */}
                    <div className="pt-2 border-t border-[#f1f4f8] flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gray-400 truncate max-w-[80px]">
                        #{product.id}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="p-1.5 text-[#105784] hover:bg-[#105784]/10 rounded border border-[#105784]/30 transition cursor-pointer"
                          title="Inspect Technical Specs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setProductToEdit(product)}
                          className="p-1.5 text-sky-700 hover:bg-sky-50 rounded border border-sky-300 transition cursor-pointer"
                          title="Edit in Side Drawer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setProductToDelete(product)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded border border-rose-300 transition cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          <div className="bg-white rounded-xl border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 gap-3">
            <div>
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredProducts.length === 0 ? 0 : startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900">
                {Math.min(endIndex, filteredProducts.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {filteredProducts.length}
              </span>{" "}
              {activeDivision.toLowerCase()} products
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-1 self-center sm:self-auto">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={safeCurrentPage === 1}
                  className="px-2.5 py-1.5 rounded-lg border border-[#e2e8f0] bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 font-medium cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-7 h-7 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center justify-center ${
                          safeCurrentPage === pageNum
                            ? "bg-[#105784] text-white shadow-2xs"
                            : "border border-[#e2e8f0] bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={safeCurrentPage === totalPages}
                  className="px-2.5 py-1.5 rounded-lg border border-[#e2e8f0] bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 font-medium cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-xl border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f8fafc] text-gray-600 font-semibold border-b border-[#eaedf1]">
                <tr>
                  <th className="py-3 px-4 w-12 text-center text-gray-400 font-mono">#</th>
                  <th className="py-3 px-4">Thumb</th>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Key Specs</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Status / Visibility</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f4f8]">
                {paginatedProducts.map((product, pIdx) => {
                  const specItems = extractSpecGrid(product);
                  const isInactive = product.status === "Inactive";

                  return (
                    <tr
                      key={product.id || product._id || `product-tbl-${pIdx}`}
                      className={`hover:bg-[#f8fafc] transition-colors ${
                        isInactive ? "bg-amber-50/10" : ""
                      }`}
                    >
                      <td className="py-3 px-4 text-center font-mono font-medium text-gray-400 text-xs">
                        {String(startIndex + pIdx + 1).padStart(2, "0")}
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-200 p-1 flex items-center justify-center shrink-0">
                          <img
                            src={product.imageSrc}
                            alt={product.name}
                            className={`max-h-full max-w-full object-contain ${
                              isInactive ? "grayscale-50" : ""
                            }`}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#1c232f]">
                        <div>{product.name}</div>
                        <div className="text-[10px] font-mono text-gray-400 mt-0.5">
                          #{product.id}
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200">
                          {product.categoryTitle || product.categoryName}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {specItems.length > 0 ? (
                          <div className="flex flex-col gap-1 max-w-xs">
                            {specItems.slice(0, 2).map((s, idx) => (
                              <div
                                key={`${product.id || product._id || 'tbl'}-spec-${idx}`}
                                className="inline-flex items-center gap-1.5 text-[11px] bg-slate-50 border border-slate-200/80 rounded px-1.5 py-0.5 leading-tight"
                              >
                                <span className="text-gray-500 font-medium whitespace-nowrap">
                                  {s.label}:
                                </span>
                                <span className="font-bold text-gray-800 truncate">
                                  {s.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-400 font-mono">
                            —
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-500 max-w-xs truncate">
                        {product.description}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(product)}
                          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
                          title={
                            isInactive
                              ? "Product hidden from website. Click to Show on website."
                              : "Product live on website. Click to Hide from website."
                          }
                        >
                          {/* Modern Toggle Switch */}
                          <div
                            className={`w-9 h-5 rounded-full p-0.5 transition-colors duration-200 ease-in-out flex items-center ${
                              isInactive ? "bg-gray-300" : "bg-emerald-600 shadow-2xs"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform duration-200 ease-in-out ${
                                isInactive ? "translate-x-0" : "translate-x-4"
                              }`}
                            />
                          </div>
                          <span
                            className={`text-xs font-semibold transition-colors ${
                              isInactive
                                ? "text-gray-400 group-hover:text-gray-600"
                                : "text-emerald-700 group-hover:text-emerald-800"
                            }`}
                          >
                            {isInactive ? "Hidden" : "Show"}
                          </span>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="p-1.5 text-[#105784] hover:bg-[#105784]/10 rounded border border-[#105784]/30 transition cursor-pointer"
                            title="Inspect Specs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setProductToEdit(product)}
                            className="p-1.5 text-sky-700 hover:bg-sky-50 rounded border border-sky-300 transition cursor-pointer"
                            title="Edit in Side Drawer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setProductToDelete(product)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded border border-rose-300 transition cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. INSPECT PRODUCT MODAL (1:1 Frontend Dossier Match)        */}
      {/* ============================================================ */}
      {selectedProduct && (
        <ProductDetailInspectModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onEdit={(prod) => {
            setProductToEdit(prod);
            setSelectedProduct(null);
          }}
          onToggleStatus={(prod) => handleToggleStatus(prod)}
        />
      )}

      {/* ============================================================ */}
      {/* 2. ADD PRODUCT SLIDE-OVER SIDEBAR DRAWER                       */}
      {/* ============================================================ */}
      {showAddDrawer && (
        <ProductFormDrawer
          mode="add"
          divisions={visibleDivisions}
          allCategories={categories}
          defaultDivision={
            lockedDivision ||
            (activeDivision === "All" || activeDivision === "all"
              ? "Aerospace"
              : activeDivision)
          }
          lockedDivision={lockedDivision}
          onClose={() => setShowAddDrawer(false)}
          onSubmit={async (newProductData) => {
            try {
              const added = await addProduct(newProductData);
              triggerToast(`Product "${added.name}" added successfully!`);
              setShowAddDrawer(false);
            } catch (err) {
              triggerToast(err.message || "Failed to create product.");
            }
          }}
        />
      )}

      {/* ============================================================ */}
      {/* 3. EDIT PRODUCT SLIDE-OVER SIDEBAR DRAWER                      */}
      {/* ============================================================ */}
      {productToEdit && (
        <ProductFormDrawer
          mode="edit"
          initialData={productToEdit}
          divisions={visibleDivisions}
          allCategories={categories}
          defaultDivision={productToEdit.division}
          lockedDivision={lockedDivision}
          onClose={() => setProductToEdit(null)}
          onSubmit={async (updatedData) => {
            try {
              await updateProduct(
                productToEdit.id || productToEdit._id,
                updatedData
              );
              triggerToast(
                `Product "${updatedData.name}" updated successfully!`
              );
              setProductToEdit(null);
            } catch (err) {
              triggerToast(err.message || "Failed to update product.");
              throw err;
            }
          }}
        />
      )}

      {/* ============================================================ */}
      {/* 4. DELETE CONFIRMATION MODAL                                  */}
      {/* ============================================================ */}
      {productToDelete && (
        <div
          onClick={() => setProductToDelete(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200 relative space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Delete Product
                </h3>
                <p className="text-xs text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded border border-gray-200 p-1 flex items-center justify-center shrink-0">
                <img
                  src={productToDelete.imageSrc}
                  alt={productToDelete.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs text-gray-900 truncate">
                  {productToDelete.name}
                </div>
                <div className="text-[11px] text-gray-500 truncate">
                  {productToDelete.division} ΓÇó{" "}
                  {productToDelete.categoryTitle || productToDelete.categoryName}
                </div>
                <div className="text-[10px] font-mono text-gray-400">
                  #{productToDelete.id}
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong>{productToDelete.name}</strong> from the catalog?
            </p>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-2xs transition cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. RESET CATALOG CONFIRM MODAL                                */}
      {/* ============================================================ */}
      {showResetConfirm && (
        <div
          onClick={() => setShowResetConfirm(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200 relative space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Reset Catalog to Default
                </h3>
                <p className="text-xs text-gray-500">
                  Restore original industrial divisions and product catalog.
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              This will restore all default Aerospace, Defence, Advanced Systems,
              and Petrochemicals products and reset custom edits.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetCatalog();
                  triggerToast("Catalog restored to factory defaults.");
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 text-xs font-bold bg-[#105784] hover:bg-[#0c476c] text-white rounded-lg shadow-2xs transition cursor-pointer"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ======================================================================
