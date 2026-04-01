const Toast = ({ message, type }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow text-white ${
        type === "error" ? "bg-red-500" : "bg-primary"
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;