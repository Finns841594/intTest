const AppHeader = () => {
  return (
    <div className="w-full h-8 bg-cyan-500 flex flex-row justify-between align-middle px-2">
      <div></div>
      <p className="text-white font-bold my-auto">Products PlayGround</p>
      <div>
        <a
          href={'https://github.com/Finns841594/intTest'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block p-1"
        >
          <img
            src={'github-mark-white.svg'}
            alt={'Project Repo Link'}
            className="w-6 h-6"
          />
        </a>
      </div>
    </div>
  );
};

export default AppHeader;
