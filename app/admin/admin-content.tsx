"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Copy,
  Check,
  Link2,
  Shield,
  ShieldOff,
  Pencil,
  X,
  LayoutGrid,
  FileText,
} from "lucide-react";
import {
  ALL_SECTIONS,
  BUILTIN_VARIANTS,
  type VariantConfig,
  type SectionId,
} from "@/lib/variants";
import { SITE_URL } from "@/lib/constants";
import ContentEditor from "./content-editor";

type AdminTab = "variants" | "content";

export default function AdminContent() {
  const searchParams = useSearchParams();
  const prefillApplied = useRef(false);

  const [activeTab, setActiveTab] = useState<AdminTab>("variants");
  const [variants, setVariants] = useState<VariantConfig[]>([]);
  const [generalSections, setGeneralSections] = useState<SectionId[]>(
    BUILTIN_VARIANTS.general.sections,
  );
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [tokenUrl, setTokenUrl] = useState<string | null>(null);

  const [slug, setSlug] = useState("");
  const [label, setLabel] = useState("");
  const [sections, setSections] = useState<SectionId[]>([]);
  const [isProtected, setIsProtected] = useState(false);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchVariants = useCallback(async () => {
    try {
      const res = await fetch("/api/variants");
      if (res.ok) {
        const data = await res.json();
        setVariants(data.variants ?? []);
      }
    } catch {
      /* noop */
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchGeneralSections = useCallback(async () => {
    try {
      const res = await fetch("/api/variants/general");
      if (res.ok) {
        const data = await res.json();
        setGeneralSections(data.sections ?? BUILTIN_VARIANTS.general.sections);
      }
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    fetchVariants();
    fetchGeneralSections();
  }, [fetchVariants, fetchGeneralSections]);

  useEffect(() => {
    if (prefillApplied.current) return;
    const sectionsParam = searchParams.get("sections");
    if (!sectionsParam) return;
    prefillApplied.current = true;

    const validIds = new Set<string>(ALL_SECTIONS.map((s) => s.id));
    const parsed = sectionsParam
      .split(",")
      .filter((s) => validIds.has(s)) as SectionId[];

    if (parsed.length > 0) {
      setSections(parsed);
      const labelParam = searchParams.get("label");
      if (labelParam) setLabel(labelParam);
      setShowForm(true);
    }
  }, [searchParams]);

  const resetForm = () => {
    setSlug("");
    setLabel("");
    setSections([]);
    setIsProtected(false);
    setFormError("");
    setEditing(null);
  };

  const openCreate = () => {
    resetForm();
    setShowForm(true);
  };

  const openEdit = (v: VariantConfig) => {
    setSlug(v.slug);
    setLabel(v.label);
    setSections([...v.sections]);
    setIsProtected(v.protected);
    setEditing(v.slug);
    setShowForm(true);
    setFormError("");
  };

  const openEditGeneral = () => {
    setSlug("general");
    setLabel("General");
    setSections([...generalSections]);
    setIsProtected(false);
    setEditing("general");
    setShowForm(true);
    setFormError("");
  };

  const toggleSection = (id: SectionId) => {
    setSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handleSave = async () => {
    setFormError("");

    const isGeneralEdit = editing === "general";

    if (!isGeneralEdit && !slug.trim()) {
      setFormError("Slug is required");
      return;
    }
    if (!isGeneralEdit && !label.trim()) {
      setFormError("Label is required");
      return;
    }
    if (sections.length === 0) {
      setFormError("Select at least one section");
      return;
    }

    setSaving(true);
    try {
      let res: Response;

      if (isGeneralEdit) {
        res = await fetch("/api/variants/general", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sections }),
        });
      } else {
        res = await fetch("/api/variants", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            slug: slug.trim().toLowerCase(),
            label: label.trim(),
            sections,
            protected: isProtected,
          }),
        });
      }

      if (res.ok) {
        if (isGeneralEdit) await fetchGeneralSections();
        else await fetchVariants();
        setShowForm(false);
        resetForm();
      } else {
        const data = await res.json().catch(() => ({}));
        setFormError(data.error ?? "Failed to save");
      }
    } catch {
      setFormError("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (variantSlug: string) => {
    if (!confirm(`Delete variant "${variantSlug}"?`)) return;

    try {
      await fetch("/api/variants", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: variantSlug }),
      });
      await fetchVariants();
    } catch {
      /* noop */
    }
  };

  const copyUrl = (variantSlug: string) => {
    const url = `${SITE_URL}/p/${variantSlug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(variantSlug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const generateToken = async (variantSlug: string) => {
    try {
      const res = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: variantSlug }),
      });

      if (res.ok) {
        const data = await res.json();
        setTokenUrl(data.url);
        navigator.clipboard.writeText(data.url);
      }
    } catch {
      /* noop */
    }
  };

  const builtinList: VariantConfig[] = Object.values(BUILTIN_VARIANTS).map(
    (v) =>
      v.slug === "general"
        ? { ...v, sections: generalSections }
        : v,
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="pt-24 pb-8 sm:pt-28 sm:pb-12">
        <div className="container max-w-4xl px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Admin
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Manage your portfolio content and create audience-specific variants.
          </p>
        </div>
      </header>

      <main className="pb-16">
        <div className="container max-w-4xl px-6">
          {/* Tab navigation */}
          <div className="flex gap-1 p-1 rounded-xl border border-border bg-card mb-8 w-fit">
            <button
              onClick={() => setActiveTab("variants")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "variants"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Variants
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "content"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="w-4 h-4" />
              Content
            </button>
          </div>

          {activeTab === "content" && <ContentEditor />}

          {activeTab === "variants" && <>
          {/* Built-in variants */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-4 text-muted-foreground">
              Built-in Variants
            </h2>
            <div className="space-y-3">
              {builtinList.map((v) => (
                <VariantCard
                  key={v.slug}
                  variant={v}
                  isBuiltin
                  copiedSlug={copiedSlug}
                  onCopy={() =>
                    copyUrl(v.slug === "general" ? "" : v.slug)
                  }
                  onEdit={v.slug === "general" ? openEditGeneral : undefined}
                  onGenerateToken={() => generateToken(v.slug)}
                />
              ))}
            </div>
          </section>

          {/* Custom variants */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-muted-foreground">
                Custom Variants
              </h2>
              <button
                onClick={openCreate}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Create Variant
              </button>
            </div>

            {loading ? (
              <p className="text-muted-foreground text-sm py-8 text-center">
                Loading...
              </p>
            ) : variants.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-border rounded-xl">
                <p className="text-muted-foreground text-sm mb-2">
                  No custom variants yet.
                </p>
                <p className="text-muted-foreground text-xs">
                  Create one to share a tailored portfolio with a specific
                  company.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {variants.map((v) => (
                  <VariantCard
                    key={v.slug}
                    variant={v}
                    copiedSlug={copiedSlug}
                    onCopy={() => copyUrl(v.slug)}
                    onEdit={() => openEdit(v)}
                    onDelete={() => handleDelete(v.slug)}
                    onGenerateToken={() => generateToken(v.slug)}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Token URL modal */}
          <AnimatePresence>
            {tokenUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
                onClick={() => setTokenUrl(null)}
              >
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="font-semibold text-lg mb-2">
                    Token Link Generated
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Copied to clipboard. Share this link — it grants access
                    without a PIN.
                  </p>
                  <div className="p-3 rounded-lg bg-muted border border-border font-mono text-xs break-all mb-4">
                    {tokenUrl}
                  </div>
                  <button
                    onClick={() => setTokenUrl(null)}
                    className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Done
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Create/Edit form modal */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
              >
                <motion.div
                  initial={{ scale: 0.95, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 10 }}
                  className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg">
                      {editing === "general"
                        ? "Edit General Sections"
                        : editing
                          ? "Edit Variant"
                          : "Create Variant"}
                    </h3>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        resetForm();
                      }}
                      className="p-1 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {editing !== "general" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1.5">
                            Slug
                          </label>
                          <input
                            type="text"
                            value={slug}
                            onChange={(e) =>
                              setSlug(
                                e.target.value
                                  .toLowerCase()
                                  .replace(/[^a-z0-9-]/g, ""),
                              )
                            }
                            disabled={Boolean(editing)}
                            placeholder="e.g. microsoft, startup-xyz"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            URL: {SITE_URL}/p/{slug || "..."}
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1.5">
                            Label
                          </label>
                          <input
                            type="text"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            placeholder="e.g. Microsoft Application"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Sections
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {ALL_SECTIONS.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => toggleSection(s.id)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all text-left ${
                              sections.includes(s.id)
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border text-muted-foreground hover:border-muted-foreground/50"
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {editing !== "general" && (
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={isProtected}
                          onClick={() => setIsProtected(!isProtected)}
                          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                            isProtected ? "bg-primary" : "bg-muted"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                              isProtected ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                        <span className="text-sm">
                          {isProtected
                            ? "Protected (requires PIN or token)"
                            : "Public (anyone with the link)"}
                        </span>
                      </div>
                    )}

                    {formError && (
                      <p className="text-sm text-red-500">{formError}</p>
                    )}

                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {saving
                        ? "Saving..."
                        : editing === "general"
                          ? "Update General"
                          : editing
                            ? "Update Variant"
                            : "Create Variant"}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          </>}
        </div>
      </main>
    </div>
  );
}

function VariantCard({
  variant,
  isBuiltin,
  copiedSlug,
  onCopy,
  onEdit,
  onDelete,
  onGenerateToken,
}: {
  variant: VariantConfig;
  isBuiltin?: boolean;
  copiedSlug: string | null;
  onCopy: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onGenerateToken: () => void;
}) {
  const url =
    variant.slug === "general"
      ? "/"
      : variant.slug === "full"
        ? "/full"
        : `/p/${variant.slug}`;
  const isCopied = copiedSlug === variant.slug;

  return (
    <div className="p-4 sm:p-5 rounded-xl border border-border bg-card hover:border-primary/20 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-base">{variant.label}</h3>
            {variant.protected ? (
              <Shield className="w-3.5 h-3.5 text-amber-500" />
            ) : (
              <ShieldOff className="w-3.5 h-3.5 text-green-500" />
            )}
            {isBuiltin && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono rounded border border-border text-muted-foreground">
                built-in
              </span>
            )}
          </div>
          <p className="text-xs font-mono text-muted-foreground mb-2">
            {SITE_URL}{url}
          </p>
          <div className="flex flex-wrap gap-1">
            {variant.sections.map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 text-[10px] rounded-full font-mono border border-primary/20 text-primary/70 bg-primary/5"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onCopy}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title="Copy URL"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          {variant.protected && (
            <button
              onClick={onGenerateToken}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Generate token link"
            >
              <Link2 className="w-4 h-4" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
          {!isBuiltin && onDelete && (
            <button
              onClick={onDelete}
              className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
