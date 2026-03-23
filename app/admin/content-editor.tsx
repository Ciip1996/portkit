"use client";

/**
 * Content Editor — Admin CMS
 * Provides per-section CRUD for all portfolio content sections.
 * Changes are saved to Redis; pages revalidate within 60 seconds.
 */

import { useState, useEffect, useCallback } from "react";
import {
  Plus, Trash2, Pencil, X, Check, RotateCcw,
  ChevronDown, ChevronUp, GripVertical, Save,
  Loader2, AlertCircle, User, Briefcase, Code2,
  GraduationCap, FolderGit2, Newspaper, Mail,
} from "lucide-react";
import { en } from "@/lib/i18n/en";
import type { Dictionary } from "@/lib/i18n/types";

type SectionKey = keyof Dictionary;
type Lang = "en" | "es";

interface ApiResponse {
  content?: Dictionary[SectionKey];
  error?: string;
  saved?: boolean;
  deleted?: boolean;
}

// ─── Field Editors ─────────────────────────────────────────────────────────

function TextField({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      )}
    </div>
  );
}

function TagsField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInput("");
    }
  };

  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">
        {label}
      </label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary text-xs font-mono"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(value.filter((t) => t !== tag))}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); add(); }
          }}
          placeholder="Add tag and press Enter"
          className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-1.5 rounded-lg bg-secondary text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function BulletsField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">
        {label}
      </label>
      <div className="space-y-2">
        {value.map((bullet, i) => (
          <div key={i} className="flex gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground/40 mt-2 shrink-0" />
            <textarea
              value={bullet}
              onChange={(e) => {
                const next = [...value];
                next[i] = e.target.value;
                onChange(next);
              }}
              rows={2}
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="p-1.5 text-muted-foreground hover:text-destructive transition-colors mt-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, ""])}
          className="text-xs text-primary hover:underline flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Add bullet
        </button>
      </div>
    </div>
  );
}

// ─── Item List (generic) ───────────────────────────────────────────────────

function ItemList<T extends Record<string, unknown>>({
  items,
  onAdd,
  onEdit,
  onDelete,
  renderTitle,
}: {
  items: T[];
  onAdd: () => void;
  onEdit: (i: number) => void;
  onDelete: (i: number) => void;
  renderTitle: (item: T) => string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-background group"
        >
          <span className="text-sm truncate">{renderTitle(item)}</span>
          <div className="flex gap-1 shrink-0">
            <button
              type="button"
              onClick={() => onEdit(i)}
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onDelete(i)}
              className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="w-full py-2.5 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add item
      </button>
    </div>
  );
}

// ─── Section Editors ───────────────────────────────────────────────────────

type ExperienceJob = Dictionary["experience"]["jobs"][number];

function ExperienceEditor({
  data,
  onChange,
}: {
  data: Dictionary["experience"];
  onChange: (d: Dictionary["experience"]) => void;
}) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<ExperienceJob | null>(null);

  const openEdit = (i: number) => {
    setEditIdx(i);
    setDraft({ ...data.jobs[i], bullets: [...data.jobs[i].bullets], tags: [...data.jobs[i].tags] });
  };

  const openAdd = () => {
    setEditIdx(-1);
    setDraft({ title: "", company: "", location: "", period: "", logo: null, bullets: [], tags: [] });
  };

  const saveItem = () => {
    if (!draft) return;
    const next = [...data.jobs];
    if (editIdx === -1) next.push(draft);
    else next[editIdx!] = draft;
    onChange({ ...data, jobs: next });
    setEditIdx(null);
    setDraft(null);
  };

  const deleteItem = (i: number) => {
    onChange({ ...data, jobs: data.jobs.filter((_, j) => j !== i) });
  };

  if (draft !== null && editIdx !== null) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{editIdx === -1 ? "Add Job" : "Edit Job"}</h4>
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
        <TextField label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
        <TextField label="Company" value={draft.company} onChange={(v) => setDraft({ ...draft, company: v })} />
        <TextField label="Location" value={draft.location} onChange={(v) => setDraft({ ...draft, location: v })} />
        <TextField label="Period" value={draft.period} onChange={(v) => setDraft({ ...draft, period: v })} placeholder="Jan 2024 – Present" />
        <TextField label="Logo key (filename without extension)" value={draft.logo ?? ""} onChange={(v) => setDraft({ ...draft, logo: v || null })} placeholder="e.g. microsoft" />
        <BulletsField label="Bullets" value={draft.bullets} onChange={(v) => setDraft({ ...draft, bullets: v })} />
        <TagsField label="Tags" value={draft.tags} onChange={(v) => setDraft({ ...draft, tags: v })} />
        <div className="flex gap-2 justify-end">
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
          <button onClick={saveItem} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Save</button>
        </div>
      </div>
    );
  }

  return (
    <ItemList
      items={data.jobs}
      onAdd={openAdd}
      onEdit={openEdit}
      onDelete={deleteItem}
      renderTitle={(j) => `${j.title} @ ${j.company}`}
    />
  );
}

