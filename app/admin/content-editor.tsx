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
  Play, BookOpen, Clock, Navigation, FileText, Link2,
} from "lucide-react";
import { en } from "@/lib/i18n/en";
import type { Dictionary } from "@/lib/i18n/types";
import { sortByMostRecent } from "@/lib/sort-by-date";

type SectionKey = keyof Dictionary;
type Lang = "en" | "es";

interface ApiResponse {
  content?: Dictionary[SectionKey];
  error?: string;
  saved?: boolean;
  deleted?: boolean;
}

// ─── Shared Field Components ────────────────────────────────────────────────

function TextField({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
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
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      )}
    </div>
  );
}

function TagsField({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("");
  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) { onChange([...value, trimmed]); setInput(""); }
  };
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {value.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary text-xs font-mono">
            {tag}
            <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))} className="text-muted-foreground hover:text-destructive transition-colors">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder="Add tag and press Enter"
          className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button type="button" onClick={add} className="px-3 py-1.5 rounded-lg bg-secondary text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function BulletsField({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground mb-1">{label}</label>
      <div className="space-y-2">
        {value.map((bullet, i) => (
          <div key={i} className="flex gap-2">
            <GripVertical className="w-4 h-4 text-muted-foreground/40 mt-2 shrink-0" />
            <textarea
              value={bullet}
              onChange={(e) => { const next = [...value]; next[i] = e.target.value; onChange(next); }}
              rows={2}
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors mt-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...value, ""])} className="text-xs text-primary hover:underline flex items-center gap-1">
          <Plus className="w-3 h-3" /> Add bullet
        </button>
      </div>
    </div>
  );
}

function ItemList<T extends Record<string, unknown>>({
  items, onAdd, onEdit, onDelete, renderTitle,
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
        <div key={i} className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-background group">
          <span className="text-sm truncate">{renderTitle(item)}</span>
          <div className="flex gap-1 shrink-0">
            <button type="button" onClick={() => onEdit(i)} className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button type="button" onClick={() => onDelete(i)} className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={onAdd} className="w-full py-2.5 rounded-lg border border-dashed border-border text-sm text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" /> Add item
      </button>
    </div>
  );
}

function SectionMeta({ data, onChange, fields }: {
  data: Record<string, string>;
  onChange: (key: string, v: string) => void;
  fields: Array<{ key: string; label: string; multiline?: boolean }>;
}) {
  return (
    <div className="space-y-3 pb-4 mb-4 border-b border-border">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Section Labels</p>
      {fields.map(({ key, label, multiline }) => (
        <TextField key={key} label={label} value={data[key] ?? ""} onChange={(v) => onChange(key, v)} multiline={multiline} />
      ))}
    </div>
  );
}

// ─── Section Editors ────────────────────────────────────────────────────────

function ProfileEditor({ data, onChange }: { data: Dictionary["profile"]; onChange: (d: Dictionary["profile"]) => void }) {
  const field = (key: keyof Dictionary["profile"], label: string, placeholder?: string) => (
    <TextField key={key} label={label} value={data[key]} onChange={(v) => onChange({ ...data, [key]: v })} placeholder={placeholder} />
  );
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {field("firstName", "First Name")}
        {field("lastName", "Last Name")}
      </div>
      {field("jobTitle", "Job Title", "e.g. Senior Software Engineer")}
      {field("location", "Location", "e.g. Mexico · Open to Remote")}
      <div className="grid grid-cols-1 gap-3 pt-2 border-t border-border">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact & Social</p>
        {field("email", "Email", "you@example.com")}
        {field("phone", "Phone (optional)", "+1 555 000 0000")}
        {field("github", "GitHub URL", "https://github.com/your-handle")}
        {field("linkedin", "LinkedIn URL", "https://linkedin.com/in/your-handle")}
        {field("website", "Website URL", "https://yourdomain.com")}
      </div>
    </div>
  );
}

function HeroEditor({ data, onChange }: { data: Dictionary["hero"]; onChange: (d: Dictionary["hero"]) => void }) {
  return (
    <div className="space-y-4">
      <TextField label="Image Alt Text" value={data.imgAlt} onChange={(v) => onChange({ ...data, imgAlt: v })} placeholder="Your name — Job Title" />
      <TextField label="Subtitle / Role (mono text)" value={data.subtitle} onChange={(v) => onChange({ ...data, subtitle: v })} />
      <TextField label="First Name" value={data.firstName} onChange={(v) => onChange({ ...data, firstName: v })} />
      <TextField label="Last Name" value={data.lastName} onChange={(v) => onChange({ ...data, lastName: v })} />
      <TextField label="Bio" value={data.bio} onChange={(v) => onChange({ ...data, bio: v })} multiline />
      <TextField label="Location" value={data.location} onChange={(v) => onChange({ ...data, location: v })} placeholder="City · Open to Remote" />
      <TextField label="CTA Button Text" value={data.cta} onChange={(v) => onChange({ ...data, cta: v })} />
    </div>
  );
}

