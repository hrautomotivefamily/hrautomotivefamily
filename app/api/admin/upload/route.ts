import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { uploadImage, validateImage } from "@/lib/storage";
import { slugify } from "@/lib/stock";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }

  const form = await request.formData();
  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  const folderRaw = String(form.get("folder") ?? "").trim();
  const folder = slugify(folderRaw) || `tmp-${Date.now().toString(36)}`;

  if (files.length === 0) {
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  }

  const urls: string[] = [];
  for (const file of files) {
    const invalid = validateImage(file);
    if (invalid) {
      return NextResponse.json({ error: invalid }, { status: 400 });
    }
    try {
      urls.push(await uploadImage(folder, file));
    } catch (e) {
      const message = e instanceof Error ? e.message : "Upload failed";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  return NextResponse.json({ urls });
}
