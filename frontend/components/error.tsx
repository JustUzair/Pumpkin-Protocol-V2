export const Error = () => {
  return (
    <div
      className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded-xl mt-3"
      role="alert"
    >
      <p className="font-bold">No valid Chain found!</p>
      <p>Connect to valid network to get utility tokens.</p>
    </div>
  );
};
