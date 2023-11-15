export const Error = () => {
  return (
    <div
      className="w-[80%] mx-auto bg-orange-100 border-l-4 border-orange-500 text-orange-700 px-4 py-2 rounded-xl"
      role="alert"
    >
      <p className="font-bold">No valid Chain or Contract found!</p>
      <p>Connect to valid network to proceed.</p>
    </div>
  );
};