type ExperienceJob = Dictionary["experience"]["jobs"][number];

function ExperienceEditor({ data, onChange }: { data: Dictionary["experience"]; onChange: (d: Dictionary["experience"]) => void }) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<ExperienceJob | null>(null);

  const openEdit = (i: number) => { setEditIdx(i); setDraft({ ...data.jobs[i], bullets: [...data.jobs[i].bullets], tags: [...data.jobs[i].tags] }); };
  const openAdd = () => { setEditIdx(-1); setDraft({ title: "", company: "", location: "", period: "", logo: null, bullets: [], tags: [] }); };
  const saveItem = () => {
    if (!draft) return;
    const next = [...data.jobs];
    if (editIdx === -1) next.push(draft); else next[editIdx!] = draft;
    // Keep jobs ordered most recent first, so new entries don't land at the bottom.
    onChange({ ...data, jobs: sortByMostRecent(next) }); setEditIdx(null); setDraft(null);
  };

  if (draft !== null && editIdx !== null) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{editIdx === -1 ? "Add Job" : "Edit Job"}</h4>
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
        </div>
        <TextField label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
        <TextField label="Company" value={draft.company} onChange={(v) => setDraft({ ...draft, company: v })} />
        <TextField label="Location" value={draft.location} onChange={(v) => setDraft({ ...draft, location: v })} />
        <TextField label="Period" value={draft.period} onChange={(v) => setDraft({ ...draft, period: v })} placeholder="Jan 2024 – Present" />
        <TextField label="Logo key (filename without extension in /public/logos/)" value={draft.logo ?? ""} onChange={(v) => setDraft({ ...draft, logo: v || null })} placeholder="e.g. microsoft" />
        <TextField label="Logo Background Color (optional)" value={draft.logoBg ?? ""} onChange={(v) => setDraft({ ...draft, logoBg: v || undefined })} placeholder="#ffffff" />
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
    <div className="space-y-4">
      <SectionMeta
        data={data as unknown as Record<string, string>}
        onChange={(key, v) => onChange({ ...data, [key]: v })}
        fields={[
          { key: "sectionLabel", label: "Section Label" },
          { key: "heading", label: "Heading" },
          { key: "viewFullTimeline", label: "\"View Full Timeline\" link text" },
        ]}
      />
      <ItemList items={data.jobs} onAdd={openAdd} onEdit={openEdit} onDelete={(i) => onChange({ ...data, jobs: data.jobs.filter((_, j) => j !== i) })} renderTitle={(j) => `${j.title} @ ${j.company}`} />
    </div>
  );
}

type SkillCategory = Dictionary["skills"]["categories"][number];

function SkillsEditor({ data, onChange }: { data: Dictionary["skills"]; onChange: (d: Dictionary["skills"]) => void }) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<SkillCategory | null>(null);

  const openEdit = (i: number) => { setEditIdx(i); setDraft({ ...data.categories[i], skills: [...data.categories[i].skills] }); };
  const openAdd = () => { setEditIdx(-1); setDraft({ label: "", skills: [] }); };
  const saveItem = () => {
    if (!draft) return;
    const next = [...data.categories];
    if (editIdx === -1) next.push(draft); else next[editIdx!] = draft;
    onChange({ ...data, categories: next }); setEditIdx(null); setDraft(null);
  };

  if (draft !== null && editIdx !== null) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{editIdx === -1 ? "Add Category" : "Edit Category"}</h4>
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
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
    <div className="space-y-4">
      <SectionMeta
        data={data as unknown as Record<string, string>}
        onChange={(key, v) => onChange({ ...data, [key]: v })}
        fields={[{ key: "sectionLabel", label: "Section Label" }, { key: "heading", label: "Heading" }]}
      />
      <ItemList items={data.categories} onAdd={openAdd} onEdit={openEdit} onDelete={(i) => onChange({ ...data, categories: data.categories.filter((_, j) => j !== i) })} renderTitle={(c) => `${c.label} (${c.skills.length} skills)`} />
    </div>
  );
}

