function Container({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-6 lg:px-8 xl:px-10 ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;