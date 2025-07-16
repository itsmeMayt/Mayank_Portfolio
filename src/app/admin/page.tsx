"use client"

import { useState, useEffect } from "react";

const CATEGORIES = [
  "Motion Graphics",
  "YT Longform",
  "Documentary",
  "Action",
  "Typography",
  "Events",
  "Short Films",
  "Others",
];

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  order?: number; // Added order field
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
    category: CATEGORIES[0],
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<typeof form>(form);

  useEffect(() => {
    fetch('/api/videos')
      .then(res => res.json())
      .then(data => setVideos(Array.isArray(data) ? data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : []));
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthed(true);
    } else {
      setMessage("Incorrect password");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/add-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setMessage("Video added and pushed to GitHub!");
      setForm({ title: "", description: "", thumbnail: "", videoUrl: "", category: CATEGORIES[0] });
      fetch('/api/videos').then(res => res.json()).then(data => setVideos(Array.isArray(data) ? data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : []));
    } else {
      setMessage(data.error || "Failed to add video");
    }
  };

  const handleEdit = (idx: number) => {
    setEditId(videos[idx].id);
    setEditForm({
      title: videos[idx].title,
      description: videos[idx].description,
      thumbnail: videos[idx].thumbnail,
      videoUrl: videos[idx].videoUrl,
      category: videos[idx].category,
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/edit-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editId,
        ...editForm,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setMessage("Video updated!");
      setEditId(null);
      fetch('/api/videos').then(res => res.json()).then(data => setVideos(Array.isArray(data) ? data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : []));
    } else {
      setMessage(data.error || "Failed to update video");
    }
  };

  const handleDelete = async (idx: number) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/delete-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: videos[idx].id }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setMessage("Video deleted!");
      fetch('/api/videos').then(res => res.json()).then(data => setVideos(Array.isArray(data) ? data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : []));
    } else {
      setMessage(data.error || "Failed to delete video");
    }
  };

  const moveVideo = async (idx: number, direction: -1 | 1) => {
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/reorder-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index: idx, direction }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setMessage("Order updated!");
      fetch('/api/videos').then(res => res.json()).then(data => setVideos(Array.isArray(data) ? data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : []));
    } else {
      setMessage(data.error || "Failed to reorder video");
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <form onSubmit={handleAuth} className="bg-dark-light p-8 rounded shadow-md space-y-4">
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          <input
            type="password"
            name="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-dark border border-dark-light focus:border-primary"
            required
          />
          <button type="submit" className="btn btn-primary w-full">Login</button>
          {message && <p className="text-red-500 mt-2">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-dark py-8">
      <form onSubmit={handleSubmit} className="bg-dark-light p-8 rounded shadow-md space-y-4 w-full max-w-md mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Video</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-dark border border-dark-light focus:border-primary"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-dark border border-dark-light focus:border-primary"
          required
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-dark border border-dark-light focus:border-primary"
          required
        />
        <input
          type="text"
          name="videoUrl"
          placeholder="Video URL"
          value={form.videoUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-dark border border-dark-light focus:border-primary"
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-dark border border-dark-light focus:border-primary"
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Adding..." : "Add Video"}
        </button>
        {message && <p className="mt-2 text-center text-primary">{message}</p>}
      </form>

      <div className="w-full max-w-4xl bg-dark-light p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">All Videos</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Order</th>
              <th>Title</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, idx) => (
              <tr key={video.id} className="border-b border-dark">
                <td>
                  <button onClick={() => moveVideo(idx, -1)} disabled={idx === 0} className="mr-1">⬆️</button>
                  <button onClick={() => moveVideo(idx, 1)} disabled={idx === videos.length - 1}>⬇️</button>
                </td>
                <td>{video.title}</td>
                <td>{video.category}</td>
                <td>
                  <button onClick={() => handleEdit(idx)} className="mr-2 text-primary">Edit</button>
                  <button onClick={() => handleDelete(idx)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form onSubmit={handleEditSubmit} className="bg-dark-light p-8 rounded shadow-md space-y-4 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Video</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editForm.title}
              onChange={handleEditChange}
              className="w-full px-4 py-2 rounded bg-dark border border-dark-light focus:border-primary"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={editForm.description}
              onChange={handleEditChange}
              className="w-full px-4 py-2 rounded bg-dark border border-dark-light focus:border-primary"
              required
            />
            <input
              type="text"
              name="thumbnail"
              placeholder="Thumbnail URL"
              value={editForm.thumbnail}
              onChange={handleEditChange}
              className="w-full px-4 py-2 rounded bg-dark border border-dark-light focus:border-primary"
              required
            />
            <input
              type="text"
              name="videoUrl"
              placeholder="Video URL"
              value={editForm.videoUrl}
              onChange={handleEditChange}
              className="w-full px-4 py-2 rounded bg-dark border border-dark-light focus:border-primary"
              required
            />
            <select
              name="category"
              value={editForm.category}
              onChange={handleEditChange}
              className="w-full px-4 py-2 rounded bg-dark border border-dark-light focus:border-primary"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button type="button" className="btn w-full" onClick={() => setEditId(null)}>
                Cancel
              </button>
            </div>
            {message && <p className="mt-2 text-center text-primary">{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
} 