type ProjectItem = Dictionary["projects"]["items"][number];

function ProjectsEditor({
  data,
  onChange,
}: {
  data: Dictionary["projects"];
  onChange: (d: Dictionary["projects"]) => void;
}) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<ProjectItem | null>(null);

  const openEdit = (i: number) => {
    setEditIdx(i);
    setDraft({ ...data.items[i], tags: [...data.items[i].tags] });
  };

  const openAdd = () => {
    setEditIdx(-1);
    setDraft({ title: "", role: "", period: "", description: "", tags: [] });
  };

  const saveItem = () => {
    if (!draft) return;
    const next = [...data.items];
    if (editIdx === -1) next.push(draft);
    else next[editIdx!] = draft;
    onChange({ ...data, items: next });
    setEditIdx(null);
    setDraft(null);
  };

  const deleteItem = (i: number) => {
    onChange({ ...data, items: data.items.filter((_, j) => j !== i) });
  };

  if (draft !== null && editIdx !== null) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{editIdx === -1 ? "Add Project" : "Edit Project"}</h4>
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
        <TextField label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
        <TextField label="Role" value={draft.role} onChange={(v) => setDraft({ ...draft, role: v })} placeholder="Tech Lead @ Company" />
        <TextField label="Period" value={draft.period} onChange={(v) => setDraft({ ...draft, period: v })} placeholder="2022 – 2023" />
        <TextField label="Description" value={draft.description} onChange={(v) => setDraft({ ...draft, description: v })} multiline />
        <TextField label="Cover Image URL (optional)" value={draft.image ?? ""} onChange={(v) => setDraft({ ...draft, image: v || undefined })} placeholder="/projects/screenshot.png" />
        <TextField label="Live URL (optional)" value={draft.link ?? ""} onChange={(v) => setDraft({ ...draft, link: v || undefined })} />
        <TextField label="GitHub URL (optional)" value={draft.github ?? ""} onChange={(v) => setDraft({ ...draft, github: v || undefined })} />
        <TextField label="Demo URL (optional)" value={draft.demo ?? ""} onChange={(v) => setDraft({ ...draft, demo: v || undefined })} />
        <TextField label="Metrics (optional)" value={draft.metrics ?? ""} onChange={(v) => setDraft({ ...draft, metrics: v || undefined })} placeholder="e.g. 2M users · +40% performance" />
        <div className="flex items-center gap-3">
          <label className="text-xs font-medium text-muted-foreground">Status</label>
          <select
            value={draft.status ?? ""}
            onChange={(e) => setDraft({ ...draft, status: (e.target.value as ProjectItem["status"]) || undefined })}
            className="px-2 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">None</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Archived">Archived</option>
          </select>
          <label className="flex items-center gap-2 text-sm ml-2 cursor-pointer">
            <input
              type="checkbox"
              checked={draft.featured ?? false}
              onChange={(e) => setDraft({ ...draft, featured: e.target.checked || undefined })}
              className="rounded"
            />
            Featured
          </label>
        </div>
        <TagsField label="Tags" value={draft.tags} onChange={(v) => setDraft({ ...draft, tags: v })} />
        <div className="flex gap-2 justify-end">
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
          <button onClick={saveItem} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Save</button>
        </div>
      </div>
    );
  }

  return (
    <ItemList
      items={data.items}
      onAdd={openAdd}
      onEdit={openEdit}
      onDelete={deleteItem}
      renderTitle={(p) => p.title}
    />
  );
}

