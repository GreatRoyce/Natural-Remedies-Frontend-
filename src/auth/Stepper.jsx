const Stepper = ({ step, maxSteps }) => {
  return (
    <div className="flex items-center justify-between text-xs">
      {[...Array(maxSteps)].map((_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= i + 1
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {i + 1}
          </div>

          {i < maxSteps - 1 && (
            <div
              className={`w-10 h-1 mx-1 ${
                step > i + 1 ? "bg-primary" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
