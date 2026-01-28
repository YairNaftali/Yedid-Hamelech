// API utility functions for Shiurim backend

const API_BASE = '/api/shiurim';

export interface Shiur {
  id: string;
  title: string;
  speaker: string;
  duration: string;
  category: string;
  folder?: string;
  fileUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const shiurimAPI = {
  // Get all shiurim and folders
  async getAll(): Promise<{ shiurim: Shiur[]; folders: string[] }> {
    const response = await fetch(`${API_BASE}/get`);
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return { shiurim: data.shiurim, folders: data.folders };
  },

  // Authenticate user
  async authenticate(password: string): Promise<{ isAuthenticated: boolean; isAdmin: boolean }> {
    const response = await fetch(`${API_BASE}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await response.json();
    return {
      isAuthenticated: data.isAuthenticated,
      isAdmin: data.isAdmin
    };
  },

  // Create a new shiur
  async create(password: string, shiur: Omit<Shiur, 'id'>): Promise<Shiur> {
    const response = await fetch(`${API_BASE}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, shiur })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.shiur;
  },

  // Update an existing shiur
  async update(password: string, shiur: Shiur): Promise<Shiur> {
    const response = await fetch(`${API_BASE}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, shiur })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.shiur;
  },

  // Delete a shiur
  async delete(password: string, id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, id })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
  },

  // Reorder shiurim
  async reorder(password: string, shiurimOrder: Shiur[]): Promise<void> {
    const response = await fetch(`${API_BASE}/reorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, shiurimOrder })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
  },

  // Add a folder
  async addFolder(password: string, folderName: string): Promise<string[]> {
    const response = await fetch(`${API_BASE}/folders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, action: 'add', folderName })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.folders;
  },

  // Delete a folder
  async deleteFolder(password: string, folderName: string): Promise<string[]> {
    const response = await fetch(`${API_BASE}/folders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, action: 'delete', folderName })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.folders;
  },

  // Get upload URL for file
  async getUploadUrl(password: string, fileName: string, fileType: string): Promise<{ uploadUrl: string; publicUrl: string }> {
    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, fileName, fileType })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return { uploadUrl: data.uploadUrl, publicUrl: data.publicUrl };
  }
};