type SkillCategory = Dictionary["skills"]["categories"][number];

function SkillsEditor({
  data,
  onChange,
}: {
  data: Dictionary["skills"];
  onChange: (d: Dictionary["skills"]) => void;
}) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<SkillCategory | null>(null);

  const openEdit = (i: number) => {
    setEditIdx(i);
    setDraft({ ...data.categories[i], skills: [...data.categories[i].skills] });
  };

  const openAdd = () => {
    setEditIdx(-1);
    setDraft({ label: "", skills: [] });
  };

  const saveItem = () => {
    if (!draft) return;
    const next = [...data.categories];
    if (editIdx === -1) next.push(draft);
    else next[editIdx!] = draft;
    onChange({ ...data, categories: next });
    setEditIdx(null);
    setDraft(null);
  };

  const deleteItem = (i: number) => {
    onChange({ ...data, categories: data.categories.filter((_, j) => j !== i) });
  };

  if (draft !== null && editIdx !== null) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{editIdx === -1 ? "Add Category" : "Edit Category"}</h4>
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
        <TextField label="Category Label" value={draft.label} onChange={(v) => setDraft({ ...draft, label: v })} />
        <TagsField label="Skills" value={draft.skills} onChange={(v) => setDraft({ ...draft, skills: v })} />
        <div className="flex gap-2 justify-end">
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
          <button onClick={saveItem} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Save</button>
        </div>
      </div>
    );
  }

  return (
    <ItemList
      items={data.categories}
      onAdd={openAdd}
      onEdit={openEdit}
      onDelete={deleteItem}
      renderTitle={(c) => `${c.label} (${c.skills.length} skills)`}
    />
  );
}

type PressItem = Dictionary["press"]["items"][number];

function PressEditor({
  data,
  onChange,
}: {
  data: Dictionary["press"];
  onChange: (d: Dictionary["press"]) => void;
}) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<PressItem | null>(null);

  const openEdit = (i: number) => {
    setEditIdx(i);
    setDraft({ ...data.items[i] });
  };

  const openAdd = () => {
    setEditIdx(-1);
    setDraft({ title: "", source: "", date: "", excerpt: "", url: "" });
  };

  const saveItem = () => {
    if (!draft) return;
    const next = [...data.items];
    if (editIdx === -1) next.push(draft);
    else next[editIdx!] = draft;
    onChange({ ...data, items: next });
    setEditIdx(null);
    setDraft(null);
  };

  const deleteItem = (i: number) => {
    onChange({ ...data, items: data.items.filter((_, j) => j !== i) });
  };

  if (draft !== null && editIdx !== null) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{editIdx === -1 ? "Add Press Item" : "Edit Press Item"}</h4>
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
        <TextField label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} multiline />
        <TextField label="Source" value={draft.source} onChange={(v) => setDraft({ ...draft, source: v })} />
        <TextField label="Date" value={draft.date} onChange={(v) => setDraft({ ...draft, date: v })} placeholder="Jan 2024" />
        <TextField label="Excerpt" value={draft.excerpt} onChange={(v) => setDraft({ ...draft, excerpt: v })} multiline />
        <TextField label="URL" value={draft.url} onChange={(v) => setDraft({ ...draft, url: v })} />
        <TextField label="Language (EN / ES)" value={draft.lang ?? ""} onChange={(v) => setDraft({ ...draft, lang: v || undefined })} placeholder="EN" />
        <div className="flex gap-2 justify-end">
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
          <button onClick={saveItem} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Save</button>
        </div>
      </div>
    );
  }

  return (
    <ItemList
      items={data.items}
      onAdd={openAdd}
      onEdit={openEdit}
      onDelete={deleteItem}
      renderTitle={(p) => `${p.source} — ${p.title.slice(0, 50)}...`}
    />
  );
}

