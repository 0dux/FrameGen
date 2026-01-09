const SoftBackDrop = () => {
  return (
    <>
      {/* Soft Backdrop*/}
      <div className="fixed inset-0 -z-1 pointer-events-none">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-indigo-800/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-blue-700/35 to-transparent rounded-full blur-2xl" />
      </div>
    </>
  );
};

export default SoftBackDrop;
