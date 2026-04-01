import React from "react";
import HerbalistsTable from "../components/HerbalistsTable";

const SystemControl = ({ herbalists, loadingHerbalists, actionLoading, onVerify, onReject, onUnverify }) => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">Herbalist Applications</h2>
    {loadingHerbalists ? (
      <div className="flex justify-center items-center h-32">Loading applications...</div>
    ) : (
      <HerbalistsTable
        herbalists={herbalists}
        loading={loadingHerbalists}
        actionLoading={actionLoading}
        onVerify={onVerify}
        onReject={onReject}
        onUnverify={onUnverify}
      />
    )}
  </div>
);

export default SystemControl;