type ProjectItem = Dictionary["projects"]["items"][number];

function ProjectsEditor({ data, onChange }: { data: Dictionary["projects"]; onChange: (d: Dictionary["projects"]) => void }) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<ProjectItem | null>(null);

  const openEdit = (i: number) => { setEditIdx(i); setDraft({ ...data.items[i], tags: [...data.items[i].tags] }); };
  const openAdd = () => { setEditIdx(-1); setDraft({ title: "", role: "", period: "", description: "", tags: [] }); };
  const saveItem = () => {
    if (!draft) return;
    const next = [...data.items];
    if (editIdx === -1) next.push(draft); else next[editIdx!] = draft;
    onChange({ ...data, items: next }); setEditIdx(null); setDraft(null);
  };

  if (draft !== null && editIdx !== null) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{editIdx === -1 ? "Add Project" : "Edit Project"}</h4>
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
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
          <select value={draft.status ?? ""} onChange={(e) => setDraft({ ...draft, status: (e.target.value as ProjectItem["status"]) || undefined })} className="px-2 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option value="">None</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Archived">Archived</option>
          </select>
          <label className="flex items-center gap-2 text-sm ml-2 cursor-pointer">
            <input type="checkbox" checked={draft.featured ?? false} onChange={(e) => setDraft({ ...draft, featured: e.target.checked || undefined })} className="rounded" />
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
    <div className="space-y-4">
      <SectionMeta data={data as unknown as Record<string, string>} onChange={(key, v) => onChange({ ...data, [key]: v })} fields={[{ key: "sectionLabel", label: "Section Label" }, { key: "heading", label: "Heading" }]} />
      <ItemList items={data.items} onAdd={openAdd} onEdit={openEdit} onDelete={(i) => onChange({ ...data, items: data.items.filter((_, j) => j !== i) })} renderTitle={(p) => p.title} />
    </div>
  );
}

type FreelanceItem = Dictionary["freelance"]["items"][number];

function FreelanceEditor({ data, onChange }: { data: Dictionary["freelance"]; onChange: (d: Dictionary["freelance"]) => void }) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<FreelanceItem | null>(null);

  const openEdit = (i: number) => { setEditIdx(i); setDraft({ ...data.items[i], tags: [...data.items[i].tags] }); };
  const openAdd = () => { setEditIdx(-1); setDraft({ title: "", description: "", tags: [] }); };
  const saveItem = () => {
    if (!draft) return;
    const next = [...data.items];
    if (editIdx === -1) next.push(draft); else next[editIdx!] = draft;
    onChange({ ...data, items: next }); setEditIdx(null); setDraft(null);
  };

  if (draft !== null && editIdx !== null) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{editIdx === -1 ? "Add Freelance Project" : "Edit Freelance Project"}</h4>
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
        </div>
        <TextField label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
        <TextField label="Description" value={draft.description} onChange={(v) => setDraft({ ...draft, description: v })} multiline />
        <TextField label="Live URL (optional)" value={draft.link ?? ""} onChange={(v) => setDraft({ ...draft, link: v || undefined })} />
        <TagsField label="Tags" value={draft.tags} onChange={(v) => setDraft({ ...draft, tags: v })} />
        <div className="flex gap-2 justify-end">
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
          <button onClick={saveItem} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SectionMeta data={data as unknown as Record<string, string>} onChange={(key, v) => onChange({ ...data, [key]: v })} fields={[{ key: "sectionLabel", label: "Section Label" }, { key: "heading", label: "Heading" }, { key: "subtitle", label: "Subtitle", multiline: true }]} />
      <ItemList items={data.items} onAdd={openAdd} onEdit={openEdit} onDelete={(i) => onChange({ ...data, items: data.items.filter((_, j) => j !== i) })} renderTitle={(p) => p.title} />
    </div>
  );
}

type DemoItem = Dictionary["demos"]["items"][number];

