import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/contexts/AuthContext";
import { achievements } from "@/data/mock";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    about: user?.about || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateUser(formData);
      setOpen(false);
    } finally {
      setSaving(false);
    }
  };
  return (
    <>
      <SEO title="Profile" />
      <section className="bg-surface-container-low py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-start gap-8">
          <img src={user?.avatar || "https://i.pravatar.cc/150?img=1"} alt={user?.name} className="w-32 h-32 rounded-2xl object-cover shadow-ambient" />
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-black text-on-surface">{user?.name ?? "Student"}</h1>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <button className="px-3 py-1.5 text-xs font-bold bg-surface-container-high hover:bg-surface-container-highest rounded-lg transition-colors flex items-center gap-1.5">
                    <Icon name="edit" className="text-sm" /> Edit Profile
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full mt-1 bg-surface-container-low rounded-xl px-4 py-2 text-on-surface outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full mt-1 bg-surface-container-low rounded-xl px-4 py-2 text-on-surface outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Avatar URL</label>
                      <input
                        type="url"
                        value={formData.avatar}
                        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                        className="w-full mt-1 bg-surface-container-low rounded-xl px-4 py-2 text-on-surface outline-none focus:ring-2 focus:ring-primary"
                        placeholder="https://example.com/my-image.jpg"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">About Me</label>
                      <textarea
                        value={formData.about}
                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                        className="w-full mt-1 bg-surface-container-low rounded-xl px-4 py-2 text-on-surface outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
                        placeholder="Tell us a little about yourself..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 bg-primary text-on-primary rounded-xl font-bold disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save changes"}
                    </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-on-surface-variant">{user?.email}</p>
            {user?.about && (
              <p className="mt-3 text-sm text-on-surface max-w-2xl">{user.about}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold capitalize">{user?.role || "Student"}</span>
              <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full text-xs font-bold">12-day streak</span>
              {user?.joinedAt && <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-xs font-bold">Joined {user?.joinedAt}</span>}
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <h2 className="text-xl font-black text-on-surface mb-6">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((a) => (
            <div key={a.id} className={`bg-surface-container-lowest rounded-2xl p-5 text-center ${!a.earned ? "opacity-40" : ""}`}>
              <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-fixed text-on-primary-fixed grid place-items-center mb-3">
                <Icon name={a.icon} filled className="text-2xl" />
              </div>
              <p className="font-bold text-sm text-on-surface">{a.title}</p>
              <p className="text-xs text-on-surface-variant mt-1">{a.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
