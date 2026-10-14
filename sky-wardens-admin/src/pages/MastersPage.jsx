import { useState, useMemo } from "react";
import {
  Layers,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  X,
  Search,
  ExternalLink,
  Shield,
  Plane,
  Cpu,
  FlaskConical,
  Database,
  AlertTriangle,
  Boxes,
  FolderTree,
  Tag,
  Hash,
} from "lucide-react";
import { useProducts } from "../context/ProductsContext";

export default function MastersPage({ onNavigateTab }) {
  const {
    divisions = [],
    categories = [],
    products = [],
    addDivision,
    updateDivision,
    deleteDivision,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useProducts();

  // Active Masters Subtab: 'divisions' | 'categories'
  const [activeMasterTab, setActiveMasterTab] = useState("divisions");

  // Division Filter & Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'Active' | 'Inactive'

  // Subcategories Filter & Search state
  const [searchCatQuery, setSearchCatQuery] = useState("");
  const [catDivisionFilter, setCatDivisionFilter] = useState("all"); // 'all' | 'Aerospace' | 'Defence'
  const [statusCatFilter, setStatusCatFilter] = useState("all"); // 'all' | 'Active' | 'Inactive'

  // Division Modals state
  const [showAddDivisionModal, setShowAddDivisionModal] = useState(false);
  const [divisionToEdit, setDivisionToEdit] = useState(null);
  const [divisionToDelete, setDivisionToDelete] = useState(null);

  // Category Modals state
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Product counts per division
  const divisionProductCounts = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      map[p.division] = (map[p.division] || 0) + 1;
    });
    return map;
  }, [products]);

  // Product counts per category
  const categoryProductCounts = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      const id = p.categoryId;
      const name = p.categoryTitle || p.categoryName;
      if (id) map[id] = (map[id] || 0) + 1;
      if (name && name !== id) map[name] = (map[name] || 0) + 1;
    });
    return map;
  }, [products]);

  // Filtered Divisions
  const filteredDivisions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return divisions.filter((d) => {
      const matchesSearch =
        q === "" ||
        d.name.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q);
      const divStatus = d.status || "Active";
      const matchesStatus =
        statusFilter === "all" || divStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [divisions, searchQuery, statusFilter]);

  // Filtered Categories
  const filteredCategories = useMemo(() => {
    const q = searchCatQuery.toLowerCase().trim();
    return categories
      .filter((c) => {
        const matchesDivision =
          catDivisionFilter === "all" || c.division === catDivisionFilter;
        const catStatus = c.status || "Active";
        const matchesStatus =
          statusCatFilter === "all" || catStatus === statusCatFilter;
        const matchesSearch =
          q === "" ||
          c.name.toLowerCase().includes(q) ||
          (c.number && c.number.toLowerCase().includes(q)) ||
          (c.tagline && c.tagline.toLowerCase().includes(q)) ||
          c.division.toLowerCase().includes(q);
        return matchesDivision && matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        if (a.division !== b.division) {
          return a.division.localeCompare(b.division);
        }
        return (a.order || 0) - (b.order || 0);
      });
  }, [categories, searchCatQuery, catDivisionFilter, statusCatFilter]);

  const activeDivisionCount = useMemo(() => {
    return divisions.filter((d) => (d.status || "Active") === "Active").length;
  }, [divisions]);

  const activeCategoryCount = useMemo(() => {
    return categories.filter((c) => (c.status || "Active") === "Active").length;
  }, [categories]);

  const renderDivisionIcon = (name, className = "w-4 h-4") => {
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

  const handleToggleDivisionStatus = async (div) => {
    const currentStatus = div.status || "Active";
    const nextStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await updateDivision(div.id || div._id, { status: nextStatus });
      triggerToast(
        `Division "${div.name}" and all its products are now ${nextStatus}.`
      );
    } catch (err) {
      triggerToast(err.message || "Failed to update division status.");
    }
  };

  const handleToggleCategoryStatus = async (cat) => {
    const currentStatus = cat.status || "Active";
    const nextStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await updateCategory(cat.id || cat._id, { status: nextStatus });
      triggerToast(
        `Category "${cat.name}" is now ${nextStatus}.`
      );
    } catch (err) {
      triggerToast(err.message || "Failed to update category status.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#1c232f] text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[#eaedf1]">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <span>Home</span>
            <span>/</span>
            <span>Products</span>
            <span>/</span>
            <span className="font-semibold text-[#105784]">
              {activeMasterTab === "divisions" ? "Divisions Master" : "Subcategories Master"}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1c232f] tracking-tight">
            {activeMasterTab === "divisions" ? "Divisions Master" : "Product Subcategories Master"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {activeMasterTab === "divisions"
              ? "Configure master industrial divisions (Aerospace, Defence, etc.) for the Sky Wardens catalog."
              : "Manage tactical subcategories and product lines across Aerospace and Defence systems."}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          {activeMasterTab === "divisions" ? (
            <button
              onClick={() => setShowAddDivisionModal(true)}
              className="px-4 py-2.5 bg-[#105784] hover:bg-[#0c476c] text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Division</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAddCategoryModal(true)}
              className="px-4 py-2.5 bg-[#105784] hover:bg-[#0c476c] text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Subcategory</span>
            </button>
          )}
        </div>
      </div>

      {/* Master Subtab Switcher */}
      <div className="flex items-center gap-2 border-b border-[#e2e8f0] pb-2">
        <button
          type="button"
          onClick={() => setActiveMasterTab("divisions")}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-2 ${
            activeMasterTab === "divisions"
              ? "bg-[#105784] text-white shadow-2xs"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Industrial Divisions</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
              activeMasterTab === "divisions"
                ? "bg-white/20 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {divisions.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMasterTab("categories")}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition cursor-pointer flex items-center gap-2 ${
            activeMasterTab === "categories"
              ? "bg-[#105784] text-white shadow-2xs"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>Product Subcategories</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
              activeMasterTab === "categories"
                ? "bg-white/20 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {categories.length}
          </span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: INDUSTRIAL DIVISIONS VIEW                              */}
      {/* ============================================================ */}
      {activeMasterTab === "divisions" && (
        <div className="space-y-6 animate-fadeIn">
          {/* KPI Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] border-l-4 border-l-[#105784]">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Total Divisions
              </span>
              <div className="text-2xl font-bold text-[#1c232f] mt-1">
                {divisions.length}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">
                Master industrial pillars
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] border-l-4 border-l-emerald-600">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Active Divisions
              </span>
              <div className="text-2xl font-bold text-emerald-700 mt-1">
                {activeDivisionCount}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">
                Ready for catalog products
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] border-l-4 border-l-purple-600">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Linked Products
              </span>
              <div className="text-2xl font-bold text-purple-700 mt-1">
                {products.length}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">
                Total catalog inventory
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] border-l-4 border-l-amber-500">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Catalog Status
              </span>
              <div className="text-base font-bold text-amber-700 mt-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                <span>Synchronized</span>
              </div>
              <div className="text-[11px] text-gray-400 mt-1">
                Live auto-dispatch active
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-xl border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search divisions by name, sector or scope..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#105784] focus:bg-white transition"
              />
            </div>

            {/* Status Filter buttons */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  statusFilter === "all"
                    ? "bg-[#105784] text-white shadow-2xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All ({divisions.length})
              </button>
              <button
                onClick={() => setStatusFilter("Active")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  statusFilter === "Active"
                    ? "bg-emerald-700 text-white shadow-2xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Active ({activeDivisionCount})
              </button>
              <button
                onClick={() => setStatusFilter("Inactive")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  statusFilter === "Inactive"
                    ? "bg-gray-700 text-white shadow-2xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Inactive ({divisions.length - activeDivisionCount})
              </button>
            </div>
          </div>

          {/* DIVISIONS MASTER CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredDivisions.map((div) => {
              const productCount = divisionProductCounts[div.name] || 0;
              const isCore = div.id === "Aerospace" || div.id === "Defence";

              return (
                <div
                  key={div.id || div._id}
                  className="bg-white rounded-xl border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] hover:shadow-md transition flex flex-col justify-between p-5"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="w-11 h-11 rounded-xl bg-[#f0f4f8] border border-[#d6e0ea] flex items-center justify-center text-[#105784] shadow-2xs">
                        {renderDivisionIcon(div.name, "w-5 h-5")}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleDivisionStatus(div)}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded border transition cursor-pointer flex items-center gap-1 ${
                          (div.status || "Active") === "Active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                            : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                        }`}
                        title={`Click to switch status to ${(div.status || "Active") === "Active" ? "Inactive" : "Active"}`}
                      >
                        <span>● {div.status || "Active"}</span>
                      </button>
                    </div>

                    <div className="mt-3">
                      <h3 className="font-bold text-base text-[#1c232f]">
                        {div.name}
                      </h3>
                      <div className="text-[11px] font-mono text-gray-400 mt-0.5">
                        slug: #{div.slug || div.name.toLowerCase().replace(/\s+/g, "-")}
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-3 mt-2 leading-relaxed">
                      {div.description || "Industrial division configured for product line management."}
                    </p>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs bg-[#f8fafc] p-2.5 rounded-lg border border-[#e2e8f0]">
                      <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                        <Boxes className="w-3.5 h-3.5 text-[#105784]" />
                        <span>Catalog Products:</span>
                      </div>
                      <span className="font-bold text-emerald-700 text-sm">
                        {productCount} items
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (onNavigateTab) {
                          const targetSlug =
                            div.slug === "aerospace"
                              ? "products-aerospace"
                              : div.slug === "defence"
                              ? "products-defence"
                              : `products-${div.slug || div.name.toLowerCase().replace(/\s+/g, "-")}`;
                          onNavigateTab(targetSlug);
                        }
                      }}
                      className="text-xs font-bold text-[#105784] hover:text-[#0b3c5d] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Products</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setDivisionToEdit(div)}
                        className="p-1.5 text-sky-700 hover:bg-sky-50 rounded border border-sky-200 transition cursor-pointer"
                        title="Edit Division"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      {!isCore && (
                        <button
                          onClick={() => setDivisionToDelete(div)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded border border-rose-200 transition cursor-pointer"
                          title="Delete Division"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredDivisions.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Database className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800">
                No Divisions Found
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                {searchQuery
                  ? `No divisions matching "${searchQuery}". Try a different keyword.`
                  : "No divisions currently available."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: PRODUCT SUBCATEGORIES MASTER VIEW                      */}
      {/* ============================================================ */}
      {activeMasterTab === "categories" && (
        <div className="space-y-6 animate-fadeIn">
          {/* KPI Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] border-l-4 border-l-[#105784]">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Total Subcategories
              </span>
              <div className="text-2xl font-bold text-[#1c232f] mt-1">
                {categories.length}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">
                Tactical product series
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] border-l-4 border-l-sky-600">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Aerospace Subcategories
              </span>
              <div className="text-2xl font-bold text-sky-700 mt-1">
                {categories.filter((c) => c.division === "Aerospace").length}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">
                UAV, strike & radar lines
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] border-l-4 border-l-indigo-600">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Defence Subcategories
              </span>
              <div className="text-2xl font-bold text-indigo-700 mt-1">
                {categories.filter((c) => c.division === "Defence").length}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">
                Ballistics, riot & gear
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] border-l-4 border-l-emerald-600">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Active Categories
              </span>
              <div className="text-2xl font-bold text-emerald-700 mt-1">
                {activeCategoryCount}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">
                Live for catalog assignment
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-xl border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchCatQuery}
                onChange={(e) => setSearchCatQuery(e.target.value)}
                placeholder="Search subcategory by number, title, or tagline..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#f8fafc] border border-[#e2e8f0] rounded-lg focus:outline-none focus:border-[#105784] focus:bg-white transition"
              />
            </div>

            {/* Division Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 bg-[#f4f7fa] p-1 rounded-lg border border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setCatDivisionFilter("all")}
                  className={`px-2.5 py-1 text-xs rounded font-semibold transition cursor-pointer ${
                    catDivisionFilter === "all"
                      ? "bg-white text-gray-900 shadow-2xs"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  All Divisions
                </button>
                <button
                  type="button"
                  onClick={() => setCatDivisionFilter("Aerospace")}
                  className={`px-2.5 py-1 text-xs rounded font-semibold transition cursor-pointer flex items-center gap-1 ${
                    catDivisionFilter === "Aerospace"
                      ? "bg-[#105784] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Plane className="w-3 h-3" />
                  <span>Aerospace</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCatDivisionFilter("Defence")}
                  className={`px-2.5 py-1 text-xs rounded font-semibold transition cursor-pointer flex items-center gap-1 ${
                    catDivisionFilter === "Defence"
                      ? "bg-[#105784] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Shield className="w-3 h-3" />
                  <span>Defence</span>
                </button>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1 bg-[#f4f7fa] p-1 rounded-lg border border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setStatusCatFilter("all")}
                  className={`px-2.5 py-1 text-xs rounded font-semibold transition cursor-pointer ${
                    statusCatFilter === "all"
                      ? "bg-white text-gray-900 shadow-2xs"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setStatusCatFilter("Active")}
                  className={`px-2.5 py-1 text-xs rounded font-semibold transition cursor-pointer ${
                    statusCatFilter === "Active"
                      ? "bg-emerald-600 text-white shadow-2xs"
                      : "text-emerald-700 hover:bg-emerald-50"
                  }`}
                >
                  Active
                </button>
                <button
                  type="button"
                  onClick={() => setStatusCatFilter("Inactive")}
                  className={`px-2.5 py-1 text-xs rounded font-semibold transition cursor-pointer ${
                    statusCatFilter === "Inactive"
                      ? "bg-amber-600 text-white shadow-2xs"
                      : "text-amber-700 hover:bg-amber-50"
                  }`}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>

          {/* SUBCATEGORIES TABLE */}
          <div className="bg-white rounded-xl border border-[#e9ecef] shadow-[0_2px_6px_-1px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f8fafc] text-gray-500 border-b border-[#e9ecef] text-[11px] uppercase font-bold tracking-wider">
                    <th className="py-3.5 px-4 w-16">#</th>
                    <th className="py-3.5 px-4">Subcategory Name</th>
                    <th className="py-3.5 px-4">Division</th>
                    <th className="py-3.5 px-4">Tagline / Mission</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-center">Catalog Products</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f2f5]">
                  {filteredCategories.map((cat, idx) => {
                    const count =
                      categoryProductCounts[cat.id] ||
                      categoryProductCounts[cat.name] ||
                      0;
                    const isInactive = cat.status === "Inactive";

                    return (
                      <tr
                        key={cat.id || cat._id || `cat-row-${idx}`}
                        className="hover:bg-[#fbfcfd] transition-colors"
                      >
                        {/* Number */}
                        <td className="py-3 px-4 font-mono font-bold text-gray-500">
                          {cat.number || String(idx + 1).padStart(2, "0")}
                        </td>

                        {/* Name & ID */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-[#1c232f] text-xs">
                            {cat.name}
                          </div>
                          <div className="text-[10px] font-mono text-gray-400 mt-0.5">
                            ID: {cat.id}
                          </div>
                        </td>

                        {/* Division */}
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              cat.division === "Aerospace"
                                ? "bg-sky-50 text-sky-700 border border-sky-200"
                                : cat.division === "Defence"
                                ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                : "bg-gray-100 text-gray-700 border border-gray-200"
                            }`}
                          >
                            {renderDivisionIcon(cat.division, "w-3 h-3")}
                            <span>{cat.division}</span>
                          </span>
                        </td>

                        {/* Tagline */}
                        <td className="py-3 px-4 text-gray-500 max-w-xs truncate">
                          {cat.tagline || "—"}
                        </td>

                        {/* Status Toggle */}
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleCategoryStatus(cat)}
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold border transition cursor-pointer ${
                              !isInactive
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                            }`}
                            title={`Click to set ${isInactive ? "Active" : "Inactive"}`}
                          >
                            <span>● {!isInactive ? "Active" : "Inactive"}</span>
                          </button>
                        </td>

                        {/* Catalog Products */}
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              if (onNavigateTab) {
                                const targetSlug =
                                  cat.division === "Aerospace"
                                    ? "products-aerospace"
                                    : "products-defence";
                                onNavigateTab(targetSlug);
                              }
                            }}
                            className="inline-flex items-center gap-1 font-bold text-[#105784] hover:underline cursor-pointer"
                          >
                            <span>{count} items</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setCategoryToEdit(cat)}
                              className="p-1.5 text-sky-700 hover:bg-sky-50 rounded border border-sky-200 transition cursor-pointer"
                              title="Edit Subcategory"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setCategoryToDelete(cat)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded border border-rose-200 transition cursor-pointer"
                              title="Delete Subcategory"
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

            {filteredCategories.length === 0 && (
              <div className="p-12 text-center">
                <FolderTree className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-800">
                  No Subcategories Found
                </h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  {searchCatQuery
                    ? `No categories matching "${searchCatQuery}". Try a different keyword.`
                    : "No subcategories currently available."}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ADD DIVISION MODAL                                            */}
      {/* ============================================================ */}
      {showAddDivisionModal && (
        <DivisionFormModal
          mode="add"
          onClose={() => setShowAddDivisionModal(false)}
          onSubmit={async (data) => {
            try {
              const added = await addDivision(data);
              if (added) {
                triggerToast(`Division "${added.name}" added successfully!`);
              }
            } catch (err) {
              console.error(err);
              triggerToast(err.message || "Failed to add division.");
            } finally {
              setShowAddDivisionModal(false);
            }
          }}
        />
      )}

      {/* ============================================================ */}
      {/* EDIT DIVISION MODAL                                           */}
      {/* ============================================================ */}
      {divisionToEdit && (
        <DivisionFormModal
          mode="edit"
          initialData={divisionToEdit}
          onClose={() => setDivisionToEdit(null)}
          onSubmit={async (data) => {
            try {
              await updateDivision(divisionToEdit.id || divisionToEdit._id, data);
              triggerToast(`Division "${data.name}" updated successfully!`);
            } catch (err) {
              console.error(err);
              triggerToast(err.message || "Failed to update division.");
            } finally {
              setDivisionToEdit(null);
            }
          }}
        />
      )}

      {/* ============================================================ */}
      {/* DELETE DIVISION CONFIRMATION                                  */}
      {/* ============================================================ */}
      {divisionToDelete && (
        <div
          onClick={() => setDivisionToDelete(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border border-gray-200 relative space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Delete Division
                </h3>
                <p className="text-xs text-gray-500">
                  Are you sure you want to remove this division?
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
              <strong>{divisionToDelete.name}</strong> will be removed from
              master definitions. Existing products will retain their records.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setDivisionToDelete(null)}
                className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await deleteDivision(divisionToDelete.id || divisionToDelete._id);
                    triggerToast(`Division "${divisionToDelete.name}" deleted.`);
                  } catch (err) {
                    triggerToast(err.message || "Failed to delete division.");
                  } finally {
                    setDivisionToDelete(null);
                  }
                }}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-2xs transition cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ADD CATEGORY MODAL                                            */}
      {/* ============================================================ */}
      {showAddCategoryModal && (
        <CategoryFormModal
          mode="add"
          divisions={divisions.filter((d) => d.status !== "Inactive")}
          onClose={() => setShowAddCategoryModal(false)}
          onSubmit={async (data) => {
            try {
              const added = await addCategory(data);
              if (added) {
                triggerToast(`Subcategory "${added.name}" added successfully!`);
              }
            } catch (err) {
              console.error(err);
              triggerToast(err.message || "Failed to add subcategory.");
            } finally {
              setShowAddCategoryModal(false);
            }
          }}
        />
      )}

      {/* ============================================================ */}
      {/* EDIT CATEGORY MODAL                                           */}
      {/* ============================================================ */}
      {categoryToEdit && (
        <CategoryFormModal
          mode="edit"
          initialData={categoryToEdit}
          divisions={divisions.filter((d) => d.status !== "Inactive")}
          onClose={() => setCategoryToEdit(null)}
          onSubmit={async (data) => {
            try {
              await updateCategory(categoryToEdit.id || categoryToEdit._id, data);
              triggerToast(`Subcategory "${data.name}" updated successfully!`);
            } catch (err) {
              console.error(err);
              triggerToast(err.message || "Failed to update subcategory.");
            } finally {
              setCategoryToEdit(null);
            }
          }}
        />
      )}

      {/* ============================================================ */}
      {/* DELETE CATEGORY CONFIRMATION                                  */}
      {/* ============================================================ */}
      {categoryToDelete && (
        <div
          onClick={() => setCategoryToDelete(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 border border-gray-200 relative space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Delete Subcategory
                </h3>
                <p className="text-xs text-gray-500">
                  Are you sure you want to remove this category?
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
              <strong>
                {categoryToDelete.number ? `${categoryToDelete.number}. ` : ""}
                {categoryToDelete.name}
              </strong>{" "}
              ({categoryToDelete.division}) will be deleted from master definitions.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setCategoryToDelete(null)}
                className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await deleteCategory(categoryToDelete.id || categoryToDelete._id);
                    triggerToast(`Subcategory "${categoryToDelete.name}" deleted.`);
                  } catch (err) {
                    triggerToast(err.message || "Failed to delete subcategory.");
                  } finally {
                    setCategoryToDelete(null);
                  }
                }}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-2xs transition cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ======================================================================
// DIVISION FORM MODAL (Add & Edit)
// ======================================================================
function DivisionFormModal({ mode = "add", initialData = null, onClose, onSubmit }) {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [status, setStatus] = useState(initialData?.status || "Active");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Division Name is required.");
      return;
    }
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      status,
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200 relative space-y-4"
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-[#1c232f]">
              {mode === "add" ? "Create New Division" : `Edit Division: ${initialData?.name}`}
            </h3>
            <p className="text-xs text-gray-500">
              Configure industrial vertical pillar for the catalog.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3 py-2 rounded-lg">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
              Division Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Petrochemicals / Advanced Systems / Space"
              required
              className="w-full px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg focus:outline-none focus:border-[#105784] focus:bg-white text-xs transition"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
              Operational Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg focus:outline-none focus:border-[#105784] focus:bg-white text-xs transition"
            >
              <option value="Active">Active (Live in Products Catalog)</option>
              <option value="Inactive">Inactive (Disabled / Hidden)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
              Description / Mission Scope
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description of the equipment domain, operational readiness, and systems..."
              className="w-full px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg focus:outline-none focus:border-[#105784] focus:bg-white text-xs transition"
            />
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-[#105784] hover:bg-[#0c476c] text-white rounded-lg shadow-2xs transition cursor-pointer"
            >
              {mode === "add" ? "Create Division" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ======================================================================
// CATEGORY FORM MODAL (Add & Edit Subcategories)
// ======================================================================
function CategoryFormModal({
  mode = "add",
  initialData = null,
  divisions = [],
  onClose,
  onSubmit,
}) {
  const [division, setDivision] = useState(
    initialData?.division || divisions[0]?.name || "Aerospace"
  );
  const [number, setNumber] = useState(initialData?.number || "01");
  const [name, setName] = useState(initialData?.name || "");
  const [tagline, setTagline] = useState(initialData?.tagline || "");
  const [order, setOrder] = useState(initialData?.order || 1);
  const [status, setStatus] = useState(initialData?.status || "Active");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Subcategory Name is required.");
      return;
    }
    const cleanNum = number.trim() ? String(number.trim()).padStart(2, "0") : undefined;
    onSubmit({
      division,
      number: cleanNum,
      name: name.trim(),
      tagline: tagline.trim(),
      order: Number(order) || 1,
      status,
    });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200 relative space-y-4"
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-[#1c232f]">
              {mode === "add" ? "Create Subcategory" : `Edit Subcategory: ${initialData?.name}`}
            </h3>
            <p className="text-xs text-gray-500">
              Configure product line series for the active catalog.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3 py-2 rounded-lg">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Division Selector */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
              Parent Industrial Division *
            </label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg focus:outline-none focus:border-[#105784] focus:bg-white text-xs transition cursor-pointer"
            >
              <option value="Aerospace">Aerospace Systems</option>
              <option value="Defence">Defence Systems</option>
              {divisions
                .filter((d) => d.name !== "Aerospace" && d.name !== "Defence")
                .map((d) => (
                  <option key={d.id || d._id} value={d.name}>
                    {d.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Number & Name */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                Number Prefix
              </label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="01"
                className="w-full px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg focus:outline-none focus:border-[#105784] focus:bg-white font-mono text-xs transition text-center"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                Subcategory Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Surveillance Systems / Helmets"
                required
                className="w-full px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg focus:outline-none focus:border-[#105784] focus:bg-white text-xs transition"
              />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
              Tagline / Series Description
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Tactical reconnaissance and optical tracking units"
              className="w-full px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg focus:outline-none focus:border-[#105784] focus:bg-white text-xs transition"
            />
          </div>

          {/* Sequence Order & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                Display Order
              </label>
              <input
                type="number"
                min={1}
                max={99}
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg focus:outline-none focus:border-[#105784] focus:bg-white text-xs transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                Operational Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg focus:outline-none focus:border-[#105784] focus:bg-white text-xs transition"
              >
                <option value="Active">Active (Live in Catalog)</option>
                <option value="Inactive">Inactive (Disabled / Hidden)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-[#105784] hover:bg-[#0c476c] text-white rounded-lg shadow-2xs transition cursor-pointer"
            >
              {mode === "add" ? "Create Subcategory" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
