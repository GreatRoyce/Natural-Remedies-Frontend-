import React, { useState } from "react";
import {
  Users,
  Eye,
  Heart,
  MessageCircle,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

/* -------------------- Reusable Components -------------------- */

const StatCard = ({ label, value, icon }) => (
  <div className="bg-tertiarybackground border border-secondarybackground rounded-lg p-4 flex justify-between items-center">
    <div>
      <p className="text-xs uppercase text-secondarybackground">{label}</p>
      <h3 className="text-2xl font-montserrat font-semibold">{value}</h3>
    </div>
    <div className="text-primary">{icon}</div>
  </div>
);

const SectionCard = ({ title, children, action }) => (
  <div className="bg-tertiarybackground border border-secondarybackground rounded-lg p-4 space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="font-montserrat font-semibold text-sm sm:text-base">
        {title}
      </h2>
      {action}
    </div>
    {children}
  </div>
);

/* -------------------- List Subcomponents -------------------- */

const RecentFollowersList = ({ followers }) => {
  if (followers.length === 0) {
    return <p className="text-xs text-secondarybackground">No followers yet.</p>;
  }

  return (
    <div className="space-y-2">
      {followers.map((follower) => (
        <div
          key={follower._id}
          className="flex justify-between items-center text-xs sm:text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondarybackground" />
            <span>{follower.username}</span>
          </div>
          <span className="text-secondarybackground text-xs">
            {follower.followedAt}
          </span>
        </div>
      ))}
    </div>
  );
};

const TopRemedyDisplay = ({ remedy }) => {
  if (!remedy) {
    return <p className="text-xs text-secondarybackground">No performance data available.</p>;
  }

  return (
    <div className="space-y-2">
      <h3 className="font-montserrat font-semibold text-sm sm:text-base">
        {remedy.name}
      </h3>
      <div className="flex gap-4 text-xs sm:text-sm">
        <span>👁 {remedy.views}</span>
        <span>❤️ {remedy.likesCount}</span>
        <span>💬 {remedy.commentsCount}</span>
      </div>
    </div>
  );
};

const RecentCommentsList = ({ comments }) => {
  if (comments.length === 0) {
    return <p className="text-xs text-secondarybackground">No recent comments.</p>;
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div key={comment._id} className="border-b border-secondarybackground pb-2">
          <p className="text-xs">
            <span className="font-semibold">{comment.user.username}</span> on{" "}
            <span className="italic">{comment.remedyName}</span>
          </p>
          <p className="text-xs text-secondarybackground">{comment.comment}</p>
        </div>
      ))}
    </div>
  );
};

const MyRemediesList = ({ remedies, onDelete }) => {
  if (remedies.length === 0) {
    return <p className="text-xs text-secondarybackground">You haven’t created any remedies yet.</p>;
  }

  return (
    <div className="space-y-3">
      {remedies.map((remedy) => (
        <div
          key={remedy._id}
          className="border border-secondarybackground rounded-lg p-3 flex justify-between items-center text-xs sm:text-sm"
        >
          <div>
            <p className="font-medium">{remedy.title}</p>
            <p className="text-secondarybackground text-xs">
              👁 {remedy.views} | ❤️ {remedy.likes} | 💬 {remedy.comments}
            </p>
          </div>

          <div className="flex gap-3">
            <button className="text-accent hover:text-primary transition">
              <Edit size={14} />
            </button>
            <button
              onClick={() => onDelete(remedy._id)}
              className="text-red-500 hover:opacity-80 transition"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

/* -------------------- Main Component -------------------- */

function HerbalistDashboard() {
  const [overview] = useState({
    followers: 0,
    remedies: 0,
    views: 0,
    likes: 0,
    comments: 0,
  });

  const [recentFollowers] = useState([]);
  const [topRemedy] = useState(null);
  const [recentComments] = useState([]);
  const [myRemedies] = useState([]);

  const handleDelete = (id) => {
    console.log("Delete remedy", id);
  };

  return (
    <div className="min-h-screen bg-primarybackground font-poppins text-tertiary">
      {/* Header */}
      <header className="bg-tertiarybackground border-b border-secondarybackground px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-montserrat font-semibold">
          Herbalist Dashboard
        </h1>

        <button className="flex items-center gap-1 bg-primary text-white px-3 py-2 rounded-lg text-xs sm:text-sm hover:opacity-90 transition">
          <Plus size={14} />
          Create Remedy
        </button>
      </header>

      <main className="p-4 sm:p-6 space-y-6">
        {/* 1️⃣ Overview Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            label="Followers"
            value={overview.followers}
            icon={<Users size={18} />}
          />
          <StatCard
            label="Remedies"
            value={overview.remedies}
            icon={<Plus size={18} />}
          />
          <StatCard
            label="Views"
            value={overview.views}
            icon={<Eye size={18} />}
          />
          <StatCard
            label="Likes"
            value={overview.likes}
            icon={<Heart size={18} />}
          />
          <StatCard
            label="Comments"
            value={overview.comments}
            icon={<MessageCircle size={18} />}
          />
        </section>

        {/* 2️⃣ Recent Followers */}
        <SectionCard
          title="Recent Followers"
          action={
            <button className="text-primary text-xs hover:underline">
              View All
            </button>
          }
        >
          <RecentFollowersList followers={recentFollowers} />
        </SectionCard>

        {/* 3️⃣ Top Performing Remedy */}
        <SectionCard title="Top Performing Remedy">
          <TopRemedyDisplay remedy={topRemedy} />
        </SectionCard>

        {/* 4️⃣ Recent Comments */}
        <SectionCard title="Recent Comments">
          <RecentCommentsList comments={recentComments} />
        </SectionCard>

        {/* 5️⃣ My Remedies */}
        <SectionCard title="My Remedies">
          <MyRemediesList remedies={myRemedies} onDelete={handleDelete} />
        </SectionCard>
      </main>
    </div>
  );
}

export default HerbalistDashboard;