function DemosEditor({ data, onChange }: { data: Dictionary["demos"]; onChange: (d: Dictionary["demos"]) => void }) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<DemoItem | null>(null);

  const openEdit = (i: number) => { setEditIdx(i); setDraft({ ...data.items[i], tags: [...data.items[i].tags] }); };
  const openAdd = () => { setEditIdx(-1); setDraft({ title: "", description: "", video: "", poster: "", duration: "", company: "", period: "", tags: [] }); };
  const saveItem = () => {
    if (!draft) return;
    const next = [...data.items];
    if (editIdx === -1) next.push(draft); else next[editIdx!] = draft;
    onChange({ ...data, items: next }); setEditIdx(null); setDraft(null);
  };

  if (draft !== null && editIdx !== null) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{editIdx === -1 ? "Add Demo" : "Edit Demo"}</h4>
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
        </div>
        <TextField label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
        <TextField label="Description" value={draft.description} onChange={(v) => setDraft({ ...draft, description: v })} multiline />
        <TextField label="Company" value={draft.company} onChange={(v) => setDraft({ ...draft, company: v })} />
        <TextField label="Period" value={draft.period} onChange={(v) => setDraft({ ...draft, period: v })} placeholder="2023 – 2024" />
        <TextField label="Duration" value={draft.duration} onChange={(v) => setDraft({ ...draft, duration: v })} placeholder="5 min" />
        <TextField label="Video file path" value={draft.video} onChange={(v) => setDraft({ ...draft, video: v })} placeholder="/demos/my-demo.mp4" />
        <TextField label="Poster image path" value={draft.poster} onChange={(v) => setDraft({ ...draft, poster: v })} placeholder="/demos/my-demo-poster.jpg" />
        <TagsField label="Tags" value={draft.tags} onChange={(v) => setDraft({ ...draft, tags: v })} />
        <div className="flex gap-2 justify-end">
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
          <button onClick={saveItem} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SectionMeta data={data as unknown as Record<string, string>} onChange={(key, v) => onChange({ ...data, [key]: v })} fields={[{ key: "sectionLabel", label: "Section Label" }, { key: "heading", label: "Heading" }, { key: "subtitle", label: "Subtitle", multiline: true }]} />
      <ItemList items={data.items} onAdd={openAdd} onEdit={openEdit} onDelete={(i) => onChange({ ...data, items: data.items.filter((_, j) => j !== i) })} renderTitle={(d) => d.title} />
    </div>
  );
}

type DiplomaItem = Dictionary["diplomas"]["items"][number];

function DiplomasEditor({ data, onChange }: { data: Dictionary["diplomas"]; onChange: (d: Dictionary["diplomas"]) => void }) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<DiplomaItem | null>(null);

  const openEdit = (i: number) => { setEditIdx(i); setDraft({ ...data.items[i] }); };
  const openAdd = () => { setEditIdx(-1); setDraft({ title: "", description: "", file: "" }); };
  const saveItem = () => {
    if (!draft) return;
    const next = [...data.items];
    if (editIdx === -1) next.push(draft); else next[editIdx!] = draft;
    onChange({ ...data, items: next }); setEditIdx(null); setDraft(null);
  };

  if (draft !== null && editIdx !== null) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{editIdx === -1 ? "Add Diploma" : "Edit Diploma"}</h4>
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
        </div>
        <TextField label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
        <TextField label="Description" value={draft.description} onChange={(v) => setDraft({ ...draft, description: v })} multiline />
        <TextField label="PDF file path (in /public/diplomas/)" value={draft.file} onChange={(v) => setDraft({ ...draft, file: v })} placeholder="/diplomas/my-diploma.pdf" />
        <div className="flex gap-2 justify-end">
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
          <button onClick={saveItem} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TextField label="Heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <ItemList items={data.items} onAdd={openAdd} onEdit={openEdit} onDelete={(i) => onChange({ ...data, items: data.items.filter((_, j) => j !== i) })} renderTitle={(d) => d.title} />
    </div>
  );
}

type PressItem = Dictionary["press"]["items"][number];

