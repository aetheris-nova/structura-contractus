export default (() => {
  return {
    '**/*.{js,json,sol,ts}': (filenames) => [
      `prettier --write ${filenames.join(' ')}`,
    ],
  };
})();