function HeroEditor({
  data,
  onChange,
}: {
  data: Dictionary["hero"];
  onChange: (d: Dictionary["hero"]) => void;
}) {
  return (
    <div className="space-y-4">
      <TextField label="First Name" value={data.firstName} onChange={(v) => onChange({ ...data, firstName: v })} />
      <TextField label="Last Name" value={data.lastName} onChange={(v) => onChange({ ...data, lastName: v })} />
      <TextField label="Subtitle / Role" value={data.subtitle} onChange={(v) => onChange({ ...data, subtitle: v })} />
      <TextField label="Bio" value={data.bio} onChange={(v) => onChange({ ...data, bio: v })} multiline />
      <TextField label="Location" value={data.location} onChange={(v) => onChange({ ...data, location: v })} placeholder="City · Open to Remote" />
      <TextField label="CTA Button Text" value={data.cta} onChange={(v) => onChange({ ...data, cta: v })} />
    </div>
  );
}

// ─── Section Panel ─────────────────────────────────────────────────────────

const SECTION_CONFIG: Array<{
  key: SectionKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}> = [
  { key: "hero", label: "Hero", icon: User, description: "Name, subtitle, bio, location" },
  { key: "experience", label: "Experience", icon: Briefcase, description: "Work history and job entries" },
  { key: "projects", label: "Projects", icon: FolderGit2, description: "Contractor & featured projects" },
  { key: "skills", label: "Skills", icon: Code2, description: "Skill categories and tech stack" },
  { key: "press", label: "Press", icon: Newspaper, description: "Media mentions and articles" },
  { key: "contact", label: "Contact", icon: Mail, description: "Contact section labels" },
  { key: "education", label: "Education", icon: GraduationCap, description: "Schools, degree, awards" },
];

