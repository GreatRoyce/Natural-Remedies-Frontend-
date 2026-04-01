const MetricCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 border">
      <p className="text-secondary text-xs uppercase">{title}</p>
      <h3 className="text-3xl font-bold mt-1 text-tertiary">
        {value ?? 0}
      </h3>
    </div>
  );
};

export default MetricCard;