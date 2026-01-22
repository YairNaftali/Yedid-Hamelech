
import React, { useState, useEffect } from 'react';

interface Shiur {
  id: string;
  title: string;
  speaker: string;
  duration: string;
  category: string;
  folder?: string;
}

const Shiurim: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingShiur, setEditingShiur] = useState<Shiur | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('All');
  const [showFolderManager, setShowFolderManager] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [uploadData, setUploadData] = useState({
    title: '',
    speaker: '',
    category: '',
    folder: '',
    file: null as File | null
  });

  const UPLOAD_PASSWORD = 'YedidHamelech2025';
  const ADMIN_PASSWORD = 'Admin2025';

  const defaultShiurim: Shiur[] = [
    { id: '1', title: "Meseches Gittin: Iyun on 2a", speaker: "Rov Yonatan Dorfman", duration: "45:00", category: "Iyun", folder: "General" },
    { id: '2', title: "Hashkafa: Building a Jewish Home", speaker: "Rov Binyamin Dennis", duration: "32:15", category: "Hashkafa", folder: "General" },
    { id: '3', title: "Halacha: Hilchos Shabbos Overview", speaker: "Rov Yonatan Dorfman", duration: "58:40", category: "Halacha", folder: "General" },
  ];

  const [latestShiurim, setLatestShiurim] = useState<Shiur[]>([]);
  const [folders, setFolders] = useState<string[]>(['General']);

  useEffect(() => {
    const stored = localStorage.getItem('yeshiva-shiurim');
    const storedFolders = localStorage.getItem('yeshiva-folders');
    if (stored) {
      setLatestShiurim(JSON.parse(stored));
    } else {
      setLatestShiurim(defaultShiurim);
    }
    if (storedFolders) {
      setFolders(JSON.parse(storedFolders));
    }
  }, []);

  const saveShiurim = (shiurim: Shiur[]) => {
    setLatestShiurim(shiurim);
    localStorage.setItem('yeshiva-shiurim', JSON.stringify(shiurim));
  };

  const saveFolders = (newFolders: string[]) => {
    setFolders(newFolders);
    localStorage.setItem('yeshiva-folders', JSON.stringify(newFolders));
  };

  const addFolder = () => {
    if (newFolderName.trim() && !folders.includes(newFolderName.trim())) {
      const updated = [...folders, newFolderName.trim()];
      saveFolders(updated);
      setNewFolderName('');
    }
  };

  const deleteFolder = (folderName: string) => {
    if (folderName === 'General') {
      alert('Cannot delete the General folder');
      return;
    }
    if (confirm(`Delete folder "${folderName}"? Shiurim in this folder will be moved to General.`)) {
      const updated = folders.filter(f => f !== folderName);
      saveFolders(updated);
      // Move shiurim from deleted folder to General
      const updatedShiurim = latestShiurim.map(s => 
        s.folder === folderName ? { ...s, folder: 'General' } : s
      );
      saveShiurim(updatedShiurim);
      if (selectedFolder === folderName) {
        setSelectedFolder('All');
      }
    }
  };

  const filteredShiurim = selectedFolder === 'All' 
    ? latestShiurim 
    : latestShiurim.filter(s => s.folder === selectedFolder);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === UPLOAD_PASSWORD || password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      if (password === ADMIN_PASSWORD) {
        setIsAdmin(true);
      }
    } else {
      alert('Incorrect password');
      setPassword('');
    }
  };

  const handleEditShiur = (shiur: Shiur) => {
    setEditingShiur(shiur);
  };

  const handleUpdateShiur = () => {
    if (editingShiur) {
      const updated = latestShiurim.map(s => s.id === editingShiur.id ? editingShiur : s);
      saveShiurim(updated);
      setEditingShiur(null);
    }
  };

  const handleDeleteShiur = (id: string) => {
    if (confirm('Are you sure you want to delete this shiur?')) {
      const filtered = latestShiurim.filter(s => s.id !== id);
      saveShiurim(filtered);
    }
  };

  const moveShiurUp = (index: number) => {
    if (index === 0) return;
    const newShiurim = [...latestShiurim];
    [newShiurim[index - 1], newShiurim[index]] = [newShiurim[index], newShiurim[index - 1]];
    saveShiurim(newShiurim);
  };

  const moveShiurDown = (index: number) => {
    if (index === latestShiurim.length - 1) return;
    const newShiurim = [...latestShiurim];
    [newShiurim[index], newShiurim[index + 1]] = [newShiurim[index + 1], newShiurim[index]];
    saveShiurim(newShiurim);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the actual file upload to your server
    alert('Shiur uploaded successfully! (This is a demo - connect to your backend)');
    setShowUploadModal(false);
    setIsAuthenticated(false);
    setIsAdmin(false);
    setPassword('');
    setUploadData({ title: '', speaker: '', category: '', folder: '', file: null });
  };

  return (
    <div className="py-16 bg-[#F8F5F0]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-16">
          <h1 className="text-5xl text-[#2C3E50]">Shiurim</h1>
          {isAdmin && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowFolderManager(true)}
                className="bg-[#C9963F] text-white px-6 py-2 rounded-sm text-sm font-semibold hover:bg-[#b8853a] transition-all uppercase tracking-wider"
              >
                Manage Folders
              </button>
              <button
                onClick={() => {
                  setIsAdmin(false);
                  setIsAuthenticated(false);
                }}
                className="bg-gray-500 text-white px-6 py-2 rounded-sm text-sm font-semibold hover:bg-gray-600 transition-all uppercase tracking-wider"
              >
                Exit Admin Mode
              </button>
            </div>
          )}
        </div>

        {/* Folder Navigation */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedFolder('All')}
            className={`px-4 py-2 rounded-sm font-semibold transition-all ${
              selectedFolder === 'All'
                ? 'bg-[#7D1D3F] text-white'
                : 'bg-white text-[#7D1D3F] hover:bg-gray-50'
            }`}
          >
            📁 All Shiurim ({latestShiurim.length})
          </button>
          {folders.map(folder => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`px-4 py-2 rounded-sm font-semibold transition-all ${
                selectedFolder === folder
                  ? 'bg-[#7D1D3F] text-white'
                  : 'bg-white text-[#7D1D3F] hover:bg-gray-50'
              }`}
            >
              📁 {folder} ({latestShiurim.filter(s => s.folder === folder).length})
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Audio Library Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl mb-8 flex items-center gap-2 text-[#2C3E50]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
              {selectedFolder === 'All' ? 'Latest Audio Shiurim' : `${selectedFolder} Shiurim`}
            </h2>
            <div className="space-y-4">
              {filteredShiurim.map((shiur, idx) => (
                <div key={shiur.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-4 items-center flex-1">
                      <button className="w-12 h-12 bg-[#7D1D3F] text-white rounded-full flex items-center justify-center hover:bg-[#C9963F] transition-colors flex-shrink-0">
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4.5 3.5v13L16 10l-11.5-6.5z"/></svg>
                      </button>
                      <div className="flex-1">
                        <h4 className="font-bold text-[#2C3E50]">{shiur.title}</h4>
                        <p className="text-sm text-gray-500">{shiur.speaker} • {shiur.duration}</p>
                        {shiur.folder && <p className="text-xs text-gray-400 mt-1">📁 {shiur.folder}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase bg-[#F8F5F0] px-3 py-1 rounded text-[#C9963F] font-bold">{shiur.category}</span>
                      {isAdmin && (
                        <div className="flex gap-1 ml-2">
                          <button
                            onClick={() => moveShiurUp(idx)}
                            disabled={idx === 0}
                            className="p-2 text-gray-600 hover:text-[#7D1D3F] disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move up"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
                          </button>
                          <button
                            onClick={() => moveShiurDown(idx)}
                            disabled={idx === latestShiurim.length - 1}
                            className="p-2 text-gray-600 hover:text-[#7D1D3F] disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move down"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                          </button>
                          <button
                            onClick={() => handleEditShiur(shiur)}
                            className="p-2 text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                          </button>
                          <button
                            onClick={() => handleDeleteShiur(shiur.id)}
                            className="p-2 text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-8 border-2 border-dashed border-[#E8DFD6] rounded-lg text-center bg-white">
              <svg className="w-12 h-12 mx-auto mb-4 text-[#7D1D3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600 mb-4 font-medium">Submit a shiur recording</p>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="bg-[#7D1D3F] text-white px-8 py-3 rounded-sm font-semibold hover:bg-[#9B5027] transition-all uppercase text-xs tracking-wider shadow-sm"
              >
                Upload Shiur
              </button>
            </div>
          </div>

          {/* YouTube Section */}
          <div className="bg-[#2C3E50] text-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/></svg>
              YouTube Live Uploads
            </h2>
            <p className="text-sm text-gray-400 mb-8 leading-relaxed">Catch our latest video recordings directly from the Yeshiva's YouTube channel.</p>
            
            <div className="aspect-video bg-gray-800 rounded mb-6 overflow-hidden">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed?listType=user_uploads&list=YeshivasYedidHaMelech"
                title="Latest Yeshiva Videos"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <a 
              href="https://www.youtube.com/@YeshivasYedidHaMelech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-center border border-[#C9963F] text-[#C9963F] py-3 rounded hover:bg-[#C9963F] hover:text-white transition-colors"
            >
              Browse Full Channel
            </a>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 relative">
            <button
              onClick={() => {
                setShowUploadModal(false);
                setIsAuthenticated(false);
                setPassword('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!isAuthenticated ? (
              <form onSubmit={handlePasswordSubmit}>
                <h3 className="text-2xl serif font-semibold text-[#2C3E50] mb-6">Staff Access Required</h3>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-[#eaeaea] rounded-sm focus:outline-none focus:border-[#1a5f7a] transition-colors"
                    placeholder="Staff password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#7D1D3F] text-white py-3 rounded-sm font-semibold hover:bg-[#9B5027] transition-all uppercase text-xs tracking-wider"
                >
                  Verify Access
                </button>
              </form>
            ) : (
              <form onSubmit={handleUploadSubmit}>
                <h3 className="text-2xl serif font-semibold text-[#0F1729] mb-6">Upload Shiur</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shiur Title</label>
                    <input
                      type="text"
                      value={uploadData.title}
                      onChange={(e) => setUploadData({...uploadData, title: e.target.value})}
                      className="w-full px-4 py-3 border border-[#eaeaea] rounded-sm focus:outline-none focus:border-[#1a5f7a] transition-colors"
                      placeholder="e.g., Meseches Gittin: Iyun on 2a"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Speaker</label>
                    <input
                      type="text"
                      value={uploadData.speaker}
                      onChange={(e) => setUploadData({...uploadData, speaker: e.target.value})}
                      className="w-full px-4 py-3 border border-[#eaeaea] rounded-sm focus:outline-none focus:border-[#1a5f7a] transition-colors"
                      placeholder="e.g., Rov Yonatan Dorfman"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={uploadData.category}
                      onChange={(e) => setUploadData({...uploadData, category: e.target.value})}
                      className="w-full px-4 py-3 border border-[#eaeaea] rounded-sm focus:outline-none focus:border-[#1a5f7a] transition-colors"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="Iyun">Iyun</option>
                      <option value="Bekiyus">Bekiyus</option>
                      <option value="Halacha">Halacha</option>
                      <option value="Hashkafa">Hashkafa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Folder</label>
                    <select
                      value={uploadData.folder}
                      onChange={(e) => setUploadData({...uploadData, folder: e.target.value})}
                      className="w-full px-4 py-3 border border-[#eaeaea] rounded-sm focus:outline-none focus:border-[#1a5f7a] transition-colors"
                      required
                    >
                      <option value="">Select folder</option>
                      {folders.map(folder => (
                        <option key={folder} value={folder}>{folder}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Audio File</label>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => setUploadData({...uploadData, file: e.target.files?.[0] || null})}
                      className="w-full px-4 py-3 border border-[#eaeaea] rounded-sm focus:outline-none focus:border-[#1a5f7a] transition-colors"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-[#7D1D3F] text-white py-3 rounded-sm font-semibold hover:bg-[#9B5027] transition-all uppercase text-xs tracking-wider"
                >
                  Upload Shiur
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Edit Shiur Modal */}
      {editingShiur && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 relative">
            <button
              onClick={() => setEditingShiur(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl serif font-semibold text-[#2C3E50] mb-6">Edit Shiur</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editingShiur.title}
                  onChange={(e) => setEditingShiur({...editingShiur, title: e.target.value})}
                  className="w-full px-4 py-3 border border-[#eaeaea] rounded-sm focus:outline-none focus:border-[#1a5f7a] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Speaker</label>
                <input
                  type="text"
                  value={editingShiur.speaker}
                  onChange={(e) => setEditingShiur({...editingShiur, speaker: e.target.value})}
                  className="w-full px-4 py-3 border border-[#eaeaea] rounded-sm focus:outline-none focus:border-[#1a5f7a] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={editingShiur.duration}
                  onChange={(e) => setEditingShiur({...editingShiur, duration: e.target.value})}
                  className="w-full px-4 py-3 border border-[#eaeaea] rounded-sm focus:outline-none focus:border-[#1a5f7a] transition-colors"
                  placeholder="e.g., 45:00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={editingShiur.category}
                  onChange={(e) => setEditingShiur({...editingShiur, category: e.target.value})}
                  className="w-full px-4 py-3 border border-[#eaeaea] rounded-sm focus:outline-none focus:border-[#1a5f7a] transition-colors"
                >
                  <option value="Iyun">Iyun</option>
                  <option value="Bekiyus">Bekiyus</option>
                  <option value="Halacha">Halacha</option>
                  <option value="Hashkafa">Hashkafa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Folder</label>
                <select
                  value={editingShiur.folder || 'General'}
                  onChange={(e) => setEditingShiur({...editingShiur, folder: e.target.value})}
                  className="w-full px-4 py-3 border border-[#eaeaea] rounded-sm focus:outline-none focus:border-[#1a5f7a] transition-colors"
                >
                  {folders.map(folder => (
                    <option key={folder} value={folder}>{folder}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleUpdateShiur}
              className="w-full mt-6 bg-[#7D1D3F] text-white py-3 rounded-sm font-semibold hover:bg-[#9B5027] transition-all uppercase text-xs tracking-wider"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Folder Manager Modal */}
      {showFolderManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowFolderManager(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl serif font-semibold text-[#2C3E50] mb-6">Manage Folders</h3>
            
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addFolder()}
                  className="flex-1 px-4 py-2 border border-[#eaeaea] rounded-sm focus:outline-none focus:border-[#1a5f7a] transition-colors"
                  placeholder="New folder name"
                />
                <button
                  onClick={addFolder}
                  className="bg-[#7D1D3F] text-white px-6 py-2 rounded-sm font-semibold hover:bg-[#9B5027] transition-all"
                >
                  Add
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {folders.map(folder => (
                  <div key={folder} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#C9963F]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                      </svg>
                      <span className="font-medium text-[#2C3E50]">{folder}</span>
                      <span className="text-sm text-gray-500">
                        ({latestShiurim.filter(s => s.folder === folder).length} shiurim)
                      </span>
                    </div>
                    {folder !== 'General' && (
                      <button
                        onClick={() => deleteFolder(folder)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete folder"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowFolderManager(false)}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-sm font-semibold hover:bg-gray-300 transition-all uppercase text-xs tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shiurim;
