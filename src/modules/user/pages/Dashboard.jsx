import React, { useMemo, useState, useEffect } from "react";
import { Search, Heart, Bookmark, Users, AlertCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../shared/utils/api";
import { getUser } from "../../../shared/utils/storage";

// -------------------- Subcomponents --------------------

const TabButton = ({ id, label, icon, active, onClick }) => (
  <button
    onClick={() => onClick(id)}
    aria-pressed={active}
    className={`
      flex items-center gap-1 px-3 py-2 rounded-lg transition-all text-xs sm:text-sm
      ${
        active
          ? "bg-primary text-white shadow-sm"
          : "bg-tertiarybackground text-tertiary hover:bg-primary/20 border border-transparent"
      }
    `}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const RemedyCard = ({
  remedy,
  onLike,
  onSave,
  isSaved,
  isSaving,
  isLiked,
  isLiking,
}) => (
  <div className="bg-tertiarybackground border border-secondarybackground rounded-lg p-4 hover:shadow-md transition-shadow">
    <h3 className="font-montserrat font-semibold text-sm sm:text-base text-tertiary">
      {remedy.title}
    </h3>
    <p className="text-xs text-secondarybackground mt-1">{remedy.category}</p>

    <div className="flex justify-between items-center mt-4">
      <button
        onClick={() => onLike?.(remedy._id)}
        aria-label={`Like ${remedy.title}`}
        disabled={isLiking}
        className={`flex items-center gap-1 transition-colors text-xs ${
          isLiked ? "text-primary" : "text-accent hover:text-primary"
        } ${isLiking ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <Heart size={14} />
        {isLiking ? "Updating..." : isLiked ? "Liked" : "Like"}
      </button>
      <button
        onClick={() => onSave?.(remedy._id)}
        aria-label={`Save ${remedy.title}`}
        disabled={isSaving}
        className={`flex items-center gap-1 transition-colors text-xs ${
          isSaved
            ? "text-primary"
            : "text-tertiary hover:text-primary"
        } ${isSaving ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <Bookmark size={14} />
        {isSaving ? "Saving..." : isSaved ? "Saved" : "Save"}
      </button>
    </div>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center text-secondarybackground py-8">
    <AlertCircle size={20} className="mb-2" />
    <p className="text-xs">{message}</p>
  </div>
);

const Toast = ({ toast }) => (
  <div
    className={`fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm text-white ${
      toast.type === "success" ? "bg-green-600" : "bg-red-600"
    }`}
  >
    {toast.message}
  </div>
);

const SavedItem = ({ remedy, onRemove, isRemoving }) => (
  <div className="bg-tertiarybackground border border-secondarybackground rounded-lg p-3 text-xs sm:text-sm flex justify-between items-center">
    <span className="font-medium">{remedy.title}</span>
    <button
      onClick={() => onRemove?.(remedy._id)}
      disabled={isRemoving}
      className={`text-primary hover:underline ${isRemoving ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {isRemoving ? "Removing..." : "Remove"}
    </button>
  </div>
);

const FollowingItem = ({ herbalist, onUnfollow }) => (
  <div className="bg-tertiarybackground border border-secondarybackground rounded-lg p-3 text-xs sm:text-sm flex justify-between items-center">
    <span className="font-medium">{herbalist.name}</span>
    <button
      onClick={() => onUnfollow?.(herbalist._id)}
      className="text-primary hover:underline"
    >
      Unfollow
    </button>
  </div>
);

const normalizeRemedy = (remedy) => ({
  ...remedy,
  _id: remedy?._id || remedy?.id,
  title: remedy?.title || remedy?.name || "Untitled remedy",
});
const PAGE_SIZE = 12;

// -------------------- Main Component --------------------

function UserDashboard() {
  const navigate = useNavigate();
  const [user] = useState(() => getUser());
  const [activeSection, setActiveSection] = useState("discovery");
  const [remedies, setRemedies] = useState([]);
  const [savedRemedies, setSavedRemedies] = useState([]);
  const [followedHerbalists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [remediesLoading, setRemediesLoading] = useState(false);
  const [remediesPage, setRemediesPage] = useState(1);
  const [remediesTotalPages, setRemediesTotalPages] = useState(1);
  const [remediesError, setRemediesError] = useState("");
  const [savedError, setSavedError] = useState("");
  const [savingById, setSavingById] = useState({});
  const [likingById, setLikingById] = useState({});
  const [likedRemedyIds, setLikedRemedyIds] = useState(() => new Set());
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeSection]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setRemediesPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    let isMounted = true;

    const fetchRemedies = async () => {
      setRemediesLoading(true);
      try {
        const res = await api.get("/remedies", {
          params: {
            page: remediesPage,
            limit: PAGE_SIZE,
            ...(debouncedSearch ? { search: debouncedSearch } : {}),
          },
        });
        const list = Array.isArray(res?.data?.data) ? res.data.data : [];
        const totalPages = Number(res?.data?.pagination?.totalPages) || 1;

        if (isMounted) {
          setRemedies(list.map(normalizeRemedy));
          setRemediesTotalPages(Math.max(1, totalPages));
          setRemediesError("");
        }
      } catch {
        if (isMounted) {
          setRemedies([]);
          setRemediesTotalPages(1);
          setRemediesError("Unable to load remedies right now.");
        }
      } finally {
        if (isMounted) {
          setRemediesLoading(false);
        }
      }
    };

    fetchRemedies();

    return () => {
      isMounted = false;
    };
  }, [remediesPage, debouncedSearch]);

  useEffect(() => {
    let isMounted = true;

    const fetchSavedRemedies = async () => {
      try {
        const res = await api.get("/saved-remedies");
        const savedEntries = Array.isArray(res?.data?.data) ? res.data.data : [];
        const list = savedEntries
          .map((entry) => normalizeRemedy(entry?.remedy))
          .filter((remedy) => Boolean(remedy?._id));

        if (isMounted) {
          setSavedRemedies(list);
          setSavedError("");
        }
      } catch {
        if (isMounted) {
          setSavedRemedies([]);
          setSavedError("Unable to load saved remedies right now.");
        }
      }
    };

    fetchSavedRemedies();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleTabChange = (sectionId) => {
    setLoading(true);
    setActiveSection(sectionId);
  };

  const handleSave = async (id) => {
    if (!id || savingById[id]) return;

    setSavingById((prev) => ({ ...prev, [id]: true }));
    try {
      if (savedRemedyIds.has(id)) {
        await api.delete(`/saved-remedies/${id}`);
        setSavedRemedies((prev) => prev.filter((item) => item._id !== id));
        showToast("Removed from saved remedies.");
      } else {
        await api.post(`/saved-remedies/${id}`);
        const remedy = remedies.find((item) => item._id === id);
        if (remedy) {
          setSavedRemedies((prev) =>
            prev.some((item) => item._id === id) ? prev : [remedy, ...prev]
          );
        }
        showToast("Remedy saved successfully.");
      }
      setSavedError("");
    } catch {
      setSavedError("Unable to update saved remedies.");
      showToast("Unable to update saved remedies.", "error");
    } finally {
      setSavingById((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleRemoveSaved = async (id) => {
    if (!id || savingById[id]) return;

    setSavingById((prev) => ({ ...prev, [id]: true }));
    try {
      await api.delete(`/saved-remedies/${id}`);
      setSavedRemedies((prev) => prev.filter((item) => item._id !== id));
      setSavedError("");
      showToast("Removed from saved remedies.");
    } catch {
      setSavedError("Unable to remove saved remedy.");
      showToast("Unable to remove saved remedy.", "error");
    } finally {
      setSavingById((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleLike = async (id) => {
    if (!id || likingById[id]) return;

    const currentlyLiked = likedRemedyIds.has(id);
    setLikingById((prev) => ({ ...prev, [id]: true }));

    try {
      if (currentlyLiked) {
        await api.delete(`/likes/${id}`);
        setLikedRemedyIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        setRemedies((prev) =>
          prev.map((item) =>
            item._id === id
              ? { ...item, likesCount: Math.max(0, (item.likesCount || 0) - 1) }
              : item
          )
        );
      } else {
        await api.post(`/likes/${id}`);
        setLikedRemedyIds((prev) => {
          const next = new Set(prev);
          next.add(id);
          return next;
        });
        setRemedies((prev) =>
          prev.map((item) =>
            item._id === id
              ? { ...item, likesCount: (item.likesCount || 0) + 1 }
              : item
          )
        );
      }
    } catch (error) {
      const message = error?.response?.data?.message || "";

      if (!currentlyLiked && /already liked/i.test(message)) {
        setLikedRemedyIds((prev) => {
          const next = new Set(prev);
          next.add(id);
          return next;
        });
      } else if (currentlyLiked && /have not liked/i.test(message)) {
        setLikedRemedyIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      } else {
        showToast("Unable to update like status.", "error");
      }
    } finally {
      setLikingById((prev) => ({ ...prev, [id]: false }));
    }
  };
  const handleUnfollow = (id) => console.log("Unfollow herbalist", id);

  // Logout function
  const handleLogout = () => {
    // Clear user data from storage
    localStorage.removeItem("user"); // adjust key as needed
    sessionStorage.removeItem("user");
    // Redirect to home page
    navigate("/");
  };

  const profileEntries = useMemo(() => {
    if (!user) return [];
    return Object.entries(user)
      .filter(([key, value]) => {
        if (value === undefined || value === null) return false;
        const lowerKey = key.toLowerCase();
        return (
          lowerKey !== "password" &&
          lowerKey !== "accesstoken" &&
          lowerKey !== "refreshtoken"
        );
      })
      .map(([key, value]) => {
        const label = key
          .replace(/[_-]+/g, " ")
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .replace(/\b\w/g, (match) => match.toUpperCase());
        const displayValue =
          typeof value === "object" ? JSON.stringify(value) : String(value);
        return { label, value: displayValue };
      });
  }, [user]);

  const tabs = [
    { id: "discovery", label: "Discover", icon: <Search size={14} /> },
    { id: "saved", label: "Saved", icon: <Bookmark size={14} /> },
    { id: "engagement", label: "Engagement", icon: <Heart size={14} /> },
    { id: "following", label: "Following", icon: <Users size={14} /> },
  ];

  const displayName =
    user?.name || user?.username || user?.email || "User";

  const savedRemedyIds = useMemo(
    () => new Set(savedRemedies.map((item) => item._id)),
    [savedRemedies]
  );

  return (
    <div className="min-h-screen bg-primarybackground font-poppins text-tertiary">
      {/* Header with logout button */}
      <header className="bg-tertiarybackground border-b border-secondarybackground px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center">
        <h1 className="text-2xl font-montserrat font-semibold">
          {displayName} Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-secondarybackground bg-tertiarybackground overflow-x-auto whitespace-nowrap px-4 py-2 sm:px-6 sm:py-3">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              active={activeSection === tab.id}
              onClick={handleTabChange}
            />
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-4 sm:p-6 space-y-6">
        <section className="bg-tertiarybackground border border-secondarybackground rounded-lg p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="font-montserrat font-semibold text-base sm:text-lg">
                Your Profile
              </h2>
              <p className="text-xs text-secondarybackground">
                Signed in as {displayName}
              </p>
            </div>
          </div>

          {profileEntries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
              {profileEntries.map((entry) => (
                <div
                  key={entry.label}
                  className="bg-primarybackground border border-secondarybackground rounded-lg p-3 text-xs sm:text-sm"
                >
                  <p className="text-secondarybackground uppercase text-[10px]">
                    {entry.label}
                  </p>
                  <p className="mt-1 font-medium break-words">{entry.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4">
              <EmptyState message="No user details found. Please log in again." />
            </div>
          )}
        </section>

        {loading ? (
          <EmptyState message="Loading content..." />
        ) : (
          <>
            {activeSection === "discovery" && (
              <section>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                  <h2 className="font-montserrat font-semibold text-base sm:text-lg">
                    All Remedies
                  </h2>
                  <div className="relative w-full sm:w-64">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-secondarybackground"
                    />
                    <input
                      type="text"
                      placeholder="Search remedies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search remedies"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-secondarybackground rounded-lg bg-tertiarybackground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {remediesLoading ? (
                    <EmptyState message="Loading remedies..." />
                  ) : remedies.length > 0 ? (
                    remedies.map((remedy) => (
                      <RemedyCard
                        key={remedy._id}
                        remedy={remedy}
                        onLike={handleLike}
                        onSave={handleSave}
                        isSaved={savedRemedyIds.has(remedy._id)}
                        isSaving={Boolean(savingById[remedy._id])}
                        isLiked={likedRemedyIds.has(remedy._id)}
                        isLiking={Boolean(likingById[remedy._id])}
                      />
                    ))
                  ) : (
                    <EmptyState
                      message={
                        remediesError ||
                        (searchQuery.trim()
                          ? "No remedies match your search."
                          : "No remedies to display.")
                      }
                    />
                  )}
                </div>

                {!remediesLoading && remediesTotalPages > 1 && (
                  <div className="mt-5 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setRemediesPage((p) => Math.max(1, p - 1))}
                      disabled={remediesPage <= 1}
                      className={`px-3 py-1 rounded border text-xs sm:text-sm ${
                        remediesPage <= 1
                          ? "opacity-50 cursor-not-allowed border-secondarybackground"
                          : "border-secondarybackground hover:bg-primary/10"
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-xs sm:text-sm text-secondarybackground">
                      Page {remediesPage} of {remediesTotalPages}
                    </span>
                    <button
                      onClick={() =>
                        setRemediesPage((p) => Math.min(remediesTotalPages, p + 1))
                      }
                      disabled={remediesPage >= remediesTotalPages}
                      className={`px-3 py-1 rounded border text-xs sm:text-sm ${
                        remediesPage >= remediesTotalPages
                          ? "opacity-50 cursor-not-allowed border-secondarybackground"
                          : "border-secondarybackground hover:bg-primary/10"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </section>
            )}

            {activeSection === "saved" && (
              <section>
                <h2 className="font-montserrat font-semibold text-base sm:text-lg mb-4">
                  Saved Remedies
                </h2>
                <div className="space-y-2">
                  {savedRemedies.length > 0 ? (
                    savedRemedies.map((remedy) => (
                      <SavedItem
                        key={remedy._id}
                        remedy={remedy}
                        onRemove={handleRemoveSaved}
                        isRemoving={Boolean(savingById[remedy._id])}
                      />
                    ))
                  ) : (
                    <EmptyState message={savedError || "No saved remedies yet."} />
                  )}
                </div>
              </section>
            )}

            {activeSection === "engagement" && (
              <section>
                <h2 className="font-montserrat font-semibold text-base sm:text-lg mb-4">
                  Your Engagement
                </h2>
                <EmptyState message="View your liked remedies and comments here." />
              </section>
            )}

            {activeSection === "following" && (
              <section>
                <h2 className="font-montserrat font-semibold text-base sm:text-lg mb-4">
                  Followed Herbalists
                </h2>
                <div className="space-y-2">
                  {followedHerbalists.length > 0 ? (
                    followedHerbalists.map((herbalist) => (
                      <FollowingItem
                        key={herbalist._id}
                        herbalist={herbalist}
                        onUnfollow={handleUnfollow}
                      />
                    ))
                  ) : (
                    <EmptyState message="You are not following any herbalists yet." />
                  )}
                </div>
              </section>
            )}
          </>
        )}
      </main>
      {toast && <Toast toast={toast} />}
    </div>
  );
}

export default UserDashboard;
