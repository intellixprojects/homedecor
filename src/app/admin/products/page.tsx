"use client";

import { useEffect, useMemo, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  FiTrash2,
  FiPlus,
  FiPackage,
  FiDollarSign,
  FiArrowUpRight,
  FiX,
  FiUpload,
  FiEdit2,
  FiStar,
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiChevronDown,
} from "react-icons/fi";

export default function AdminProductsPage() {

  const [products, setProducts] = useState<any[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [description, setDescription] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [stock, setStock] = useState<string>("");
  const [images, setImages] = useState<string[]>(["", "", "", ""]);
  const [length, setlength] = useState("");
  const [weight, setWeight] = useState("");
  const [uploadingIndex, setUploadingIndex] = useState<boolean[]>([false, false, false, false]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/products", { cache: "no-store" });
    const data = await res.json();
    if (data.success) setProducts(data.products);
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setCategoryOptions(data.categories.map((c: any) => c.name));
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const allCategories = useMemo(() => {
    const cats = products.map((p) => p.category).filter(Boolean);
    return ["All", ...Array.from(new Set(cats))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  const resetForm = () => {
    setTitle(""); setCategory(""); setPrice(""); setOldPrice("");
    setDescription(""); setWidth(""); setHeight("");
    setStock(""); setImages(["", "", "", ""]); setEditingId(null);
    setIsEditing(false); setlength(""); setWeight("");
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      await fetchProducts();
      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  const handleEdit = (item: any) => {
    setOpenModal(true); setIsEditing(true); setEditingId(item._id);
    setTitle(item.title); setCategory(item.category);
    setPrice(String(item.price || "")); setOldPrice(String(item.oldPrice || ""));
    setDescription(item.description);
    setStock(item.stock != null ? String(item.stock) : "");
    setWidth(item.width || ""); setHeight(item.height || "");
    setlength(item.length || ""); setWeight(item.weight || "");
    setImages([
      item.gallery?.[0] || "", item.gallery?.[1] || "",
      item.gallery?.[2] || "", item.gallery?.[3] || "",
    ]);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const updatedLoading = [...uploadingIndex];
    updatedLoading[index] = true;
    setUploadingIndex(updatedLoading);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target?.result as string);
        reader.onerror = () => reject(new Error("File read failed"));
        reader.readAsDataURL(file);
      });
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await res.json();
      if (!data.success) throw new Error("Upload failed");
      const updatedImages = [...images];
      updatedImages[index] = data.url;
      setImages(updatedImages);
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    } finally {
      const doneLoading = [...uploadingIndex];
      doneLoading[index] = false;
      setUploadingIndex(doneLoading);
    }
  };

  const handleAddOrUpdateProduct = async () => {
    if (!title || !category || !price || !images[0] || !images[1] || !images[2]) {
      alert("Please fill all required fields & upload minimum 3 images");
      return;
    }

    const stockNum = stock === "" || isNaN(Number(stock)) ? null : Number(stock);
    // Auto inStock based on stock value
    const inStock = stockNum === null ? true : stockNum > 0;

    const productData = {
      title, category,
      price: Number(price),
      oldPrice: Number(oldPrice),
      inStock,
      stock: stockNum,
      image: images[0],
      gallery: images.filter(Boolean),
      description, width, height, length, weight,
    };

    try {
      const url = isEditing ? `/api/products/${editingId}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const data = await res.json();
      if (!data.success) throw new Error("Failed to save product");
      await fetchProducts();
      resetForm();
      setOpenModal(false);
      alert(isEditing ? "Product updated successfully" : "Product added successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add product");
    }
  };

  const totalProducts = products.length;
  const totalValue = useMemo(() => products.reduce((acc, item) => acc + Number(item.price || 0), 0), [products]);

  return (
    <section className="min-h-screen bg-[#f5f7fb]">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-3 text-[10px] sm:text-[11px] font-bold uppercase tracking-[4px] text-[#c9a96e]">Admin Dashboard</p>
            <h1 className="text-[32px] leading-none sm:text-[42px] lg:text-[52px] font-black text-[#111827]">Products Management</h1>
            <p className="mt-4 max-w-2xl text-[14px] sm:text-[15px] leading-7 text-[#6b7280]">Add, edit and manage products with multiple image uploads and dimensions.</p>
          </div>
          <button
            onClick={() => { resetForm(); setOpenModal(true); }}
            className="group flex h-[54px] w-full sm:w-fit items-center justify-center gap-3 rounded-full bg-[#111827] px-7 sm:px-8 text-[14px] sm:text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:bg-black"
          >
            <FiPlus className="text-[18px]" />
            Add New Product
          </button>
        </div>

        {/* STATS */}
        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="rounded-[26px] sm:rounded-[30px] bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] sm:text-[13px] font-medium text-[#6b7280]">Total Products</p>
                <h2 className="mt-3 text-[34px] sm:text-[38px] font-black text-[#111827]">{totalProducts}</h2>
              </div>
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#f3f4f6] text-[22px] sm:text-[24px] text-[#111827]"><FiPackage /></div>
            </div>
          </div>
          <div className="rounded-[26px] sm:rounded-[30px] bg-white p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] sm:text-[13px] font-medium text-[#6b7280]">Inventory Value</p>
                <h2 className="mt-3 text-[34px] sm:text-[38px] font-black text-[#111827]">₹{totalValue.toLocaleString()}</h2>
              </div>
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#f3f4f6] text-[22px] sm:text-[24px] text-[#111827]"><FiDollarSign /></div>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="rounded-[24px] sm:rounded-[34px] bg-white p-4 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-[24px] sm:text-[28px] font-black text-[#111827]">All Products</h2>
              <p className="mt-1 text-[13px] sm:text-[14px] text-[#6b7280]">{filteredProducts.length} of {totalProducts} products</p>
            </div>
            <div className="relative w-full sm:w-[280px]">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af] text-[16px]" />
              <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-[44px] w-full rounded-full border border-[#e5e7eb] bg-[#fafafa] pl-10 pr-4 text-[13px] text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#111827] transition-colors duration-200" />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-[#e5e7eb] text-[11px] text-[#6b7280] hover:bg-[#d1d5db]"><FiX /></button>
              )}
            </div>
          </div>

          {allCategories.length > 1 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-200 ${activeCategory === cat ? "bg-[#111827] text-white" : "bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb] hover:text-[#111827]"}`}>{cat}</button>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3f4f6] text-[28px] text-[#9ca3af]"><FiSearch /></div>
              <p className="text-[16px] font-bold text-[#111827]">No products found</p>
              <p className="mt-1 text-[13px] text-[#6b7280]">Try a different search or category</p>
              <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="mt-4 rounded-full bg-[#111827] px-5 py-2 text-[13px] font-semibold text-white">Clear filters</button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((item) => {
              const isOut = item.inStock === false || (item.stock != null && item.stock <= 0);
              const isLow = !isOut && item.stock != null && item.stock <= 2;
              return (
                <div key={item._id} className="group relative flex flex-col overflow-hidden rounded-[20px] border border-[#eef0f3] bg-white transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
                  <button onClick={() => handleEdit(item)} className="absolute right-2.5 top-2.5 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/70 text-[14px] text-[#111827] shadow backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#111827] hover:text-white"><FiEdit2 /></button>

                  <div className="absolute left-2.5 top-2.5 z-20">
                    {isOut ? (
                      <span className="flex items-center gap-1 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white shadow"><FiXCircle className="text-[11px]" />Out of Stock</span>
                    ) : isLow ? (
                      <span className="flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold text-white shadow"><FiCheckCircle className="text-[11px]" />Only {item.stock} left</span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold text-white shadow"><FiCheckCircle className="text-[11px]" />{item.stock != null ? `${item.stock} left` : "In Stock"}</span>
                    )}
                  </div>

                  <div className="relative h-[180px] w-full overflow-hidden bg-[#f3f4f6]">
                    <Image src={item.image} alt={item.title} fill className={`object-cover transition-transform duration-700 group-hover:scale-105 ${isOut ? "opacity-60 grayscale" : ""}`} />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <div className="inline-flex rounded-full bg-[#f3f4f6] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[1.5px] text-[#6b7280]">{item.category}</div>
                      <h3 className="mt-2 text-[17px] leading-snug font-black text-[#111827]">{item.title}</h3>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="text-[13px] font-bold text-[#111827]">{item.rating}</span>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FiStar key={i} className={`text-[12px] ${i < item.rating ? "fill-[#f59e0b] text-[#f59e0b]" : "text-[#d1d5db]"}`} />
                          ))}
                        </div>
                        <span className="text-[11px] text-[#9ca3af]">/ 5</span>
                      </div>
                      <div className="mt-3 flex flex-wrap items-end gap-2">
                        <h4 className="text-[26px] font-black leading-none text-[#111827]">₹{item.price}</h4>
                        {item.oldPrice && <span className="pb-[2px] text-[13px] font-medium text-[#9ca3af] line-through">₹{item.oldPrice}</span>}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.width && <span className="rounded-full bg-[#111827] px-2.5 py-1 text-[10px] font-semibold text-white">{item.width}</span>}
                        {item.height && <span className="rounded-full bg-[#111827] px-2.5 py-1 text-[10px] font-semibold text-white">{item.height}</span>}
                        {item.length && <span className="rounded-full bg-[#111827] px-2.5 py-1 text-[10px] font-semibold text-white">{item.length}</span>}
                      </div>
                      {item.description && <p className="mt-3 line-clamp-2 text-[12px] leading-5 text-[#6b7280]">{item.description}</p>}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Link href={`/products/${item._id}`} className="group/view relative flex h-[40px] flex-1 items-center justify-center overflow-hidden rounded-full border border-[#dbe1ea] bg-[#fafafa] px-4 text-[12px] font-bold text-[#111827] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#111827]">
                        <span className="absolute inset-0 translate-y-full bg-[#111827] transition-transform duration-300 group-hover/view:translate-y-0" />
                        <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-300 group-hover/view:text-white">View <FiArrowUpRight className="text-[13px]" /></span>
                      </Link>
                      <button onClick={() => handleDelete(item._id)} className="flex h-[40px] items-center justify-center gap-1.5 rounded-full bg-red-500 px-4 text-[12px] font-semibold text-white transition-all duration-300 hover:bg-red-600">
                        <FiTrash2 className="text-[13px]" />Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4 backdrop-blur-sm">
          <div className="relative max-h-[95vh] w-full max-w-4xl overflow-y-auto rounded-[26px] sm:rounded-[32px] bg-white p-4 sm:p-6 shadow-2xl lg:p-8">
            <button onClick={() => setOpenModal(false)} className="absolute right-4 top-4 sm:right-5 sm:top-5 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#f3f4f6] text-[18px] sm:text-[20px] text-[#111827]"><FiX /></button>

            <div className="mb-8">
              <h2 className="text-[28px] sm:text-[34px] font-black text-[#111827]">{isEditing ? "Edit Product" : "Add Product"}</h2>
            </div>

            <div className="space-y-5">
              <input type="text" placeholder="Product Title" value={title} onChange={(e) => setTitle(e.target.value)} className="h-[56px] sm:h-[58px] w-full rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-5 outline-none focus:border-[#111827] transition-colors" />

              <div className="relative">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-[56px] sm:h-[58px] w-full appearance-none rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-5 outline-none text-[#111827] cursor-pointer focus:border-[#111827] transition-colors">
                  <option value="">Select Category</option>
                  {categoryOptions.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#9ca3af] pointer-events-none" />
              </div>

              {/* PRICE + OLD PRICE + STOCK */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="h-[56px] sm:h-[58px] rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-5 outline-none focus:border-[#111827] transition-colors" />
                <input type="number" placeholder="Old Price" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} className="h-[56px] sm:h-[58px] rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-5 outline-none focus:border-[#111827] transition-colors" />
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Stock Quantity (0 = out of stock)"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    onBlur={(e) => setStock(e.target.value)}
                    className="h-[56px] sm:h-[58px] w-full rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-5 outline-none focus:border-[#111827] transition-colors"
                  />
                  {stock !== "" && (
                    <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold px-2 py-0.5 rounded-full ${Number(stock) <= 0 ? "bg-red-100 text-red-600" : Number(stock) <= 5 ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"}`}>
                      {Number(stock) <= 0 ? "Out of Stock" : Number(stock) <= 5 ? "Low Stock" : "In Stock"}
                    </span>
                  )}
                </div>
              </div>

              {/* DIMENSIONS */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input type="text" placeholder="Width (Example: 120cm)" value={width} onChange={(e) => setWidth(e.target.value)} className="h-[56px] sm:h-[58px] rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-5 outline-none focus:border-[#111827] transition-colors" />
                <input type="text" placeholder="Height (Example: 80cm)" value={height} onChange={(e) => setHeight(e.target.value)} className="h-[56px] sm:h-[58px] rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-5 outline-none focus:border-[#111827] transition-colors" />
                <input type="text" placeholder="Length (Example: 60cm)" value={length} onChange={(e) => setlength(e.target.value)} className="h-[56px] sm:h-[58px] rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-5 outline-none focus:border-[#111827] transition-colors" />
                <input type="text" placeholder="Weight (e.g. 1.2 kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-[56px] sm:h-[58px] rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-5 outline-none focus:border-[#111827] transition-colors" />
              </div>

              {/* IMAGE UPLOADS */}
              <div>
                <p className="mb-4 text-[14px] font-semibold text-[#111827]">Upload Product Images</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="rounded-[18px] border border-[#e5e7eb] bg-[#fafafa] p-2 sm:p-3">
                      {img ? (
                        <div className="space-y-3">
                          <div className="relative h-[100px] sm:h-[130px] overflow-hidden rounded-[14px]">
                            <Image src={img} alt="Preview" fill className="object-cover" />
                            {uploadingIndex[index] && <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-[14px]"><p className="text-white text-[11px] font-semibold animate-pulse">Uploading...</p></div>}
                          </div>
                          <label className="flex h-[38px] sm:h-[40px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[#111827] text-[11px] sm:text-[12px] font-semibold text-white">
                            <FiEdit2 />{uploadingIndex[index] ? "Uploading..." : "Update"}
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} className="hidden" />
                          </label>
                        </div>
                      ) : (
                        <label className={`flex h-[150px] sm:h-[190px] cursor-pointer flex-col items-center justify-center rounded-[16px] border-2 border-dashed bg-white text-center transition-all ${uploadingIndex[index] ? "border-[#c9a96e] bg-amber-50" : "border-[#d1d5db]"}`}>
                          {uploadingIndex[index] ? (
                            <><div className="w-8 h-8 border-2 border-[#c9a96e] border-t-transparent rounded-full animate-spin mb-3" /><p className="text-[12px] font-semibold text-[#c9a96e]">Uploading...</p></>
                          ) : (
                            <><FiUpload className="mb-2 sm:mb-3 text-[22px] sm:text-[28px] text-[#9ca3af]" /><p className="text-[11px] sm:text-[13px] font-semibold text-[#111827]">Upload</p><span className="mt-1 text-[10px] sm:text-[11px] text-[#6b7280]">{index === 3 ? "Optional" : "Required"}</span></>
                          )}
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, index)} className="hidden" />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} className="h-[150px] sm:h-[160px] w-full resize-none rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-5 outline-none focus:border-[#111827] transition-colors" />

              <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                <button onClick={() => setOpenModal(false)} className="flex h-[54px] sm:h-[56px] flex-1 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[14px] sm:text-[15px] font-semibold text-[#111827]">Cancel</button>
                <button onClick={handleAddOrUpdateProduct} className="flex h-[54px] sm:h-[56px] flex-1 items-center justify-center rounded-full bg-[#111827] text-[14px] sm:text-[15px] font-bold text-white">{isEditing ? "Update Product" : "Add Product"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}