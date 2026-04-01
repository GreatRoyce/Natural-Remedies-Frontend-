const MetricCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-lg p-4 border">
    <div className="text-gray-500 text-sm uppercase">{title}</div>
    <div className="text-3xl font-bold">{value ?? 0}</div>
  </div>
);

export default MetricCard;