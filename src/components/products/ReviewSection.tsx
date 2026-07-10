"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiStar, FiUpload, FiX, FiCamera } from "react-icons/fi";

interface Review {
  _id: string;
  name: string;
  rating: number;
  review: string;
  photos: string[];
  createdAt: string;
}

export default function ReviewSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"" | "success" | "error">("");
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    review: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [hoveredStar, setHoveredStar] = useState(0);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
        setAvgRating(data.avgRating);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, [productId]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length > 3) {
      alert("Maximum 3 photos allowed");
      return;
    }
    setPhotos((prev) => [...prev, ...files]);
    setPhotoPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removePhoto = (i: number) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== i));
    setPhotoPreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0) { alert("Please select a rating"); return; }
    setSubmitting(true);
    try {
      const uploadedUrls: string[] = [];
      for (const photo of photos) {
        const fd = new FormData();
        fd.append("file", photo);
        const res = await fetch("/api/upload-review-photo", { method: "POST", body: fd });
        const data = await res.json();
        if (data.success) uploadedUrls.push(data.url);
      }

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, productId, photos: uploadedUrls }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", rating: 0, review: "" });
        setPhotos([]);
        setPhotoPreviews([]);
        fetchReviews();
        setTimeout(() => { setStatus(""); setFormOpen(false); }, 2500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setSubmitting(false);
  };

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const ratingLabel = (r: number) =>
    ["", "Poor", "Fair", "Good", "Great", "Excellent"][r] ?? "";

  return (
    <div className="mt-16 sm:mt-20">

      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <p className="uppercase tracking-[4px] text-[10px] text-[#c9a96e] font-semibold mb-2">
            Customer Feedback
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-black leading-tight">
            Reviews & Ratings
          </h2>
        </div>
        <button
          onClick={() => setFormOpen((p) => !p)}
          className="self-start sm:self-auto h-[44px] px-6 rounded-full bg-black text-white text-[13px] font-semibold hover:bg-[#1f1f1f] active:scale-95 transition-all duration-200 whitespace-nowrap"
        >
          {formOpen ? "Cancel" : "+ Write a Review"}
        </button>
      </div>

      {/* RATING SUMMARY ROW */}
      <div className="bg-white rounded-[22px] p-5 sm:p-6 mb-6 flex flex-col sm:flex-row sm:items-center gap-6">

        {/* BIG NUMBER */}
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-[56px] sm:text-[64px] font-black text-black leading-none">
            {avgRating.toFixed(1)}
          </span>
          <div>
            <div className="flex gap-0.5 mb-1.5">
              {[1,2,3,4,5].map((s) => (
                <FiStar key={s} className={`text-[15px] ${s <= Math.round(avgRating) ? "fill-[#c9a96e] text-[#c9a96e]" : "text-gray-200"}`} />
              ))}
            </div>
            <p className="text-gray-400 text-[12px]">{reviews.length} {reviews.length === 1 ? "review" : "reviews"}</p>
          </div>
        </div>

        <div className="hidden sm:block w-px h-12 bg-[#f0ece6]" />

        {/* BARS */}
        <div className="flex-1 flex flex-col gap-2">
          {ratingCounts.map(({ star, count }) => (
            <div key={star} className="flex items-center gap-2.5">
              <span className="text-[12px] font-semibold text-gray-500 w-3 shrink-0">{star}</span>
              <FiStar className="text-[#c9a96e] fill-[#c9a96e] text-[10px] shrink-0" />
              <div className="flex-1 h-1.5 bg-[#f3f4f6] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: reviews.length ? `${(count / reviews.length) * 100}%` : "0%" }}
                  transition={{ duration: 0.8, delay: 0.1 * (5 - star), ease: "easeOut" }}
                  className="h-full bg-[#c9a96e] rounded-full"
                />
              </div>
              <span className="text-[11px] text-gray-400 w-4 text-right shrink-0">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* REVIEW FORM — COLLAPSIBLE */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-[22px] p-5 sm:p-6 mb-6">
              <h3 className="font-black text-[18px] text-black mb-5">Share Your Experience</h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* STAR PICKER */}
                <div>
                  <label className="block font-semibold text-black text-[13px] mb-2">
                    Rating <span className="text-red-400">*</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    {[1,2,3,4,5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onMouseEnter={() => setHoveredStar(s)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setForm({ ...form, rating: s })}
                        className="transition-transform active:scale-90"
                      >
                        <FiStar className={`text-[26px] sm:text-[28px] transition-all duration-150 ${s <= (hoveredStar || form.rating) ? "fill-[#c9a96e] text-[#c9a96e]" : "text-gray-200"}`} />
                      </button>
                    ))}
                    {(hoveredStar || form.rating) > 0 && (
                      <span className="ml-2 text-[12px] font-semibold text-[#c9a96e]">
                        {ratingLabel(hoveredStar || form.rating)}
                      </span>
                    )}
                  </div>
                </div>

                {/* NAME + EMAIL */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-black text-[13px] mb-1.5">Name <span className="text-red-400">*</span></label>
                    <input
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full h-[46px] bg-[#f8f5f0] rounded-[12px] px-4 text-[13px] outline-none border border-transparent focus:border-black transition"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-black text-[13px] mb-1.5">Email <span className="text-red-400">*</span></label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Your email"
                      className="w-full h-[46px] bg-[#f8f5f0] rounded-[12px] px-4 text-[13px] outline-none border border-transparent focus:border-black transition"
                    />
                  </div>
                </div>

                {/* REVIEW TEXT */}
                <div>
                  <label className="block font-semibold text-black text-[13px] mb-1.5">Review <span className="text-red-400">*</span></label>
                  <textarea
                    required value={form.review}
                    onChange={(e) => setForm({ ...form, review: e.target.value })}
                    placeholder="Share your experience with this product..."
                    className="w-full h-[100px] bg-[#f8f5f0] rounded-[14px] p-4 text-[13px] outline-none border border-transparent focus:border-black transition resize-none"
                  />
                </div>

                {/* PHOTO UPLOAD */}
                <div>
                  <label className="block font-semibold text-black text-[13px] mb-1.5">
                    Photos <span className="text-gray-400 font-normal">(optional, max 3)</span>
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {photoPreviews.map((src, i) => (
                      <div key={i} className="relative w-[68px] h-[68px] rounded-[10px] overflow-hidden">
                        <Image src={src} alt="" fill className="object-cover" />
                        <button
                          type="button" onClick={() => removePhoto(i)}
                          className="absolute top-1 right-1 w-[18px] h-[18px] bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black transition"
                        >
                          <FiX size={9} />
                        </button>
                      </div>
                    ))}
                    {photos.length < 3 && (
                      <label className="w-[68px] h-[68px] bg-[#f8f5f0] rounded-[10px] flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-200 hover:border-black transition">
                        <FiCamera className="text-gray-400 text-[16px] mb-1" />
                        <span className="text-[9px] text-gray-400 font-medium">Add</span>
                        <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoChange} />
                      </label>
                    )}
                  </div>
                </div>

                {/* SUBMIT */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="submit" disabled={submitting}
                    className="h-[46px] px-8 rounded-full bg-black text-white font-bold text-[13px] hover:bg-[#222] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Submit Review"}
                  </button>

                  <AnimatePresence>
                    {status === "success" && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-emerald-600 text-[13px] font-semibold"
                      >
                        ✓ Review submitted!
                      </motion.span>
                    )}
                    {status === "error" && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500 text-[13px]"
                      >
                        Something went wrong.
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REVIEWS LIST */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-[20px] p-5 animate-pulse">
              <div className="flex gap-1 mb-3">{[...Array(5)].map((_, j) => <div key={j} className="w-3 h-3 bg-gray-100 rounded-full" />)}</div>
              <div className="h-3 bg-gray-100 rounded mb-2 w-4/5" />
              <div className="h-3 bg-gray-100 rounded mb-2 w-3/5" />
              <div className="h-3 bg-gray-100 rounded w-2/5" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-[22px]">
          <p className="font-bold text-black text-[15px] mb-1">No reviews yet</p>
          <p className="text-gray-400 text-[13px] mb-4">Be the first to share your experience</p>
          <button
            onClick={() => setFormOpen(true)}
            className="h-[40px] px-6 rounded-full bg-black text-white text-[13px] font-semibold hover:bg-[#222] transition"
          >
            Write First Review
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r, index) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-[20px] p-5 flex flex-col gap-3 hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] transition-shadow duration-300"
            >
              {/* STARS */}
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <FiStar key={s} className={`text-[12px] ${s <= r.rating ? "fill-[#c9a96e] text-[#c9a96e]" : "text-gray-100"}`} />
                ))}
              </div>

              {/* REVIEW TEXT */}
              <p className="text-gray-600 text-[13px] leading-[1.75] italic flex-1">
                "{r.review}"
              </p>

              {/* PHOTOS */}
              {r.photos?.length > 0 && (
                <div className="flex gap-2">
                  {r.photos.map((photo, i) => (
                    <button
                      key={i} onClick={() => setPreviewPhoto(photo)}
                      className="relative w-14 h-14 rounded-[8px] overflow-hidden hover:opacity-90 transition"
                    >
                      <Image src={photo} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* AUTHOR */}
              <div className="flex items-center gap-2.5 pt-3 border-t border-[#f5f5f5]">
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                  {r.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-black text-[13px] leading-tight">{r.name}</p>
                  <p className="text-[10px] text-gray-400">
                    {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* PHOTO PREVIEW MODAL */}
      <AnimatePresence>
        {previewPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewPhoto(null)}
            className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              className="relative w-full max-w-md h-[60vh]"
            >
              <Image src={previewPhoto} alt="" fill className="object-contain rounded-2xl" />
            </motion.div>
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition"
            >
              <FiX size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}