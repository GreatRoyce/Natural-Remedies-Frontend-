import React, { useState, useEffect } from "react";
import { Search, Heart, Bookmark, Users, AlertCircle } from "lucide-react";

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

const RemedyCard = ({ remedy, onLike, onSave }) => (
  <div className="bg-tertiarybackground border border-secondarybackground rounded-lg p-4 hover:shadow-md transition-shadow">
    <h3 className="font-montserrat font-semibold text-sm sm:text-base text-tertiary">
      {remedy.title}
    </h3>
    <p className="text-xs text-secondarybackground mt-1">{remedy.category}</p>

    <div className="flex justify-between items-center mt-4">
      <button
        onClick={() => onLike?.(remedy._id)}
        aria-label={`Like ${remedy.title}`}
        className="flex items-center gap-1 text-accent hover:text-primary transition-colors text-xs"
      >
        <Heart size={14} />
        Like
      </button>
      <button
        onClick={() => onSave?.(remedy._id)}
        aria-label={`Save ${remedy.title}`}
        className="flex items-center gap-1 text-tertiary hover:text-primary transition-colors text-xs"
      >
        <Bookmark size={14} />
        Save
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

const SavedItem = ({ remedy }) => (
  <div className="bg-tertiarybackground border border-secondarybackground rounded-lg p-3 text-xs sm:text-sm flex justify-between items-center">
    <span className="font-medium">{remedy.title}</span>
    <button className="text-primary hover:underline">Remove</button>
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

// -------------------- Main Component --------------------

function UserDashboard() {
  const [activeSection, setActiveSection] = useState("discovery");
  const [remedies] = useState([]);
  const [savedRemedies] = useState([]);
  const [followedHerbalists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // simulate API delay
    return () => clearTimeout(timer);
  }, [activeSection]);

  const handleTabChange = (sectionId) => {
    setLoading(true);
    setActiveSection(sectionId);
  };

  const handleLike = (id) => console.log("Like remedy", id);
  const handleSave = (id) => console.log("Save remedy", id);
  const handleUnfollow = (id) => console.log("Unfollow herbalist", id);

  const tabs = [
    { id: "discovery", label: "Discover", icon: <Search size={14} /> },
    { id: "saved", label: "Saved", icon: <Bookmark size={14} /> },
    { id: "engagement", label: "Engagement", icon: <Heart size={14} /> },
    { id: "following", label: "Following", icon: <Users size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-primarybackground font-poppins text-tertiary">
      {/* Header */}
      <header className="bg-tertiarybackground border-b border-secondarybackground px-4 py-3 sm:px-6 sm:py-4">
        <h1 className="text-2xl font-montserrat font-semibold">
          User Dashboard
        </h1>
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
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      aria-label="Search remedies"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-secondarybackground rounded-lg bg-tertiarybackground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {remedies.length > 0 ? (
                    remedies.map((remedy) => (
                      <RemedyCard
                        key={remedy._id}
                        remedy={remedy}
                        onLike={handleLike}
                        onSave={handleSave}
                      />
                    ))
                  ) : (
                    <EmptyState message="No remedies to display." />
                  )}
                </div>
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
                      <SavedItem key={remedy._id} remedy={remedy} />
                    ))
                  ) : (
                    <EmptyState message="No saved remedies yet." />
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
    </div>
  );
}

export default UserDashboard;