function SectionPanel({
  sectionKey,
  lang,
}: {
  sectionKey: SectionKey;
  lang: Lang;
}) {
  const [content, setContent] = useState<Dictionary[SectionKey] | null>(null);
  const [hasOverride, setHasOverride] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/content/${sectionKey}?lang=${lang}`);
      if (res.ok) {
        const data: ApiResponse = await res.json();
        setContent(data.content as Dictionary[SectionKey]);
        // Check if it differs from default (i.e., has an override)
        setHasOverride(JSON.stringify(data.content) !== JSON.stringify(en[sectionKey]));
      }
    } catch {
      // fall through
    } finally {
      setLoading(false);
    }
  }, [sectionKey, lang]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch(`/api/content/${sectionKey}?lang=${lang}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data: ApiResponse = await res.json();
      if (res.ok && data.saved) {
        setStatus("saved");
        setHasOverride(true);
        setTimeout(() => setStatus("idle"), 2500);
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "Save failed");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm(`Reset "${sectionKey}" to defaults? This removes the Redis override.`)) return;
    setSaving(true);
    try {
      await fetch(`/api/content/${sectionKey}?lang=${lang}`, { method: "DELETE" });
      setContent(en[sectionKey] as Dictionary[SectionKey]);
      setHasOverride(false);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setErrorMsg("Reset failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!content) return null;

  const renderEditor = () => {
    switch (sectionKey) {
      case "hero":
        return (
          <HeroEditor
            data={content as Dictionary["hero"]}
            onChange={(d) => setContent(d as Dictionary[SectionKey])}
          />
        );
      case "experience":
        return (
          <ExperienceEditor
            data={content as Dictionary["experience"]}
            onChange={(d) => setContent(d as Dictionary[SectionKey])}
          />
        );
      case "projects":
        return (
          <ProjectsEditor
            data={content as Dictionary["projects"]}
            onChange={(d) => setContent(d as Dictionary[SectionKey])}
          />
        );
      case "skills":
        return (
          <SkillsEditor
            data={content as Dictionary["skills"]}
            onChange={(d) => setContent(d as Dictionary[SectionKey])}
          />
        );
      case "press":
        return (
          <PressEditor
            data={content as Dictionary["press"]}
            onChange={(d) => setContent(d as Dictionary[SectionKey])}
          />
        );
      case "contact":
        return (
          <div className="space-y-4">
            <TextField
              label="Section Label"
              value={(content as Dictionary["contact"]).sectionLabel}
              onChange={(v) => setContent({ ...(content as Dictionary["contact"]), sectionLabel: v } as Dictionary[SectionKey])}
            />
            <TextField
              label="Heading"
              value={(content as Dictionary["contact"]).heading}
              onChange={(v) => setContent({ ...(content as Dictionary["contact"]), heading: v } as Dictionary[SectionKey])}
            />
            <TextField
              label="Subtitle"
              value={(content as Dictionary["contact"]).subtitle}
              onChange={(v) => setContent({ ...(content as Dictionary["contact"]), subtitle: v } as Dictionary[SectionKey])}
              multiline
            />
          </div>
        );
      case "education": {
        const edu = content as Dictionary["education"];
        return (
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground">
              Edit education entries, award, and language proficiencies.
            </p>
            <div className="space-y-3">
              {edu.schools.map((school, i) => (
                <div key={i} className="p-3 rounded-lg border border-border bg-background space-y-2">
                  <p className="text-sm font-medium">{school.school}</p>
                  <TextField
                    label="School"
                    value={school.school}
                    onChange={(v) => {
                      const next = [...edu.schools];
                      next[i] = { ...next[i], school: v };
                      setContent({ ...edu, schools: next } as Dictionary[SectionKey]);
                    }}
                  />
                  <TextField
                    label="Degree"
                    value={school.degree}
                    onChange={(v) => {
                      const next = [...edu.schools];
                      next[i] = { ...next[i], degree: v };
                      setContent({ ...edu, schools: next } as Dictionary[SectionKey]);
                    }}
                  />
                  <TextField
                    label="Detail"
                    value={school.detail}
                    onChange={(v) => {
                      const next = [...edu.schools];
                      next[i] = { ...next[i], detail: v };
                      setContent({ ...edu, schools: next } as Dictionary[SectionKey]);
                    }}
                  />
                  <TextField
                    label="Location"
                    value={school.location}
                    onChange={(v) => {
                      const next = [...edu.schools];
                      next[i] = { ...next[i], location: v };
                      setContent({ ...edu, schools: next } as Dictionary[SectionKey]);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      }
      default:
        return (
          <p className="text-sm text-muted-foreground py-4 text-center">
            Direct editing for this section is coming soon. Edit <code className="font-mono text-xs">lib/i18n/en.ts</code> instead.
          </p>
        );
    }
  };

  return (
    <div className="space-y-4">
      {hasOverride && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20 text-xs text-primary">
          <Check className="w-3.5 h-3.5" />
          Redis override is active — this content is live
        </div>
      )}

      {renderEditor()}

      <div className="flex items-center gap-2 pt-2 border-t border-border">
        {hasOverride && (
          <button
            type="button"
            onClick={handleReset}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-50"
          >
            <RotateCcw className="w-3 h-3" />
            Reset to default
          </button>
        )}
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : status === "saved" ? (
            <Check className="w-3 h-3" />
          ) : (
            <Save className="w-3 h-3" />
          )}
          {saving ? "Saving…" : status === "saved" ? "Saved!" : "Save to Redis"}
        </button>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {errorMsg}
        </div>
      )}
    </div>
  );
}

// ─── Accordion Section ─────────────────────────────────────────────────────

function ContentSection({
  config,
  lang,
}: {
  config: typeof SECTION_CONFIG[number];
  lang: Lang;
}) {
  const [open, setOpen] = useState(false);
  const Icon = config.icon;

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 sm:p-5 bg-card hover:bg-secondary/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{config.label}</p>
            <p className="text-xs text-muted-foreground">{config.description}</p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="p-4 sm:p-5 border-t border-border bg-background">
          <SectionPanel sectionKey={config.key} lang={lang} />
        </div>
      )}
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────

export default function ContentEditor() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Content</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Edit portfolio content. Changes save to Redis and appear within 60 seconds.
          </p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg border border-border bg-card">
          {(["en", "es"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                lang === l
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-400 flex items-start gap-2">
        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <span>
          Saves override the static i18n files in Redis. Pages revalidate every 60 seconds.
          To permanently apply changes, update <code className="font-mono">lib/i18n/{lang}.ts</code> as well.
        </span>
      </div>

      <div className="space-y-3">
        {SECTION_CONFIG.map((config) => (
          <ContentSection key={config.key} config={config} lang={lang} />
        ))}
      </div>
    </div>
  );
}