function PressEditor({ data, onChange }: { data: Dictionary["press"]; onChange: (d: Dictionary["press"]) => void }) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<PressItem | null>(null);

  const openEdit = (i: number) => { setEditIdx(i); setDraft({ ...data.items[i] }); };
  const openAdd = () => { setEditIdx(-1); setDraft({ title: "", source: "", date: "", excerpt: "", url: "" }); };
  const saveItem = () => {
    if (!draft) return;
    const next = [...data.items];
    if (editIdx === -1) next.push(draft); else next[editIdx!] = draft;
    onChange({ ...data, items: next }); setEditIdx(null); setDraft(null);
  };

  if (draft !== null && editIdx !== null) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{editIdx === -1 ? "Add Press Item" : "Edit Press Item"}</h4>
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
        </div>
        <TextField label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} multiline />
        <TextField label="Source" value={draft.source} onChange={(v) => setDraft({ ...draft, source: v })} />
        <TextField label="Date" value={draft.date} onChange={(v) => setDraft({ ...draft, date: v })} placeholder="Jan 2024" />
        <TextField label="Excerpt" value={draft.excerpt} onChange={(v) => setDraft({ ...draft, excerpt: v })} multiline />
        <TextField label="URL" value={draft.url} onChange={(v) => setDraft({ ...draft, url: v })} />
        <TextField label="Cover Image URL (optional)" value={draft.image ?? ""} onChange={(v) => setDraft({ ...draft, image: v || undefined })} />
        <TextField label="Language (EN / ES)" value={draft.lang ?? ""} onChange={(v) => setDraft({ ...draft, lang: v || undefined })} placeholder="EN" />
        <div className="flex gap-2 justify-end">
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
          <button onClick={saveItem} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <SectionMeta data={data as unknown as Record<string, string>} onChange={(key, v) => onChange({ ...data, [key]: v })} fields={[
        { key: "sectionLabel", label: "Section Label" },
        { key: "heading", label: "Heading" },
        { key: "subtitle", label: "Subtitle", multiline: true },
        { key: "readArticle", label: "\"Read Article\" link text" },
        { key: "featuredIn", label: "\"Featured In\" label text" },
      ]} />
      <ItemList items={data.items} onAdd={openAdd} onEdit={openEdit} onDelete={(i) => onChange({ ...data, items: data.items.filter((_, j) => j !== i) })} renderTitle={(p) => `${p.source} — ${p.title.slice(0, 50)}`} />
    </div>
  );
}

type TimelineEvent = Dictionary["timelinePage"]["events"][number];

function TimelineEditor({ data, onChange }: { data: Dictionary["timelinePage"]; onChange: (d: Dictionary["timelinePage"]) => void }) {
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState<TimelineEvent | null>(null);

  const openEdit = (i: number) => { setEditIdx(i); setDraft({ ...data.events[i], tags: [...(data.events[i].tags ?? [])], bullets: [...(data.events[i].bullets ?? [])] }); };
  const openAdd = () => { setEditIdx(-1); setDraft({ type: "work", title: "", subtitle: "", location: "", period: "", startDate: "", tags: [], bullets: [] }); };
  const saveItem = () => {
    if (!draft) return;
    const next = [...data.events];
    if (editIdx === -1) next.push(draft); else next[editIdx!] = draft;
    // Keep events ordered most recent first, so new entries don't land at the bottom.
    onChange({ ...data, events: sortByMostRecent(next) }); setEditIdx(null); setDraft(null);
  };

  if (draft !== null && editIdx !== null) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{editIdx === -1 ? "Add Event" : "Edit Event"}</h4>
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="p-1 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Type</label>
          <select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as TimelineEvent["type"] })} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            {["work", "education", "exchange", "award", "certification", "press"].map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <TextField label="Title" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
        <TextField label="Subtitle (company / institution)" value={draft.subtitle} onChange={(v) => setDraft({ ...draft, subtitle: v })} />
        <TextField label="Location" value={draft.location} onChange={(v) => setDraft({ ...draft, location: v })} />
        <TextField label="Period (display)" value={draft.period} onChange={(v) => setDraft({ ...draft, period: v })} placeholder="Jan 2024 – Present" />
        <div className="grid grid-cols-2 gap-3">
          <TextField label="Start Date (YYYY-MM)" value={draft.startDate} onChange={(v) => setDraft({ ...draft, startDate: v })} placeholder="2024-01" />
          <TextField label="End Date (optional)" value={draft.endDate ?? ""} onChange={(v) => setDraft({ ...draft, endDate: v || undefined })} placeholder="2024-06" />
        </div>
        <TextField label="Description (optional)" value={draft.description ?? ""} onChange={(v) => setDraft({ ...draft, description: v || undefined })} multiline />
        <BulletsField label="Bullets (optional)" value={draft.bullets ?? []} onChange={(v) => setDraft({ ...draft, bullets: v.length ? v : undefined })} />
        <TextField label="Logo key (optional)" value={draft.logo ?? ""} onChange={(v) => setDraft({ ...draft, logo: v || undefined })} placeholder="microsoft" />
        <TextField label="Logo background (optional)" value={draft.logoBg ?? ""} onChange={(v) => setDraft({ ...draft, logoBg: v || undefined })} placeholder="#ffffff" />
        <TagsField label="Tags" value={draft.tags ?? []} onChange={(v) => setDraft({ ...draft, tags: v.length ? v : undefined })} />
        <div className="flex gap-2 justify-end">
          <button onClick={() => { setEditIdx(null); setDraft(null); }} className="px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">Cancel</button>
          <button onClick={saveItem} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">Save</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3 pb-4 mb-4 border-b border-border">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Page Labels</p>
        <TextField label="Page Title" value={data.title} onChange={(v) => onChange({ ...data, title: v })} />
        <TextField label="Subtitle" value={data.subtitle} onChange={(v) => onChange({ ...data, subtitle: v })} />
        <TextField label="Back to Home text" value={data.backToHome} onChange={(v) => onChange({ ...data, backToHome: v })} />
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(data.filters) as Array<keyof typeof data.filters>).map((k) => (
            <TextField key={k} label={`Filter: ${k}`} value={data.filters[k]} onChange={(v) => onChange({ ...data, filters: { ...data.filters, [k]: v } })} />
          ))}
        </div>
      </div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timeline Events ({data.events.length})</p>
      <ItemList
        items={data.events}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={(i) => onChange({ ...data, events: data.events.filter((_, j) => j !== i) })}
        renderTitle={(e) => `[${e.type}] ${e.title} — ${e.period}`}
      />
    </div>
  );
}

