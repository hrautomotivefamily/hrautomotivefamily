"use client";

import Link from "next/link";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { saveCar } from "@/app/admin/actions";
import type { FormState } from "@/lib/form";
import { Icon } from "@/components/Icons";
import { ImageUploader } from "./ImageUploader";
import type { Car } from "@/lib/stock";

function SaveButton({ editing }: { editing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary" disabled={pending}>
      {pending ? "Saving…" : editing ? "Save changes" : "Create listing"}
      <Icon name="check" width={18} height={18} />
    </button>
  );
}

const inputCls =
  "w-full rounded-xl2 border border-hair bg-transparent px-4 py-2.5 text-[15px] outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20";

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder,
  required,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        required={required}
        className={inputCls}
      />
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

function Select({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <select name={name} defaultValue={defaultValue} className={inputCls}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CarForm({ car }: { car?: Car }) {
  const [state, formAction] = useFormState<FormState, FormData>(saveCar, {});
  const editing = !!car;
  const [uploadFolder] = useState(
    () => car?.slug || `new-${Math.random().toString(36).slice(2, 8)}`
  );

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="originalSlug" value={car?.slug ?? ""} />

      {state.error && (
        <p className="flex items-start gap-2 rounded-xl2 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          <Icon name="close" width={16} height={16} className="mt-0.5 shrink-0" />
          {state.error}
        </p>
      )}

      {/* basics */}
      <section className="card-surface rounded-xl2 p-6 shadow-soft">
        <h2 className="font-heading text-lg font-bold">Vehicle</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Make" name="make" defaultValue={car?.make} placeholder="Toyota" required />
          <Field label="Model" name="model" defaultValue={car?.model} placeholder="Aygo" required />
          <div className="sm:col-span-2">
            <Field
              label="Title"
              name="title"
              defaultValue={car?.title}
              placeholder="Toyota Aygo 1.0 VVT-i x-play"
              hint="Leave blank to use “Make Model”. This is the big heading on the listing."
            />
          </div>
          <Field label="Year" name="year" type="number" defaultValue={car?.year} placeholder="2018" required />
          <Field label="Plate age" name="plateAge" defaultValue={car?.plateAge} placeholder="68 reg" />
          <Field label="Price (£)" name="price" type="number" defaultValue={car?.price} placeholder="4395" required />
          <Field
            label="Mileage"
            name="mileage"
            type="number"
            defaultValue={car?.mileage}
            placeholder="e.g. 45000"
            hint="Leave blank to show “On request”."
          />
        </div>
      </section>

      {/* spec */}
      <section className="card-surface rounded-xl2 p-6 shadow-soft">
        <h2 className="font-heading text-lg font-bold">Specification</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Engine" name="engine" defaultValue={car?.engine} placeholder="1.0 VVT-i" />
          <Select label="Transmission" name="transmission" defaultValue={car?.transmission ?? "Manual"} options={["Manual", "Automatic"]} />
          <Select label="Fuel" name="fuel" defaultValue={car?.fuel ?? "Petrol"} options={["Petrol", "Diesel", "Hybrid", "Electric"]} />
          <Field label="Colour" name="colour" defaultValue={car?.colour} placeholder="Red" />
          <Field label="Doors" name="doors" type="number" defaultValue={car?.doors ?? 5} placeholder="5" />
          <Field label="Body style" name="bodyStyle" defaultValue={car?.bodyStyle} placeholder="Hatchback" />
        </div>
      </section>

      {/* details */}
      <section className="card-surface rounded-xl2 p-6 shadow-soft">
        <h2 className="font-heading text-lg font-bold">Listing details</h2>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Overview / description</span>
            <textarea
              name="summary"
              rows={3}
              defaultValue={car?.summary}
              placeholder="A short, honest description of the car…"
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Key features</span>
            <textarea
              name="features"
              rows={4}
              defaultValue={car?.features.join("\n")}
              placeholder={"One per line, e.g.\n12 months MOT\nAir conditioning\nBluetooth"}
              className={inputCls}
            />
            <span className="mt-1 block text-xs text-muted">One feature per line.</span>
          </label>
          <div>
            <span className="mb-1.5 block text-sm font-medium">Photos</span>
            <ImageUploader
              name="images"
              initial={car?.images ?? []}
              folder={uploadFolder}
            />
          </div>
        </div>
      </section>

      {/* status + appearance */}
      <section className="card-surface rounded-xl2 p-6 shadow-soft">
        <h2 className="font-heading text-lg font-bold">Status &amp; display</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Select label="Status" name="status" defaultValue={car?.status ?? "available"} options={["available", "reserved", "sold"]} />
          <Select label="Placeholder colour" name="tone" defaultValue={car?.tone ?? "navy"} options={["navy", "charcoal", "midnight", "slate"]} />
          <Field
            label="URL slug (optional)"
            name="slug"
            defaultValue={car?.slug}
            placeholder="toyota-aygo-x-play-68"
            hint="The web address: /stock/your-slug. Auto-generated if blank."
          />
        </div>
      </section>

      <div className="flex items-center gap-3">
        <SaveButton editing={editing} />
        <Link href="/admin" className="btn-outline">
          Cancel
        </Link>
      </div>
    </form>
  );
}