function EducationEditor({ data, onChange }: { data: Dictionary["education"]; onChange: (d: Dictionary["education"]) => void }) {
  return (
    <div className="space-y-4">
      <SectionMeta data={data as unknown as Record<string, string>} onChange={(key, v) => onChange({ ...data, [key]: v })} fields={[{ key: "sectionLabel", label: "Section Label" }, { key: "heading", label: "Heading" }]} />

      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Schools</p>
      <div className="space-y-3">
        {data.schools.map((school, i) => (
          <div key={i} className="p-3 rounded-lg border border-border bg-background space-y-2">
            <p className="text-xs font-medium text-primary">{school.school || `School ${i + 1}`}</p>
            <div className="grid grid-cols-2 gap-2">
              <TextField label="School" value={school.school} onChange={(v) => { const next = [...data.schools]; next[i] = { ...next[i], school: v }; onChange({ ...data, schools: next }); }} />
              <TextField label="Location" value={school.location} onChange={(v) => { const next = [...data.schools]; next[i] = { ...next[i], location: v }; onChange({ ...data, schools: next }); }} />
            </div>
            <TextField label="Degree" value={school.degree} onChange={(v) => { const next = [...data.schools]; next[i] = { ...next[i], degree: v }; onChange({ ...data, schools: next }); }} />
            <TextField label="Detail" value={school.detail} onChange={(v) => { const next = [...data.schools]; next[i] = { ...next[i], detail: v }; onChange({ ...data, schools: next }); }} />
            <div className="grid grid-cols-2 gap-2">
              <TextField label="Logo key" value={school.logo ?? ""} onChange={(v) => { const next = [...data.schools]; next[i] = { ...next[i], logo: v || undefined }; onChange({ ...data, schools: next }); }} placeholder="e.g. itesm" />
              <TextField label="Logo background" value={school.logoBg ?? ""} onChange={(v) => { const next = [...data.schools]; next[i] = { ...next[i], logoBg: v || undefined }; onChange({ ...data, schools: next }); }} placeholder="#ffffff" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <TextField label="Sort date (YYYY-MM)" value={school.sortDate ?? ""} onChange={(v) => { const next = [...data.schools]; next[i] = { ...next[i], sortDate: v || undefined }; onChange({ ...data, schools: next }); }} placeholder="2018-08" />
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Type</label>
                <select value={school.timelineType ?? "education"} onChange={(e) => { const next = [...data.schools]; next[i] = { ...next[i], timelineType: e.target.value as "education" | "exchange" }; onChange({ ...data, schools: next }); }} className="w-full px-2 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="education">Education</option>
                  <option value="exchange">Exchange</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Award</p>
        <TextField label="Award Title" value={data.award.title} onChange={(v) => onChange({ ...data, award: { ...data.award, title: v } })} />
        <TextField label="Organization" value={data.award.org} onChange={(v) => onChange({ ...data, award: { ...data.award, org: v } })} />
        <TextField label="Description" value={data.award.description} onChange={(v) => onChange({ ...data, award: { ...data.award, description: v } })} multiline />
      </div>

      <div className="pt-4 border-t border-border space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Languages</p>
        <TextField label="Section Heading" value={data.languagesHeading} onChange={(v) => onChange({ ...data, languagesHeading: v })} />
        {data.languages.map((lang, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 p-2 rounded border border-border">
            <TextField label="Language" value={lang.name} onChange={(v) => { const next = [...data.languages]; next[i] = { ...next[i], name: v }; onChange({ ...data, languages: next }); }} />
            <TextField label="Level / Detail" value={lang.detail} onChange={(v) => { const next = [...data.languages]; next[i] = { ...next[i], detail: v }; onChange({ ...data, languages: next }); }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function NavEditor({ data, onChange }: { data: Dictionary["nav"]; onChange: (d: Dictionary["nav"]) => void }) {
  const fields: Array<{ key: keyof Dictionary["nav"]; label: string }> = [
    { key: "experience", label: "Experience label" },
    { key: "skills", label: "Skills label" },
    { key: "education", label: "Education label" },
    { key: "projects", label: "Projects label" },
    { key: "demos", label: "Demos label" },
    { key: "contact", label: "Contact label" },
    { key: "timeline", label: "Timeline label" },
    { key: "toggleMenu", label: "Toggle menu aria-label" },
    { key: "langLabel", label: "Language toggle label (e.g. EN)" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {fields.map(({ key, label }) => (
        <TextField key={key} label={label} value={data[key]} onChange={(v) => onChange({ ...data, [key]: v })} />
      ))}
    </div>
  );
}

function FooterEditor({ data, onChange }: { data: Dictionary["footer"]; onChange: (d: Dictionary["footer"]) => void }) {
  return <TextField label="Copyright text" value={data.copyright} onChange={(v) => onChange({ ...data, copyright: v })} placeholder="Your Name. All rights reserved." />;
}

// ─── Section Config ─────────────────────────────────────────────────────────

const SECTION_CONFIG: Array<{
  key: SectionKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}> = [
  { key: "profile", label: "Profile", icon: User, description: "Name, job title, email, phone, social links — live overrides" },
  { key: "hero", label: "Hero", icon: User, description: "Hero text: subtitle, bio, location, CTA" },
  { key: "experience", label: "Experience", icon: Briefcase, description: "Work history and job entries" },
  { key: "projects", label: "Projects", icon: FolderGit2, description: "Contractor & featured projects" },
  { key: "freelance", label: "Freelance", icon: Link2, description: "Independent freelance work" },
  { key: "skills", label: "Skills", icon: Code2, description: "Skill categories and tech stack" },
  { key: "education", label: "Education", icon: GraduationCap, description: "Schools, degree, award, languages" },
  { key: "diplomas", label: "Diplomas", icon: BookOpen, description: "Certificates and PDF diplomas" },
  { key: "demos", label: "Demos", icon: Play, description: "Video demo entries" },
  { key: "press", label: "Press", icon: Newspaper, description: "Media mentions and articles" },
  { key: "timelinePage", label: "Timeline", icon: Clock, description: "Career timeline events and page labels" },
  { key: "contact", label: "Contact", icon: Mail, description: "Contact section heading and subtitle" },
  { key: "nav", label: "Navigation", icon: Navigation, description: "Nav link labels and language toggle" },
  { key: "footer", label: "Footer", icon: FileText, description: "Copyright text" },
];

// ─── Section Panel ───────────────────────────────────────────────────────────

function SectionPanel({ sectionKey, lang }: { sectionKey: SectionKey; lang: Lang }) {
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
        setHasOverride(JSON.stringify(data.content) !== JSON.stringify(en[sectionKey]));
      }
    } catch { /* fall through */ } finally { setLoading(false); }
  }, [sectionKey, lang]);

  useEffect(() => { fetchContent(); }, [fetchContent]);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true); setStatus("idle");
    try {
      const res = await fetch(`/api/content/${sectionKey}?lang=${lang}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data: ApiResponse = await res.json();
      if (res.ok && data.saved) { setStatus("saved"); setHasOverride(true); setTimeout(() => setStatus("idle"), 2500); }
      else { setStatus("error"); setErrorMsg(data.error ?? "Save failed"); }
    } catch { setStatus("error"); setErrorMsg("Network error"); } finally { setSaving(false); }
  };

  const handleReset = async () => {
    if (!confirm(`Reset "${sectionKey}" to defaults? This removes the Redis override.`)) return;
    setSaving(true);
    try {
      await fetch(`/api/content/${sectionKey}?lang=${lang}`, { method: "DELETE" });
      setContent(en[sectionKey] as Dictionary[SectionKey]);
      setHasOverride(false); setStatus("saved"); setTimeout(() => setStatus("idle"), 2500);
    } catch { setStatus("error"); setErrorMsg("Reset failed"); } finally { setSaving(false); }
  };

  if (loading) return <div className="flex items-center justify-center py-12"><Loader2 className="w-5 h-5 animate-spin text-muted-foreground" /></div>;
  if (!content) return null;

  const renderEditor = () => {
    switch (sectionKey) {
      case "profile": return <ProfileEditor data={content as Dictionary["profile"]} onChange={(d) => setContent(d as Dictionary[SectionKey])} />;
      case "hero": return <HeroEditor data={content as Dictionary["hero"]} onChange={(d) => setContent(d as Dictionary[SectionKey])} />;
      case "experience": return <ExperienceEditor data={content as Dictionary["experience"]} onChange={(d) => setContent(d as Dictionary[SectionKey])} />;
      case "projects": return <ProjectsEditor data={content as Dictionary["projects"]} onChange={(d) => setContent(d as Dictionary[SectionKey])} />;
      case "freelance": return <FreelanceEditor data={content as Dictionary["freelance"]} onChange={(d) => setContent(d as Dictionary[SectionKey])} />;
      case "skills": return <SkillsEditor data={content as Dictionary["skills"]} onChange={(d) => setContent(d as Dictionary[SectionKey])} />;
      case "education": return <EducationEditor data={content as Dictionary["education"]} onChange={(d) => setContent(d as Dictionary[SectionKey])} />;
      case "diplomas": return <DiplomasEditor data={content as Dictionary["diplomas"]} onChange={(d) => setContent(d as Dictionary[SectionKey])} />;
      case "demos": return <DemosEditor data={content as Dictionary["demos"]} onChange={(d) => setContent(d as Dictionary[SectionKey])} />;
      case "press": return <PressEditor data={content as Dictionary["press"]} onChange={(d) => setContent(d as Dictionary[SectionKey])} />;
      case "timelinePage": return <TimelineEditor data={content as Dictionary["timelinePage"]} onChange={(d) => setContent(d as Dictionary[SectionKey])} />;
      case "contact":
        return (
          <div className="space-y-4">
            {(["sectionLabel", "heading", "subtitle"] as const).map((k) => (
              <TextField key={k} label={k === "sectionLabel" ? "Section Label" : k === "heading" ? "Heading" : "Subtitle"} value={(content as Dictionary["contact"])[k]} onChange={(v) => setContent({ ...(content as Dictionary["contact"]), [k]: v } as Dictionary[SectionKey])} multiline={k === "subtitle"} />
            ))}
          </div>
        );
      case "nav": return <NavEditor data={content as Dictionary["nav"]} onChange={(d) => setContent(d as Dictionary[SectionKey])} />;
      case "footer": return <FooterEditor data={content as Dictionary["footer"]} onChange={(d) => setContent(d as Dictionary[SectionKey])} />;
      default: return <p className="text-sm text-muted-foreground py-4 text-center">Edit <code className="font-mono text-xs">lib/i18n/en.ts</code> directly for this section.</p>;
    }
  };

  return (
    <div className="space-y-4">
      {hasOverride && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20 text-xs text-primary">
          <Check className="w-3.5 h-3.5" /> Redis override is active — this content is live
        </div>
      )}
      {renderEditor()}
      <div className="flex items-center gap-2 pt-2 border-t border-border">
        {hasOverride && (
          <button type="button" onClick={handleReset} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-50">
            <RotateCcw className="w-3 h-3" /> Reset to default
          </button>
        )}
        <button type="button" onClick={handleSave} disabled={saving} className="ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
          {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : status === "saved" ? <Check className="w-3 h-3" /> : <Save className="w-3 h-3" />}
          {saving ? "Saving…" : status === "saved" ? "Saved!" : "Save to Redis"}
        </button>
      </div>
      {status === "error" && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errorMsg}
        </div>
      )}
    </div>
  );
}

// ─── Accordion Section ───────────────────────────────────────────────────────

function ContentSection({ config, lang }: { config: typeof SECTION_CONFIG[number]; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const Icon = config.icon;
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 sm:p-5 bg-card hover:bg-secondary/30 transition-colors text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{config.label}</p>
            <p className="text-xs text-muted-foreground">{config.description}</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="p-4 sm:p-5 border-t border-border bg-background">
          <SectionPanel sectionKey={config.key} lang={lang} />
        </div>
      )}
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function ContentEditor() {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Content</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Edit portfolio content. Changes save to Redis and appear within 60 seconds.</p>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg border border-border bg-card">
          {(["en", "es"] as Lang[]).map((l) => (
            <button key={l} onClick={() => setLang(l)} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
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
